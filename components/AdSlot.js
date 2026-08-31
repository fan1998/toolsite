"use client";

import { useEffect } from "react";

const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
const defaultSlotId = process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID;

export function AdSlot({ slot = defaultSlotId, format = "auto", className = "" }) {
  useEffect(() => {
    if (!clientId || !slot) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ad blockers and delayed consent can prevent initialization. The tool remains usable.
    }
  }, [slot]);

  // Keep review builds clean: no fake ad placeholders before a real publisher/slot ID exists.
  if (!clientId || !slot) return null;

  return (
    <aside className={`ad-slot ${className}`.trim()} aria-label="Advertisement">
      <span className="ad-label">Advertisement</span>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </aside>
  );
}

export function AdScript() {
  if (!clientId) return null;
  const src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
  return <script async src={src} crossOrigin="anonymous" />;
}
