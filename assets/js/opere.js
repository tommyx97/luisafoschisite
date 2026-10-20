/* =====================================================================
   LUISA FOSCHI — DATI DEL SITO
   Il modo più semplice per modificarlo è il PANNELLO
   (doppio clic su "Apri pannello.bat" nella cartella "sito mamma").
   Si può anche modificare a mano: è in formato JSON (chiavi tra virgolette).

   OPERE: il sito le ordina da solo dalla più recente (anno e mese).
   Campi di ogni opera:
   - id           nome breve senza spazi, usato nel link dell'opera (es. "buio-dentro")
   - titolo, anno, tecnica, dimensioni (es. "50×70 cm")
   - prezzo       numero (es. 590) oppure testo ("Su richiesta" o "Venduta")
   - immagine     foto grande; miniatura = foto piccola per la griglia
   - webp         true se esistono le versioni .webp (le crea il pannello)
   - mese         1–12, mese di realizzazione: serve per l'ordine (dalla più recente)
                  e per l'etichetta "Nuova", che compare da sola sulle opere degli
                  ultimi "mesiNovita" mesi (impostazioni)
   - descrizione  testo; una riga vuota = nuovo paragrafo
   ===================================================================== */

window.LF_CONFIG = {
  "opereVisibili": 8,
  "formEndpoint": "",
  "whatsapp": "393403038995",
  "telefono": "+393403038995",
  "telefonoVisibile": "340 303 8995",
  "mesiNovita": 6
};

