# marck-beggs-website — project notes

See `~/.claude/CLAUDE.md` for durable cross-project rules (docs
discipline, Vercel/git gotchas, image resize conventions, etc.) — this
file only covers what's specific to *this* project.

## What this is

From-scratch rebuild of Marck Beggs's (poet/songwriter/professor,
friend of Clay's) website. Next.js (App Router), deployed on Vercel,
GitHub-backed, no database. Separate project from Clay Carson
Photography — own folder, own repo, own Vercel project — but reuses
several of its patterns and even its Twilio account directly. Check
there first (`/Volumes/Samsung_T5/Clay Carson Photography from CLAUD`)
before re-deriving something that already works on that side.

- GitHub: `clayk1959-droid/marck-beggs-website`
- Vercel project: `marck-beggs-website`
- Live preview: `marck-beggs-website.vercel.app`. `marckbeggs.com`'s
  DNS still points at the old Bluehost/WordPress site untouched —
  only gets repointed on a deliberate go-live decision. Domain
  registration expires **November 1, 2026**; autorenewal confirmed on
  via PayPal.

## Full docs

- **`Change Log.md`** — plain-language version history, most recent
  first. Update on every ship.
- **`public/site-guide.html`** — the fuller technical reference
  (architecture, commands, env vars, content data files, version
  history). Published live at `/site-guide.html`, linked from the
  `/editor` dashboard. Update on every ship.
- **`Editor Guide for Marck.html`** — plain-language walkthrough for
  Marck himself; also published as the real in-app page `/editor/guide`.
- **`TODO-for-Marck.md`** — open questions for Marck, resolved-item
  log, domain/hosting notes.

## Stack / services

- No database anywhere in this project — content lives in `data/*.json`,
  images in `public/`, everything editable through `/editor` commits
  straight to GitHub via its Git Data API (`lib/github-commit.ts`).
- Editor auth: `lib/editor-auth.ts` — stateless, HMAC-signed session
  cookies, no DB. `EDITOR_PASSWORD` (Clay, same identity/password as
  Clay Carson Photography's own editor) + `EDITOR_USERS` (`name:password`
  lines, one per line — Marck's own login lives here).
- File uploads: Vercel Blob (`BLOB_READ_WRITE_TOKEN`), browser uploads
  directly via `@vercel/blob/client`, then resized server-side with
  `sharp` (see global CLAUDE.md for the size/quality rules) before
  landing in the same GitHub commit as the content change.
- Email: Resend (`RESEND_API_KEY`) — reuses Clay Carson Photography's
  verified sending domain (`mail.carsonmullerfamily.com`), not a
  separate signup.
- SMS: Twilio (`TWILIO_ACCOUNT_SID`/`TWILIO_AUTH_TOKEN`/
  `TWILIO_PHONE_NUMBER`) — reuses Clay Carson Photography's already
  A2P-verified account directly. `OWNER_PHONE` is Clay's own confirmed
  number; `lib/sms.ts`'s `sendOwnerSms()` sends straight to it, no
  subscriber list/opt-in database (unlike the photo site's `sendSms()`,
  which has one for its multi-party family use case — not needed here
  since this only ever texts Clay about his own site).
- `lib/editor-notify.ts` is the one place both email and SMS fire from
  — wired into every write path in `app/api/editor/{music,books,photos}/
  route.ts`. Extend there, not in the route files, for any future
  notification channel.

## What's still manual (not in the editor UI)

Adding a **brand-new photo collection** is Clay's own local step, not
self-serve for Marck — `node scripts/add-gallery-collection.mjs
"<Title>" "<source folder>"` (source folder can live anywhere on disk,
doesn't need to be inside this repo), then `git add -A && git commit
-m "..." && git push`. Editing/deleting an existing collection's
title/subtitle *is* in the editor. This was a deliberate scope call,
not a bug — see `Change Log.md` V77 and `TODO-for-Marck.md`.

## Known constraints

- No staging environment — testing hits the real GitHub repo and real
  Vercel deployments. Clean up test commits/data after verifying.
- Repo lives on an external drive — Turbopack HMR is unreliable there
  (see global CLAUDE.md); always fresh-restart `npm run dev` before
  trusting a preview.
