// Adds a new photo collection: resizes originals from a source folder into
// public/gallery/<slug>/full and .../thumbs, and appends the matching entry
// to data/photo-collections.json. Same resize rules as the Carson & Muller
// photo site's scripts/sync-gallery.mjs (which this project doesn't need a
// full copy of -- galleries here are added one at a time, by hand, not
// synced from a standing folder structure).
//
// Run with: node scripts/add-gallery-collection.mjs "<Title>" "<source folder>"
//
// The source folder should hold the original JPEGs for this collection.
// The first photo (alphabetically) becomes the cover unless you edit the
// generated data/photo-collections.json entry afterward.

import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const [, , titleArg, sourceDirArg] = process.argv;

if (!titleArg || !sourceDirArg) {
  console.error('Usage: node scripts/add-gallery-collection.mjs "<Title>" "<source folder>"');
  process.exit(1);
}

const root = process.cwd();
const sourceDir = path.resolve(sourceDirArg);
const slug = titleArg
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

const fullDir = path.join(root, "public", "gallery", slug, "full");
const thumbDir = path.join(root, "public", "gallery", slug, "thumbs");
const dataPath = path.join(root, "data", "photo-collections.json");

const collections = JSON.parse(await readFile(dataPath, "utf-8"));
if (collections.some((c) => c.slug === slug)) {
  console.error(`A collection with slug "${slug}" already exists in data/photo-collections.json.`);
  process.exit(1);
}

await mkdir(fullDir, { recursive: true });
await mkdir(thumbDir, { recursive: true });

function resized(source, resizeOptions) {
  return sharp(source, { unlimited: true }).rotate().resize(resizeOptions).keepIccProfile();
}

const files = (await readdir(sourceDir)).filter((f) => /\.jpe?g$/i.test(f)).sort();
if (files.length === 0) {
  console.error(`No .jpg/.jpeg files found in ${sourceDir}`);
  process.exit(1);
}

const photoIds = [];
for (const file of files) {
  const source = path.join(sourceDir, file);
  const outName = file.toLowerCase();
  const photoId = outName.replace(/\.jpe?g$/i, "");
  await resized(source, { width: 3200, height: 3200, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(fullDir, outName));
  await resized(source, { width: 750, height: 750, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(thumbDir, outName));
  photoIds.push(photoId);
  console.log("processed", outName);
}

collections.push({
  slug,
  title: titleArg,
  subtitle: "",
  cover: photoIds[0],
  photos: photoIds,
});
await writeFile(dataPath, JSON.stringify(collections, null, 2) + "\n");

console.log(`\nDone: ${files.length} photos added as "${slug}".`);
console.log(`Edit data/photo-collections.json to set a subtitle or reorder/change the cover, then:`);
console.log(`  git add public/gallery/${slug} data/photo-collections.json`);
console.log(`  git commit -m "Add ${titleArg} photo collection"`);
console.log(`  git push`);
