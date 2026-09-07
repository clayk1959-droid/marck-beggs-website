# What's needed from Marck before this goes live

## Open

Nothing currently open.

## Resolved — wide-desktop layout, 2026-09-07 (V66)

Version 18 widened the content column on large windows (720px ->
960/1100px) so there's less dead space overall, but Clay flagged that
the content itself did not shift left the way he expected — it was
still center-aligned, just in a wider column. Marck delegated the call
("set up desk-wide however you think is best"). Fixed by giving the
column a real but modest left margin instead of auto-centering, so it
sits shifted left with room to breathe while the leftover space
collects on the right. Mobile/tablet untouched.

## Resolved — Marck's email, 2026-09-07

Answered or closed out everything that was previously open:

- Spotify links for Pastel Gods, Psychedelic Pants, Weather App, and
  Negative Light — filled in.
- CD Baby link — not needed, ignore.
- "Discography" section confusion — moot; all his Spotify links are
  either on the site already or were sent directly.
- dog gods vs. Sloppy Birds — dog gods is his old band, now archived
  (Music page hero, and the "New Jams"/dog gods pairing at the end of
  Releases, both reflect this). Emphasis is on his solo projects.
  Sloppy Birds' debut album is still a year out.
- Cover art quality — what he sent is the best he has; not revisiting.
- FRACTALS and the two stray photos — both dropped.
- Contact form — mailto link is enough, no form needed.
- Domain autorenewal — confirmed on via PayPal.

## Domain / hosting (checked via public WHOIS + DNS, no login needed)

- Registrar, DNS, and hosting are all the **same Bluehost account**. The
  domain registration **expires November 1, 2026**; autorenewal is on via
  PayPal (confirmed by Marck 2026-09-07).
- Cutover mechanics for later: DNS lives in Bluehost's own zone editor, so
  going live just means editing the A/CNAME records there to point at
  Vercel — no nameserver change or account transfer required.

## How to edit content

Two ways, depending on what you're changing — see `Site Guide.html` for
the full version:

- **Editing/deleting something that already exists** (a book's buy link,
  a photo collection, a music-art image) — log into `/editor` in a
  browser. No coding. Commits straight to GitHub, live in about a minute.
- **Adding something brand-new** (a new book, a new photo collection, new
  music art) — the editor can't do this yet, so it's still a manual step:
  drop the file into `public/...`, add the matching entry to the JSON file
  in `data/`, commit, push.
