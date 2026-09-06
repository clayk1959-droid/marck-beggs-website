import Image from "next/image";
import Link from "next/link";
import collections from "../../data/photo-collections.json";

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
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: 20,
          }}
        >
          {collections.map((collection) => (
            <Link
              key={collection.slug}
              href={`/photos/${collection.slug}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="card" style={{ overflow: "hidden" }}>
                <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 5" }}>
                  <Image
                    src={`/gallery/${collection.slug}/thumbs/${collection.cover}.jpg`}
                    alt={collection.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(min-width: 640px) 220px, 45vw"
                  />
                </div>
              </div>
              <div style={{ marginTop: 10, textAlign: "center" }}>
                <h2 style={{ fontSize: 17 }}>{collection.title}</h2>
                <p className="mono" style={{ fontSize: 10.5, color: "var(--ink-soft)", marginTop: 2 }}>
                  {collection.photos.length} photos
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
