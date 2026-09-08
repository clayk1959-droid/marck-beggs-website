# Change Log

Most recent first. Hosted on Vercel, deployed from GitHub — every push to
`main` goes live automatically within a minute or two.

## Version 77 (1860f43) — Monday, September 7, 2026
Big one: the editor can now add brand-new music releases and books, not
just edit/delete existing ones. Click "+ Add a release" or "+ Add a
book" at the top of either editor page, pick a cover photo from your
computer, fill in the fields, save — the photo uploads, gets resized
automatically, and the whole thing goes live in one commit, same as any
other editor save. For music: one streaming link makes the card open
straight into a mini-player when tapped; more than one shows the
pick-a-service screen, exactly like every existing release already
does. Cover photos are editable now too, on both Add and Edit.

Also fixed a real bug this surfaced: deleting anything with a cover
image (which is nearly everything) had been silently broken for a
while — the delete logic tried to rebuild the entire repo's file tree
in one request, which now 502s once the repo passed ~1400 files.
Rewritten to only touch the specific file(s) being removed; confirmed
fast (2-3 seconds) for a single cover, a nested file, and a whole photo
collection directory.

Photo collections stay a step Clay does locally for now
(`scripts/add-gallery-collection.mjs`, same 3200px/750px resize rules
as everywhere else) since Marck hasn't needed to add photos himself —
see the Site Guide for how that works if it's ever needed.

## Version 76 (251bfd7) — Monday, September 7, 2026
Six rounds of wide-desktop tuning (V66-V75) never converged — every
fix chased the last screenshot instead of landing. Reverted cleanly
back to the pre-session baseline: `.wrap` is a plain centered
720/960/1100px column again, and the home page hero is back to its
original 420px centered photo with a plain flex Music/Writings row
below it. The footer tuck-in/font-size fix from V71 stays, since that
was never part of the complaint. Mobile unaffected throughout.

## Version 75 (17035be) — Monday, September 7, 2026
The home page kept looking wrong even after V74 fixed every other
page, because its hero/cards block had its own hardcoded width cap
(600px, then 950px) that never inherited the general wrap scaling fix
at all — a special case Clay's screenshots kept catching. Removed that
cap. The hero photo and Music/Writings cards now fill the wrap
directly, exactly like the Music and Photos grids already did, so the
V74 formula applies here too. Mobile untouched.

## Version 74 (e5023ad) — Monday, September 7, 2026
Clay made the real point that had been missing from every prior pass:
visitors have all sorts of window sizes, so tuning fixed margin/width
numbers to whatever one screenshot showed was never going to hold up
generally. Replaced the hardcoded breakpoint tiers with one scaling
formula (max-width: min(1600px, 92vw), margin-left: max(40px, 4vw)) —
verified across 1024px, 1440px, and 1920px instead of one snapshot.
The column fills nearly the whole window with small, roughly-even
margins at normal laptop/desktop widths, and only leaves a real gap on
genuinely huge monitors, the way any site with a max content width
behaves. Mobile/tablet untouched.

## Version 73 (722c2f7) — Monday, September 7, 2026
Confirmed with Clay on his actual 1920x1080 monitor: shuffling the
left/right margin ratio was never going to fix the wide-screen void,
since content was capped at a fixed 1100px no matter how wide the
screen got. Widened the shared content column itself (1200px at
1024px+, 1500px at 1400px+) so pages that use the full width — Music,
Photos, Books, About — actually fill more of a wide screen. Also found
a second bug specific to the home page: its hero/cards block was
self-centering inside the wrap instead of following the wrap's own
left shift, so widening the wrap alone didn't visibly help it. Fixed
that (no more self-centering) and bumped its own cap from 600px to
950px. Mobile untouched throughout.

## Version 72 (cd10e33) — Monday, September 7, 2026
Clay confirmed V71's wide-desktop pull went too far — too much dead
space on the right on a genuinely wide screen. Split the difference
between V71 and the original V66 shift: still left of center with room
to breathe, just not as extreme. Mobile/tablet untouched.

## Version 71 (251ba26) — Monday, September 7, 2026
Two footer fixes plus another pass on the wide-desktop shift. The
footer's copyright and email used to spread edge-to-edge across the
full wide column, so on pages with narrower content (About's small
centered photo, for instance) the email drifted way out past the
actual content into empty space — and at 12px it was hard to read
regardless. Both now sit tucked together near the left edge on every
page, and the text is close to double the size on desktop (13px on
mobile, unchanged in practice; 22px at 1024px+). Also shifted the
whole wide-desktop content column further left per Clay's request —
same mechanism as V66, just a stronger pull. Mobile/tablet untouched.

