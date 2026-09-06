# What's needed from Marck before this goes live

## Links & assets still open

- **Direct buy links** for: Bark, Dog Music, Poems by Poets of the
  Roundtable — currently show "link coming soon" on the Books page. Every
  other title's buy link is filled in now.
- **Real Spotify and Apple Music URLs** for the streaming buttons (Music
  page and home page) — still empty, rendering as greyed-out "coming soon".
- **CD Baby link** — old site said "available at CDBaby.com" but never
  linked it.
- **Higher-resolution cover art**, if he has more — most of `public/images/`
  is still whatever resolution the old site published at.

## Decisions only Marck can make

- **dog gods vs. Sloppy Birds.** His new bio (added 2026-09-06) calls dog
  gods his *former* band and mentions a new one, Sloppy Birds, debuting
  2027. The Music page still presents dog gods as the current/active band
  with a "forthcoming record." **Explicitly holding off on changing the
  Music page until Sloppy Birds has real content (songs/art) to show** —
  don't touch this without being asked again.
- Keep, archive, or drop the old site's **FRACTALS** page and the two
  stray single-photo links (SiriusXM guitar photo, "Howdy" masked photo)
  — not carried into the rebuild.
- Real **contact form**, or is the mailto link on the Contact page enough?

## Domain / hosting (checked via public WHOIS + DNS, no login needed)

- Registrar, DNS, and hosting are all the **same Bluehost account**. The
  domain registration **expires November 1, 2026** — worth confirming
  auto-renew is on, independent of this rebuild.
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
