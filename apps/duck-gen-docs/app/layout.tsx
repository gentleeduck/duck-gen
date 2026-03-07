import type { Metadata } from 'next'
import './globals.css'
import '@gentleduck/motion/css'
import { DocsProvider, TailwindIndicator, ThemeProvider } from '@gentleduck/docs/client'
import { cn } from '@gentleduck/libs/cn'
import { DirectionProvider } from '@gentleduck/registry-ui/direction'
import { Toaster } from '@gentleduck/registry-ui/sonner'
import { TooltipProvider } from '@gentleduck/registry-ui/tooltip'
import { KeyProvider } from '@gentleduck/vim/react'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { docsConfig } from '~/config/docs'
import { METADATA } from '~/config/metadata'
import { META_THEME_COLORS, siteConfig } from '~/config/site'
import { docs } from '../.velite'

const docsEntries = docs.map((doc) => {
  const slug = doc.slug.startsWith('/') ? doc.slug : `/${doc.slug}`
  return {
    component: doc.component,
    permalink: slug,
    slug,
    title: doc.title,
    toc: doc.toc,
  }
})

const docsSiteConfig = {
  ...siteConfig,
  metaThemeColors: META_THEME_COLORS,
}

export const metadata: Metadata = {
  ...METADATA,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${GeistSans.variable} ${GeistMono.variable}`} dir="ltr" lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var storedTheme = localStorage.getItem('theme');
                  var theme = storedTheme;

                  if (theme !== 'light' && theme !== 'dark') {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }

                  var root = document.documentElement;
                  root.classList.remove('light', 'dark');
                  root.classList.add(theme);
                  root.style.colorScheme = theme;
                  root.style.backgroundColor = theme === 'dark' ? '#020817' : '#ffffff';
                } catch (_) {}
              })();
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var raw = localStorage.getItem('fontType');
                  var fontType = raw ? JSON.parse(raw) : 'mono';
                  var family = fontType === 'sans'
                    ? 'var(--font-geist-sans, "Geist"), sans-serif'
                    : 'var(--font-geist-mono, "Geist Mono"), monospace';
                  document.documentElement.style.setProperty('font-family', family, 'important');
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={cn('duck min-h-svh bg-background antialiased')}>
        <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange enableColorScheme enableSystem>
          <KeyProvider timeoutMs={100}>
            <TooltipProvider>
              <DirectionProvider dir="ltr">
                <DocsProvider docs={docsEntries} docsConfig={docsConfig} siteConfig={docsSiteConfig}>
                  <div vaul-drawer-wrapper="">
                    <div className="relative flex min-h-svh flex-col bg-background">{children}</div>
                  </div>
                </DocsProvider>
              </DirectionProvider>
              <Toaster />
              {process.env.NODE_ENV === 'development' && <TailwindIndicator />}
            </TooltipProvider>
          </KeyProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
