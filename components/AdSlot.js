export function AdSlot() {
  return <div className="ad-slot">广告位 · Google AdSense</div>;
}

export function AdScript({ clientId }) {
  if (!clientId) return null;
  const src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
  return <script async src={src} crossOrigin="anonymous"></script>;
}
