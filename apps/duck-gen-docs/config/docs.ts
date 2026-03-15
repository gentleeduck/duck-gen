import type { DocsConfig } from '@gentleduck/docs/context'

export const docsConfig = {
  chartsNav: [],
  mainNav: [
    {
      href: '/docs',
      title: 'Documentation',
    },
  ],
  sidebarNav: [
    {
      collapsible: false,
      items: [
        {
          href: '/docs',
          title: 'Introduction',
        },
        {
          href: '/docs/installation',
          title: 'Installation',
        },
        {
          href: '/docs/guides',
          title: 'End-to-End Guide',
        },
        {
          href: '/docs/templates',
          title: 'Templates',
        },
        {
          href: '/docs/faqs',
          title: 'FAQs',
        },
        {
          href: '/docs/whoiam',
          title: 'whoiam',
        },
        {
          href: '/docs/skills',
          title: 'Agent Skills',
        },
        {
          href: '/docs/changelog',
          title: 'Changelog',
        },
      ],
      title: 'Getting Started',
    },
    {
      collapsible: false,
      items: [
        {
          href: '/docs/course',
          title: 'Course Overview',
        },
        {
          href: '/docs/course/the-problem',
          title: '1. The Problem',
        },
        {
          href: '/docs/course/project-setup',
          title: '2. Project Setup',
        },
        {
          href: '/docs/course/first-controller',
          title: '3. Your First Controller',
        },
        {
          href: '/docs/course/generating-types',
          title: '4. Generating Types',
        },
        {
          href: '/docs/course/using-generated-types',
          title: '5. Using Generated Types',
        },
        {
          href: '/docs/course/message-keys',
          title: '6. Message Keys',
        },
        {
          href: '/docs/course/duck-query-client',
          title: '7. Duck Query Client',
        },
        {
          href: '/docs/course/real-world-patterns',
          title: '8. Real World Patterns',
        },
      ],
      title: 'Course',
    },
    {
      collapsible: false,
      items: [
        {
          href: '/docs/duck-gen',
          title: 'Overview',
        },
        {
          href: '/docs/duck-gen/configuration',
          title: 'Configuration',
        },
        {
          href: '/docs/duck-gen/api-routes',
          title: 'API Routes',
        },
        {
          href: '/docs/duck-gen/messages',
          title: 'Messages',
        },
        {
          href: '/docs/duck-gen/generated-types',
          title: 'Generated Types',
        },
      ],
      title: 'Duck Gen',
    },
    {
      collapsible: false,
      items: [
        {
          href: '/docs/duck-query',
          title: 'Overview',
        },
        {
          href: '/docs/duck-query/client-methods',
          title: 'Client Methods',
        },
        {
          href: '/docs/duck-query/types',
          title: 'Types',
        },
        {
          href: '/docs/duck-query/advanced',
          title: 'Advanced',
        },
      ],
      title: 'Duck Query',
    },
  ],
} satisfies DocsConfig

type NavItem = {
  title: string
  href?: string
  label?: string
  items?: NavItem[]
}

function extractTitles(navItems: NavItem[]): string[] {
  const titles: string[] = []

  for (const item of navItems) {
    if (item.title) {
      titles.push(item.title)
    }

    if (item.items && item.items.length > 0) {
      titles.push(...extractTitles(item.items))
    }
  }

  return titles
}

export const allTitles = [
  ...extractTitles(docsConfig.mainNav),
  ...extractTitles(docsConfig.sidebarNav),
  ...extractTitles(docsConfig.chartsNav),
]
