// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import fs from 'fs';
import path from 'path';
import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

function sitemapHtmlPlugin(context, options) {
  const { siteConfig } = context;
  return {
    name: 'docusaurus-plugin-human-readable-sitemap',
    async postBuild({ outDir, routesPaths }) {
      if (!routesPaths) {
        return;
      }

      const baseUrl = siteConfig.baseUrl ?? '/';
      const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
      const normalizedSiteUrl = siteConfig.url.replace(/\/+$/, '');
      const siteRootUrl = `${normalizedSiteUrl}${normalizedBaseUrl}`;
      const routes = Array.from(
        new Set(
          routesPaths.filter(
            (routePath) => routePath !== '/404' && routePath !== '/404.html',
          ),
        ),
      ).sort((a, b) => a.localeCompare(b));

      const items = routes
        .map((routePath) => {
          const url = routePath === '/' ? `${siteRootUrl}/` : `${siteRootUrl}${routePath}`;
          return `          <li><a href="${url}">${url}</a></li>`;
        })
        .join('\n');

      const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sitemap</title>
  </head>
  <body>
    <main>
      <h1>Sitemap</h1>
      <p>This human-readable sitemap is generated from your Docusaurus routes.</p>
      <ul>
${items}
      </ul>
    </main>
  </body>
</html>`;

      await fs.promises.writeFile(path.join(outDir, 'sitemap.html'), html, 'utf8');
    },
  };
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'KERIKOR',
  tagline: 'Learning KERI',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://kordwarshuis.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/KERIKOR/',
  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'kordwarshuis', // Usually your GitHub org/user name.
  projectName: 'KERIKOR', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/kordwarshuis/KERIKOR/tree/main/docs/',
          sidebarCollapsed: false,   // All categories expanded by default
          // sidebarCollapsible: false, // Optional: disable collapsing entirely
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/kordwarshuis/KERIKOR/tree/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        },
      }),
    ],
  ],

  plugins: [
    sitemapHtmlPlugin,
    [
      'docusaurus-lunr-search',
      {
        languages: ['en'],
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'KERIKOR',
        logo: {
          alt: 'KERIKOR Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Start',
          },
          // {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/facebook/docusaurus',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Start',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Sitemap',
            items: [
              {
                label: 'Human-readable Sitemap',
                to: '/sitemap',
              },
            ],
          },
          // {
          //   title: 'Community',
          //   items: [
          //     {
          //       label: 'Stack Overflow',
          //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
          //     },
          //     {
          //       label: 'Discord',
          //       href: 'https://discordapp.com/invite/docusaurus',
          //     },
          //     {
          //       label: 'X',
          //       href: 'https://x.com/docusaurus',
          //     },
          //   ],
          // },
          // {
          //   title: 'More',
          //   items: [
          //     {
          //       label: 'Blog',
          //       to: '/blog',
          //     },
          //     {
          //       label: 'GitHub',
          //       href: 'https://github.com/facebook/docusaurus',
          //     },
          //   ],
          // },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
