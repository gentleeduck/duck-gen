// src/db/schema.ts
//
// Drizzle schema for access-engine.
// Use this if you prefer Drizzle over Prisma.
// Works with: PostgreSQL, MySQL, SQLite, Cloudflare D1, Turso

import { index, integer, jsonb, pgTable, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Your existing app tables (example)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  plan: text('plan').notNull().default('free'),
  orgId: text('org_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const posts = pgTable('posts', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  body: text('body').notNull(),
  published: integer('published').notNull().default(0),
  authorId: text('author_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// access-engine tables
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const accessPolicies = pgTable('access_policies', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  version: integer('version').notNull().default(1),
  algorithm: text('algorithm').notNull().default('deny-overrides'),
  rules: jsonb('rules').notNull().default([]),
  targets: jsonb('targets'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const accessRoles = pgTable('access_roles', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  permissions: jsonb('permissions').notNull().default([]),
  inherits: jsonb('inherits').notNull().default([]),
  scope: text('scope'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const accessAssignments = pgTable(
  'access_assignments',
  {
    id: text('id').primaryKey(),
    subjectId: text('subject_id').notNull(),
    roleId: text('role_id')
      .notNull()
      .references(() => accessRoles.id, { onDelete: 'cascade' }),
    scope: text('scope'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (t) => [
    uniqueIndex('access_assign_uniq').on(t.subjectId, t.roleId, t.scope),
    index('access_assign_subject').on(t.subjectId),
  ],
)

export const accessSubjectAttrs = pgTable('access_subject_attrs', {
  subjectId: text('subject_id').primaryKey(),
  data: jsonb('data').notNull().default({}),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
