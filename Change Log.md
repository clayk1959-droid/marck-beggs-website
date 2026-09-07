# Change Log

Most recent first. Hosted on Vercel, deployed from GitHub — every push to
`main` goes live automatically within a minute or two.

## Version 36 (d519894) — Monday, September 7, 2026
Dropped the boxed buttons in the Discography section for plain
hyperlink text, matching the ALF page and Releases gallery: YouTube
(the one real link) is a plain underlined link, and Spotify/Apple
Music/CD Baby show as plain text with "(Coming Soon)" instead of a
disabled button.

## Version 35 (d7548f1) — Monday, September 7, 2026
Gave the bottom Music section a proper "Discography" header instead
of just the "hit play" note, matching the Releases section's pattern.
A real discography link may get added here later.

## Version 34 (28ce9a2) — Monday, September 7, 2026
Applied the ALF page's tight-spacing style to the Music page's bottom
section: dropped the rule line between Releases and the streaming
buttons, tightened the shared padding from 48px to 16px on each side.

## Version 33 (ba073dc) — Monday, September 7, 2026
Dropped the rule line between Issues and About the Journal on the ALF
page and pulled the two sections together — 48px of section padding
cut to 16px on the touching sides. Each link also picked up 6px of
invisible vertical padding, so the tap target stays comfortable even
as the visual gap tightens.

## Version 32 (2f487f7) — Monday, September 7, 2026
Issues list text dropped from 22pt to 19pt to match the About the
Journal list. Both lists now use the site's var(--space-2) spacing
token for their line gap instead of a one-off number, tightened down
from the original spacing.

## Version 31 — Monday, September 7, 2026
Tried a different treatment for the ALF landing page's Issues and About
the Journal lists — a wall of small type crammed into card boxes wasn't
working. Replaced both with a plain list of larger underlined hyperlink
text (22pt for issues, 19pt for info pages) and no boxes at all.

## Version 30 — Sunday, September 6, 2026
Added the ALF logo to the archive link on the Writings page too, so it
shows up everywhere the journal is referenced.

## Version 29 — Sunday, September 6, 2026
Added the Arkansas Literary Forum's own logo — the Arkansas-shaped
eye/hand artwork — to the new landing page hero and to the small
back-to-site banner on every one of the 494 archived pages, since
Marck is proud of it and it deserved more than plain text.

## Version 28 — Sunday, September 6, 2026
The mirrored ALF pages had no way back to the current site once you
clicked into them — no nav, nothing, since they predate this rebuild
by two decades. Added a small "back to MarckBeggs.com" banner to the
top of all 494 archived pages, linking to the new landing page,
without touching any of the original content below it.

## Version 27 — Sunday, September 6, 2026
Preserved the Arkansas Literary Forum, the online literary journal Marck
edited from 1999-2008 — it was still live on the same Bluehost account
as the old WordPress site, which disappears once marckbeggs.com's DNS
gets repointed here, so it needed a real home. Mirrored all 10 volumes
(2,600+ pages and images, ~740MB) exactly as originally published —
reformatting several hundred pages of 25-year-old table layouts for
mobile risked introducing errors into other people's original work for
something that mostly exists as an archive. Built a new landing page at
/books/arkansas-literary-forum in the site's own design, listing the 10
issues and info pages, replacing the old bare FrontPage menu as the
front door; the archive pages themselves are untouched behind it.
Linked to it from the Writings page.

## Version 26 — Sunday, September 6, 2026
Bumped the Releases section's "tap a cover, pick a service" note from
12pt to 16pt and dropped the "New Jams plays right here" clause, since
that's now obvious from the card labels themselves.

## Version 25 — Sunday, September 6, 2026
Release cards showed only cover art and a LISTEN banner, so New Jams
looked identical to every other cover until you tapped it — each card
now shows its title and year underneath. Releases sort newest-first by
year; New Jams stays pinned at the top for now, since its "forthcoming"
year sorts ahead of any real one and the pin falls away on its own once
it ships with a real year. Moved the Releases gallery above the general
"hit play" streaming-service buttons, which now sit at the bottom of
the page instead of between the hero and the gallery.

## Version 24 — Sunday, September 6, 2026
The service picker used to show a disabled "Spotify — soon" button for
any release missing a link, implying it was just a matter of time. For
several releases that's not true — it's a distributor choice, not a
delay — and the 2008 dog gods CD has no digital release anywhere at
all. Now the picker only lists services that actually have a real
link; a release with none shows a plain "not currently available to
stream" note instead of a wall of fake "soon" buttons.

## Version 23 — Sunday, September 6, 2026
Filled in the real streaming links for 6 of the 7 releases that were
showing "coming soon" — found by browsing each platform directly rather
than waiting on Marck to send them: Spotify (for the 2 that are actually
on it), Apple Music, YouTube (via the auto-generated "Marck - Topic"
channel), Pandora, and SoundCloud (Marck's own account has a proper album
for each one, just under different playlist slugs than the album titles).
Only the 2008 dog gods CD has no digital presence anywhere — it appears
to have never been released beyond a physical CD.

