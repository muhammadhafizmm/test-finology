export function createMapUrl(lat: string, lng: string): string {
  const lt = Number.parseFloat(lat);
  const lg = Number.parseFloat(lng);
  return Number.isFinite(lt) && Number.isFinite(lg)
    ? `https://www.google.com/maps?q=${lt},${lg}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${lat}, ${lng}`
      )}`;
}
