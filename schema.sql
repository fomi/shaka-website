-- Shaka client check-in — Cloudflare D1 schema
-- Run once against the D1 database:
--   npx wrangler d1 execute shaka-clients --remote --file=./schema.sql

CREATE TABLE IF NOT EXISTS clients (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name        TEXT    NOT NULL,
  last_name         TEXT    NOT NULL,
  email             TEXT    NOT NULL,
  phone             TEXT    NOT NULL,
  activity          TEXT    NOT NULL,
  point             TEXT,                          -- 'school' or 'shop' (registration desk)
  marketing_consent INTEGER NOT NULL DEFAULT 0,   -- 1 = opted in to email
  waiver_consent    INTEGER NOT NULL DEFAULT 0,   -- 1 = accepted liability waiver
  privacy_consent   INTEGER NOT NULL DEFAULT 0,   -- 1 = read privacy policy
  review_sent       INTEGER NOT NULL DEFAULT 0,   -- 0 = welcome/review email not yet sent (Phase 2)
  lang              TEXT    DEFAULT 'en',          -- form language (Phase 3: es/it/de)
  ip                TEXT,                          -- captured for waiver evidence (eIDAS)
  created_at        TEXT    NOT NULL               -- ISO 8601 UTC timestamp
);

CREATE INDEX IF NOT EXISTS idx_clients_email     ON clients(email);
CREATE INDEX IF NOT EXISTS idx_clients_created   ON clients(created_at);
CREATE INDEX IF NOT EXISTS idx_clients_marketing ON clients(marketing_consent);
CREATE INDEX IF NOT EXISTS idx_clients_point     ON clients(point);