## Version 22 — Sunday, September 6, 2026
The editor's Music section was still pointed at an old, orphaned data file
that nothing on the live Music page reads anymore (a leftover from before
the Releases gallery redesign) — editing or deleting a "cover art" entry
there had zero effect on the actual site. Repointed it at the real
releases file: editing a release now updates its title, year, credit line,
and the 5 streaming-service links (or shows a note instead, for New Jams,
since it plays from its own track list rather than links); deleting a
release removes it and its cover image. Adding a brand-new release with
new cover art still isn't possible from the editor yet — that needs the
upload step that was always the deferred next phase.

## Version 21 — Sunday, September 6, 2026
Folded "New Jams" (the forthcoming dog gods record) into the Releases
gallery as the first tile, treated like any other album. Tapping LISTEN
skips straight to a track-list mini-player (numbered dots, same style
as the other mini-players) instead of the streaming-service picker,
since these six songs are self-hosted rather than on any platform.
Removed the now-fully-superseded standalone New Jams section, the
TrackList component, and tracks.json.

## Version 20 — Sunday, September 6, 2026
Replaced the Music page's static Cover Art grid with an interactive
Releases gallery, adopting the multi-release catalog (2008-2026, 8
releases) from the format doc Marck sent. Tap a cover, pick a service —
Spotify, Apple Music, YouTube, and SoundCloud all play in a real
embedded mini-player right in the modal (verified live against 12
Steps' actual Spotify link); Pandora has no public embed format so it
always opens in a new tab instead. Only 12 Steps has real links so far;
the rest show a disabled "coming soon" state per service until Marck
sends them. The page's hero/band framing and track list are untouched.

## Version 19 — Sunday, September 6, 2026
"Salmon: A Journey in Poetry, 1981-2007" (edited by Jessie Lendennie) was
pointing at Salmon Poetry's generic homepage as a placeholder — confirmed
it's not actually sold anywhere currently (not on Marck's own author page
there, not on Amazon or Kindle) and marked it "out of print" instead.
Fixed BookGrid so a book with an explanatory note no longer also shows
the generic "link coming soon" line underneath it.

## Version 18 — Sunday, September 6, 2026
On a wide/horizontal desktop window, the page content stayed capped at
720px wide, leaving big empty margins on both sides. Added breakpoints
so the content column grows to 960px (1024px+ windows) and 1100px
(1400px+ windows) instead of staying pinned narrow — mobile is
completely unaffected since those breakpoints never apply there.

## Version 17 — Sunday, September 6, 2026
Dropped the home page's Bio button (About is already one tap away in the
hamburger menu). Header background switched from a dark, low-alpha tint
to a solid, predictable light green for reliable contrast with the black
text. Footer now sits right after the rotating Music/Writings cards
(dropped its old 64px top margin) and uses that same header-green
background with black text, filling the space Bio used to occupy.

## Version 16 — Sunday, September 6, 2026
Reverted the header background to its pre-"more green" color (the
brighter green was a mistake); the hamburger dropdown was illegible with
black text on that shared color, so it's now decoupled with its own
plain white background and tighter row spacing. Home page: tightened
the heading's line-height and the gap before "Poet | Songwriter",
tightened the gap between the Music/Writings labels and their rotating
cards, slowed the rotation interval another second (5.5s total).

## Version 15 — Sunday, September 6, 2026
Header tint was reading as gray, not green — boosted the green channel
and pulled back red/blue. Header text, hamburger bars, and dropdown menu
text switched from white to black; the dropdown now shares the exact
same background color as the header (a new --header-bg token) instead of
solid black, with hover inverting to dark bg/white text.

## Version 14 — Sunday, September 6, 2026
Fixed the rotation transition to be a real crossfade (two image layers
blending into each other) instead of fading to the container's white
background between photos. Slowed the rotation interval by a second
(3.5s -> 4.5s), bumped the "Poet | Songwriter" subtitle 2pt, and changed
the header banner from solid black to a translucent dark-green tint
derived from the site's background color.

## Version 13 — Sunday, September 6, 2026
Home page cleanup: the two rotating cover boxes were touching, now split
into separate cards with a gap; images crossfade instead of cutting
instantly; Music and Writings rotate on staggered timers so they
alternate instead of flipping in sync; "Music"/"Writings" labels moved
above their cards and enlarged; dropped the rule line before the Bio
section; tightened vertical spacing throughout. Also added Marck's bio
photo to the About page.

## Version 12 — Sunday, September 6, 2026
Made the home page's fonts (Stardos Stencil headings, Special Elite body)
the site-wide standard, replacing Bungee/Figtree/Space Mono everywhere.
Also renamed "Books" to "Writings" throughout (nav, home page link, page
heading), trimmed the Writings page's intro copy, added a link to Marck's
short story "Saint Anonymous," filled in buy links for Bark/Dog Music/
Poems by Poets of the Roundtable, and replaced the About page's CV-style
bio with four short paragraphs Marck wrote himself.

## Version 11 — Sunday, September 6, 2026
Rebuilt the home page to match a mockup Marck sent: stencil display font
for the "Marck L. Beggs" heading, typewriter font for everything else on
the page, subtitle trimmed to "Poet | Songwriter". Replaced the hero+cards
layout with a single box split into two auto-rotating cover-art panels
(Music / Writing) linking to their full pages, plus a Bio box. Music
rotation uses seven new album-art images Marck supplied; Writing rotation
reuses the existing book covers.

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
