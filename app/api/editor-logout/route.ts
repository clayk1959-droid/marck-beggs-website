import { EDITOR_SESSION_COOKIE } from "../../../lib/editor-auth";

export const dynamic = "force-dynamic";

export async function POST() {
  const response = Response.json({ ok: true });
  response.headers.append("Set-Cookie", `${EDITOR_SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`);
  return response;
}
