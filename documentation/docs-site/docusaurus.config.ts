import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Snappycart Docs',
  tagline: 'Headless cart for React with TypeScript and optional UI building blocks',
  favicon: 'img/favicon.ico',

  future: {v4: true},

  url: 'https://snappycart.idncod.com',
  baseUrl: '/',

  organizationName: 'idncod',
  projectName: 'snappycart',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: ['docusaurus-plugin-sass'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
          editUrl: 'https://github.com/idncod/snappycart/edit/master/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Snappycart',
      logo: {
        alt: 'Snappycart',
        src: 'img/snappycart_logo.svg',
        href: '/docs/intro',
      },
      items: [
        {to: '/docs/intro', label: 'Docs', position: 'left'},
        {to: '/docs/api', label: 'API', position: 'left'},
        {to: '/docs/how-to-contribute', label: 'Contributing', position: 'left'},
        {to: '/docs/roadmap', label: 'Roadmap', position: 'left'},

        {
          href: 'https://www.npmjs.com/package/snappycart',
          label: 'npm',
          position: 'right',
        },
        {
          href: 'https://github.com/idncod/snappycart',
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
            {label: 'Get started', to: '/docs/intro'},
            {label: 'API', to: '/docs/api'},
            {label: 'Contributing', to: '/docs/how-to-contribute'},
          ],
        },
        {
          title: 'Project',
          items: [
            {label: 'Issues', href: 'https://github.com/idncod/snappycart/issues'},
            {label: 'Discussions', href: 'https://github.com/idncod/snappycart/discussions'},
            {label: 'Roadmap', to: '/docs/roadmap'},
          ],
        },
        {
          title: 'More',
          items: [
            {label: 'GitHub', href: 'https://github.com/idncod/snappycart'},
            {label: 'npm', href: 'https://www.npmjs.com/package/snappycart'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Snappycart.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
