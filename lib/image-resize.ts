import sharp from "sharp";

// Cover images (music/book art) are a single hero-ish image, not a
// full/thumb gallery pair -- one reasonable web size covers every use on
// the site (release grid cards, book covers, modal headers).
const MAX_DIMENSION = 1600;
const JPEG_QUALITY = 85;

export async function resizeCoverImage(buffer: Buffer): Promise<Buffer> {
  return sharp(buffer, { unlimited: true })
    .rotate()
    .resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toBuffer();
}
