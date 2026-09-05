import Link from "next/link";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/music", label: "Music" },
  { href: "/books", label: "Books" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header
      style={{
        borderBottom: "3px solid var(--ink)",
        background: "var(--bg)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <div
        className="wrap"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          padding: "14px 20px",
        }}
      >
        <Link
          href="/"
          className="mono"
          style={{
            fontWeight: 700,
            fontSize: 15,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
        >
          Marck Beggs
        </Link>
        <nav style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="mono"
              style={{
                fontSize: 12,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                textDecoration: "none",
                border: "2px solid var(--ink)",
                padding: "6px 12px",
                background: "var(--card)",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
