import { DeviceFrame, type DeviceVariant } from "./DeviceFrame";

type Props = {
  /** Full video URL (Streamable or ScreenPal) — or a bare Streamable ID */
  src: string;
  title?: string;
  aspect?: string;
  className?: string;
  /** Wrap the video in a realistic device mockup frame. */
  device?: DeviceVariant;
};

function toEmbedUrl(src: string) {
  // ScreenPal: https://go.screenpal.com/watch/{id}  →  /player/{id}
  const sp = src.match(/screenpal\.com\/(?:watch|player|embed)\/([a-z0-9]+)/i);
  if (sp) {
    return `https://go.screenpal.com/player/${sp[1]}?width=100%25&height=100%25&ff=1&title=0&loop=1&autoplay=1&muted=1`;
  }
  // Streamable
  const st = src.match(/streamable\.com\/(?:e\/)?([a-z0-9]+)/i);
  if (st) return `https://streamable.com/e/${st[1]}?autoplay=1&muted=1&loop=1`;
  if (/^[a-z0-9]+$/i.test(src)) return `https://streamable.com/e/${src}?autoplay=1&muted=1&loop=1`;
  return src;
}

export function StreamableEmbed({
  src,
  title = "Video",
  aspect = "16/9",
  className,
  device,
}: Props) {
  const iframe = (
    <iframe
      src={toEmbedUrl(src)}
      title={title}
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
      loading="lazy"
      className="absolute inset-0 w-full h-full border-0"
    />
  );

  if (device) {
    return <DeviceFrame variant={device}>{iframe}</DeviceFrame>;
  }

  return (
    <div
      className={`relative w-full overflow-hidden rounded-lg bg-black ${className ?? ""}`}
      style={{ aspectRatio: aspect }}
    >
      {iframe}
    </div>
  );
}
