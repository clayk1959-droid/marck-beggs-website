export type StreamingService = "spotify" | "apple" | "youtube" | "pandora" | "soundcloud";

export const SERVICE_LABELS: Record<StreamingService, string> = {
  spotify: "Spotify",
  apple: "Apple Music",
  youtube: "YouTube",
  pandora: "Pandora",
  soundcloud: "SoundCloud",
};

// Spotify, Apple Music, YouTube, and SoundCloud all support real embeddable
// players via a simple URL transform of their normal share link -- no API
// key or extra data entry needed. Pandora has no public embed format at
// all, so it always opens in a new tab instead of playing in-page.
export function getEmbedUrl(service: StreamingService, url: string): string | null {
  if (!url) return null;
  try {
    if (service === "spotify") {
      const match = url.match(/open\.spotify\.com\/(album|track|playlist)\/([a-zA-Z0-9]+)/);
      return match ? `https://open.spotify.com/embed/${match[1]}/${match[2]}` : null;
    }
    if (service === "apple") {
      return url.includes("music.apple.com") ? url.replace("music.apple.com", "embed.music.apple.com") : null;
    }
    if (service === "youtube") {
      const list = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
      if (list) return `https://www.youtube.com/embed/videoseries?list=${list[1]}`;
      const video = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{6,})/);
      return video ? `https://www.youtube.com/embed/${video[1]}` : null;
    }
    if (service === "soundcloud") {
      return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&auto_play=false&color=%23241b2e`;
    }
    return null;
  } catch {
    return null;
  }
}
