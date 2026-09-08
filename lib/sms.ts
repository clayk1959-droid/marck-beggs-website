// Reuses the same already-A2P-verified Twilio account/number as Clay Carson
// Photography's own text alerts -- no new campaign registration, no public
// opt-in flow. That project needed a real opt-in list because it's texting
// arbitrary family members who subscribe themselves; this is simpler: one
// message, always to Clay's own already-confirmed number (the same one he
// already opted into on that site), about his own site's activity. Silently
// skipped if these env vars aren't set, same as the email notifications.
const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || null;
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || null;
const FROM_NUMBER = process.env.TWILIO_PHONE_NUMBER || null;
const OWNER_PHONE = process.env.OWNER_PHONE || null;

export async function sendOwnerSms(body: string): Promise<void> {
  if (!ACCOUNT_SID || !AUTH_TOKEN || !FROM_NUMBER || !OWNER_PHONE) return;
  try {
    const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${ACCOUNT_SID}/Messages.json`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${ACCOUNT_SID}:${AUTH_TOKEN}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ From: FROM_NUMBER, To: OWNER_PHONE, Body: body }),
    });
    if (!response.ok) {
      console.error("Text alert failed to send:", response.status, await response.text());
    }
  } catch (error) {
    console.error("Text alert failed to send:", error);
  }
}
