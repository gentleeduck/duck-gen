import { PageActions, PageHeader, PageHeaderDescription, PageHeaderHeading } from '@gentleduck/docs/client'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Announcement } from '~/components/announcement'
import { FeaturesSection } from '~/components/layouts/features'
import { SponsorsSection } from '~/components/layouts/sponsors'

const title = 'duck-iam -- Type-safe access control that actually works.'
const description =
  'duck-iam is a unified RBAC + ABAC authorization engine for TypeScript. Define roles, write policies, and protect your app with type-safe middleware.'

export const dynamic = 'force-static'
export const revalidate = false

export const metadata: Metadata = {
  description,
  openGraph: {
    images: [
      {
        url: `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
  title,
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
}

export default function Page() {
  return (
    <>
      <PageHeader className="relative flex flex-col justify-start justify-self-center text-center">
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 z-0 h-16 w-16 rounded-full bg-yellow-400/20 blur-2xl md:h-72 md:w-72"></div>
        <div
          aria-hidden="true"
          className="absolute bottom-16 left-0 z-0 h-36 w-36 rounded-full bg-primary/20 blur-3xl"></div>
        <Announcement />
        <PageHeaderHeading>{title}</PageHeaderHeading>
        <PageHeaderDescription>{description}</PageHeaderDescription>
        <PageActions className="mx-auto w-full justify-center">
          <Link
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm"
            href="/docs">
            Get Started
          </Link>
          <Link
            className="inline-flex items-center justify-center rounded-md border px-4 py-2 font-medium text-sm hover:bg-muted"
            href="/docs/core">
            Core Concepts
          </Link>
        </PageActions>
      </PageHeader>
      <div className="container-wrapper">
        <div className="">
          <FeaturesSection />
          <SponsorsSection />
        </div>
      </div>
    </>
  )
}
