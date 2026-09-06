export type PhotoGroup = { place: string; photos: string[] };

export type Photo = { basename: string; place: string; index: number };

export function flattenGroups(groups: PhotoGroup[]): Photo[] {
  const flat: Photo[] = [];
  for (const group of groups) {
    for (const basename of group.photos) {
      flat.push({ basename, place: group.place, index: flat.length });
    }
  }
  return flat;
}
