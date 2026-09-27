-- Migration: create the `rentals` table (shop rental line-items).
-- One check-in (clients row) can have MANY rental lines.
-- Run ONCE, BEFORE deploying the new worker.js:
--   npx wrangler d1 execute shaka-clients --remote --file=./migrate-add-rentals.sql

CREATE TABLE IF NOT EXISTS rentals (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id    INTEGER NOT NULL,               -- -> clients.id (the check-in)
  item         TEXT    NOT NULL,               -- material/service
  extras       TEXT,                            -- comma-separated tags (Muta, Casco, ...)
  start_at     TEXT    NOT NULL,               -- ISO timestamp (date + TIME); rentals are 24h-based
  days         INTEGER NOT NULL DEFAULT 1,     -- number of 24h periods
  price        REAL    NOT NULL DEFAULT 0,     -- total € for this line
  paid         REAL    NOT NULL DEFAULT 0,     -- € paid for this line
  notes        TEXT,
  returned     INTEGER NOT NULL DEFAULT 0,     -- 1 = gear returned
  returned_at  TEXT,                            -- ISO timestamp when marked returned
  created_at   TEXT    NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_rentals_client   ON rentals(client_id);
CREATE INDEX IF NOT EXISTS idx_rentals_returned ON rentals(returned);
