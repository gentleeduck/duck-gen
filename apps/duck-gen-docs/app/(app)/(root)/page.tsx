import { PageActions, PageHeader, PageHeaderDescription } from '@gentleduck/docs/client'
import { DuckLazyComponent } from '@gentleduck/lazy/lazy-component'
import { Button } from '@gentleduck/registry-ui/button'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Announcement } from '~/components/announcement'
import { EcosystemSection } from '~/components/layouts/core-packages'
import { FeaturesSection } from '~/components/layouts/features'

const title = 'Duck Gen — Contracts that compile, APIs that stay in sync.'
const description =
  'Duck Gen is a general-purpose compiler extension that scans controllers and message tags to keep your API and i18n types aligned'

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
        <div aria-hidden="true" className="pointer-events-none absolute -top-40 -right-40 z-0 h-[14rem] w-[14rem] rounded-full bg-gradient-to-br from-yellow-400/15 to-orange-400/10 blur-[100px] md:h-[20rem] md:w-[20rem]"></div>
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-36 -left-40 z-0 h-[12rem] w-[12rem] rounded-full bg-gradient-to-tr from-primary/12 to-sky-400/8 blur-[90px] md:h-[18rem] md:w-[18rem]"></div>
        <div aria-hidden="true" className="pointer-events-none absolute -top-48 left-1/2 z-0 h-[10rem] w-[10rem] -translate-x-1/2 rounded-full bg-gradient-to-b from-violet-500/8 to-fuchsia-400/5 blur-[110px] md:h-[16rem] md:w-[16rem]"></div>
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -bottom-32 z-0 h-[8rem] w-[8rem] rounded-full bg-gradient-to-tl from-rose-400/6 to-pink-300/4 blur-[80px] md:h-[14rem] md:w-[14rem]"></div>
        <Announcement />
        <div className="relative">
          <h1 className="inline-block max-w-6xl font-bold leading-none tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <div className="relative mb-3 text-center text-4xl sm:text-5xl md:mb-5 md:text-6xl">
              <span className="inline-block">DUCK GEN</span>
            </div>
            <div className="mt-1 block text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="relative inline-block -rotate-3 bg-primary px-4 py-1 text-primary-foreground">
                COMPILE-TIME
              </span>
              <span className="ml-2 inline-block text-foreground uppercase">CONTRACTS</span>
            </div>
          </h1>
        </div>
        <PageHeaderDescription>{description}</PageHeaderDescription>
        <PageActions className="mx-auto w-full justify-center">
          <Button>
            <Link href="/docs/duck-gen">Get Started</Link>
          </Button>
          <Button variant="ghost">
            <Link href="/docs/duck-gen/api-routes">API Routes</Link>
          </Button>
        </PageActions>
      </PageHeader>
      <div className="container-wrapper">
        <div>
          <FeaturesSection />
          <DuckLazyComponent options={{ rootMargin: '-50px 0px 0px 0px', threshold: 0 }}>
            <EcosystemSection />
          </DuckLazyComponent>
        </div>
      </div>
    </>
  )
}
