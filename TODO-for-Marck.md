# What's needed from Marck before this goes live

## Open

- **Wide-desktop layout reads as centered, not left-shifted.** Version
  18 widened the content column on large windows (720px -> 960/1100px)
  so there's less dead space overall, but the content itself doesn't
  shift left — it's center-aligned in a wider column. Six rounds of
  tuning on 2026-09-07 (V66-V75: margin ratios, then a scaling formula,
  then dropping the home page's own width cap) never landed — each
  attempt looked right in one screenshot and wrong in the next, mostly
  because it kept getting tuned against a single window size instead of
  the full range real visitors will have. Reverted to the V18 baseline
  (V76) rather than keep layering fixes. Marck already delegated the
  call ("set up desk-wide however you think is best") — still open,
  needs a clearer-headed pass another day rather than more live
  iteration.

## Resolved — Fractals archive, 2026-09-12

Marck's answer to "anything you still want before the old site is
gone" was Fractals — his old fractal-art gallery, which had already
been dropped from the rebuild's navigation (see the 2026-09-07 item
below) and had also quietly disappeared from the live old site itself.
Recovered everything survivng in the Wayback Machine (from 2004-2005)
and mirrored it faithfully into `/Fractals`, the same treatment given
to the Arkansas Literary Forum archive:

- All 5 galleries and every page/link structure recovered intact.
- 26 of the original full-size fractal images survived and are
  preserved exactly as they were.
- Where a gallery-listing thumbnail's source image survived, a real
  thumbnail was regenerated from it (not fabricated) — 28 of these.
- Genuinely lost, confirmed nowhere in the Wayback Machine: the site's
  own navigation/logo graphics (6 decorative GIFs), a handful of
  individual pieces scattered across galleries 1-4, and all of
  Gallery 5 (a Radiohead "OK Computer"-themed set) beyond its listing
  page — those 12 pieces' own pages and images were never archived.
- Not currently linked from anywhere on the live site (archived only,
  per Clay's instruction) — reachable directly at `/Fractals/index.html`
  if a link is wanted later.

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

See [Site Guide](/site-guide.html) for the full version:

- **Books and music releases** — fully self-serve through `/editor` now:
  edit, delete, or add brand-new with a cover photo upload, all from the
  browser. No coding. Commits straight to GitHub, live in about a minute.
- **Photo collections** — the editor can still edit a collection's
  title/subtitle or delete it, but adding a brand-new collection stays a
  step Clay does locally (`scripts/add-gallery-collection.mjs`), since
  Marck hasn't needed to add photos himself.
