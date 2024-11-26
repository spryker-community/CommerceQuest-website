import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
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

// https://astro.build/config
export default defineConfig({
  site: "https://commercequest.space",
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },
  prefetch: true,
  integrations: [
    icon({
      include: {
        mdi: ["linkedin", "github"],
      },
    }),
    tailwind(),
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
      defaultLocale: "root",
      locales: {
        root: {
          label: "English",
          lang: "en"
        }
      },
      lastUpdated: true,
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
      social: {
        github: "https://github.com/spryker-community"
      },
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
          content: "https://commercequest.space/social.webp"
        }
      }, {
        tag: "meta",
        attrs: {
          property: "twitter:image",
          content: "https://commercequest.space/social.webp"
        }
      }]
    }),
    compressor({
      gzip: false,
      brotli: true
    }),
    react(),
    markdoc(),
    mdx(),
    keystatic()
  ],
  output: "hybrid",
  experimental: {
    clientPrerender: true,
    directRenderScript: true
  },
  adapter: netlify({
    functionPerRoute: true,
    edgeMiddleware: true  // Enable edge middleware for better API routing
  })
});
