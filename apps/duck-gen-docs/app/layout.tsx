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
                  var presetKey = 'fontPresetV6';
                  var defaultPreset = 'mono-normal';
                  var allowed = {
                    'mono-italic': true,
                    'mono-normal': true,
                    'sans-normal': true,
                    'sans-italic': true,
                    'serif-normal': true,
                    'serif-italic': true
                  };
                  var rawPreset = localStorage.getItem(presetKey);
                  var preset = rawPreset ? JSON.parse(rawPreset) : null;
                  if (!preset) {
                    var rawV5Preset = localStorage.getItem('fontPresetV5');
                    var v5Preset = rawV5Preset ? JSON.parse(rawV5Preset) : null;
                    if (allowed[v5Preset]) {
                      preset = String(v5Preset).replace('-italic', '-normal');
                    } else {
                    var rawV2Preset = localStorage.getItem('fontPresetV2');
                    var v2Preset = rawV2Preset ? JSON.parse(rawV2Preset) : null;
                    if (allowed[v2Preset] && v2Preset.indexOf('mono-') === 0) {
                      preset = v2Preset;
                    } else {
                      var rawOldPreset = localStorage.getItem('fontPreset');
                      var oldPreset = rawOldPreset ? JSON.parse(rawOldPreset) : null;
                      if (allowed[oldPreset] && oldPreset.indexOf('mono-') === 0) {
                        preset = oldPreset;
                      } else {
                        var rawLegacy = localStorage.getItem('fontType');
                        var legacyType = rawLegacy ? JSON.parse(rawLegacy) : null;
                        preset = legacyType === 'mono' ? 'mono-normal' : defaultPreset;
                      }
                    }
                    }
                  }

                  if (!allowed[preset]) {
                    preset = defaultPreset;
                  }

                  if (!rawPreset) {
                    localStorage.setItem(presetKey, JSON.stringify(preset));
                  }

                  document.documentElement.setAttribute('data-font-preset', preset);

                  var family = '';
                  var familyVar = '--font-mono-font';
                  if (preset.indexOf('sans-') === 0) {
                    family = 'var(--font-sans-font, "Inter"), ui-sans-serif, system-ui, sans-serif';
                    familyVar = '--font-sans-font';
                  } else if (preset.indexOf('serif-') === 0) {
                    family = 'var(--font-serif-font, "Inria Serif"), Georgia, "Times New Roman", serif';
                    familyVar = '--font-serif-font';
                  } else {
                    family = 'var(--font-mono-font, "JetBrains Mono Nerd Font Mono"), "JetBrains Mono Nerd Font", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';
                  }
                  var style = preset.indexOf('-italic') > -1 ? 'italic' : 'normal';
                  var warmUpFont = function () {
                    if (!document.fonts || !document.fonts.load) return;
                    try {
                      var computed = getComputedStyle(document.documentElement);
                      var familyToken = computed.getPropertyValue(familyVar).trim();
                      if (!familyToken) return;
                      var stylePrefix = style === 'italic' ? 'italic ' : '';
                      document.fonts.load(stylePrefix + '400 1em ' + familyToken).catch(function(){});
                      document.fonts.load(stylePrefix + '500 1em ' + familyToken).catch(function(){});
                      document.fonts.load(stylePrefix + '700 1em ' + familyToken).catch(function(){});
                    } catch (e) {}
                  };
                  var applyPresetStyles = function () {
                    document.documentElement.setAttribute('data-font-preset', preset);
                    document.documentElement.style.setProperty('--duck-font-family', family);
                    document.documentElement.style.setProperty('--font-sans', family);
                    document.documentElement.style.setProperty('--font-mono', family);
                    document.documentElement.style.setProperty('font-family', family, 'important');
                    document.documentElement.style.setProperty('font-style', style, 'important');
                    if (document.body) {
                      document.body.style.setProperty('font-family', family, 'important');
                      document.body.style.setProperty('font-style', style, 'important');
                    }
                    warmUpFont();
                  };
                  applyPresetStyles();
                  if (!document.body) {
                    document.addEventListener('DOMContentLoaded', applyPresetStyles, { once: true });
                  }
                  document.documentElement.style.setProperty('--duck-font-style', style);
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
