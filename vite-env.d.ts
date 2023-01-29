interface ImportMetaEnv {
  readonly VITE_BOX_ID: string;
  readonly VITE_BOX_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
