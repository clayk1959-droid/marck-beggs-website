import { cookies } from "next/headers";
import { EDITOR_SESSION_COOKIE, verifySessionCookieValue } from "./editor-auth";

export async function getEditorSession(): Promise<{ name: string } | null> {
  const cookieStore = await cookies();
  const value = cookieStore.get(EDITOR_SESSION_COOKIE)?.value;
  return verifySessionCookieValue(value);
}
