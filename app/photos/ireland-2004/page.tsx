import irelandData from "../../../data/ireland-2004.json";
import { PhotoGallery } from "../../../components/PhotoGallery";

export default function IrelandGalleryPage() {
  return (
    <main>
      <section className="wrap" style={{ paddingTop: 40, textAlign: "center" }}>
        <span className="eyebrow" style={{ transform: "rotate(-2deg)", display: "inline-block" }}>
          {irelandData.year}
        </span>
        <h1 style={{ fontSize: 40, marginTop: 16, color: "var(--accent)", textShadow: "3px 3px 0 var(--ink)" }}>
          {irelandData.title}
        </h1>
        <p style={{ maxWidth: 420, margin: "16px auto 0", fontWeight: 500 }}>{irelandData.description}</p>
      </section>

      <section className="wrap section">
        <PhotoGallery slug="ireland-2004" groups={irelandData.groups} />
      </section>
    </main>
  );
}
