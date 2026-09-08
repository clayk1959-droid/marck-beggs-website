"use client";

import { usePathname } from "next/navigation";
import links from "../data/links.json";

export function SiteFooter() {
  const pathname = usePathname();
  const hideEmail = pathname === "/contact";

  return (
    <footer
      style={{
        borderTop: "3px solid var(--ink)",
        background: "var(--header-bg)",
        color: "#000000",
        marginTop: "var(--space-4)",
      }}
    >
      <div
        className="wrap"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "var(--space-5)",
          padding: "24px 20px",
        }}
      >
        <p className="mono footer-text">© {new Date().getFullYear()} Marck Beggs</p>
        {hideEmail ? null : (
          <a href={`mailto:${links.email}`} className="mono footer-text" style={{ textDecoration: "underline" }}>
            {links.email}
          </a>
        )}
      </div>
    </footer>
  );
}
