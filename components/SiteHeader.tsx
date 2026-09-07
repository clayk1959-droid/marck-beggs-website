"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/music", label: "Music" },
  { href: "/books", label: "Writings" },
  { href: "/books/arkansas-literary-forum", label: "ALF", title: "Arkansas Literary Forum (archive)" },
  { href: "/photos", label: "Photos" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(event: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  return (
    <header className="site-header">
      <div className="wrap site-header-inner">
        <div className="nav-toggle-wrap" ref={wrapRef}>
          <button
            type="button"
            className="nav-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
          {open && (
            <nav className="nav-menu" aria-label="Main navigation">
              {NAV_ITEMS.map((item) => (
                <Link key={item.href} href={item.href} title={item.title} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
        <div className="brand-block">
          <Link href="/" className="brand" aria-label="Marck Beggs, home">
            Marck Beggs
          </Link>
          <p className="site-tagline">MarckBeggs.com</p>
        </div>
      </div>
    </header>
  );
}
