const DEFAULT_SITE_URL = 'https://gen.gentleduck.org'

function withProtocol(value: string) {
  return /^https?:\/\//i.test(value) ? value : `https://${value}`
}

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_APP_URL?.trim()

  if (!configured) {
    return DEFAULT_SITE_URL
  }

  return withProtocol(configured).replace(/\/+$/, '')
}

export function siteUrl(path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${getSiteUrl()}${normalizedPath}`
}
