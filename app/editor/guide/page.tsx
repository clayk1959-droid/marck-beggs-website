import Link from "next/link";

const inkSoft = "var(--ink-soft)";

function StepCard({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 28 }}>
      <h2 style={{ fontSize: 20, display: "flex", alignItems: "center", gap: 10 }}>
        <span
          className="mono"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: "var(--accent)",
            color: "var(--accent-ink)",
            fontSize: 14,
            flexShrink: 0,
          }}
        >
          {number}
        </span>
        {title}
      </h2>
      <div style={{ padding: "16px 20px", marginTop: 10, background: "rgba(36, 27, 46, 0.15)" }}>
        {children}
      </div>
    </section>
  );
}

function WhatHappens({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mono"
      style={{
        fontSize: 13,
        color: inkSoft,
        borderLeft: "4px solid var(--accent)",
        paddingLeft: 12,
        marginTop: 12,
      }}
    >
      <strong style={{ color: "var(--accent)" }}>What happens: </strong>
      {children}
    </p>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: 14,
        background: "rgba(200,69,47,0.08)",
        border: "2px solid rgba(200,69,47,0.35)",
        padding: "10px 14px",
        marginTop: 12,
      }}
    >
      {children}
    </p>
  );
}

export default function EditorGuidePage() {
  return (
    <main>
      <section className="wrap" style={{ paddingTop: 40 }}>
        <Link href="/editor" className="mono" style={{ fontSize: 12 }}>
          ← Editor
        </Link>
        <h1 style={{ fontSize: 30, marginTop: 12, color: "var(--accent)", textShadow: "3px 3px 0 var(--ink)" }}>
          How to Update Your Site
        </h1>
        <p style={{ fontSize: 16, marginTop: 8, maxWidth: 560 }}>
          A short guide to adding and changing your music and writings — no coding, nothing to install.
        </p>
      </section>

      <section className="wrap section" style={{ maxWidth: 640 }}>
        <StepCard number={1} title="Log in">
          <p>
            Go to <code>/editor</code>{" "}in any web browser — your phone, laptop, whatever&rsquo;s handy. Type in the
            password Clay gave you and click <strong>Log in</strong>.
          </p>
          <WhatHappens>
            Nothing changes on the site yet — this just gets you into the editing tools. You&rsquo;ll stay logged in
            for about a month, so you shouldn&rsquo;t need to do this often.
          </WhatHappens>
        </StepCard>

        <StepCard number={2} title="Pick Music, Writings, or Photos">
          <p>
            You&rsquo;ll see a page with three things you can manage: <strong>Music</strong>{" "}(your albums and
            singles), <strong>Writings</strong>{" "}(your books and anthologies), and <strong>Photos</strong>{" "}
            (your galleries). Click whichever one you want to change.
          </p>
          <p style={{ marginTop: 8 }}>
            Music and Writings work exactly the same either way — edit, delete, or add something brand new. Photos
            is a little different: you can edit a gallery&rsquo;s title or delete it, but adding a whole new photo
            gallery is still a step Clay does for you.
          </p>
        </StepCard>

        <StepCard number={3} title="Change something that's already there">
          <p>Every album, book, or photo gallery is listed with an Edit button and a Delete button next to it.</p>
          <ul style={{ marginTop: 8 }}>
            <li>
              <strong>Edit</strong>{" "}opens up the fields for that one entry — title, year, links, and so on. Change
              whatever you want, then click <strong>Save</strong>.
            </li>
            <li>
              <strong>Delete</strong>{" "}asks &ldquo;are you sure?&rdquo; first, then removes it completely.
            </li>
          </ul>
          <WhatHappens>
            After you click Save (or confirm Delete), you&rsquo;ll see a &ldquo;✓ Saved&rdquo; message right there
            for a couple of seconds — that&rsquo;s your confirmation it went through, and it tells you which one it
            saved, so you know it grabbed the right entry. The real site takes about a minute to catch up after
            that.
          </WhatHappens>
          <Tip>
            <strong>One thing to watch for:</strong>{" "}wait for that &ldquo;✓ Saved&rdquo; message to actually appear
            before clicking Edit on the next thing. Click too fast — right as one row is collapsing back down — and
            you can end up clicking into the wrong entry by accident.
          </Tip>
        </StepCard>

        <StepCard number={4} title="Add something brand new">
          <p>
            At the top of the Music or Writings page, click <strong>+ Add a release</strong>{" "}or{" "}
            <strong>+ Add a book</strong>. A blank form opens up.
          </p>
          <ol style={{ marginTop: 8 }}>
            <li>
              <strong>Choose a cover photo</strong>{" "}from your computer or phone — click &ldquo;Choose File&rdquo; and
              pick it, same as attaching a photo to an email.
            </li>
            <li>Fill in the title and whatever else applies (year, who it&rsquo;s by, etc.).</li>
            <li>
              <strong>For music only:</strong>{" "}paste in the link(s) to wherever it&rsquo;s streaming (Spotify, Apple
              Music, YouTube, SoundCloud, Pandora) — leave any blank you don&rsquo;t have.
            </li>
            <li>
              Click <strong>Add release</strong>{" "}or <strong>Add book</strong>.
            </li>
          </ol>
          <WhatHappens>
            Your photo uploads and gets automatically resized to fit the site — you don&rsquo;t need to resize
            anything yourself. Same as editing, give it about a minute to show up on the actual site.
          </WhatHappens>
          <Tip>
            <strong>About the music links:</strong>{" "}one streaming link means tapping the cover takes people straight
            to that player. More than one shows a little menu so they can pick which service they use.
          </Tip>
        </StepCard>

        <section style={{ marginTop: 28 }}>
          <h2 style={{ fontSize: 20 }}>If something looks wrong</h2>
          <div style={{ padding: "16px 20px", marginTop: 10, background: "rgba(36, 27, 46, 0.15)" }}>
            <p style={{ margin: 0 }}>
              You can&rsquo;t break anything permanently — every change can be undone. If you&rsquo;re not sure what
              happened, just text or email Clay and he&rsquo;ll sort it out.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}
