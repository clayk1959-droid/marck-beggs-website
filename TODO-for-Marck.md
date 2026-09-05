# What's needed from Marck before this goes live

The site works right now with real content pulled from the old
marckbeggs.com (book covers, band photos, all six dog gods songs, the
Garrison Keillor reading, full bio/CV). These items are still open:

## Links & assets

- **Real Spotify and Apple Music URLs.** The old site claimed these existed
  but they weren't findable on any page that was checked — `data/links.json`
  has empty strings for `spotify` and `appleMusic`, which the site renders
  as greyed-out "coming soon" buttons. Fill those two fields in and the
  buttons go live automatically.
- **CD Baby link.** Same situation — old site said "available at CDBaby.com"
  but never linked it. Fill in `streaming.cdBaby` in `data/links.json`.
- **Direct buy links** for: Godworm, Dogs Singing, Bark, Dog Music, Poems by
  Poets of the Roundtable — currently show "link coming soon" on the Books
  page. Edit the `buyUrl` field for each title in `data/books.json`.
- **Higher-resolution cover art / photos**, if he has them — everything
  currently in `public/images/` was pulled straight from the old site at
  whatever resolution it was published at (some are quite small/old JPEGs
  from the 2000s).

## Decisions only Marck can make

- Keep, archive, or drop the **Ireland photo gallery** and the **FRACTALS**
  page from the old site — not carried into this rebuild yet either way.
- Real **contact form**, or is the mailto link on the Contact page enough?

## Domain / hosting (checked via public WHOIS + DNS, no login needed)

- Registrar, DNS, and hosting are all the **same Bluehost account** — domain
  registered there since Nov 2004, nameservers are Bluehost's own. So there's
  no separate registrar to track down; whoever has that one Bluehost login
  controls everything needed for the eventual cutover.
- **The domain registration expires November 1, 2026.** Worth confirming
  auto-renew is on (or renewing manually) well before then, independent of
  this rebuild — a lapsed domain is a much bigger problem than an outdated
  site.
- Cutover mechanics, for later: since DNS lives in Bluehost's own zone
  editor already, going live just means editing the A/CNAME records there
  to point at Vercel — no nameserver change or account transfer required.

## How to edit content yourself

Everything editable lives in three plain files, no code required:

- `data/links.json` — email, streaming/store links
- `data/books.json` — every book/anthology: title, year, cover image, buy link
- `data/tracks.json` — song titles and notes

To swap a photo: drop the new file into `public/images/...` and update the
matching path in the JSON. Same idea for audio in `public/audio/`.
