/* =====================================================================
   LUISA FOSCHI — DATI DEL SITO
   Questo è l'unico file da modificare per aggiornare le opere.
   ===================================================================== */

/* ── IMPOSTAZIONI ── */
window.LF_CONFIG = {
  // Opere visibili prima del pulsante "Vedi tutte"
  opereVisibili: 6,

  // Invio del modulo contatti.
  // Se inserisci un endpoint Formspree (es. "https://formspree.io/f/abcdwxyz")
  // i messaggi arrivano via email. Se lo lasci vuoto, il modulo apre WhatsApp
  // con il messaggio già scritto.
  formEndpoint: "",

  // Numero WhatsApp con prefisso internazionale, senza "+" né spazi
  whatsapp: "393403038995"
};

/* ── OPERE ──
   ORDINE: la prima della lista è la più recente e appare per prima nel sito.
   PER AGGIUNGERE UN'OPERA: copia un blocco { ... }, incollalo IN CIMA alla
   lista e modifica i valori.

   Campi:
   - titolo       testo
   - anno         anno di realizzazione
   - tecnica      es. "Olio su tela"
   - dimensioni   es. "50×70 cm"
   - prezzo       numero (es. 600) oppure testo (es. "Su richiesta")
   - immagine     percorso locale (es. "assets/img/opere/buio-dentro.jpg") o URL
   - descrizione  testo della "curiosità" dell'opera; per andare a capo usa \n
*/
window.OPERE = [
  {
    titolo: "Buio dentro",
    anno: "2025",
    tecnica: "Olio su tela",
    dimensioni: "50×70 cm",
    prezzo: 590,
    immagine: "https://www.artegante.it/opera/16824.jpg",
    descrizione: "C’è un silenzio che pesa più del rumore.\nUn vuoto che non è assenza, ma presenza costante, densa, quasi tangibile.\n\nDentro, tutto si ferma.\nI pensieri si aggrovigliano, il respiro si fa corto, come se il mondo si restringesse fino a diventare una stanza senza finestre. Le mani cercano di trattenere qualcosa — lucidità, pace…"
  },
  {
    titolo: "Quando il cuore si fa cenere...",
    anno: "2025",
    tecnica: "Base gesso a spatola e olio su tela",
    dimensioni: "50×70 cm",
    prezzo: 600,
    immagine: "https://www.artegante.it/opera/16644.jpg",
    descrizione: "Opera realizzata in un periodo personale di forte emotività.\nQuando il dolore rende il cuore cenere ed i ricordi “bruciano”, di un grande amore resta un fuoco che continua ad ardere: l’amore non muore… resta!\nLa fenice, simbolo di rinascita… rinascere senza dimenticare."
  },
  {
    titolo: "Provaci",
    anno: "2025",
    tecnica: "Olio su tela",
    dimensioni: "30×30 cm",
    prezzo: 210,
    immagine: "https://www.artegante.it/opera/16506.jpg",
    descrizione: "Olio su tela, realizzato a pennelli e spatola."
  },
  {
    titolo: "Sospesa nel tempo... in attesa di tutto e di niente",
    anno: "2025",
    tecnica: "Olio, rilievi in gesso e oro su tela",
    dimensioni: "50×70 cm",
    prezzo: 400,
    immagine: "https://www.artegante.it/opera/16366.jpg",
    descrizione: "Figura femminile sospesa nel tempo indefinito, in un’attesa infinita di tutto e di niente! Senza un futuro certo, in bilico… cosa ne sarà?\nRilievi in gesso, olio e colore oro brillante su tela di qualità."
  },
  {
    titolo: "Young Body",
    anno: "2023",
    tecnica: "Olio su tela",
    dimensioni: "50×50 cm",
    prezzo: 220,
    immagine: "https://www.artegante.it/opera/16289.jpg",
    descrizione: "Cambiamento inarrestabile, fissare l’attimo, apprezzare ogni fase della nostra vita…"
  },
  {
    titolo: "Forever Marilyn",
    anno: "2022",
    tecnica: "Olio su tela",
    dimensioni: "40×40 cm",
    prezzo: 400,
    immagine: "https://www.artegante.it/opera/16144.jpg",
    descrizione: "L’immortalità esiste… la figura di Marilyn Monroe è immortale! Un’icona, una donna eccezionale ancora presente, conosciuta anche dalle giovani generazioni."
  },
  {
    titolo: "Morgana",
    anno: "2021",
    tecnica: "Olio su tela",
    dimensioni: "40×40 cm",
    prezzo: 400,
    immagine: "https://www.artegante.it/opera/16124.jpg",
    descrizione: "Morgana la fata… fata misteriosa e dal nome magico. Racchiude un fascino coinvolgente che immobilizza, ipnotizza, paralizza. Ci lasciamo piacevolmente ammaliare dal suo sguardo: ci rende forti e vincenti."
  },
  {
    titolo: "Anima",
    anno: "2023",
    tecnica: "Olio su tela",
    dimensioni: "70×100 cm",
    prezzo: 600,
    immagine: "https://www.artegante.it/opera/16069.jpg",
    descrizione: "A volte si affronta un viaggio lungo, pericoloso, insidioso, ma coraggiosamente, nella speranza di una vita migliore… non sempre si arriva alla fine, ma non avevamo niente da perdere se non… noi stessi.\n\nQuante vite… quante anime…"
  },
  {
    titolo: "Rispetto, bellezza, intelligenza, indipendenza",
    anno: "2023",
    tecnica: "Olio su tela",
    dimensioni: "40×40 cm",
    prezzo: 400,
    immagine: "https://www.artegante.it/opera/16018.jpg",
    descrizione: "Bella, indipendente, coraggiosa, intelligente… e per questo non può volare da sola.\nSangue a coprire, ad annientare, a soffocare…"
  },
  {
    titolo: "Incanto",
    anno: "2023",
    tecnica: "Olio su tela",
    dimensioni: "40×60 cm",
    prezzo: 300,
    immagine: "https://www.artegante.it/opera/15979.jpg",
    descrizione: "Incanto: come non rimanere incantati da qualcosa che ammiriamo e che ci toglie il fiato, con un velo di tristezza nello sguardo per il non riuscire a raggiungere quel qualcosa…\nGli occhi, sono gli occhi a dire le parole più belle…\nRestate solo dove non dovrete mai elemosinare amore…"
  },
  {
    titolo: "Sguardo indietro",
    anno: "2023",
    tecnica: "Olio su tela e tecniche miste",
    dimensioni: "50×70 cm",
    prezzo: 500,
    immagine: "https://www.artegante.it/opera/15968.jpg",
    descrizione: "Fermarsi un attimo per voltarsi indietro e vedere la vita trascorsa, per continuare con forza il cammino che abbiamo di fronte.\nCamminando sempre avanti, imparando dagli errori commessi e magari commettendone altri…\nSguardo intenso e profondo, sguardo vivo e vibrante."
  },
  {
    titolo: "Coraggio... la forza del coraggio",
    anno: "2023",
    tecnica: "Olio su tela",
    dimensioni: "50×50 cm",
    prezzo: 550,
    immagine: "https://www.artegante.it/opera/15962.jpg",
    descrizione: "Opera raffigurante il David di Michelangelo, icona di bellezza, forza, coraggio.\nIl ragazzo che uccise il gigante con una fionda… imprese leggendarie, dove l’improbabile diventa realtà, riscossa, vittoria."
  },
  {
    titolo: "Impari",
    anno: "2022",
    tecnica: "Olio e foglia oro su tela",
    dimensioni: "80×100 cm",
    prezzo: 700,
    immagine: "https://www.artegante.it/opera/15941.jpg",
    descrizione: "Opera rivisitata, raffigurante la statua “Il Ratto di Polissena”, scultura di Pio Fedi collocata nella Loggia dei Lanzi a Firenze.\nImpari è la lotta fra bene e male, fra luce ed ombra, fra antico e moderno, fra vita e morte."
  },
  {
    titolo: "Screenshot",
    anno: "2023",
    tecnica: "Acrilico e gesso su tela",
    dimensioni: "40×60 cm",
    prezzo: 300,
    immagine: "https://www.artegante.it/opera/15930.jpg",
    descrizione: "Il David raffigura una fra le opere marmoree più famose e stupende di Michelangelo: rappresenta in maniera classica la bellezza e la forza di un giovane uomo. I simboli dei maggiori Social rappresentano il moderno, il presente che corre veloce, velocissimo, contribuendo a diffondere l’arte, tutta l’arte, sia quella antica che quella moderna, raggiungendo le nuove generazioni con entusiasmo e verità.\nBase lavorata a gesso con la spatola, a tratti in rilievo."
  },
  {
    titolo: "Neve",
    anno: "2024",
    tecnica: "Olio su tela",
    dimensioni: "40×60 cm",
    prezzo: 300,
    immagine: "https://www.artegante.it/opera/15927.jpg",
    descrizione: "Rappresentazione di figura femminile. La Neve è femmina, la Neve è fredda… come a volte sentiamo freddo in fondo alla nostra anima."
  },
  {
    titolo: "Il David",
    anno: "2022",
    tecnica: "Olio e foglia oro su tela",
    dimensioni: "50×70 cm",
    prezzo: 300,
    immagine: "https://www.artegante.it/opera/15924.jpg",
    descrizione: "Raffigurazione del volto del David di Michelangelo, opera iconica, suggestiva."
  },
  {
    titolo: "Come un uragano",
    anno: "2021",
    tecnica: "Olio su tela",
    dimensioni: "50×50 cm",
    prezzo: 200,
    immagine: "https://www.artegante.it/opera/15922.jpg",
    descrizione: "Il fulmine, energia pura, si getta senza esitazione nel vortice, fondendosi nell’abbraccio del mare…\nEnergia, acqua e luce."
  },
  {
    titolo: "Sola",
    anno: "2023",
    tecnica: "Olio su tela",
    dimensioni: "50×50 cm",
    prezzo: 300,
    immagine: "https://www.artegante.it/opera/15913.jpg",
    descrizione: "Opera raffigurante l’abbandono, il lasciarsi andare, sola, senza nessuno a trattenere o influenzare.\nLeggerezza, assenza."
  },
  {
    titolo: "Ocean",
    anno: "2022",
    tecnica: "Olio su tela",
    dimensioni: "70×100 cm",
    prezzo: 600,
    immagine: "https://www.artegante.it/opera/15910.jpg",
    descrizione: "Acqua, soltanto acqua?\nQuanta forza l’acqua racchiude, capace di devastare e distruggere ma di una bellezza immensa. Mare profondo, infinito.\nAcqua, soltanto acqua… senza, non c’è vita…"
  },
  {
    titolo: "Roses",
    anno: "2023",
    tecnica: "Olio e foglia oro su tela",
    dimensioni: "30×30 cm",
    prezzo: 160,
    immagine: "https://www.artegante.it/opera/15909.jpg",
    descrizione: "Un’opera che attira molti sguardi, selezionata per varie iniziative."
  }
];
