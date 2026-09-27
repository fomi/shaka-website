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
  participants      TEXT,                          -- other participants (school form only), free text
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

-- Shop rental line-items. One client (check-in) -> many rentals. 24h-based (start_at has time).
CREATE TABLE IF NOT EXISTS rentals (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id    INTEGER NOT NULL,
  item         TEXT    NOT NULL,
  extras       TEXT,
  start_at     TEXT    NOT NULL,
  days         INTEGER NOT NULL DEFAULT 1,
  price        REAL    NOT NULL DEFAULT 0,
  paid         REAL    NOT NULL DEFAULT 0,
  notes        TEXT,
  returned     INTEGER NOT NULL DEFAULT 0,
  returned_at  TEXT,
  created_at   TEXT    NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_rentals_client   ON rentals(client_id);
CREATE INDEX IF NOT EXISTS idx_rentals_returned ON rentals(returned);
