import links from "../../data/links.json";

export default function ContactPage() {
  return (
    <main>
      <section className="wrap" style={{ paddingTop: 40, textAlign: "center" }}>
        <span className="eyebrow" style={{ transform: "rotate(-2deg)", display: "inline-block" }}>
          get in touch
        </span>
        <h1 style={{ fontSize: 44, marginTop: 16, color: "var(--accent)", textShadow: "3px 3px 0 var(--ink)" }}>
          Contact
        </h1>
      </section>

      <section className="wrap section" style={{ textAlign: "center" }}>
        <a
          href={`mailto:${links.email}`}
          className="btn"
          style={{
            background: "var(--card)",
            color: "var(--ink)",
            display: "inline-flex",
            fontSize: 16,
            padding: "16px 28px",
          }}
        >
          {links.email}
        </a>
      </section>
    </main>
  );
}
