export function toAssetUrl(path: string) {
  if (!path) return path;
  if (path.includes("/profile.jpeg") || path.startsWith("/assets/")) {
    return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
  }
  // already absolute
  if (path.startsWith("http://") || path.startsWith("https://")) return path;

  // local public asset (Vite public/)
  // You can add more filenames here if you want
  if (path === "/noImage.jpg" || path.startsWith("/assets/")) {
    return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
  }

  // default: treat as API-served file
  return `${import.meta.env.VITE_API_BASE_URL}${path}`;
}
