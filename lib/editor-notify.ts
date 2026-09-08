import { Resend } from "resend";
import { OWNER_NAME } from "./editor-auth";

// Reuses the same Resend account/verified sending domain as Clay Carson
// Photography's own notification emails -- one already-working identity
// instead of a second signup/domain-verification for this project.
const FROM_ADDRESS = "noreply@mail.carsonmullerfamily.com";
const OWNER_EMAIL = OWNER_NAME;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendMail(subject: string, html: string) {
  if (!process.env.RESEND_API_KEY) return;
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({ from: FROM_ADDRESS, to: OWNER_EMAIL, subject, html });
  } catch {
    // Best-effort -- a notification failure should never break the actual save.
  }
}

// Fires after a successful commit. Skips Clay's own edits -- he doesn't
// need an email every time he changes something himself, only when Marck
// does.
export async function notifyEditorChange(editorName: string, summary: string) {
  if (editorName.toLowerCase() === OWNER_EMAIL.toLowerCase()) return;
  await sendMail(`Marck Beggs site: ${summary}`, `<p><strong>${escapeHtml(editorName)}</strong> ${escapeHtml(summary)}.</p>`);
}

// Fires when a save fails outright -- before any commit lands, so Vercel
// never sees a push and never sends its own failure email either. This is
// the only alert for that case, so it fires regardless of who triggered it.
export async function notifyEditorFailure(editorName: string, action: string, error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  await sendMail(
    `Marck Beggs site: save failed (${editorName})`,
    `<p><strong>${escapeHtml(editorName)}</strong> tried to ${escapeHtml(action)}, but it failed:</p><pre>${escapeHtml(
      message,
    )}</pre><p>Nothing was saved — ask them to try again, or check GitHub/Vercel status.</p>`,
  );
}
