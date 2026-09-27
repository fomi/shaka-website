-- Migration: add the `participants` column (school group check-ins) to an
-- EXISTING clients table. Run this ONCE, BEFORE deploying the new worker.js:
--   npx wrangler d1 execute shaka-clients --remote --file=./migrate-add-participants.sql
-- Existing rows get participants = NULL. Only the school form fills it.

ALTER TABLE clients ADD COLUMN participants TEXT;
