// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

let ACCESS_KEY = process.env.CLOSEVECTOR_ACCESS_KEY;
let SECRET = process.env.CLOSEVECTOR_SECRET;
let CLOSEVECTOR_FILE_ID = process.env.CLOSEVECTOR_FILE_ID;

const dotenv = require('dotenv');
dotenv.config();
dotenv.config({
    path: './.env.local',
    override: true
});

if (!ACCESS_KEY) {
    ACCESS_KEY = process.env.CLOSEVECTOR_ACCESS_KEY;
}
if (!SECRET) {
    SECRET = process.env.CLOSEVECTOR_SECRET;
}
if (!CLOSEVECTOR_FILE_ID) {
    CLOSEVECTOR_FILE_ID = process.env.CLOSEVECTOR_FILE_ID;
}

if (!ACCESS_KEY || !SECRET || !CLOSEVECTOR_FILE_ID) {
    console.error('Missing CloseVector credentials. Please set the following environment variables:');
    console.error('CLOSEVECTOR_ACCESS_KEY');
    console.error('CLOSEVECTOR_SECRET');
    console.error('CLOSEVECTOR_FILE_ID');
    process.exit(1);
}
    
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {

    title: 'CloseVector',
    tagline: 'A lightweight vector database',
    favicon: 'img/favicon.ico',

    customFields: {
        CLOSEVECTOR_ACCESS_KEY: process.env.CLOSEVECTOR_ACCESS_KEY,
        CLOSEVECTOR_SECRET: process.env.CLOSEVECTOR_SECRET,
        CLOSEVECTOR_FILE_ID: process.env.CLOSEVECTOR_FILE_ID
    },

    stylesheets: [
      'https://unpkg.com/react-cmdk@1.3.9/dist/cmdk.css',
    ],

    // Set the production url of your site here
    url: 'https://closevector-docs.getmegaportal.com/',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'facebook', // Usually your GitHub org/user name.
    projectName: 'docusaurus', // Usually your repo name.

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
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
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/MegaPortal/closevector-doc/tree/main',
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/MegaPortal/closevector-doc/tree/main',
                },
                theme: {
                    customCss: [
                      require.resolve('./src/css/custom.css')
                    ],
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            // Replace with your project's social card
            image: 'img/docusaurus-social-card.jpg',
            navbar: {
                title: 'CloseVector',
                logo: {
                    alt: 'CloseVector Logo',
                    src: 'img/logo.svg',
                },
                items: [
                    {
                        type: 'docSidebar',
                        sidebarId: 'tutorialSidebar',
                        position: 'left',
                        label: 'Docs',
                    },
                    { to: '/blog', label: 'Blog', position: 'left' },
                    {
                        href: 'https://closevector.getmegaportal.com',
                        label: 'Get Started',
                        position: 'right',
                    },
                    {
                        href: 'https://www.getmegaportal.com',
                        label: 'MegaPortal',
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
                                label: 'Intro',
                                to: '/docs/intro',
                            },
                            {
                                label: 'API',
                                to: '/docs/category/api',
                            },
                        ],
                    },
                    {
                        title: 'More',
                        items: [
                            {
                                label: 'Blog',
                                to: '/blog',
                            },
                            {
                                label: 'MegaPortal',
                                href: 'https://www.getmegaportal.com',
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} MegaPortal, Inc. Built with Docusaurus.`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
            colorMode: {
                disableSwitch: true,
                respectPrefersColorScheme: true
            }
        }),
};

module.exports = config;
