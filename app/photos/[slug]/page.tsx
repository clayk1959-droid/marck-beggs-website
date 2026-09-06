import { notFound } from "next/navigation";
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
      <section className="wrap" style={{ paddingTop: 40, textAlign: "center" }}>
        <span className="eyebrow" style={{ transform: "rotate(-2deg)", display: "inline-block" }}>
          photos
        </span>
        <h1 style={{ fontSize: 38, marginTop: 16, color: "var(--accent)", textShadow: "3px 3px 0 var(--ink)" }}>
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