## Version 70 (56be36c) — Monday, September 7, 2026
The rule line above Music/Writings on the home page stretched across
the full (now wider) column while the hero photo and cards above/below
it stayed capped at 600px — Clay caught it looking disconnected on a
wide screen. Moved the border onto the same 600px-capped block as the
hero and cards, so all three now share identical edges. Mobile
unaffected.

## Version 69 (a0fcc60) — Monday, September 7, 2026
The Arkansas Literary Forum archive was only reachable from a card at
the bottom of the Writings page. Added it to the hamburger menu as
"ALF" — the full "Arkansas Literary Forum (archive)" name is too long
for a nav item — with the full name as a hover tooltip. Sits between
Writings and Photos.

## Version 68 (a98396b) — Monday, September 7, 2026
Clay found on mobile that the Monster Trucks/Iceman mini-players
(added in V65) had no visible way to close — you had to know to tap
the title again. Added an explicit "× Close" link under the player,
same as every other closeable panel on the site.

## Version 67 (521ad55) — Monday, September 7, 2026
Clay spotted it right after the wide-layout fix: the home page hero
photo (fixed at 420px) and the Music/Writings row below it (stretched
to fill the full column) no longer lined up on a wide screen — the
cards row was visibly wider than the hero above it. Gave both the same
600px max-width, centered together: hero is larger than before, the
two cards are smaller than they'd grown to, and both blocks now share
the same edges. Mobile is untouched — it was already narrower than
600px.

## Version 66 (b72a9c3) — Monday, September 7, 2026
Wide-desktop layout fix. Widening the content column on big screens
(V18) never actually shifted it left — it just grew as a wider centered
box, margins still equal on both sides. Marck delegated the call
("set up desk-wide however you think is best"). Now the content sits
with a real but modest left margin (scales with the window, 48-64px+)
and the leftover space collects on the right instead of splitting
evenly — shifted left with room to breathe, not crowded. Mobile and
tablet are untouched.

## Version 65 (a1eb7d6) — Monday, September 7, 2026
Monster Trucks and Iceman (the two SoundCloud singles listed next to
the YouTube link) opened SoundCloud in a new tab, same inconsistency
as the 2008 album before it was fixed. Clicking either title now opens
a real inline mini-player right under it, same as every other release
on the page — click again to close it.

## Version 64 (8195afb) — Monday, September 7, 2026
Marck reported the 2008 dog gods album "just does the first song."
The link was fine — his new shortlink resolved to the exact same
15-track set — the embed box was just sized for a single track
(166px), too short to show the tracklist below the first song's
player. Playlist/set links now get a 600px-tall embed so the full
15-track list is visible and playable; plain single-track links are
unaffected.

## Version 63 (bc6096f) — Monday, September 7, 2026
Clay liked the look of a paid Elfsight audio-player widget (big cover
art, real transport controls, cleaner track list) and asked for our
own version instead of paying for that service. The dog gods: singles
player — the only release we play back ourselves rather than embedding
a streaming service — now shows a crisp cover thumbnail next to the
title, a scrubber with elapsed/remaining time, and real
previous/play-pause/next buttons in place of the browser's plain audio
bar. Previous restarts the current track once you're more than 3
seconds in, otherwise it jumps back a track, matching how most music
apps behave.

## Version 62 (5a43ab0) — Monday, September 7, 2026
The 2008 dog gods album is a real 15-track release with a real
SoundCloud home now, not a footnote — gave it back its own card in
the Releases grid (still grouped at the end, next to dog gods:
singles). Added a general rule to the picker: when a release has
exactly one streaming service, skip the "pick a service" screen and
open straight into that service's embed — pointing at the SoundCloud
*set* means the embed itself plays the full 15-track playlist.
Multi-service releases are unaffected.

## Version 61 (1893e97) — Monday, September 7, 2026
The 2008 dog gods album's SoundCloud link opened externally instead of
playing inline like every other release. Reused the same embed
transform already used elsewhere in the picker — tapping it now opens
a real mini-player (with a back button) right in the modal.

