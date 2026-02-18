// src/lib/auth.ts
//
// Replace this with your actual auth (NextAuth, Clerk, Lucia, etc.)
// This is a simplified example that reads user ID from a cookie or header.

import { cookies } from 'next/headers'

export async function getCurrentUserId(): Promise<string | null> {
  // Option 1: From cookie (for web app)
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('session-user-id')
  if (sessionCookie?.value) return sessionCookie.value

  // Option 2: If you're using NextAuth
  // const session = await getServerSession(authOptions);
  // return session?.user?.id ?? null;

  // Option 3: If you're using Clerk
  // const { userId } = auth();
  // return userId;

  return null
}

/**
 * Extract user ID from a Request object (for API routes / middleware).
 */
export function getUserIdFromRequest(req: Request): string | null {
  // Check Authorization header (Bearer token / API key)
  const authHeader = req.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    // In real app: decode JWT, validate, extract user ID
    // For this example, we treat the token as the user ID
    return authHeader.slice(7)
  }

  // Check cookie
  const cookieHeader = req.headers.get('cookie') ?? ''
  const match = cookieHeader.match(/session-user-id=([^;]+)/)
  return match?.[1] ?? null
}
