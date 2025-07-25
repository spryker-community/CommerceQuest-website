import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import compressor from "astro-compressor";
import starlight from "@astrojs/starlight";
import { fileURLToPath } from 'node:url';
import mdx from '@astrojs/mdx';
import netlify from "@astrojs/netlify";
import icon from "astro-icon";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from '@keystatic/astro'
import pagefind from "astro-pagefind";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // https://docs.astro.build/en/guides/images/#authorizing-remote-images
  site: "https://commercequest.space/",
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
    routing: {
      prefixDefaultLocale: false
    }
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },
  prefetch: true,
  // Add environment variables that should be exposed to the client
  vite: {
    plugins: [
      tailwindcss(),
    ],
    server: {
      watch: {
        usePolling: true
      }
    },
    resolve: {
      alias: [{
        find: /^.*\/Page\.astro$/,
        replacement: fileURLToPath(new URL('./src/components/ui/starlight/Page.astro', import.meta.url))
      }]
    },
    // Expose environment variables to the client
    envPrefix: ['PUBLIC_', 'VANILLA_']
  },
  integrations: [
    icon({
      include: {
        mdi: ["linkedin", "github"],  // Add any other icon names you need
      },
    }),
    sitemap(),
    starlight({
      title: "CommerceQuest Docs",
      editLink: {
        baseUrl: 'https://github.com/spryker-community/spryker-community.github.io/edit/main'
      },
      logo: {
        src: './src/images/starlight/CQ_logo.svg',
        replacesTitle: true
      },
      lastUpdated: true,
      // https://starlight.astro.build/guides/sidebar/
      sidebar: [{
        label: "Community Guides",
        autogenerate: {
          directory: "guides"
        }
      }, {
        label: "Community Projects",
        autogenerate: {
          directory: "tools"
        }
      }, {
        label: "Contributing",
        autogenerate: {
          directory: "contributing"
        }
      }, {
        label: "Event Blueprints",
        autogenerate: {
          directory: "events"
        }
      }, {
        label: "Other Resources",
        autogenerate: {
          directory: "other"
        }
      }],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/spryker-community' },
      ],
      disable404Route: true,
      customCss: ["./src/assets/styles/starlight.css"],
      favicon: "/favicon.ico",
      components: {
        SiteTitle: "./src/components/ui/starlight/SiteTitle.astro",
        Head: "./src/components/ui/starlight/Head.astro",
        Page: "./src/components/ui/starlight/Page.astro"
      },
      head: [{
        tag: "meta",
        attrs: {
          property: "og:image",
          content: "https://commercequest.space/" + "/social.webp"
        }
      }, {
        tag: "meta",
        attrs: {
          property: "twitter:image",
          content: "https://commercequest.space/" + "/social.webp"
        }
      }]
    }),
    compressor({
      gzip: false,
      brotli: true
    }),
    mdx(),
    react(),
    markdoc(),
    pagefind(),
    keystatic()
  ],
  output: "static",
  experimental: {
    clientPrerender: true,
  },
  adapter: netlify(),
  image: {
    remotePatterns: [{
      protocol: 'https',
      hostname: '**.spryker.com',
    }],
  },
});
