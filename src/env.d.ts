/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_ENCRYPTION_KEY: string;
  readonly VITE_USE_RAG_DEFAULT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
