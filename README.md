# Luisa Foschi — Sito ufficiale

Sito vetrina one-page della pittrice fiorentina **Luisa Foschi**: presentazione, commissioni, galleria delle opere con scheda di dettaglio e modulo di contatto. Mobile-first, leggero, senza dipendenze.

## Struttura

```
├── index.html            Pagina del sito
├── 404.html              Pagina "non trovata"
├── robots.txt
├── .nojekyll             Serve a GitHub Pages (non cancellare)
└── assets/
    ├── css/style.css     Stile grafico
    ├── js/opere.js       ← OPERE E IMPOSTAZIONI (l'unico file da modificare)
    ├── js/main.js        Funzionamento del sito
    └── img/
        ├── favicon.svg
        ├── LEGGIMI.txt
        └── opere/        Cartella per le foto delle opere (facoltativa)
```

## Pubblicare su GitHub Pages (senza programmi, dal browser)

1. Crea un account su [github.com](https://github.com) e clicca **New repository**.
2. Nome consigliato: `luisa-foschi` · visibilità **Public** · clicca **Create repository**.
3. Nella pagina del repository clicca **uploading an existing file**.
4. Estrai lo ZIP sul computer e **trascina tutto il contenuto della cartella** (non la cartella stessa) nella finestra di GitHub. Clicca **Commit changes**.
   - Il file `.nojekyll` è nascosto: su Mac premi `Cmd+Maiusc+.` per vederlo, su Windows attiva "Elementi nascosti". Se non riesci a caricarlo il sito funziona comunque.
5. Vai su **Settings → Pages** → *Source*: **Deploy from a branch** → Branch **main**, cartella **/ (root)** → **Save**.
6. Dopo 1–2 minuti il sito è online su `https://TUO-UTENTE.github.io/luisa-foschi/`.

Per un dominio proprio (es. `luisafoschi.it`) inseriscilo in **Settings → Pages → Custom domain** e segui le istruzioni DNS di GitHub.

## Aggiungere una nuova opera

Apri `assets/js/opere.js` su GitHub (icona matita ✏️), copia un blocco come questo e incollalo **in cima** alla lista `window.OPERE = [`:

```js
  {
    titolo: "Titolo dell'opera",
    anno: "2026",
    tecnica: "Olio su tela",
    dimensioni: "50×70 cm",
    prezzo: 500,                       // oppure "Su richiesta"
    immagine: "assets/img/opere/titolo-opera.jpg",
    descrizione: "Testo della curiosità dell'opera.\nPer andare a capo usa \\n"
  },
```

Clicca **Commit changes**: in un minuto l'opera compare per prima nella galleria. Il contatore opere e il pulsante "Vedi tutte" si aggiornano da soli.

- **Rimuovere un'opera venduta:** cancella il suo blocco, oppure imposta `prezzo: "Venduta"`.
- **Caricare l'immagine:** entra in `assets/img/opere` → **Add file → Upload files**.
- Attenzione a virgolette e virgole: ogni blocco termina con `},`.

## Modulo contatti

In `assets/js/opere.js`, sezione `LF_CONFIG`:

- **Senza configurazione (predefinito):** il modulo apre WhatsApp al numero indicato in `whatsapp`, con il messaggio già compilato.
- **Ricevere i messaggi via email:** crea un modulo gratuito su [formspree.io](https://formspree.io), copia l'indirizzo che ti dà (es. `https://formspree.io/f/abcdwxyz`) e incollalo in `formEndpoint`. Da quel momento i messaggi arrivano alla tua email.

## Immagini

Le foto delle opere sono attualmente caricate dal profilo [Artegante](https://www.artegante.it/luisa.foschi). Per rendere il sito indipendente e più veloce, è consigliabile scaricarle, caricarle in `assets/img/opere/` e aggiornare il campo `immagine` in `opere.js`.

La foto dell'artista va caricata in `assets/img/` con il nome **`luisa-foschi.jpg`**.

## Contatti artista

Tel. 340 303 8995 · Instagram [@projects.luisa](https://www.instagram.com/projects.luisa) · [Artegante](https://www.artegante.it/luisa.foschi)
