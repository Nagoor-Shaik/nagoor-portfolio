import type { ReactNode } from "react";

export type DeviceVariant = "macbook" | "iphone" | "watch";

/**
 * Wraps a video/iframe in a realistic device mockup frame.
 * The child should be an absolutely-positioned element (e.g. an iframe with
 * `width="100%" height="100%"`) — the frame supplies the aspect-ratio box.
 */
export function DeviceFrame({
  variant,
  children,
}: {
  variant: DeviceVariant;
  children: ReactNode;
}) {
  if (variant === "macbook") {
    return (
      <div className="macbook-frame">
        <div className="macbook-top-bar">
          <div className="macbook-camera" />
        </div>
        <div className="macbook-screen">{children}</div>
        <div className="macbook-chin" />
        <div className="macbook-base" />
      </div>
    );
  }

  if (variant === "iphone") {
    return (
      <div className="iphone-frame">
        <div className="iphone-dynamic-island" />
        <div className="iphone-screen">{children}</div>
        <div className="iphone-home-bar" />
      </div>
    );
  }

  // watch
  return (
    <div className="watch-frame">
      <div className="watch-band-top" />
      <div className="watch-case">
        <div className="watch-screen">{children}</div>
        <div className="watch-crown" />
        <div className="watch-button" />
      </div>
      <div className="watch-band-bottom" />
    </div>
  );
}
