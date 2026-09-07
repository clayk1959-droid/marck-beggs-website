import { notFound } from "next/navigation";
import Link from "next/link";
import collections from "../../../data/photo-collections.json";
import { PhotoGallery } from "../../../components/PhotoGallery";

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export default async function PhotoCollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = collections.find((item) => item.slug === slug);
  if (!collection) notFound();

  return (
    <main>
      <section className="wrap" style={{ paddingTop: 16, textAlign: "center" }}>
        <div style={{ textAlign: "left" }}>
          <Link href="/photos" className="mono" style={{ fontSize: 12 }}>
            ← Photos
          </Link>
        </div>
        <h1 style={{ fontSize: 38, marginTop: 12, color: "var(--ink)" }}>
          {collection.title}
        </h1>
        <p className="mono" style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 8 }}>
          {collection.subtitle}
        </p>
      </section>

      <section className="wrap section">
        <PhotoGallery slug={collection.slug} title={collection.title} photos={collection.photos} />
      </section>
    </main>
  );
}
