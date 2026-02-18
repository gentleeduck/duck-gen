// src/app/api/me/permissions/route.ts
//
// Returns the current user's permission map.
// The React client fetches this to hydrate <AccessProvider>.

import { getPermissions } from 'access-engine/server/next'
import { engine, STANDARD_CHECKS } from '@/lib/access'
import { getUserIdFromRequest } from '@/lib/auth'

export async function GET(req: Request) {
  const userId = getUserIdFromRequest(req)
  if (!userId) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const permissions = await getPermissions(engine, userId, STANDARD_CHECKS)
  return Response.json(permissions)
}
