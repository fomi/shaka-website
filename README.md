# Shaka — Client check-in (Fase 1)

Sistema di registrazione clienti in loco per Shaka Fuerte.
Stack: Cloudflare Pages + Pages Functions + D1. Costo: €0.

## File del pacchetto → dove vanno nel repo

```
checkin.html                 -> URL:  /checkin      (il form, per il tablet)
admin.html                   -> URL:  /admin        (lista clienti, protetta)
functions/api/checkin.js     -> URL:  /api/checkin  (POST: salva il check-in)
functions/api/clients.js     -> URL:  /api/clients  (GET: legge la lista, admin)
schema.sql                   -> non pubblicato, si esegue una volta sul DB
```

Copia questi file nel repo del sito nuovo (stessa cartella dove stanno index.html ecc.),
mantenendo la cartella `functions/api/`. Push → Cloudflare Pages fa il deploy da solo.

## Setup una tantum su Cloudflare

### 1. Crea il database D1
Dashboard → Storage & Databases → D1 → **Create database** → nome: `shaka-clients`.

### 2. Collega il DB al progetto Pages
Progetto Pages → Settings → Functions → **D1 database bindings** → Add:
- Variable name: `DB`
- D1 database: `shaka-clients`

### 3. Turnstile (anti-spam, gratis)
Dashboard → Turnstile → Add site (dominio del progetto, incluso `*.pages.dev`).
Ottieni **Site key** (pubblica) e **Secret key** (segreta).
- Metti la **Site key** in `checkin.html` al posto di `TURNSTILE_SITE_KEY_HERE`.
- La **Secret key** va nei secrets (punto 4).

### 4. Secrets (variabili d'ambiente)
Progetto Pages → Settings → Environment variables → aggiungi (Production e Preview):
- `TURNSTILE_SECRET` = la Secret key di Turnstile
- `ADMIN_PASSWORD`   = una password forte a tua scelta (serve per aprire /admin)

Impostali come **Secret** (cifrati), non testo in chiaro.

### 5. Crea la tabella
Da terminale, nella cartella del repo, con Wrangler installato e loggato
(`npm i -g wrangler` poi `wrangler login`):

```
npx wrangler d1 execute shaka-clients --remote --file=./schema.sql
```

Fatto. Vai su `https://<tuo-progetto>.pages.dev/checkin`.

## URL finali

- Tablet in spiaggia/negozio → `…/checkin`  (mettilo come segnalibro / home screen)
- Tu, per vedere i clienti     → `…/admin`
- Quando sposti il dominio, diventano `shaka-fuerte.com/checkin` e `/admin`.

## Note importanti

- **Consensi**: waiver + privacy obbligatori; marketing opzionale (colonna `marketing_consent`).
  Il flag marketing è quello che in Fase 2 abiliterà la mail di benvenuto/recensione Google.
- **Link legali**: il form punta a `/terms` e `/privacy`. Verifica che siano gli URL giusti
  delle tue pagine legali sul sito nuovo; se differiscono, cambiali in `checkin.html`.
- **Testo del waiver**: da far validare da un abogado/gestoría spagnola prima della produzione.
- **Backup**: nessun backup automatico sul piano free. Esporta il CSV da /admin con regolarità
  (in Fase 2 si può automatizzare un export settimanale via Cron Trigger).
- **GDPR/retention**: definisci per quanto conservi i dati e una routine di cancellazione.
  Da pianificare in Fase 2.
- **Sicurezza admin**: /admin usa una singola password condivisa su HTTPS — ok per uso interno.
  Upgrade consigliato più avanti: proteggere /admin e /api/clients con **Cloudflare Access** (gratis).

## Prossime fasi (non in questo pacchetto)

- Fase 2: mail welcome + recensione Google (Resend), export CSV automatico, retention/cancellazione.
- Fase 3: multilingua ES/IT/DE (le chip lingua e la colonna `lang` sono già predisposte).
