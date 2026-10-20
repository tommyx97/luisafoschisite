# Luisa Foschi — Sito ufficiale

Sito vetrina one-page della pittrice fiorentina **Luisa Foschi** ([luisafoschi.it](https://luisafoschi.it)):
parete di opere che scorre nella prima schermata, catalogo con scheda di dettaglio (prezzo, richiesta
informazioni, WhatsApp), biografia, mostre, commissioni e contatti. Mobile-first, leggero, senza dipendenze.

## Struttura

```
├── index.html                 Pagina del sito
├── 404.html                   Pagina "non trovata"
├── CNAME                      Dominio luisafoschi.it (non cancellare)
├── .nojekyll                  Serve a GitHub Pages (non cancellare)
├── robots.txt, sitemap.xml
└── assets/
    ├── css/style.css          Stile grafico
    ├── js/opere.js            Opere e impostazioni (formato JSON)
    ├── js/main.js             Funzionamento del sito
    ├── dati/contenuti.json    Biografia, citazione critica, mostre, pubblicazioni
    └── img/
        ├── favicon.svg, luisa-foschi.jpg, og-luisa-foschi.jpg
        └── opere/             Foto delle opere: <nome>.jpg/.webp, -sm.jpg/.webp, -xs.webp
```

## Come si aggiorna

Il sito si modifica con il **pannello locale** (cartella "sito mamma" sul computer:
doppio clic su `Apri pannello.bat`). Il pannello aggiorna opere, foto, prezzi, mostre e biografia,
ordina le opere dalla più recente (anno e mese) e mette da solo l'etichetta "Nuova" alle opere
degli ultimi mesi. Poi si caricano qui i file della cartella `sito-online`.
