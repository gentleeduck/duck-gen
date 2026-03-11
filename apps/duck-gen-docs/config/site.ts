import { getSiteUrl, siteUrl } from './site-url'

export const siteConfig = {
  description:
    '@gentleduck/gen is a general-purpose compiler extension that generates type-safe API routes and message keys across frameworks. Currently tested with NestJS.',
  githubRepo: '',
  links: {
    github: 'https://github.com/gentleeduck/duck-gen',
    twitter: 'https://x.com/wild_ducka',
    email: 'support@gentleduck.org',
  },
  name: 'gentleduck/gen',
  ogImage: siteUrl('/og/root.png'),
  title: 'Duck Gen: General-Purpose Compiler Extension',
  url: getSiteUrl(),
}

export type SiteConfig = typeof siteConfig

export const META_THEME_COLORS = {
  dark: '#09090b',
  light: '#ffffff',
}
