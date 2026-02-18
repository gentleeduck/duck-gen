-- prisma/migrations/001_access_engine/migration.sql
--
-- Run with: npx prisma migrate dev --name access_engine
-- Or apply raw: psql $DATABASE_URL < prisma/migrations/001_access_engine/migration.sql
--
-- This migration adds the access-engine tables to your existing database.
-- It does NOT touch your existing tables.

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- Policies: ABAC policy sets with rules stored as JSON
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CREATE TABLE IF NOT EXISTS "access_policies" (
    "id"                  TEXT PRIMARY KEY,
    "name"                TEXT NOT NULL,
    "description"         TEXT,
    "version"             INTEGER NOT NULL DEFAULT 1,
    "algorithm"           TEXT NOT NULL DEFAULT 'deny-overrides',
    "rules"               JSONB NOT NULL DEFAULT '[]'::jsonb,
    "targets"             JSONB,
    "created_at"          TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at"          TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- Roles: RBAC role definitions with permissions stored as JSON
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CREATE TABLE IF NOT EXISTS "access_roles" (
    "id"                  TEXT PRIMARY KEY,
    "name"                TEXT NOT NULL,
    "description"         TEXT,
    "permissions"         JSONB NOT NULL DEFAULT '[]'::jsonb,
    "inherits"            TEXT[] NOT NULL DEFAULT '{}',
    "scope"               TEXT,
    "metadata"            JSONB,
    "created_at"          TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at"          TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- Assignments: Maps subjects (users) to roles, optionally scoped
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CREATE TABLE IF NOT EXISTS "access_assignments" (
    "id"                  TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "subject_id"          TEXT NOT NULL,
    "role_id"             TEXT NOT NULL REFERENCES "access_roles"("id") ON DELETE CASCADE,
    "scope"               TEXT,
    "created_at"          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS "access_assignments_subject_role_scope"
    ON "access_assignments"("subject_id", "role_id", "scope");

CREATE INDEX IF NOT EXISTS "access_assignments_subject_id"
    ON "access_assignments"("subject_id");

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- Subject Attributes: ABAC attributes for users (plan, dept, etc.)
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CREATE TABLE IF NOT EXISTS "access_subject_attrs" (
    "subject_id"          TEXT PRIMARY KEY,
    "data"                JSONB NOT NULL DEFAULT '{}'::jsonb,
    "updated_at"          TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- Auto-update updated_at trigger
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CREATE OR REPLACE FUNCTION access_engine_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at BEFORE UPDATE ON "access_policies"
    FOR EACH ROW EXECUTE FUNCTION access_engine_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON "access_roles"
    FOR EACH ROW EXECUTE FUNCTION access_engine_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON "access_subject_attrs"
    FOR EACH ROW EXECUTE FUNCTION access_engine_updated_at();
