import Image from "next/image";
import Link from "next/link";
import collections from "../../data/photo-collections.json";
import { StrayPhotos } from "../../components/StrayPhotos";

export default function PhotosPage() {
  return (
    <main>
      <section className="wrap" style={{ paddingTop: 16, textAlign: "center" }}>
        <div style={{ textAlign: "left" }}>
          <Link href="/" className="mono" style={{ fontSize: 12 }}>
            ← Home
          </Link>
        </div>
        <h1 style={{ fontSize: 44, marginTop: 12, color: "var(--accent)", textShadow: "3px 3px 0 var(--ink)" }}>
          Photos
        </h1>
      </section>

      <section className="wrap" style={{ paddingTop: 24, paddingBottom: 24 }}>
        <StrayPhotos />
      </section>

      <section className="wrap section" style={{ paddingTop: 0 }}>
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
