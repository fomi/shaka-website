-- Impostazioni sito: una sola riga JSON (id = 1) con orari + barra promo,
-- gestita dalla pagina protetta /admin/settings. Nessun deploy per cambiarli.
-- Esegui una volta: wrangler d1 execute shaka-clients --remote --file=./migrate-add-settings.sql
CREATE TABLE IF NOT EXISTS settings (
  id         INTEGER PRIMARY KEY,
  data       TEXT NOT NULL,
  updated_at TEXT,
  updated_by TEXT
);
