# Shaka — Client check-in (B, integrato) — 2 postazioni + partecipanti

Due pagine di check-in, stesso backend e database.
Routing asset-first: le pagine statiche NON eseguono il Worker; il Worker gira
solo su `/api/checkin` e `/api/clients`.

## URL
- `/checkin-school` → scuola (spiaggia) — ha il campo "Altri partecipanti"
- `/checkin-shop`   → shop — form invariato (niente partecipanti)
- `/admin`          → lista clienti (password): colonne Point + Participants, filtri Point e Activity

## File → repo del sito (root)
```
worker.js                    -> SOSTITUISCE (accetta point + participants; ricerca anche nei partecipanti)
checkin-school.html          -> SOSTITUISCE (campo "Altri partecipanti", Site Key già dentro)
checkin-shop.html            -> invariato rispetto alla versione a 2 postazioni
admin.html                   -> SOSTITUISCE (colonna Participants + filtro Activity)
wrangler.jsonc / .assetsignore -> invariati
schema.sql                   -> per installazioni NUOVE (include point + participants)
migrate-add-point.sql        -> (già eseguito da te in precedenza)
migrate-add-participants.sql -> NUOVO: aggiunge la colonna participants al DB esistente
```

## ORDINE per questa modifica

**1. Aggiungi la colonna `participants` al DB — PRIMA del deploy:**
```
npx wrangler d1 execute shaka-clients --remote --file=./migrate-add-participants.sql
```
(La colonna `point` l'avevi già aggiunta con migrate-add-point.sql.)

**2. Sostituisci i file** nel repo (`worker.js`, `checkin-school.html`, `admin.html`).

**3. Deploy** (commit + push, oppure `npx wrangler deploy`).

**4. Test:**
- `…/checkin-school`: compila "Altri partecipanti" con più nomi (uno per riga) → invia.
- In `/admin`: la colonna Participants mostra i nomi; il filtro Activity funziona;
  cerca il nome di un **partecipante** (non il registrante) → il record compare.
- `…/checkin-shop`: invariato, nessun campo partecipanti.

## Come risolve il tuo problema
- Il **contatto** resta chi compila (nome/cognome/email/telefono).
- Gli **altri partecipanti** (figli, partner) vanno nel campo libero, salvati in `participants`.
- La **ricerca in /admin cerca anche tra i partecipanti**: dal nome sul plan corsi
  risali sempre al contatto, anche se quel nome è solo un partecipante.

## Note
- Campo partecipanti solo nella scuola; lo shop non ne ha bisogno.
- Multilingua EN/ES/IT/DE anche per il nuovo campo.
- Backup: Export CSV da /admin (ora include `participants`).
- Testo waiver: da validare legalmente prima del lancio.
