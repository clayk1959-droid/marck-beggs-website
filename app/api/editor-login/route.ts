import { EDITOR_SESSION_COOKIE, EDITOR_SESSION_MAX_AGE_SECONDS, OWNER_NAME, createSessionCookieValue, verifyCredentials } from "../../../lib/editor-auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" && body.name.trim() ? body.name.trim() : OWNER_NAME;
  const password = typeof body?.password === "string" ? body.password : "";

  if (!password || !verifyCredentials(name, password)) {
    return Response.json({ error: "Incorrect name or password." }, { status: 401 });
  }

  const cookieValue = createSessionCookieValue(name);
  if (!cookieValue) {
    return Response.json({ error: "Login is not configured." }, { status: 500 });
  }

  const response = Response.json({ ok: true });
  response.headers.append(
    "Set-Cookie",
    `${EDITOR_SESSION_COOKIE}=${cookieValue}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${EDITOR_SESSION_MAX_AGE_SECONDS}`,
  );
  return response;
}
