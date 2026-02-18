import { absoluteUrl } from '@gentleduck/docs/lib'

export const siteConfig = {
  description:
    'duck-iam is a type-safe RBAC + ABAC access control engine for TypeScript. Framework-agnostic core with integrations for Express, NestJS, Hono, Next.js, React, and Vue.',
  githubRepo: '',
  links: {
    github: 'https://github.com/gentleeduck/duck-iam',
    twitter: 'https://x.com/wild_ducka',
    email: 'support@gentleduck.org',
  },
  name: 'duck-iam',
  ogImage: absoluteUrl('/og/root.png'),
  title: 'duck-iam -- type-safe access control for TypeScript',
  url: absoluteUrl('/'),
}

export type SiteConfig = typeof siteConfig

export const META_THEME_COLORS = {
  dark: '#09090b',
  light: '#ffffff',
}
