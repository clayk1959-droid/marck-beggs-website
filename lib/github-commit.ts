const API_ROOT = "https://api.github.com";

function repoAndBranch() {
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";
  const token = process.env.GITHUB_TOKEN;
  if (!repo || !token) throw new Error("GITHUB_REPO/GITHUB_TOKEN are not configured.");
  return { repo, branch, token };
}

function authHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

async function githubFetch(path: string, init?: RequestInit) {
  const { token } = repoAndBranch();
  const response = await fetch(`${API_ROOT}${path}`, {
    ...init,
    headers: { ...authHeaders(token), ...(init?.headers || {}) },
    cache: "no-store",
  });
  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`GitHub API ${response.status} on ${path}: ${body.slice(0, 500)}`);
  }
  return response;
}

/** Reads a file straight from GitHub (never the deployed bundle) so edits always start from the live state. Returns null if it doesn't exist. */
export async function getFileContent(path: string): Promise<string | null> {
  const { repo, branch } = repoAndBranch();
  const response = await fetch(`${API_ROOT}/repos/${repo}/contents/${path}?ref=${branch}`, {
    headers: authHeaders(repoAndBranch().token),
    cache: "no-store",
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`GitHub API ${response.status} reading ${path}`);
  const data = await response.json();
  return Buffer.from(data.content, "base64").toString("utf-8");
}

export type CommitWrite = { path: string; content: string; encoding?: "utf-8" | "base64" };

type TreeEntry = { path: string; mode: string; type: string; sha: string | null };

/**
 * One atomic commit: writes (add/update, text or base64) plus deletes
 * (exact paths or directory prefixes -- anything under "gallery/foo/" is
 * removed by passing "gallery/foo"). Retries on a non-fast-forward
 * conflict from a concurrent edit.
 */
export async function commitChanges(
  { writes = [], deletes = [] }: { writes?: CommitWrite[]; deletes?: string[] },
  message: string,
): Promise<void> {
  const { repo, branch } = repoAndBranch();
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const refResponse = await githubFetch(`/repos/${repo}/git/ref/heads/${branch}`);
    const refData = await refResponse.json();
    const headSha = refData.object.sha as string;

    const commitResponse = await githubFetch(`/repos/${repo}/git/commits/${headSha}`);
    const commitData = await commitResponse.json();
    const baseTreeSha = commitData.tree.sha as string;

    const blobShas = await Promise.all(
      writes.map(async (write) => {
        const blobResponse = await githubFetch(`/repos/${repo}/git/blobs`, {
          method: "POST",
          body: JSON.stringify({ content: write.content, encoding: write.encoding === "base64" ? "base64" : "utf-8" }),
        });
        const blobData = await blobResponse.json();
        return blobData.sha as string;
      }),
    );

    let newTreeSha: string;

    if (deletes.length > 0) {
      const treeResponse = await githubFetch(`/repos/${repo}/git/trees/${baseTreeSha}?recursive=1`);
      const treeData = await treeResponse.json();
      const isDeleted = (path: string) =>
        deletes.some((prefix) => path === prefix || path.startsWith(prefix.endsWith("/") ? prefix : `${prefix}/`));

      const remaining: TreeEntry[] = (treeData.tree as TreeEntry[]).filter(
        (entry) => entry.type === "blob" && !isDeleted(entry.path),
      );
      const writePaths = new Set(writes.map((w) => w.path));
      const merged = remaining.filter((entry) => !writePaths.has(entry.path));
      for (const [index, write] of writes.entries()) {
        merged.push({ path: write.path, mode: "100644", type: "blob", sha: blobShas[index] });
      }

      const newTreeResponse = await githubFetch(`/repos/${repo}/git/trees`, {
        method: "POST",
        body: JSON.stringify({ tree: merged.map(({ path, mode, type, sha }) => ({ path, mode, type, sha })) }),
      });
      const newTreeData = await newTreeResponse.json();
      newTreeSha = newTreeData.sha;
    } else {
      const newTreeResponse = await githubFetch(`/repos/${repo}/git/trees`, {
        method: "POST",
        body: JSON.stringify({
          base_tree: baseTreeSha,
          tree: writes.map((write, index) => ({ path: write.path, mode: "100644", type: "blob", sha: blobShas[index] })),
        }),
      });
      const newTreeData = await newTreeResponse.json();
      newTreeSha = newTreeData.sha;
    }

    const newCommitResponse = await githubFetch(`/repos/${repo}/git/commits`, {
      method: "POST",
      body: JSON.stringify({ message, tree: newTreeSha, parents: [headSha] }),
    });
    const newCommitData = await newCommitResponse.json();

    const updateRefResponse = await fetch(`${API_ROOT}/repos/${repo}/git/refs/heads/${branch}`, {
      method: "PATCH",
      headers: authHeaders(repoAndBranch().token),
      body: JSON.stringify({ sha: newCommitData.sha }),
    });

    if (updateRefResponse.ok) return;
    if (updateRefResponse.status !== 422 || attempt === maxAttempts) {
      const body = await updateRefResponse.text().catch(() => "");
      throw new Error(`Failed to update ref: ${updateRefResponse.status} ${body.slice(0, 300)}`);
    }
    // Someone else committed in between -- loop and retry against the new head.
  }
}
