import Image from "next/image";

type Book = {
  title: string;
  year?: string;
  publisher?: string;
  note?: string;
  cover: string;
  buyUrl?: string;
};

export function BookGrid({ books }: { books: Book[] }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
        gap: 20,
      }}
    >
      {books.map((book) => {
        const hasLink = Boolean(book.buyUrl);
        const Wrapper = hasLink ? "a" : "div";
        return (
          <Wrapper
            key={book.title}
            {...(hasLink ? { href: book.buyUrl, target: "_blank", rel: "noreferrer" } : {})}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="card" style={{ overflow: "hidden", padding: 8 }}>
              <div style={{ position: "relative", width: "100%", aspectRatio: "2 / 3", borderRadius: 8, overflow: "hidden" }}>
                <Image src={book.cover} alt={book.title} fill style={{ objectFit: "cover" }} sizes="(min-width: 640px) 200px, 45vw" />
              </div>
            </div>
            <div style={{ marginTop: 8 }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{book.title}</div>
              <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-soft)" }}>
                {[book.year, book.publisher ?? book.note].filter(Boolean).join(" · ")}
              </div>
              {hasLink ? (
                <div className="mono" style={{ fontSize: 10.5, color: "var(--accent)", marginTop: 2 }}>
                  buy →
                </div>
              ) : (
                <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-soft)", marginTop: 2 }}>
                  link coming soon
                </div>
              )}
            </div>
          </Wrapper>
        );
      })}
    </div>
  );
}
