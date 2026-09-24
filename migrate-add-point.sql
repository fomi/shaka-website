-- Migration: add the `point` column (school/shop) to an EXISTING clients table.
-- Run this ONCE, BEFORE deploying the new worker.js:
--   npx wrangler d1 execute shaka-clients --remote --file=./migrate-add-point.sql
-- Existing rows get point = NULL (they show as "—" in /admin). New check-ins fill it.

ALTER TABLE clients ADD COLUMN point TEXT;
CREATE INDEX IF NOT EXISTS idx_clients_point ON clients(point);
