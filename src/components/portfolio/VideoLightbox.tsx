import { useEffect } from "react";
import { X } from "lucide-react";
import { UploadSlot } from "./UploadSlot";
import { StreamableEmbed } from "./StreamableEmbed";
import type { DeviceVariant } from "./DeviceFrame";

export function VideoLightbox({
  open,
  onClose,
  title,
  embedUrl,
  device,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  embedUrl?: string;
  device?: DeviceVariant;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(5,5,16,0.85)] backdrop-blur-md p-6 animate-fade-up"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "fade-up 0.35s ease-out both" }}
      >
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute -top-12 right-0 text-text-dim hover:text-neon-cyan"
        >
          <X size={28} />
        </button>
        {embedUrl ? (
          <StreamableEmbed src={embedUrl} title={title} aspect="16/9" device={device} />
        ) : (
          <UploadSlot
            kind="VIDEO"
            label={title}
            note="Replace this placeholder with the actual MP4 source."
            aspect="16/9"
          />
        )}
      </div>
    </div>
  );
}