## Version 60 (c1ae1b0) — Monday, September 7, 2026
Marck put the 2008 dog gods album out on SoundCloud (his call — just
there for now, nowhere else). The "I am large, I contain multitudes"
line inside the dog gods: singles player was a dead end ("not
available to stream") — it's now a real external link to the
SoundCloud set.

## Version 59 (ab9f584) — Monday, September 7, 2026
Two more from Marck. Dropped the "forthcoming" label from dog gods:
singles (card and its player popup both read the same field, so
clearing it removes it in both places at once). Changed every page
title from red to black on every page except Home, which was already
black — also dropped the now-invisible black drop-shadow that used to
sit behind the red text, since a black shadow behind black text was
just dead CSS.

## Version 58 (14723bd) — Monday, September 7, 2026
Three fixes from a full-site audit. Cliffs of Moher's cover photo was
a random house with a horse in a field, not a cliff — swapped to an
actual cliffside/ocean shot from the same collection. Contact page
showed the same email twice on screen (its own card plus the footer
right below) — the footer now hides its email specifically on
/contact. Writings was the last page still using the old boxed-card,
rule-line look from earlier in the rebuild — applied the same tight
spacing/no-boxes treatment used on Music and the ALF page: plain
underlined links for Saint Anonymous, Kilty Sue, and the ALF archive
link (now with the same bordered-square logo treatment). The book
cover grids themselves are untouched — those are real image cards,
not text links.

## Version 57 (edc0330) — Monday, September 7, 2026
Added a bordered square around the SoundCloud/YouTube logos, same
treatment as the streaming picker but heavier (2px at 35% opacity
vs. the picker's 1px at 20%) so it holds its own next to the album
cards' 3px borders.

## Version 56 (2d8f7f2) — Monday, September 7, 2026
Paired the SoundCloud singles and YouTube link as matched two-column
blocks instead of two disjointed sections — SoundCloud icon spanning
both Monster Trucks/Iceman on one side, YouTube icon + link at the
same depth on the other. Used a responsive auto-fit grid so it stacks
vertically on narrow phones instead of squeezing text into awkward
wraps.

## Version 55 (4d99bd2) — Monday, September 7, 2026
Tightened the Singles on SoundCloud list (removed the gap, cut each
single's padding from 6px to 3px) and pulled the YouTube link section
up closer to it, matching the tight-section pattern used elsewhere.

## Version 54 (d2d93e8) — Monday, September 7, 2026
Consolidated the two dog gods cards into one. The 2008 album had no
real streaming links, so its card just opened to an empty "not
available to stream" message — removed it and added that album as a
final, non-playable line at the bottom of the dog gods: singles track
list instead, shown with a dash rather than a play arrow. Also
tightened the track list's row padding to match the spacing
convention used elsewhere, and removed the now-unused 2008 cover image.

## Version 53 (094980c) — Monday, September 7, 2026
"My videos on YouTube" now breaks to two lines ("My videos" / "on
YouTube"), with the icon bumped from 22px to 50px so it matches the
depth of the two-line text instead of looking small next to it.

## Version 52 (bb1918c) — Monday, September 7, 2026
"Miscellaneous Videos" relabeled "My videos on YouTube," with the same
color YouTube icon from the streaming picker placed right before the
text — icon plus label, the standard way to mark a platform link.

## Version 51 (762f617) — Monday, September 7, 2026
Gave each service logo a consistent bordered square (56x56, 1px
border) instead of floating free — fixes the bare-shape logos
(SoundCloud, Pandora) reading weaker than ones with their own filled
background (Spotify, Apple Music, YouTube).

## Version 50 (08ec030) — Monday, September 7, 2026
Color logos are the final call. Switched the service-picker modal
from the site's sage-green background to white, since the bare-shape
logos (SoundCloud, Pandora — no background of their own) were getting
lost against the muted green. Every release now shows the full-color
treatment; the temporary color-vs-mono comparison is gone.

## Version 49 (a77718a) — Monday, September 7, 2026
Dropped the white-background/black-border box on the streaming
picker entirely — just the icon (44px, up from 18px) and a small
label now, laid out in a 3-column grid that wraps to a second row.
Still comparing color (12 Steps) vs. mono (Tectonic Plates) under
this new layout ahead of a final decision.

## Version 48 (cd8274c) — Monday, September 7, 2026
Added real streaming-service logos (Pandora, Spotify, Apple Music,
YouTube, SoundCloud) to the picker, inlined as SVG — no external CDN.
Temporary A/B test ahead of a style decision: 12 Steps shows the logos
in full brand color, Tectonic Plates shows the same logos in a single
ink color. Every other release is untouched until a direction is
picked.

## Version 47 (92763d0) — Monday, September 7, 2026
A batch of changes straight from Marck's own email. Music page: hero
replaced with just "Music" (dropping the dog gods band framing, since
dog gods is his old band now being archived in favor of his solo
work); "New Jams" renamed to "dog gods: singles" and moved to sit next
to the 2008 dog gods album at the very end of Releases, so solo
projects lead; added the four missing Spotify links (Pastel Gods,
Psychedelic Pants, Weather App, Negative Light); added a "Singles on
SoundCloud" section (Monster Trucks, Iceman) and a "Miscellaneous
Videos" YouTube link; moved Pandora to the top of every release's
service picker. Photos page: removed the two stray photos entirely
per his request. Writings: "Salmon: A Journey in Poetry" is actually
back in stock via Salmon's own bookshop, so it's linked instead of
showing "out of print."

## Version 46 (eaa1190) — Monday, September 7, 2026
Fixed a Safari-only bug on the stray photo cards: the Howdy card sat
24px lower than the Sirius card, exactly matching the extra caption
line Sirius's longer text takes. Measured a real device screenshot
pixel-by-pixel to confirm — Safari applies its own default alignment
behavior to `<button>` that Chrome doesn't, which the Chromium-based
testing used throughout this project couldn't catch. Fixed by pinning
the alignment explicitly instead of relying on browser defaults.

## Version 45 (a2f5da7) — Monday, September 7, 2026
The two stray photo cards matched each other but not the collection
cards below — those grow responsively via CSS Grid while the stray
cards were pinned to a fixed 160px. Now the stray row measures the
real rendered collection-card width at runtime and matches it exactly
at any screen size, verified at both 1280px and 700px wide.

## Version 44 (0dafdc8) — Monday, September 7, 2026
The two stray photo cards were different sizes since each rendered at
its own natural aspect ratio. Both are now the same fixed 4:5 card
(matching the collection cards below), with the taller Sirius photo
cropping at the bottom instead of stretching the card. Both now open
a lightbox on click — full uncropped image, with prev/next between
the two — reusing the same dialog pattern as the collection galleries.

## Version 43 (b314cd4) — Monday, September 7, 2026
Added the two stray photos from the old site — Marck with Johnny A at
Sirius holding the guitar he won, and the "Howdy" facemask photo — as
a new centered row at the top of the Photos page, above the
collections grid. Pulled the real source images from marckbeggs.com
(they'd never been carried into the rebuild) and resized them with
the same pipeline as everything else.

## Version 42 (daf54ea) — Monday, September 7, 2026
Redesigned the New Jams player as a square playlist window: the cover
art now sits behind the track list as a very light, desaturated
background instead of a busy header image. Tracks dropped their
numbered dots and individual audio players for a play-arrow icon each
— tapping one loads it into a single shared player pinned at the
bottom, which auto-advances to the next track and toggles the arrow
to a pause icon while playing. Every other release (the streaming-
service picker) is unchanged.

## Version 41 (26d8771) — Monday, September 7, 2026
New Jams needed better labeling on its cover tile — added a diagonal
"New Jams" ribbon across the upper-left corner, pure CSS, no image
asset needed. Only shows on that one release.

## Version 40 (c6a6bf0) — Monday, September 7, 2026
Halved the gap between the rule line and "Releases" on the Music page
— 48px padding down to 24px.

## Version 39 (4a3992f) — Monday, September 7, 2026
Removed the Music page's "Arkansas rock & roll" eyebrow above "dog
gods" — unclear origin, so it's gone along with the spacing that was
pinned to it. The heading now sits right at the top of the page.

## Version 38 (2f8809c) — Monday, September 7, 2026
Removed the "hit play" band-wide streaming buttons section from the
Music page entirely — its purpose was unclear, so it's gone rather
than guessed at further. The page now ends with Releases (footer
still renders normally below it). Left the StreamingButtons component
and its data in place, unused, in case this comes back once there's a
real plan for it.

## Version 37 (11ba259) — Monday, September 7, 2026
Reverted the "Discography" header and the boxes-to-plain-text swap on
the Music page's bottom section — not settled that this section
actually is a discography, or where that framing came from. Back to
"hit play →" with the boxed streaming buttons, keeping the tight
spacing from Version 34 (unrelated, stays).

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
