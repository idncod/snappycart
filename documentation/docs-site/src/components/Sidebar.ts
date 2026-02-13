import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
    tutorialSidebar: [
        'intro',
        {
            type: 'category',
            label: 'Getting started',
            items: [
                'getting-started/installation',
                'getting-started/quick-start',
                'getting-started/recipes',
            ],
        },
        {
            type: 'category',
            label: 'Core concepts',
            items: [
                'core-concepts/cart-provider',
                'core-concepts/use-cart',
                'core-concepts/items',
                'core-concepts/persistence',
            ],
        },
        {
            type: 'category',
            label: 'UI',
            items: ['ui/cart-drawer', 'ui/cart-icon', 'ui/theming'],
        },
        {
            type: 'category',
            label: 'API reference',
            items: ['api/overview', 'api/cart-provider', 'api/use-cart', 'api/types'],
        },
        {
            type: 'category',
            label: 'Contributing',
            items: [
                'contributing/overview',
                'contributing/your-first-pr',
                'contributing/fork-and-pull-request',
                'contributing/changesets',
                'contributing/conventional-commits',
            ],
        },
        'roadmap',
    ],
};

export default sidebars;
