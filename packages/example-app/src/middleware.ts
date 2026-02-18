// src/middleware.ts
//
// Next.js middleware: runs at the edge before every matched route.
// Protects admin pages and API routes that need auth.
//
// NOTE: This runs in the Edge Runtime. If your adapter needs Node.js
// (e.g. Prisma with a TCP connection), use the lightweight approach below
// that only checks the session, and defer full access checks to the route.

import { type NextRequest, NextResponse } from 'next/server'

// ── Lightweight approach: just check auth, defer access checks to route handlers ──

export function middleware(req: NextRequest) {
  const userId = req.cookies.get('session-user-id')?.value ?? req.headers.get('authorization')?.replace('Bearer ', '')

  // Public routes - no auth needed
  const publicPaths = ['/', '/login', '/api/health']
  if (publicPaths.some((p) => req.nextUrl.pathname === p)) {
    return NextResponse.next()
  }

  // Everything else requires auth
  if (!userId) {
    if (req.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Pass user ID to downstream handlers via header
  const response = NextResponse.next()
  response.headers.set('x-user-id', userId)
  return response
}

export const config = {
  matcher: [
    // Match all routes except static files
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ALTERNATIVE: Full access check in middleware (Node.js runtime only)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//
// If your DB adapter works at the edge (e.g. Drizzle + D1/Turso,
// or Prisma Accelerate), you can do full access checks here:
//
// import { createNextMiddleware } from "access-engine/server/next";
// import { engine } from "@/lib/access";
//
// const checkAccess = createNextMiddleware(engine, {
//   getUserId: (req) => {
//     return req.headers.get("authorization")?.replace("Bearer ", "") ?? null;
//   },
//   rules: [
//     { pattern: /^\/admin/, resource: "admin", action: "access" },
//     { pattern: /^\/api\/admin/, resource: "admin", action: "manage" },
//     { pattern: /^\/api\/analytics/, resource: "analytics", action: "read" },
//     { pattern: /^\/api\/billing/, resource: "billing", action: "access" },
//   ],
// });
//
// export async function middleware(req: NextRequest) {
//   const result = await checkAccess(req);
//   if (result) return result; // blocked
//   return NextResponse.next();
// }
