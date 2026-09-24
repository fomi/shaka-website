# Shaka — Client check-in (Opzione B, integrato nel sito)

Il check-in vive nello stesso progetto Worker del sito (`shaka-website`).
Routing asset-first: le pagine statiche NON eseguono il Worker; il Worker gira
solo su `/api/checkin` e `/api/clients`.

## File di questo pacchetto → dove vanno nel repo del sito (root)

```
worker.js         -> NUOVO. Entry del Worker (API check-in + admin).
wrangler.jsonc    -> SOSTITUISCE il tuo attuale (aggiunge main + binding).
.assetsignore     -> NUOVO. Evita che worker.js/config siano serviti pubblicamente.
checkin.html      -> NUOVO. Form, servito su /checkin
admin.html        -> NUOVO. Lista clienti (password), servito su /admin
schema.sql        -> si esegue una volta sul DB (non pubblicato)
```

### PRIMA di tutto: rimuovi la vecchia cartella
Se avevi aggiunto `functions/` al repo (dal pacchetto precedente), **cancellala**:
nel modello Worker non fa nulla e verrebbe esposta. La sostituisce `worker.js`.

## Passi

### 1. Metti il database_id in wrangler.jsonc
Apri `wrangler.jsonc`, sostituisci `PASTE_DATABASE_ID_HERE` con l'id di `shaka-clients`
(dashboard D1 → apri il database, oppure `npx wrangler d1 list`).

### 2. Site key Turnstile in checkin.html
Sostituisci `TURNSTILE_SITE_KEY_HERE` con la Site key (pubblica) di Turnstile.
Aggiungi il dominio del progetto tra i domini consentiti del widget Turnstile.

### 3. Crea la tabella (una volta)
```
wrangler login
npx wrangler d1 execute shaka-clients --remote --file=./schema.sql
```

### 4. Test SU PREVIEW prima della produzione (consigliato)
Non spingere subito su main. Due modi:

- **Locale, contro il DB vero:**
  ```
  npx wrangler dev --remote
  ```
  Apri l'URL locale, prova `/checkin`, verifica l'INSERT. Non tocca la produzione.

- **Preview branch:** lavora su un branch (non `main`), fai push → Cloudflare Workers
  Builds crea un deployment di **preview** con URL a sé. Testi lì, poi fai il merge
  su `main` per andare in produzione.

### 5. Secrets (dopo il primo deploy del Worker)
Una volta che il Worker (`main`) è deployato, il progetto non è più "solo static
assets" e puoi aggiungere i secrets:
- Dashboard: progetto → Settings → Variables and Secrets → add (come Secret):
  - `TURNSTILE_SECRET`
  - `ADMIN_PASSWORD`
- Oppure da CLI:
  ```
  npx wrangler secret put TURNSTILE_SECRET
  npx wrangler secret put ADMIN_PASSWORD
  ```

### 6. Deploy in produzione
Merge su `main` (Workers Builds fa il deploy), oppure `npx wrangler deploy`.
Poi apri `…/checkin`, fai un check-in di prova, controlla in `…/admin`.

## Note

- I link `/terms` e `/privacy` nel form funzionano già (stesso dominio del sito):
  verifica solo che gli URL delle tue pagine legali siano esattamente quelli.
- Nessun backup automatico sul piano free → esporta il CSV da /admin con regolarità.
- Admin protetto da password singola su HTTPS: ok interno; upgrade futuro → Cloudflare Access.
- Se qualcosa va storto in produzione: Deployments → Rollback alla versione precedente (~1 min).

## Se il Worker va in errore: cosa succede al sito
Con routing asset-first, le pagine statiche del sito NON eseguono worker.js, quindi
un bug nel check-in colpisce al massimo /api/*. Le pagine restano servite.
Il worker inoltre incapsula la logica in try/catch e serve gli assets solo in coda.
