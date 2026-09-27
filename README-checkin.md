# Shaka — Check-in + Noleggi (B, integrato)

Tutto nel progetto Worker `shaka-website`. Routing asset-first: le pagine statiche
non eseguono il Worker; il Worker gira solo su `/api/*`.

## Pagine
- `/checkin-school` · `/checkin-shop` → check-in clienti (invariati)
- `/admin` → vista completa: **Noleggi** (in alto) + **Check-ins**
- `/rental` → **NUOVO** back-office noleggi per il banco shop (protetto, come admin)

## Modello dati
- `clients` = i check-in (contatto + consensi). Invariata.
- `rentals` = **NUOVA** tabella, righe di noleggio. Un cliente → molte righe.
  Campi: `item, extras, start_at (data+ORA, 24h), days, price, paid, notes, returned, returned_at`.
  Saldo e data riconsegna si **calcolano** (start_at + days×24h).

## File → repo del sito (root)
```
worker.js                    -> SOSTITUISCE (endpoint /api/rentals e /api/rental)
rental.html                  -> NUOVO (pagina /rental)
admin.html                   -> SOSTITUISCE (sezione Noleggi + fix ricerca client-side)
schema.sql                   -> installazioni nuove (include rentals)
migrate-add-rentals.sql      -> NUOVO: crea la tabella rentals sul DB esistente
checkin-school.html / checkin-shop.html / wrangler.jsonc / .assetsignore -> invariati
```

## ORDINE (la tabella PRIMA del deploy)
1. **Copia i file** nella cartella del progetto (incluso `migrate-add-rentals.sql`). Non fare ancora push.
2. **Crea la tabella** rentals:
   ```
   npx wrangler d1 execute shaka-clients --remote --file=./migrate-add-rentals.sql
   ```
3. **Commit + push** (deploy).

## Uso
- **Capo, al banco** → apre `/rental` (password = quella admin; può spuntare "Ricorda su questo tablet").
  Lista dei check-in shop di oggi → tocca il cliente → **+ Aggiungi attrezzatura**:
  oggetto, extra, giorni (24h), **ora di inizio = adesso** (modificabile), prezzo, pagato, note → Salva.
  Aggiunge più righe (es. tavola surf aggiunta dopo). Riapre una riga per estendere giorni,
  aggiornare il pagato, o **Segna reso**.
- **Tu, in `/admin`** → in cima la sezione **Noleggi**:
  - riquadri **Da incassare (€)** e **Da riconsegnare oggi/scaduti**
  - filtro: Riconsegne attese · Saldo aperto · In corso · Tutti
  - per ogni riga puoi aggiornare il **pagato** e segnare **Reso** al volo.

## Note
- `/rental` e le API rentals usano la **password admin**. Se la dai al capo, ha accesso anche a /admin.
  (Se in futuro vuoi separarli, si aggiunge una seconda password — dimmelo.)
- Regola: **nuovo noleggio in una nuova visita = nuovo check-in** (un record = i suoi noleggi;
  righe multiple = più attrezzature dello stesso soggiorno).
- Backup: Export CSV dei check-in da /admin. (I noleggi non sono ancora nell'export CSV — se lo vuoi, lo aggiungo.)
- Testo waiver/privacy: da validare legalmente prima del lancio.