window.OPERE = [
  {
    "id": "furore-oltre-l-orizzonte",
    "titolo": "Furore… oltre l’orizzonte",
    "anno": "2026",
    "mese": 10,
    "tecnica": "Olio su tela",
    "dimensioni": "60×50 cm",
    "prezzo": 540,
    "immagine": "assets/img/opere/furore-oltre-l-orizzonte.jpg",
    "miniatura": "assets/img/opere/furore-oltre-l-orizzonte-sm.jpg",
    "webp": true,
    "ar": 1.1939,
    "colore": "#7b7669",
    "descrizione": "Furore… oltre l’orizzonte racconta la forza primordiale della libertà: i colori incandescenti si fondono in un’esplosione di movimento e passione.\nÈ un inno all’istinto, al coraggio di superare ogni limite e a quella parte indomita dell’anima che non smette mai di inseguire l’infinito."
  },
  {
    "id": "inviolabile",
    "titolo": "Inviolabile",
    "anno": "2026",
    "mese": 5,
    "tecnica": "Olio su tela",
    "dimensioni": "30×40 cm",
    "prezzo": 340,
    "immagine": "assets/img/opere/inviolabile.jpg",
    "miniatura": "assets/img/opere/inviolabile-sm.jpg",
    "webp": true,
    "ar": 0.75,
    "colore": "#776a5a",
    "descrizione": "Inviolabile rappresenta una figura enigmatica e fiera, dallo sguardo magnetico e profondo.\nUn’immagine di forza interiore, indipendenza e inviolabilità dell’anima: ciò che siamo nel profondo e che nessuno può violare."
  },
  {
    "id": "buio-dentro",
    "titolo": "Buio dentro",
    "anno": "2025",
    "tecnica": "Olio su tela",
    "dimensioni": "50×70 cm",
    "prezzo": 590,
    "immagine": "assets/img/opere/buio-dentro.jpg",
    "miniatura": "assets/img/opere/buio-dentro-sm.jpg",
    "webp": true,
    "ar": 0.6945,
    "colore": "#726363",
    "descrizione": "C’è un silenzio che pesa più del rumore.\nUn vuoto che non è assenza, ma presenza costante, densa, quasi tangibile.\n\nDentro, tutto si ferma.\nI pensieri si aggrovigliano, il respiro si fa corto, come se il mondo si restringesse fino a diventare una stanza senza finestre. Le mani cercano di trattenere qualcosa — lucidità, pace…"
  },
  {
    "id": "quando-il-cuore-si-fa-cenere",
    "titolo": "Quando il cuore si fa cenere...",
    "anno": "2025",
    "tecnica": "Base gesso a spatola e olio su tela",
    "dimensioni": "50×70 cm",
    "prezzo": 590,
    "immagine": "assets/img/opere/quando-il-cuore-si-fa-cenere.jpg",
    "miniatura": "assets/img/opere/quando-il-cuore-si-fa-cenere-sm.jpg",
    "webp": true,
    "ar": 0.7031,
    "colore": "#785856",
    "descrizione": "Opera realizzata in un periodo personale di forte emotività.\nQuando il dolore rende il cuore cenere ed i ricordi “bruciano”, di un grande amore resta un fuoco che continua ad ardere: l’amore non muore… resta!\nLa fenice, simbolo di rinascita… rinascere senza dimenticare."
  },
  {
    "id": "sospesa-nel-tempo",
    "titolo": "Sospesa nel tempo... in attesa di tutto e di niente",
    "anno": "2025",
    "tecnica": "Olio, rilievi in gesso e oro su tela",
    "dimensioni": "50×60 cm",
    "prezzo": 440,
    "immagine": "assets/img/opere/sospesa-nel-tempo.jpg",
    "miniatura": "assets/img/opere/sospesa-nel-tempo-sm.jpg",
    "webp": true,
    "ar": 0.8266,
    "colore": "#75776a",
    "descrizione": "Figura femminile sospesa nel tempo indefinito, in un’attesa infinita di tutto e di niente! Senza un futuro certo, in bilico… cosa ne sarà?\nRilievi in gesso, olio e colore oro brillante su tela di qualità."
  },
  {
    "id": "provaci",
    "titolo": "Provaci",
    "anno": "2025",
    "tecnica": "Olio su tela",
    "dimensioni": "30×30 cm",
    "prezzo": 200,
    "immagine": "assets/img/opere/provaci.jpg",
    "miniatura": "assets/img/opere/provaci-sm.jpg",
    "webp": true,
    "ar": 0.9938,
    "colore": "#626364",
    "descrizione": "Olio su tela, realizzato a pennelli e spatola."
  },
  {
    "id": "neve",
    "titolo": "Neve",
    "anno": "2024",
    "tecnica": "Olio su tela",
    "dimensioni": "40×60 cm",
    "prezzo": 290,
    "immagine": "assets/img/opere/neve.jpg",
    "miniatura": "assets/img/opere/neve-sm.jpg",
    "webp": true,
    "ar": 0.6664,
    "colore": "#6f6078",
    "descrizione": "Rappresentazione di figura femminile. La Neve è femmina, la Neve è fredda… come a volte sentiamo freddo in fondo alla nostra anima."
  },
  {
    "id": "anima",
    "titolo": "Anima",
    "anno": "2023",
    "tecnica": "Olio su tela",
    "dimensioni": "70×100 cm",
    "prezzo": 590,
    "immagine": "assets/img/opere/anima.jpg",
    "miniatura": "assets/img/opere/anima-sm.jpg",
    "webp": true,
    "ar": 0.8,
    "colore": "#4667a1",
    "descrizione": "A volte si affronta un viaggio lungo, pericoloso, insidioso, ma coraggiosamente, nella speranza di una vita migliore… non sempre si arriva alla fine, ma non avevamo niente da perdere se non… noi stessi.\n\nQuante vite… quante anime…"
  },
  {
    "id": "rispetto-bellezza-intelligenza-indipendenza",
    "titolo": "Rispetto, bellezza, intelligenza, indipendenza",
    "anno": "2023",
    "tecnica": "Olio su tela",
    "dimensioni": "40×40 cm",
    "prezzo": 390,
    "immagine": "assets/img/opere/rispetto-bellezza-intelligenza-indipendenza.jpg",
    "miniatura": "assets/img/opere/rispetto-bellezza-intelligenza-indipendenza-sm.jpg",
    "webp": true,
    "ar": 0.9922,
    "colore": "#7d6561",
    "descrizione": "Bella, indipendente, coraggiosa, intelligente… e per questo non può volare da sola.\nSangue a coprire, ad annientare, a soffocare…"
  },
  {
    "id": "incanto",
    "titolo": "Incanto",
    "anno": "2023",
    "tecnica": "Olio su tela",
    "dimensioni": "40×60 cm",
    "prezzo": "Venduta",
    "immagine": "assets/img/opere/incanto.jpg",
    "miniatura": "assets/img/opere/incanto-sm.jpg",
    "webp": true,
    "ar": 0.8,
    "colore": "#656f71",
    "descrizione": "Incanto: come non rimanere incantati da qualcosa che ammiriamo e che ci toglie il fiato, con un velo di tristezza nello sguardo per il non riuscire a raggiungere quel qualcosa…\nGli occhi, sono gli occhi a dire le parole più belle…\nRestate solo dove non dovrete mai elemosinare amore…"
  },
  {
    "id": "young-body",
    "titolo": "Young Body",
    "anno": "2023",
    "tecnica": "Olio su tela",
    "dimensioni": "50×50 cm",
    "prezzo": 250,
    "immagine": "assets/img/opere/young-body.jpg",
    "miniatura": "assets/img/opere/young-body-sm.jpg",
    "webp": true,
    "ar": 0.9867,
    "colore": "#909095",
    "descrizione": "Cambiamento inarrestabile, fissare l’attimo, apprezzare ogni fase della nostra vita…"
  },
  {
    "id": "sguardo-indietro",
    "titolo": "Sguardo indietro",
    "anno": "2023",
    "tecnica": "Olio su tela e tecniche miste",
    "dimensioni": "50×70 cm",
    "prezzo": 490,
    "immagine": "assets/img/opere/sguardo-indietro.jpg",
    "miniatura": "assets/img/opere/sguardo-indietro-sm.jpg",
    "webp": true,
    "ar": 0.7031,
    "colore": "#5d535c",
    "descrizione": "Fermarsi un attimo per voltarsi indietro e vedere la vita trascorsa, per continuare con forza il cammino che abbiamo di fronte.\nCamminando sempre avanti, imparando dagli errori commessi e magari commettendone altri…\nSguardo intenso e profondo, sguardo vivo e vibrante."
  },
  {
    "id": "coraggio-la-forza-del-coraggio",
    "titolo": "Coraggio... la forza del coraggio",
    "anno": "2023",
    "tecnica": "Olio su tela",
    "dimensioni": "50×50 cm",
    "prezzo": 540,
    "immagine": "assets/img/opere/coraggio-la-forza-del-coraggio.jpg",
    "miniatura": "assets/img/opere/coraggio-la-forza-del-coraggio-sm.jpg",
    "webp": true,
    "ar": 0.9977,
    "colore": "#847f7d",
    "descrizione": "Opera raffigurante il David di Michelangelo, icona di bellezza, forza, coraggio.\nIl ragazzo che uccise il gigante con una fionda… imprese leggendarie, dove l’improbabile diventa realtà, riscossa, vittoria."
  },
  {
    "id": "screenshot",
    "titolo": "Screenshot",
    "anno": "2023",
    "tecnica": "Acrilico e gesso su tela",
    "dimensioni": "40×60 cm",
    "prezzo": 290,
    "immagine": "assets/img/opere/screenshot.jpg",
    "miniatura": "assets/img/opere/screenshot-sm.jpg",
    "webp": true,
    "ar": 0.657,
    "colore": "#8890bf",
    "descrizione": "Il David raffigura una fra le opere marmoree più famose e stupende di Michelangelo: rappresenta in maniera classica la bellezza e la forza di un giovane uomo. I simboli dei maggiori Social rappresentano il moderno, il presente che corre veloce, velocissimo, contribuendo a diffondere l’arte, tutta l’arte, sia quella antica che quella moderna, raggiungendo le nuove generazioni con entusiasmo e verità.\nBase lavorata a gesso con la spatola, a tratti in rilievo."
  },
  {
    "id": "sola",
    "titolo": "Sola",
    "anno": "2023",
    "tecnica": "Olio su tela",
    "dimensioni": "50×50 cm",
    "prezzo": 300,
    "immagine": "assets/img/opere/sola.jpg",
    "miniatura": "assets/img/opere/sola-sm.jpg",
    "webp": true,
    "ar": 0.9805,
    "colore": "#9d818b",
    "descrizione": "Opera raffigurante l’abbandono, il lasciarsi andare, sola, senza nessuno a trattenere o influenzare.\nLeggerezza, assenza."
  },
  {
    "id": "roses",
    "titolo": "Roses",
    "anno": "2023",
    "tecnica": "Olio e foglia oro su tela",
    "dimensioni": "30×30 cm",
    "prezzo": 190,
    "immagine": "assets/img/opere/roses.jpg",
    "miniatura": "assets/img/opere/roses-sm.jpg",
    "webp": true,
    "ar": 1,
    "colore": "#706250",
    "descrizione": "Un’opera che attira molti sguardi, selezionata per varie iniziative."
  },
  {
    "id": "impari",
    "titolo": "Impari",
    "anno": "2022",
    "tecnica": "Olio e foglia oro su tela",
    "dimensioni": "80×100 cm",
    "prezzo": 690,
    "immagine": "assets/img/opere/impari.jpg",
    "miniatura": "assets/img/opere/impari-sm.jpg",
    "webp": true,
    "ar": 0.8141,
    "colore": "#7b837c",
    "descrizione": "Opera rivisitata, raffigurante la statua “Il Ratto di Polissena”, scultura di Pio Fedi collocata nella Loggia dei Lanzi a Firenze.\nImpari è la lotta fra bene e male, fra luce ed ombra, fra antico e moderno, fra vita e morte."
  },
  {
    "id": "forever-marilyn",
    "titolo": "Forever Marilyn",
    "anno": "2022",
    "tecnica": "Olio su tela",
    "dimensioni": "40×40 cm",
    "prezzo": 340,
    "immagine": "assets/img/opere/forever-marilyn.jpg",
    "miniatura": "assets/img/opere/forever-marilyn-sm.jpg",
    "webp": true,
    "ar": 1.0119,
    "colore": "#6a6260",
    "descrizione": "L’immortalità esiste… la figura di Marilyn Monroe è immortale! Un’icona, una donna eccezionale ancora presente, conosciuta anche dalle giovani generazioni."
  },
  {
    "id": "ocean",
    "titolo": "Ocean",
    "anno": "2022",
    "tecnica": "Olio su tela",
    "dimensioni": "70×100 cm",
    "prezzo": 590,
    "immagine": "assets/img/opere/ocean.jpg",
    "miniatura": "assets/img/opere/ocean-sm.jpg",
    "webp": true,
    "ar": 0.7102,
    "colore": "#365fb8",
    "descrizione": "Acqua, soltanto acqua?\nQuanta forza l’acqua racchiude, capace di devastare e distruggere ma di una bellezza immensa. Mare profondo, infinito.\nAcqua, soltanto acqua… senza, non c’è vita…"
  },
  {
    "id": "il-david",
    "titolo": "Il David",
    "anno": "2022",
    "tecnica": "Olio e foglia oro su tela",
    "dimensioni": "50×70 cm",
    "prezzo": 350,
    "immagine": "assets/img/opere/il-david.jpg",
    "miniatura": "assets/img/opere/il-david-sm.jpg",
    "webp": true,
    "ar": 0.7109,
    "colore": "#717b7d",
    "descrizione": "Raffigurazione del volto del David di Michelangelo, opera iconica, suggestiva."
  },
  {
    "id": "morgana",
    "titolo": "Morgana",
    "anno": "2021",
    "tecnica": "Olio su tela",
    "dimensioni": "40×40 cm",
    "prezzo": 280,
    "immagine": "assets/img/opere/morgana.jpg",
    "miniatura": "assets/img/opere/morgana-sm.jpg",
    "webp": true,
    "ar": 1,
    "colore": "#6c695d",
    "descrizione": "Morgana la fata… fata misteriosa e dal nome magico. Racchiude un fascino coinvolgente che immobilizza, ipnotizza, paralizza. Ci lasciamo piacevolmente ammaliare dal suo sguardo: ci rende forti e vincenti."
  },
  {
    "id": "come-un-uragano",
    "titolo": "Come un uragano",
    "anno": "2021",
    "tecnica": "Olio su tela",
    "dimensioni": "50×50 cm",
    "prezzo": 220,
    "immagine": "assets/img/opere/come-un-uragano.jpg",
    "miniatura": "assets/img/opere/come-un-uragano-sm.jpg",
    "webp": true,
    "ar": 0.9984,
    "colore": "#3671b5",
    "descrizione": "Il fulmine, energia pura, si getta senza esitazione nel vortice, fondendosi nell’abbraccio del mare…\nEnergia, acqua e luce."
  }
];
