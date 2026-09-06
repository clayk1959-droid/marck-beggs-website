# Change Log

Most recent first. Hosted on Vercel, deployed from GitHub — every push to
`main` goes live automatically within a minute or two.

## Version 10 — Saturday, September 5, 2026
Photo pages cleanup: dropped the rotated "photos" eyebrow badge from the
index and every collection page, tightened the top spacing so the heading
sits right under the banner. Added a back link to each (Home / Photos) —
neither had one before except the hamburger menu. Fixed the lightbox
looping past the first/last photo instead of stopping — it now clamps at
both ends and hides the arrow on the exhausted side.

## Version 9 — Saturday, September 5, 2026
Password-gated content editor at `/editor` (Photos, Books, Music sections).
Stateless HMAC-signed session cookie, no database. Edit or delete an
existing photo collection, book entry, or music cover-art item — each
change commits straight to GitHub via its Git Data API and the live site
rebuilds automatically. Deleting a photo collection removes both its JSON
entry and its entire `public/gallery/<slug>/` folder in one commit.
Uploading brand-new photos/covers/art isn't wired up yet (see Site Guide).

## Version 8 — Saturday, September 5, 2026
Ireland photo gallery, split into one real collection per place (Cliffs of
Moher, Dublin, Gerard Manley Hopkins' Grave, Irish Writers' Museum &
Centre, Trinity College, Christchurch & Dublin Castle, Dalkey) instead of
one grouped mega-gallery — same card → thumbnail-grid → lightbox pattern
as the Carson & Muller photo site, with full keyboard/arrow navigation.
Dropped the unexplained "Salmon Publishing &" wording from the old site.

## Version 7 — Saturday, September 5, 2026
Moved the "Poet · Songwriter · Professor" tagline to sit directly under
the red "Marck Beggs" hero heading, spread evenly across its width via
flexbox instead of a fixed-width line. Removed the rotated "crooked
bubble" badge that used to carry the same text.

## Version 6 — Saturday, September 5, 2026
Replaced the home page's stacked Music/Books sections with two matching
cards (dog gods cover art / Blind Verse cover), same treatment as the
photo site's collection cards, each linking through to the full page.

## Version 5 — Saturday, September 5, 2026
Replaced the top nav pills with a black banner + hamburger dropdown menu,
matching the photo site's header pattern. Thinned the banner (84px → 56px)
and made it span the full window width on desktop instead of being capped
to the page's 720px reading column.

## Version 4 — Saturday, September 5, 2026
Rebalanced the home page so Music and Books get equal billing (matching
section headings, content block, "see more" link) instead of Music
getting a full section while Books was a small link card. Background
changed from cream to a grayish-green.

## Version 3 — Saturday, September 5, 2026
Squared off every rounded corner (buttons, nav, cards, photo frames) and
stripped the Spotify/Apple Music/CD Baby/YouTube brand colors from the
streaming buttons in favor of plain ink/cream. Fixed a real CSS bug where
`.section`'s `padding` shorthand was silently zeroing out `.wrap`'s side
padding, crowding every button and card against the screen edges on
mobile.

## Version 2 — Saturday, September 5, 2026
(Rolled into the redesign passes above.)

## Version 1 — Saturday, September 5, 2026
Initial build: mobile-first rebuild of the old table-based WordPress/
Bluehost site as a Next.js app. Home, Music (dog gods, all six real songs
playable), Books (real covers, buy links to Salmon Poetry), About (bio +
full CV), Contact. Content lives in plain JSON data files. Deployed to a
new, separate GitHub repo and Vercel project — marckbeggs.com's DNS is
untouched; this only lives at the Vercel preview URL until a deliberate
cutover.
