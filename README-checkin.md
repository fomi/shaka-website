# Shaka — Client check-in (B, integrato) — versione a 2 postazioni

Due pagine di check-in con liste attività diverse, stesso backend e database.
Routing asset-first: le pagine statiche NON eseguono il Worker; il Worker gira
solo su `/api/checkin` e `/api/clients`.

## URL finali
- `/checkin-school` → postazione scuola (spiaggia)
- `/checkin-shop`   → postazione shop
- `/admin`          → lista clienti (password), con colonna Point e filtro School/Shop

## File del pacchetto → repo del sito (root)
```
worker.js               -> SOSTITUISCE il precedente (accetta `point` + attività ampliate)
wrangler.jsonc          -> invariato rispetto a prima (main + binding ASSETS + D1)
.assetsignore           -> invariato
checkin-school.html     -> NUOVO (attività scuola)
checkin-shop.html       -> NUOVO (attività shop)
admin.html              -> SOSTITUISCE il precedente (colonna Point + filtro + conteggi)
schema.sql              -> per installazioni NUOVE (include già `point`)
migrate-add-point.sql   -> per il DB ESISTENTE: aggiunge la colonna `point`
```

### Rimuovi il vecchio `checkin.html`
La singola pagina `/checkin` è sostituita dalle due `checkin-school` / `checkin-shop`.
Cancella `checkin.html` dal repo (o lascialo, ma non serve più).

## ORDINE dei passi (importante)

**1. Aggiungi la colonna al database ESISTENTE — PRIMA del deploy.**
Se il worker nuovo va online prima della colonna, l'INSERT fallisce.
```
npx wrangler d1 execute shaka-clients --remote --file=./migrate-add-point.sql
```

**2. Rimetti la Site Key Turnstile** in ENTRAMBE le pagine:
`checkin-school.html` e `checkin-shop.html`, al posto di `TURNSTILE_SITE_KEY_HERE`.

**3. Deploy** (commit + push, oppure `npx wrangler deploy`).

**4. Test:**
- `…/checkin-school` → check-in di prova → in `/admin` deve risultare Point = School
- `…/checkin-shop`   → check-in di prova → Point = Shop
- In `/admin`, prova il filtro School/Shop e l'Export CSV (ora include la colonna `point`).

## Attività per postazione
- **School:** Windsurf lesson · Wingfoil lesson · Windsurf rental · Wingfoil rental · SUP / Kayak rental
- **Shop:** Windsurf rental · Kite rental · Kite lesson · Wingfoil rental · Surf rental · Bodyboard / Skimboard rental · Skate rental

I valori si salvano in inglese nel DB (colonna `activity`), mostrati tradotti nel form (EN/ES/IT/DE).
La postazione si salva nella colonna `point` ('school'/'shop'), impostata in automatico da ciascuna pagina.

## Note
- Il record di prova precedente (fatto prima di questa modifica) avrà `point` vuoto → in /admin appare come "—". Normale.
- Backup: Export CSV da /admin (nessun backup automatico sul free).
- Testo waiver: da validare legalmente prima del lancio.
