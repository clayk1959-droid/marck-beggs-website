"use client";

import { useRouter } from "next/navigation";

export function EditorLogoutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      className="mono"
      onClick={async () => {
        await fetch("/api/editor-logout", { method: "POST" });
        router.push("/editor/login");
        router.refresh();
      }}
      style={{
        fontSize: 11,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        background: "none",
        border: "2px solid var(--ink)",
        padding: "6px 12px",
        cursor: "pointer",
      }}
    >
      Log out
    </button>
  );
}
