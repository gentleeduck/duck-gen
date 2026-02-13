import { absoluteUrl } from '@gentleduck/docs/lib'

export const siteConfig = {
  description:
    '@gentleduck/gen is a general-purpose compiler extension that generates type-safe API routes and message keys across frameworks. It is currently being tested with NestJS to validate the workflow.',
  githubRepo: '',
  links: {
    github: 'https://github.com/gentleeduck/duck-gen',
    twitter: 'https://x.com/wild_ducka',
    email: 'support@gentleduck.org',
  },
  name: 'gentleduck/gen',
  ogImage: absoluteUrl('/og/root.png'),
  title: 'duck gen — general-purpose compiler extension',
  url: absoluteUrl('/'),
}

export type SiteConfig = typeof siteConfig

export const META_THEME_COLORS = {
  dark: '#09090b',
  light: '#ffffff',
}
