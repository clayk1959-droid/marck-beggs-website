import Image from "next/image";
import Link from "next/link";
import irelandData from "../../data/ireland-2004.json";

const COLLECTIONS = [
  {
    slug: "ireland-2004",
    title: irelandData.title,
    year: irelandData.year,
    cover: `/gallery/ireland-2004/thumbs/${irelandData.cover}.jpg`,
    count: irelandData.groups.reduce((sum, group) => sum + group.photos.length, 0),
  },
];

export default function PhotosPage() {
  return (
    <main>
      <section className="wrap" style={{ paddingTop: 40, textAlign: "center" }}>
        <span className="eyebrow" style={{ transform: "rotate(-2deg)", display: "inline-block" }}>
          photos
        </span>
        <h1 style={{ fontSize: 44, marginTop: 16, color: "var(--accent)", textShadow: "3px 3px 0 var(--ink)" }}>
          Photos
        </h1>
      </section>

      <section className="wrap section">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 20,
          }}
        >
          {COLLECTIONS.map((collection) => (
            <Link
              key={collection.slug}
              href={`/photos/${collection.slug}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="card" style={{ overflow: "hidden" }}>
                <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 5" }}>
                  <Image
                    src={collection.cover}
                    alt={collection.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(min-width: 640px) 300px, 90vw"
                  />
                </div>
              </div>
              <div style={{ marginTop: 10, textAlign: "center" }}>
                <h2 style={{ fontSize: 20 }}>
                  {collection.title}, {collection.year}
                </h2>
                <p className="mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 2 }}>
                  {collection.count} photos
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
