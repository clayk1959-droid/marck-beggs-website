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
- Who has login access to the **domain registrar** for marckbeggs.com
  (separate from whoever runs the Bluehost/WordPress hosting) — that's the
  account that has to make the DNS change on launch day.

## How to edit content yourself

Everything editable lives in three plain files, no code required:

- `data/links.json` — email, streaming/store links
- `data/books.json` — every book/anthology: title, year, cover image, buy link
- `data/tracks.json` — song titles and notes

To swap a photo: drop the new file into `public/images/...` and update the
matching path in the JSON. Same idea for audio in `public/audio/`.
