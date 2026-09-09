import { Libre_Caslon_Display } from "next/font/google";
import Link from "next/link";
import { RotatingCoverBox } from "../../components/RotatingCoverBox";
import musicRotation from "../../data/home-music-rotation.json";
import books from "../../data/books.json";
import styles from "./home-redesign.module.css";

const caslon = Libre_Caslon_Display({
  subsets: ["latin"],
  weight: "400",
});

const writingRotation = [...books.collections, ...books.anthologies].map((book) => ({
  image: book.cover,
  label: book.title,
}));

export default function HomeRedesignPage() {
  return (
    <div className={styles.page}>
      <p className={styles.badge}>Exploratory redesign — not the live homepage</p>

      <section className={styles.hero}>
        <div className={styles.waveLayer + " " + styles.waveBack} aria-hidden>
          <WaveSvg />
        </div>
        <div className={styles.waveLayer + " " + styles.waveMid} aria-hidden>
          <WaveSvg />
        </div>
        <div className={styles.waveLayer + " " + styles.waveFront} aria-hidden>
          <WaveSvg />
        </div>

        <div className={styles.heroContent}>
          <p className={styles.tagline}>Poet · Songwriter</p>
          <h1 className={`${caslon.className} ${styles.heroTitle}`}>Marck L. Beggs</h1>
          <p className={styles.heroLine}>Where the poems learned to sing.</p>
        </div>
      </section>

      <section className={styles.cards}>
        <div className={styles.cardRow}>
          <Link href="/music" className={styles.cardLink}>
            <div className={styles.card}>
              <RotatingCoverBox images={musicRotation} intervalMs={5500} startDelayMs={5500} />
              <span className={styles.cardLabel}>Music</span>
            </div>
          </Link>
          <Link href="/books" className={styles.cardLink}>
            <div className={styles.card}>
              <RotatingCoverBox images={writingRotation} intervalMs={5500} startDelayMs={2750} />
              <span className={styles.cardLabel}>Writings</span>
            </div>
          </Link>
        </div>
      </section>

      <p className={styles.note}>
        A working sketch of a bolder home page — richer earth-and-green palette, an ambient
        wave motif, and a shorter opening line. Nothing here changes the real home page.
      </p>
    </div>
  );
}

function WaveSvg() {
  return (
    <svg viewBox="0 0 800 200" preserveAspectRatio="none" width="100%" height="100%">
      <path
        d="M0,90 C50,40 150,140 200,90 C250,40 350,140 400,90 C450,40 550,140 600,90 C650,40 750,140 800,90 L800,200 L0,200 Z"
        fill="#f3ecda"
      />
    </svg>
  );
}
