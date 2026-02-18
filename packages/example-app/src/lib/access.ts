// src/lib/access.ts
//
// Central access engine configuration.
// Import this everywhere you need authorization checks.

import { defineRole, Engine, policy } from 'access-engine'
import { PrismaAdapter } from 'access-engine/adapters/prisma'
import { prisma } from './prisma'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. Define roles
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const roles = {
  viewer: defineRole('viewer')
    .name('Viewer')
    .desc('Read-only access to public resources')
    .grantRead('post', 'comment', 'profile')
    .build(),

  author: defineRole('author')
    .name('Author')
    .desc('Can create and manage own content')
    .inherits('viewer')
    .grant('create', 'post')
    .grant('create', 'comment')
    // Authors can only update/delete their own posts
    .grantWhen('update', 'post', (w) => w.isOwner())
    .grantWhen('delete', 'post', (w) => w.isOwner())
    .build(),

  editor: defineRole('editor')
    .name('Editor')
    .desc('Can manage all content')
    .inherits('author')
    .grant('update', 'post') // any post, not just own
    .grant('delete', 'post')
    .grant('update', 'comment')
    .grant('delete', 'comment')
    .grant('publish', 'post')
    .build(),

  admin: defineRole('admin')
    .name('Admin')
    .desc('Full access to everything')
    .inherits('editor')
    .grantAll('user')
    .grantAll('org')
    .grantAll('settings')
    .grantAll('billing')
    .grantAll('role')
    .build(),

  superadmin: defineRole('superadmin').name('Super Admin').desc('God mode').inherits('admin').grantAll('*').build(),
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. Define ABAC policies (cross-cutting concerns)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const policies = {
  security: policy('security')
    .name('Security Policies')
    .algorithm('deny-overrides')

    // Suspended orgs are blocked from everything
    .rule('suspended-org', (r) =>
      r
        .deny()
        .on('*')
        .of('*')
        .priority(100)
        .desc('Block suspended orgs')
        .when((w) => w.attr('orgStatus', 'eq', 'suspended')),
    )

    // Rate limiting (checked via environment)
    .rule('rate-limit-writes', (r) =>
      r
        .deny()
        .on('create', 'update', 'delete')
        .of('*')
        .priority(90)
        .desc('Rate limit write operations')
        .when((w) => w.env('requestsPerMinute', 'gt', 60)),
    )

    .build(),

  planGating: policy('plan-gating')
    .name('Plan-Based Feature Gating')
    .algorithm('deny-overrides')

    // Only pro+ can access analytics
    .rule('analytics-pro-only', (r) =>
      r
        .allow()
        .on('read')
        .of('analytics')
        .when((w) => w.attr('plan', 'in', ['pro', 'enterprise'])),
    )

    // Only enterprise can manage org settings
    .rule('org-settings-enterprise', (r) =>
      r
        .allow()
        .on('update', 'delete')
        .of('org')
        .when((w) => w.attr('plan', 'eq', 'enterprise')),
    )

    // Only enterprise can export data
    .rule('export-enterprise', (r) =>
      r
        .allow()
        .on('export')
        .of('*')
        .when((w) => w.attr('plan', 'eq', 'enterprise')),
    )

    .build(),

  contentModeration: policy('content-moderation')
    .name('Content Moderation Rules')
    .algorithm('deny-overrides')

    // Flagged users can't create content
    .rule('flagged-no-create', (r) =>
      r
        .deny()
        .on('create')
        .of('post', 'comment')
        .priority(80)
        .desc('Flagged users cannot create content')
        .when((w) => w.attr('flagged', 'eq', true)),
    )

    // Unpublished posts only visible to author and editors
    .rule('unpublished-visibility', (r) =>
      r
        .deny()
        .on('read')
        .of('post')
        .priority(50)
        .desc('Unpublished posts are restricted')
        .when((w) =>
          w
            .resourceAttr('published', 'eq', false)
            .not((n) => n.or((o) => o.isOwner().role('editor').role('admin').role('superadmin'))),
        ),
    )

    .build(),
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. Create engine instance
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const engine = new Engine({
  adapter: new PrismaAdapter(prisma as any),
  defaultEffect: 'deny',
  cacheTTL: 30, // 30s cache for policies/roles
  maxCacheSize: 500, // cache up to 500 resolved subjects

  hooks: {
    onDeny: (req, decision) => {
      console.warn(
        `[access-engine] DENIED: subject=${req.subject.id} ` +
          `action=${req.action} resource=${req.resource.type}` +
          `${req.resource.id ? `:${req.resource.id}` : ''} ` +
          `reason="${decision.reason}" (${decision.duration.toFixed(2)}ms)`,
      )
    },
    onError: (error, req) => {
      console.error(`[access-engine] ERROR evaluating ${req.action}:${req.resource.type}`, error)
    },
  },
})

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. Permission check definitions for the frontend
//    Centralize these so server + client agree on the keys.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import type { PermissionCheck } from 'access-engine'

/** Standard checks to send to the client on every page load */
export const STANDARD_CHECKS: PermissionCheck[] = [
  { action: 'create', resource: 'post' },
  { action: 'read', resource: 'post' },
  { action: 'publish', resource: 'post' },
  { action: 'manage', resource: 'user' },
  { action: 'read', resource: 'analytics' },
  { action: 'update', resource: 'org' },
  { action: 'access', resource: 'billing' },
  { action: 'export', resource: 'post' },
  { action: 'manage', resource: 'role' },
]
