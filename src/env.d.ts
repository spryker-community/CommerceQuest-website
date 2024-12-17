/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly VANILLA_API_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
