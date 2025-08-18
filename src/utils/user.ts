export function getUserInitial(name: string): string {
  if (!name) return "";
  const parts = name.split(" ");
  return parts.length > 1 ? parts[0][0] + parts[1][0] : parts[0][0];
}
