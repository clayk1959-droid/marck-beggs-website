import sharp from "sharp";
import { mkdir, readdir, copyFile } from "node:fs/promises";
import path from "node:path";

// Same resize rules used on the Carson & Muller photo site's
// sync-gallery.mjs: full-size capped at 3200px long edge (q88 mozjpeg),
// grid thumbnails capped at 750px long edge (q82 mozjpeg) -- 750 covers a
// sharp 2x-retina display at the ~350px CSS width a grid thumbnail ever
// actually renders at.
const root = path.resolve(import.meta.dirname, "..");
const sourceDir = path.join(root, "assets-original", "ireland");
const fullDir = path.join(root, "public", "gallery", "ireland-2004", "full");
const thumbDir = path.join(root, "public", "gallery", "ireland-2004", "thumbs");

await mkdir(fullDir, { recursive: true });
await mkdir(thumbDir, { recursive: true });

function resized(source, resizeOptions) {
  return sharp(source, { unlimited: true }).rotate().resize(resizeOptions).keepIccProfile();
}

const files = (await readdir(sourceDir)).filter((f) => /\.jpe?g$/i.test(f) && f.toLowerCase() !== "postcard.jpg");

for (const file of files) {
  const source = path.join(sourceDir, file);
  const outName = file.toLowerCase();
  await resized(source, { width: 3200, height: 3200, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(fullDir, outName));
  await resized(source, { width: 750, height: 750, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(thumbDir, outName));
  console.log("processed", outName);
}

console.log(`Done: ${files.length} photos`);
