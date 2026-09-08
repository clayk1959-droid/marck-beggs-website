import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { getEditorSession } from "../../../../lib/editor-session";

export const dynamic = "force-dynamic";

const MAX_FILE_BYTES = 20 * 1024 * 1024;

// Cover images upload straight from the browser to (private) Blob storage --
// Vercel Functions cap request bodies at 4.5MB, too small for a real photo
// from a phone. The blob is only ever a temporary holding spot: the music/
// books routes fetch it, resize it, commit the result to git, then delete
// the blob (see lib/image-resize.ts and app/api/editor/music|books/route.ts).
export async function POST(request: Request) {
  const session = await getEditorSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json()) as HandleUploadBody;

  const jsonResponse = await handleUpload({
    body,
    request,
    onBeforeGenerateToken: async () => ({
      allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"],
      maximumSizeInBytes: MAX_FILE_BYTES,
      addRandomSuffix: true,
    }),
  });

  return Response.json(jsonResponse);
}
