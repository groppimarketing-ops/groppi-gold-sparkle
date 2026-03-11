/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-imagetools" />

// Allow ?format=webp&quality=N query strings on image imports
declare module '*?format=webp&quality=85' {
  const src: string;
  export default src;
}
declare module '*?format=webp' {
  const src: string;
  export default src;
}
