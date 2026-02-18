// src/app/layout.tsx
//
// Root layout: Server Component.
// Generates the permission map on the server and passes it to the client
// via AccessProvider. Every client component under this tree can use
// useAccess() / <Can> / <Cannot> with zero latency.

import type { PermissionMap } from 'access-engine'
import { getPermissions } from 'access-engine/server/next'
import { engine, STANDARD_CHECKS } from '@/lib/access'
import { AccessProvider } from '@/lib/access-client'
import { getCurrentUserId } from '@/lib/auth'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // ── Generate permissions on the server ──
  let permissions: PermissionMap = {}

  const userId = await getCurrentUserId()
  if (userId) {
    permissions = await getPermissions(engine, userId, STANDARD_CHECKS)
  }

  return (
    <html lang="en">
      <body>
        {/* Hydrate client with permissions */}
        <AccessProvider permissions={permissions}>{children}</AccessProvider>
      </body>
    </html>
  )
}
