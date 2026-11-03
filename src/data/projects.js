// Projekt som låses upp när en bana är klar. Eleven väljer ett av tre men
// kan göra alla. Varje projekt byggs i steg, och koden från förra steget
// följer med till nästa. why förklarar varför koden ser ut som den gör.
// reward: priset man får när projektet är klart. Facit följer samma
// regler som övningarna (se test/concepts.js).
const KATT = 'https://sv.wikipedia.org/wiki/Katt';

// Delarna i ett projekt bygger på varandra. Tester på fri text kollar
// formen (en h1 som börjar med …) och inte exakta ord, så att eleven kan
// skriva om sig själv.
export const PROJECTS = [
  {
    id: 'proj-om-mig',
    track: 'grunder',
    title: 'Om mig',
    reward: { emoji: '🪞', name: 'Spegel' },
    summary:
      'En sida om dig själv med rubriker, stycken och ord som sticker ut.',
    steps: [
      {
        title: 'Hej, det är jag',
        why: 'h1 är sidans namn, så det finns bara en. Stycket under är det första besökaren läser – en eller två meningar räcker.',
        xp: 15,
        description:
          'Du bygger en sida om dig själv. Först kommer namnet och några ord om vem du är.',
        task: 'Uppgift: Skriv en `h1` som börjar med `Hej, jag heter` och slutar med ditt namn. Skriv under den ett stycke om dig själv.',
        starterCode: '<!-- Steg 1: hej, det är jag -->\n',
        solution:
          '<h1>Hej, jag heter Ada</h1>\n<p>Jag är tolv år och bor i Lund. Jag gillar att bygga saker.</p>\n',
        hints: [
          'En h1 och ett p, i den ordningen.',
          'Rubriken börjar exakt med Hej, jag heter – med kommatecken.',
          '<h1>Hej, jag heter …</h1> och sedan <p>…</p>.',
        ],
        tests: [
          {
            description: 'h1 börjar med Hej, jag heter',
            code: "text('h1')?.startsWith('Hej, jag heter ') ?? null",
            expected: true,
          },
          {
            description: 'Ett stycke direkt under rubriken',
            code: "$('h1')?.nextElementSibling?.tagName ?? null",
            expected: 'P',
          },
        ],
      },
      {
        title: 'Två delar',
        why: 'Med h2 delas sidan i delar som går att skumma. Den som bara vill veta vad du gillar hittar dit utan att läsa allt.',
        xp: 15,
        description: 'Nu får sidan två delar, var och en med sin rubrik.',
        task: 'Uppgift: Lägg till rubrikerna `Det här gillar jag` och `Det här vill jag lära mig` med `h2`, och ett stycke under var och en.',
        solution: `<h1>Hej, jag heter Ada</h1>
<p>Jag är tolv år och bor i Lund. Jag gillar att bygga saker.</p>
<h2>Det här gillar jag</h2>
<p>Jag gillar fotboll, pannkakor och att rita.</p>
<h2>Det här vill jag lära mig</h2>
<p>Jag vill lära mig att bygga egna hemsidor och spel.</p>
`,
        hints: [
          'Två h2, var och en med ett p direkt under.',
          'Rubrikerna ska stå exakt som i uppgiften.',
          '<h2>Det här gillar jag</h2> och sedan <p>…</p>.',
        ],
        tests: [
          {
            description: 'Två h2 med rätt text',
            code: "texts('h2')",
            expected: ['Det här gillar jag', 'Det här vill jag lära mig'],
          },
          {
            description: 'Ett stycke under varje h2',
            code: "$$('h2').map(h => h.nextElementSibling?.tagName ?? null)",
            expected: ['P', 'P'],
          },
        ],
      },
      {
        title: 'Det viktigaste',
        why: 'strong betyder viktigt och em betyder betoning. Använd dem på enstaka ord – blir allt fett sticker ingenting ut.',
        xp: 15,
        description:
          'Till sist får de viktigaste orden sticka ut, så att man ser dem direkt.',
        task: 'Uppgift: Sätt `strong` runt det du gillar mest i stycket under `Det här gillar jag`, och `em` runt något ord i stycket under `Det här vill jag lära mig`.',
        solution: `<h1>Hej, jag heter Ada</h1>
<p>Jag är tolv år och bor i Lund. Jag gillar att bygga saker.</p>
<h2>Det här gillar jag</h2>
<p>Jag gillar fotboll, <strong>pannkakor</strong> och att rita.</p>
<h2>Det här vill jag lära mig</h2>
<p>Jag vill lära mig att bygga <em>egna</em> hemsidor och spel.</p>
`,
        hints: [
          'strong och em ligger inuti styckena, runt enstaka ord.',
          'Första h2:ans stycke får strong, andra h2:ans stycke em.',
          'Jag gillar <strong>pannkakor</strong> …',
        ],
        tests: [
          {
            description: 'Något står i strong under Det här gillar jag',
            code: "$$('h2')[0]?.nextElementSibling?.querySelector('strong')?.textContent.trim() ? true : false",
            expected: true,
          },
          {
            description: 'Något står i em under Det här vill jag lära mig',
            code: "$$('h2')[1]?.nextElementSibling?.querySelector('em')?.textContent.trim() ? true : false",
            expected: true,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-dikten',
    track: 'grunder',
    title: 'Dikten',
    reward: { emoji: '🪶', name: 'Fjäderpenna' },
    summary: 'En dikt med två verser, en linje och din signatur.',
    steps: [
      {
        title: 'Första versen',
        why: 'En vers är ett stycke, och raderna i den hör ihop. Därför är det br mellan raderna och inte en ny p för varje rad.',
        xp: 15,
        description:
          'Du skriver en dikt. Rubriken är diktens namn och första versen har fyra rader.',
        task: 'Uppgift: Skriv diktens namn med `h1`. Skriv första versen i ett stycke direkt under, med fyra rader och `<br>` mellan dem.',
        starterCode: '<!-- Steg 1: första versen -->\n',
        solution: `<h1>Hösten</h1>
<p>Löven faller, ett och ett<br>
gula, röda, bruna<br>
vinden blåser, kall och lätt<br>
snart blir alla gröna.</p>
`,
        hints: [
          'En h1 och sedan ett p med hela versen.',
          'Fyra rader behöver tre <br>.',
          '<p>Rad ett<br>\nrad två<br>\n…</p>',
        ],
        tests: [
          {
            description: 'Dikten har ett namn i h1',
            code: "count('h1')",
            expected: 1,
          },
          {
            description: 'Versen under rubriken har fyra rader',
            code: "count('h1 + p br')",
            expected: 3,
          },
        ],
      },
      {
        title: 'Andra versen',
        why: 'Mellan två verser ska det vara ett mellanrum. Det får du av en ny p – inte av tomma rader i koden, som webbläsaren ändå slår ihop.',
        xp: 15,
        description: 'Dikten får en andra vers, också med fyra rader.',
        task: 'Uppgift: Skriv andra versen i ett nytt stycke, med fyra rader och `<br>` mellan dem.',
        solution: `<h1>Hösten</h1>
<p>Löven faller, ett och ett<br>
gula, röda, bruna<br>
vinden blåser, kall och lätt<br>
snart blir alla gröna.</p>
<p>Fast nej, nu blev det fel<br>
gröna blir de inte<br>
först kommer snö och is ett tag<br>
det kallas visst för vinter.</p>
`,
        hints: [
          'Ett nytt p efter det första.',
          'Tre <br> i det nya stycket också.',
          '<p>Rad ett<br>…</p> igen, med nya ord.',
        ],
        tests: [
          { description: 'Två verser', code: "count('p')", expected: 2 },
          {
            description: 'Fyra rader i varje vers',
            code: "$$('p').map(p => p.querySelectorAll('br').length)",
            expected: [3, 3],
          },
        ],
      },
      {
        title: 'Signaturen',
        why: 'hr säger att något nytt börjar – här att dikten är slut. em på namnet och © visar vem som skrivit den.',
        xp: 15,
        description:
          'Till sist en linje under dikten och vem som har skrivit den.',
        task: 'Uppgift: Sätt en `<hr>` efter dikten. Skriv sedan ett stycke med `©`, året och ditt namn, där namnet står i `em`.',
        solution: `<h1>Hösten</h1>
<p>Löven faller, ett och ett<br>
gula, röda, bruna<br>
vinden blåser, kall och lätt<br>
snart blir alla gröna.</p>
<p>Fast nej, nu blev det fel<br>
gröna blir de inte<br>
först kommer snö och is ett tag<br>
det kallas visst för vinter.</p>
<hr>
<p>&copy; 2026 <em>Ada</em></p>
`,
        hints: [
          '<hr> står ensam på en rad efter den sista versen.',
          '© skrivs &copy;',
          '<p>&copy; 2026 <em>…</em></p>',
        ],
        tests: [
          {
            description: 'En linje efter dikten',
            code: "count('hr')",
            expected: 1,
          },
          {
            description: 'Stycket efter linjen har ©',
            code: "text('hr + p')?.includes('©') ?? null",
            expected: true,
          },
          {
            description: 'Namnet står i em',
            code: "count('hr + p em')",
            expected: 1,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-nyhet',
    track: 'grunder',
    title: 'Nyhetsartikeln',
    reward: { emoji: '📰', name: 'Tidning' },
    summary:
      'En artikel för kvarterstidningen, med ingress och mellanrubriker.',
    steps: [
      {
        title: 'Rubrik och ingress',
        why: 'Ingressen är artikelns viktigaste mening, och därför står den i strong. Den som bara läser den ska ändå veta vad som hänt.',
        xp: 15,
        description:
          'Du skriver en artikel till kvarterstidningen. Den börjar med rubriken och en kort ingress.',
        task: 'Uppgift: Skriv rubriken `Katt hittad på taket` med `h1`. Skriv under den ett stycke där hela ingressen står i `strong`.',
        starterCode: '<!-- Steg 1: rubrik och ingress -->\n',
        solution: `<h1>Katt hittad på taket</h1>
<p><strong>Katten Måns satt i tre timmar på taket innan brandkåren kom.</strong></p>
`,
        hints: [
          'En h1 och sedan ett p.',
          'strong ligger inuti p, runt hela texten.',
          '<p><strong>…</strong></p>',
        ],
        tests: [
          {
            description: 'h1 säger Katt hittad på taket',
            code: "text('h1')",
            expected: 'Katt hittad på taket',
          },
          {
            description: 'Ingressen står i strong',
            code: "count('h1 + p > strong')",
            expected: 1,
          },
        ],
      },
      {
        title: 'Mellanrubriker',
        why: 'Mellanrubrikerna gör att en lång text går att skumma. Nivå två, eftersom de hör till artikelns h1.',
        xp: 15,
        description: 'Nu kommer själva artikeln, i två delar.',
        task: 'Uppgift: Lägg till `Vad hände?` och `Vad händer nu?` med `h2`, och ett stycke under var och en.',
        solution: `<h1>Katt hittad på taket</h1>
<p><strong>Katten Måns satt i tre timmar på taket innan brandkåren kom.</strong></p>
<h2>Vad hände?</h2>
<p>Måns jagade en fågel och klättrade upp längs stupröret.</p>
<h2>Vad händer nu?</h2>
<p>Hans ägare ska sätta upp ett nät, så att det inte händer igen.</p>
`,
        hints: [
          'Två h2, var och en med ett p under.',
          'Frågetecknet är en del av rubriken.',
          '<h2>Vad hände?</h2> och sedan <p>…</p>.',
        ],
        tests: [
          {
            description: 'Två mellanrubriker',
            code: "texts('h2')",
            expected: ['Vad hände?', 'Vad händer nu?'],
          },
          {
            description: 'Ett stycke under varje mellanrubrik',
            code: "$$('h2').map(h => h.nextElementSibling?.tagName ?? null)",
            expected: ['P', 'P'],
          },
        ],
      },
      {
        title: 'Sidfoten',
        why: 'Kommentaren är till redaktionen och syns inte för läsarna. © säger vem som äger texten.',
        xp: 15,
        description:
          'Sist en linje, tidningens namn och en lapp till redaktionen.',
        task: 'Uppgift: Sätt en `<hr>` och sedan stycket `© 2026 Kvarterstidningen`. Skriv också en kommentar som börjar med `Skriven av` och ditt namn.',
        solution: `<h1>Katt hittad på taket</h1>
<p><strong>Katten Måns satt i tre timmar på taket innan brandkåren kom.</strong></p>
<h2>Vad hände?</h2>
<p>Måns jagade en fågel och klättrade upp längs stupröret.</p>
<h2>Vad händer nu?</h2>
<p>Hans ägare ska sätta upp ett nät, så att det inte händer igen.</p>
<hr>
<p>&copy; 2026 Kvarterstidningen</p>
<!-- Skriven av Ada -->
`,
        hints: [
          '<hr> och sedan ett p med &copy;.',
          'En kommentar skrivs <!-- … -->.',
          '<!-- Skriven av … -->',
        ],
        tests: [
          {
            description: 'Stycket efter linjen säger © 2026 Kvarterstidningen',
            code: "text('hr + p')",
            expected: '© 2026 Kvarterstidningen',
          },
          {
            description: 'En kommentar säger vem som skrivit',
            code: "[...doc.body.childNodes].some(node => node.nodeType === 8 && node.textContent.trim().startsWith('Skriven av'))",
            expected: true,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-lanksamling',
    track: 'lankar',
    title: 'Länksamlingen',
    reward: { emoji: '🔖', name: 'Bokmärke' },
    summary:
      'Dina favoritsidor samlade på ett ställe, med länktexter som säger något.',
    steps: [
      {
        title: 'Tre favoriter',
        why: 'Varje länk står i ett eget stycke så att de hamnar på var sin rad. Länktexten säger vad sidan är, så att man vet vart man kommer.',
        xp: 15,
        description:
          'Du samlar dina favoritsidor. Först rubriken och tre länkar.',
        task: 'Uppgift: Skriv rubriken `Mina favoritsidor` med `h1`. Skriv sedan tre stycken med en länk i varje, till sidor som börjar med `https://`. Ingen länk får heta `Klicka här`, `Här` eller `Länk`.',
        starterCode: '<!-- Steg 1: tre favoriter -->\n',
        solution: `<h1>Mina favoritsidor</h1>
<p><a href="https://developer.mozilla.org">MDN om webbkod</a></p>
<p><a href="https://sv.wikipedia.org">Svenska Wikipedia</a></p>
<p><a href="https://www.smhi.se">Vädret från SMHI</a></p>
`,
        hints: [
          'En h1 och sedan tre p, med en a i varje.',
          'Varje href börjar med https://',
          '<p><a href="https://sv.wikipedia.org">Svenska Wikipedia</a></p>',
        ],
        tests: [
          {
            description: 'h1 säger Mina favoritsidor',
            code: "text('h1')",
            expected: 'Mina favoritsidor',
          },
          {
            description: 'Tre länkar i var sitt stycke',
            code: "count('p > a')",
            expected: 3,
          },
          {
            description: 'Alla länkar går till https://',
            code: "$$('a').every(a => (a.getAttribute('href') ?? '').startsWith('https://'))",
            expected: true,
          },
          {
            description: 'Länktexterna säger något',
            code: "$$('a').every(a => !/^(klicka här|här|länk)$/i.test(a.textContent.trim()))",
            expected: true,
          },
        ],
      },
      {
        title: 'Ny flik',
        why: 'Hela sidans poäng är att den ska finnas kvar, så att man kan hoppa vidare. Då är det rätt läge för target="_blank".',
        xp: 15,
        description: 'Länksamlingen ska ligga kvar när man klickar sig vidare.',
        task: 'Uppgift: Låt alla tre länkarna öppnas i en ny flik.',
        solution: `<h1>Mina favoritsidor</h1>
<p><a href="https://developer.mozilla.org" target="_blank">MDN om webbkod</a></p>
<p><a href="https://sv.wikipedia.org" target="_blank">Svenska Wikipedia</a></p>
<p><a href="https://www.smhi.se" target="_blank">Vädret från SMHI</a></p>
`,
        hints: [
          'Varje a får ett attribut till.',
          'target="_blank" efter href.',
          '<a href="…" target="_blank">',
        ],
        tests: [
          {
            description: 'Alla tre öppnas i ny flik',
            code: "$$('a').map(a => a.getAttribute('target'))",
            expected: ['_blank', '_blank', '_blank'],
          },
        ],
      },
      {
        title: 'Till toppen',
        why: 'Växer listan blir sidan lång. En länk tillbaka upp är vanlig längst ner – och den ska inte öppnas i ny flik, den stannar på sidan.',
        xp: 15,
        description: 'Längst ner kommer en länk som hoppar upp igen.',
        task: 'Uppgift: Ge rubriken id:t `topp`. Skriv sist ett stycke med länken `Till toppen` som går till `#topp`.',
        solution: `<h1 id="topp">Mina favoritsidor</h1>
<p><a href="https://developer.mozilla.org" target="_blank">MDN om webbkod</a></p>
<p><a href="https://sv.wikipedia.org" target="_blank">Svenska Wikipedia</a></p>
<p><a href="https://www.smhi.se" target="_blank">Vädret från SMHI</a></p>
<p><a href="#topp">Till toppen</a></p>
`,
        hints: [
          'Två ändringar: ett id på h1 och en ny länk sist.',
          '<h1 id="topp">',
          '<p><a href="#topp">Till toppen</a></p>',
        ],
        tests: [
          {
            description: 'Rubriken har id:t topp',
            code: "attr('h1', 'id')",
            expected: 'topp',
          },
          {
            description: 'Sista länken går till #topp',
            code: "(() => { const link = $$('a').at(-1); return link ? [link.textContent.trim(), link.getAttribute('href')] : null; })()",
            expected: ['Till toppen', '#topp'],
          },
        ],
      },
    ],
  },
  {
    id: 'proj-fotoalbum',
    track: 'lankar',
    title: 'Fotoalbumet',
    reward: { emoji: '📷', name: 'Kamera' },
    summary: 'Ett album med bilder, bildtexter och en bild som är en länk.',
    steps: [
      {
        title: 'Två bilder',
        why: 'Samma bredd på bilderna gör albumet lugnt att titta på. Alt-texten beskriver vad som syns, för den som inte ser bilden.',
        xp: 15,
        description: 'Du bygger ett fotoalbum. Först rubriken och två bilder.',
        task: 'Uppgift: Skriv rubriken `Mitt fotoalbum` med `h1`. Visa sedan `bilder/katt.svg` och `bilder/hund.svg`, 200 pixlar breda och med alt-texter som beskriver dem.',
        starterCode: '<!-- Steg 1: två bilder -->\n',
        solution: `<h1>Mitt fotoalbum</h1>
<img src="bilder/katt.svg" alt="En orange katt som sover" width="200">
<img src="bilder/hund.svg" alt="En brun hund med en pinne" width="200">
`,
        hints: [
          'Två img efter h1, i ordningen katt och hund.',
          'Varje img behöver src, alt och width.',
          '<img src="bilder/katt.svg" alt="…" width="200">',
        ],
        tests: [
          {
            description: 'h1 säger Mitt fotoalbum',
            code: "text('h1')",
            expected: 'Mitt fotoalbum',
          },
          {
            description: 'Katten och hunden, i den ordningen',
            code: "$$('img').map(img => img.getAttribute('src'))",
            expected: ['bilder/katt.svg', 'bilder/hund.svg'],
          },
          {
            description: 'Båda har en alt-text som inte är tom',
            code: "$$('img').map(img => (img.getAttribute('alt') ?? '').trim() !== '')",
            expected: [true, true],
          },
          {
            description: 'Båda är 200 pixlar breda',
            code: "$$('img').map(img => img.getAttribute('width'))",
            expected: ['200', '200'],
          },
        ],
      },
      {
        title: 'Bildtexter',
        why: 'Alt-texten är för den som inte ser bilden. Bildtexten är för alla, och kan säga det bilden inte visar – vem det är, och när.',
        xp: 15,
        description: 'Varje bild får en bildtext under sig.',
        task: 'Uppgift: Skriv ett stycke direkt efter varje bild, där bildtexten står i `em`.',
        solution: `<h1>Mitt fotoalbum</h1>
<img src="bilder/katt.svg" alt="En orange katt som sover" width="200">
<p><em>Måns sover efter maten.</em></p>
<img src="bilder/hund.svg" alt="En brun hund med en pinne" width="200">
<p><em>Bamse hittade en pinne i skogen.</em></p>
`,
        hints: [
          'Ett p efter varje img.',
          'em ligger inuti p, runt texten.',
          '<p><em>Måns sover …</em></p>',
        ],
        tests: [
          {
            description: 'Ett stycke efter varje bild',
            code: "$$('img').map(img => img.nextElementSibling?.tagName ?? null)",
            expected: ['P', 'P'],
          },
          {
            description: 'Bildtexterna står i em',
            code: "count('img + p > em')",
            expected: 2,
          },
        ],
      },
      {
        title: 'Bild som länk',
        why: 'En bild som är en länk behöver en alt-text som säger vart den går, eftersom alt-texten blir länktexten.',
        xp: 20,
        description: 'Sist en bild som går att klicka på.',
        task: 'Uppgift: Lägg till `bilder/pannkakor.svg`, 200 pixlar bred, som en länk till `https://sv.wikipedia.org/wiki/Pannkaka`. Alt-texten ska vara `Läs om pannkakor`.',
        solution: `<h1>Mitt fotoalbum</h1>
<img src="bilder/katt.svg" alt="En orange katt som sover" width="200">
<p><em>Måns sover efter maten.</em></p>
<img src="bilder/hund.svg" alt="En brun hund med en pinne" width="200">
<p><em>Bamse hittade en pinne i skogen.</em></p>
<a href="https://sv.wikipedia.org/wiki/Pannkaka">
  <img src="bilder/pannkakor.svg" alt="Läs om pannkakor" width="200">
</a>
`,
        hints: [
          'En a med en img inuti, sist på sidan.',
          'href står på a, och src, alt och width på img.',
          '<a href="…"><img src="bilder/pannkakor.svg" alt="Läs om pannkakor" width="200"></a>',
        ],
        tests: [
          {
            description: 'Pannkakorna ligger i en länk',
            code: "attr('a img', 'src')",
            expected: 'bilder/pannkakor.svg',
          },
          {
            description: 'Länken går till Wikipedia om pannkakor',
            code: "attr('a', 'href')",
            expected: 'https://sv.wikipedia.org/wiki/Pannkaka',
          },
          {
            description: 'Alt-texten säger vart länken går',
            code: "attr('a img', 'alt')",
            expected: 'Läs om pannkakor',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-wiki',
    track: 'lankar',
    title: 'Wikisidan',
    reward: { emoji: '📚', name: 'Böcker' },
    summary: 'En faktasida om katter med en innehållsförteckning som hoppar.',
    steps: [
      {
        title: 'Delarna',
        why: 'Varje del får ett id redan nu, så att innehållsförteckningen i nästa steg har något att hoppa till.',
        xp: 15,
        description:
          'Du bygger en faktasida som på Wikipedia. Först delarna, var och en med ett id.',
        task: 'Uppgift: Skriv `Katter` med `h1`. Skriv sedan tre `h2`: `Utseende`, `Beteende` och `Historia`, med id:na `utseende`, `beteende` och `historia`. Ett stycke under var och en.',
        starterCode: '<!-- Steg 1: delarna -->\n',
        solution: `<h1>Katter</h1>
<h2 id="utseende">Utseende</h2>
<p>Katter har mjuk päls, morrhår och vassa klor.</p>
<h2 id="beteende">Beteende</h2>
<p>Katter sover mycket och jagar helst i skymningen.</p>
<h2 id="historia">Historia</h2>
<p>Människor har haft katter i nästan tiotusen år.</p>
`,
        hints: [
          'En h1, sedan tre h2 med ett p under varje.',
          'id står i den öppnande taggen: <h2 id="utseende">.',
          'id skrivs med små bokstäver, rubriken med stor.',
        ],
        tests: [
          {
            description: 'Tre delar med rätt rubriker',
            code: "texts('h2')",
            expected: ['Utseende', 'Beteende', 'Historia'],
          },
          {
            description: 'Delarna har rätt id',
            code: "$$('h2').map(h => h.id)",
            expected: ['utseende', 'beteende', 'historia'],
          },
          {
            description: 'Ett stycke under varje del',
            code: "$$('h2').map(h => h.nextElementSibling?.tagName ?? null)",
            expected: ['P', 'P', 'P'],
          },
        ],
      },
      {
        title: 'Innehållsförteckningen',
        why: 'Innehållsförteckningen står överst så att man ser vad sidan har innan man börjar läsa. Länkarna går till id:na från förra steget.',
        xp: 20,
        description:
          'Nu kommer en innehållsförteckning som hoppar till delarna.',
        task: 'Uppgift: Skriv direkt under `h1` ett stycke med tre länkar, `Utseende`, `Beteende` och `Historia`, som går till delarna. Sätt `<br>` mellan länkarna.',
        solution: `<h1>Katter</h1>
<p>
  <a href="#utseende">Utseende</a><br>
  <a href="#beteende">Beteende</a><br>
  <a href="#historia">Historia</a>
</p>
<h2 id="utseende">Utseende</h2>
<p>Katter har mjuk päls, morrhår och vassa klor.</p>
<h2 id="beteende">Beteende</h2>
<p>Katter sover mycket och jagar helst i skymningen.</p>
<h2 id="historia">Historia</h2>
<p>Människor har haft katter i nästan tiotusen år.</p>
`,
        hints: [
          'Ett p direkt efter h1, med tre a i.',
          'href är # och id:t: href="#utseende".',
          '<a href="#utseende">Utseende</a><br>',
        ],
        tests: [
          {
            description: 'Tre länkar direkt under h1',
            code: "texts('h1 + p a')",
            expected: ['Utseende', 'Beteende', 'Historia'],
          },
          {
            description: 'De går till delarna',
            code: "$$('h1 + p a').map(a => a.getAttribute('href'))",
            expected: ['#utseende', '#beteende', '#historia'],
          },
        ],
      },
      {
        title: 'Bild och källa',
        why: 'En faktasida säger var fakta kommer ifrån. Källan öppnas i ny flik, så att läsaren inte tappar bort sidan.',
        xp: 20,
        description: 'Sist en bild under Utseende och en länk till källan.',
        task: `Uppgift: Sätt \`bilder/katt.svg\` med en alt-text direkt efter rubriken \`Utseende\`. Skriv sist ett stycke med länken \`Läs mer på Wikipedia\` till \`${KATT}\`, som öppnas i en ny flik.`,
        solution: `<h1>Katter</h1>
<p>
  <a href="#utseende">Utseende</a><br>
  <a href="#beteende">Beteende</a><br>
  <a href="#historia">Historia</a>
</p>
<h2 id="utseende">Utseende</h2>
<img src="bilder/katt.svg" alt="En orange katt som sover" width="200">
<p>Katter har mjuk päls, morrhår och vassa klor.</p>
<h2 id="beteende">Beteende</h2>
<p>Katter sover mycket och jagar helst i skymningen.</p>
<h2 id="historia">Historia</h2>
<p>Människor har haft katter i nästan tiotusen år.</p>
<p><a href="${KATT}" target="_blank">Läs mer på Wikipedia</a></p>
`,
        hints: [
          'img står mellan <h2 id="utseende"> och stycket.',
          'Glöm inte alt på bilden.',
          `<p><a href="${KATT}" target="_blank">Läs mer på Wikipedia</a></p>`,
        ],
        tests: [
          {
            description: 'Katten står direkt under Utseende',
            code: "$('#utseende')?.nextElementSibling?.getAttribute('src') ?? null",
            expected: 'bilder/katt.svg',
          },
          {
            description: 'Bilden har en alt-text',
            code: "(attr('img', 'alt') ?? '').trim() !== ''",
            expected: true,
          },
          {
            description: 'Sista länken går till Wikipedia i ny flik',
            code: "(() => { const link = $$('a').at(-1); return link ? [link.textContent.trim(), link.getAttribute('href'), link.getAttribute('target')] : null; })()",
            expected: ['Läs mer på Wikipedia', KATT, '_blank'],
          },
        ],
      },
    ],
  },
  {
    id: 'proj-inkop',
    track: 'listor',
    title: 'Inköpslistan',
    reward: { emoji: '🛒', name: 'Kundvagn' },
    summary: 'En inköpslista uppdelad efter var sakerna finns i affären.',
    steps: [
      {
        title: 'Två avdelningar',
        why: 'En lista per avdelning gör att du handlar allt i mejerihyllan på en gång. Ordningen spelar ingen roll, så det är ul.',
        xp: 15,
        description:
          'Du gör en inköpslista. Sakerna delas upp efter var de finns i affären.',
        task: 'Uppgift: Skriv `Att handla` med `h1`. Skriv sedan `Mejeri` med `h2` och en punktlista med `Mjölk` och `Ost`, och `Frukt` med `h2` och en punktlista med `Äpplen` och `Bananer`.',
        starterCode: '<!-- Steg 1: två avdelningar -->\n',
        solution: `<h1>Att handla</h1>
<h2>Mejeri</h2>
<ul>
  <li>Mjölk</li>
  <li>Ost</li>
</ul>
<h2>Frukt</h2>
<ul>
  <li>Äpplen</li>
  <li>Bananer</li>
</ul>
`,
        hints: [
          'Varje h2 har en ul direkt under sig.',
          'Två li i varje lista.',
          '<h2>Mejeri</h2>\n<ul>\n  <li>Mjölk</li> …',
        ],
        tests: [
          {
            description: 'Två avdelningar',
            code: "texts('h2')",
            expected: ['Mejeri', 'Frukt'],
          },
          {
            description: 'En punktlista under varje avdelning',
            code: "$$('h2').map(h => h.nextElementSibling?.tagName ?? null)",
            expected: ['UL', 'UL'],
          },
          {
            description: 'Rätt saker i listorna',
            code: "texts('li')",
            expected: ['Mjölk', 'Ost', 'Äpplen', 'Bananer'],
          },
        ],
      },
      {
        title: 'Glöm inte!',
        why: 'strong säger att mjölken är viktigast. Den inre listan hör till Äpplen, så den ligger inuti just det li:t.',
        xp: 20,
        description:
          'Mjölken får inte glömmas, och äpplena ska vara av två sorter.',
        task: 'Uppgift: Sätt `strong` runt `Mjölk`. Lägg en egen punktlista med `Gröna` och `Röda` under `Äpplen`.',
        solution: `<h1>Att handla</h1>
<h2>Mejeri</h2>
<ul>
  <li><strong>Mjölk</strong></li>
  <li>Ost</li>
</ul>
<h2>Frukt</h2>
<ul>
  <li>Äpplen
    <ul>
      <li>Gröna</li>
      <li>Röda</li>
    </ul>
  </li>
  <li>Bananer</li>
</ul>
`,
        hints: [
          '<li><strong>Mjölk</strong></li>',
          'Den inre listan står inuti li, efter ordet Äpplen.',
          '<li>Äpplen <ul><li>Gröna</li><li>Röda</li></ul></li>',
        ],
        tests: [
          {
            description: 'Mjölk står i strong',
            code: "text('li strong')",
            expected: 'Mjölk',
          },
          {
            description: 'Gröna och Röda ligger under Äpplen',
            code: "texts('li li')",
            expected: ['Gröna', 'Röda'],
          },
        ],
      },
      {
        title: 'I affären',
        why: 'Stegen i affären görs i ordning – man betalar inte först – så den listan är en ol.',
        xp: 15,
        description: 'Sist en lista över vad man gör i affären, i ordning.',
        task: 'Uppgift: Lägg till `Så här gör du` med `h2` och en numrerad lista: `Ta en korg`, `Handla allt på listan` och `Betala`.',
        solution: `<h1>Att handla</h1>
<h2>Mejeri</h2>
<ul>
  <li><strong>Mjölk</strong></li>
  <li>Ost</li>
</ul>
<h2>Frukt</h2>
<ul>
  <li>Äpplen
    <ul>
      <li>Gröna</li>
      <li>Röda</li>
    </ul>
  </li>
  <li>Bananer</li>
</ul>
<h2>Så här gör du</h2>
<ol>
  <li>Ta en korg</li>
  <li>Handla allt på listan</li>
  <li>Betala</li>
</ol>
`,
        hints: [
          'En h2 och sedan en ol, sist på sidan.',
          'ol fungerar som ul, men numrerar.',
          '<ol>\n  <li>Ta en korg</li> …',
        ],
        tests: [
          {
            description: 'Sista rubriken är Så här gör du',
            code: "texts('h2').at(-1) ?? null",
            expected: 'Så här gör du',
          },
          {
            description: 'Stegen står i en numrerad lista',
            code: "texts('ol li')",
            expected: ['Ta en korg', 'Handla allt på listan', 'Betala'],
          },
        ],
      },
    ],
  },
  {
    id: 'proj-topp5',
    track: 'listor',
    title: 'Topp 5-listan',
    reward: { emoji: '🏆', name: 'Pokal' },
    summary: 'Dina fem favoriter, med nedräkning och varför de är bäst.',
    steps: [
      {
        title: 'Fem favoriter',
        why: 'Ordningen är hela poängen med en topplista, så det är ol. Webbläsaren numrerar, så flyttar du en rad blir siffrorna ändå rätt.',
        xp: 15,
        description:
          'Du gör en topplista över dina favoriter – filmer, spel, böcker eller låtar.',
        task: 'Uppgift: Skriv en `h1` som börjar med `Min topp 5`, till exempel `Min topp 5: filmer`. Skriv sedan en numrerad lista med fem saker.',
        starterCode: '<!-- Steg 1: fem favoriter -->\n',
        solution: `<h1>Min topp 5: filmer</h1>
<ol>
  <li>Spirited Away</li>
  <li>Toy Story</li>
  <li>Paddington 2</li>
  <li>Coco</li>
  <li>Wall-E</li>
</ol>
`,
        hints: [
          'En h1 och en ol med fem li.',
          'Rubriken börjar exakt med Min topp 5.',
          '<ol>\n  <li>…</li> – fem gånger.',
        ],
        tests: [
          {
            description: 'h1 börjar med Min topp 5',
            code: "text('h1')?.startsWith('Min topp 5') ?? null",
            expected: true,
          },
          {
            description: 'Fem saker i en numrerad lista',
            code: "count('ol > li')",
            expected: 5,
          },
        ],
      },
      {
        title: 'Varför?',
        why: 'Namnet i strong och förklaringen efter gör att man kan skumma namnen men ändå läsa varför.',
        xp: 15,
        description: 'En topplista blir roligare när man vet varför.',
        task: 'Uppgift: Sätt `strong` runt namnet i varje rad, och skriv efter det varför du gillar den.',
        solution: `<h1>Min topp 5: filmer</h1>
<ol>
  <li><strong>Spirited Away</strong> – den vackraste filmen jag sett.</li>
  <li><strong>Toy Story</strong> – leksaker som lever, vad mer behövs?</li>
  <li><strong>Paddington 2</strong> – jag skrattar varje gång.</li>
  <li><strong>Coco</strong> – fin musik och ett sorgligt slut.</li>
  <li><strong>Wall-E</strong> – nästan inget pratas, men allt förstås.</li>
</ol>
`,
        hints: [
          'strong ligger inuti li, runt namnet.',
          'Efter </strong> skriver du varför, i samma li.',
          '<li><strong>Coco</strong> – fin musik.</li>',
        ],
        tests: [
          {
            description: 'Ett namn i strong på varje rad',
            code: "count('ol > li > strong')",
            expected: 5,
          },
          {
            description: 'Varje rad säger mer än namnet',
            code: "$$('ol > li').every(li => li.textContent.trim().length > li.querySelector('strong')?.textContent.trim().length + 3)",
            expected: true,
          },
        ],
      },
      {
        title: 'Nedräkningen',
        why: 'Attributet reversed räknar baklänges, så listan börjar med 5 och spänningen byggs upp mot etta. Raderna byter du plats på själv.',
        xp: 20,
        description: 'Riktiga topplistor räknar ner. Nummer 1 kommer sist.',
        task: 'Uppgift: Lägg till attributet `reversed` på `ol` och vänd på raderna, så att din etta står sist. Skriv efter listan ett stycke: `Nummer 1 är bäst!`',
        solution: `<h1>Min topp 5: filmer</h1>
<ol reversed>
  <li><strong>Wall-E</strong> – nästan inget pratas, men allt förstås.</li>
  <li><strong>Coco</strong> – fin musik och ett sorgligt slut.</li>
  <li><strong>Paddington 2</strong> – jag skrattar varje gång.</li>
  <li><strong>Toy Story</strong> – leksaker som lever, vad mer behövs?</li>
  <li><strong>Spirited Away</strong> – den vackraste filmen jag sett.</li>
</ol>
<p>Nummer 1 är bäst!</p>
`,
        hints: [
          '<ol reversed> – attributet behöver inget värde.',
          'Flytta raderna så att den som stod först står sist.',
          '<p>Nummer 1 är bäst!</p> efter </ol>.',
        ],
        tests: [
          {
            description: 'Listan räknar baklänges',
            code: "$('ol')?.hasAttribute('reversed') ?? null",
            expected: true,
          },
          {
            description: 'Stycket efter listan säger Nummer 1 är bäst!',
            code: "text('ol + p')",
            expected: 'Nummer 1 är bäst!',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-schema',
    track: 'listor',
    title: 'Veckoschemat',
    reward: { emoji: '📅', name: 'Kalender' },
    summary: 'Ditt skolschema som en tabell, med en lunch över alla dagar.',
    steps: [
      {
        title: 'Rubrikraden',
        why: 'Rubrikraden i thead säger vad varje kolumn är. Skärmläsaren läser upp "Tisdag" före lektionen i den kolumnen.',
        xp: 15,
        description:
          'Du bygger ett veckoschema. Först tabellens namn och rubrikraden.',
        task: 'Uppgift: Skriv en tabell med rubriken `Mitt schema` (`caption`) och en `thead` med rubrikcellerna `Tid`, `Måndag`, `Tisdag` och `Onsdag`.',
        starterCode: '<!-- Steg 1: rubrikraden -->\n',
        solution: `<table>
  <caption>Mitt schema</caption>
  <thead>
    <tr><th>Tid</th><th>Måndag</th><th>Tisdag</th><th>Onsdag</th></tr>
  </thead>
</table>
`,
        hints: [
          'table, sedan caption och sedan thead.',
          'thead har en tr med fyra th.',
          '<thead>\n  <tr><th>Tid</th>…</tr>\n</thead>',
        ],
        tests: [
          {
            description: 'Tabellen heter Mitt schema',
            code: "text('caption')",
            expected: 'Mitt schema',
          },
          {
            description: 'Rubrikraden i thead',
            code: "texts('thead th')",
            expected: ['Tid', 'Måndag', 'Tisdag', 'Onsdag'],
          },
        ],
      },
      {
        title: 'Lektionerna',
        why: 'Tiden är rubriken för raden, så den är en th också. Då läser skärmläsaren "8.00, Tisdag: Svenska".',
        xp: 20,
        description: 'Nu kommer lektionerna, en rad för varje tid.',
        task: 'Uppgift: Lägg till en `tbody` med två rader. Första cellen i varje rad är tiden, som `th`: `8.00` med `Matte`, `Svenska`, `Engelska` och `9.00` med `Idrott`, `Matte`, `Bild`.',
        solution: `<table>
  <caption>Mitt schema</caption>
  <thead>
    <tr><th>Tid</th><th>Måndag</th><th>Tisdag</th><th>Onsdag</th></tr>
  </thead>
  <tbody>
    <tr><th>8.00</th><td>Matte</td><td>Svenska</td><td>Engelska</td></tr>
    <tr><th>9.00</th><td>Idrott</td><td>Matte</td><td>Bild</td></tr>
  </tbody>
</table>
`,
        hints: [
          'tbody efter thead, med två tr.',
          'Varje rad börjar med en th för tiden och sedan tre td.',
          '<tr><th>8.00</th><td>Matte</td>…</tr>',
        ],
        tests: [
          {
            description: 'Två rader med rätt lektioner',
            code: "$$('tbody tr').map(tr => [...tr.children].map(cell => cell.textContent.trim()))",
            expected: [
              ['8.00', 'Matte', 'Svenska', 'Engelska'],
              ['9.00', 'Idrott', 'Matte', 'Bild'],
            ],
          },
          {
            description: 'Tiden är en rubrikcell',
            code: "$$('tbody tr').map(tr => tr.children[0]?.tagName ?? null)",
            expected: ['TH', 'TH'],
          },
        ],
      },
      {
        title: 'Lunchen',
        why: 'Lunchen är samma alla dagar. colspan låter en cell sträcka sig över flera kolumner, så att det inte står Lunch tre gånger.',
        xp: 20,
        description: 'Sist lunchen, som är samma alla dagar.',
        task: 'Uppgift: Lägg till en tredje rad: `11.30` som `th` och sedan en enda cell med `Lunch` som går över alla tre dagarna med `colspan="3"`.',
        solution: `<table>
  <caption>Mitt schema</caption>
  <thead>
    <tr><th>Tid</th><th>Måndag</th><th>Tisdag</th><th>Onsdag</th></tr>
  </thead>
  <tbody>
    <tr><th>8.00</th><td>Matte</td><td>Svenska</td><td>Engelska</td></tr>
    <tr><th>9.00</th><td>Idrott</td><td>Matte</td><td>Bild</td></tr>
    <tr><th>11.30</th><td colspan="3">Lunch</td></tr>
  </tbody>
</table>
`,
        hints: [
          'En ny tr sist i tbody.',
          'Raden har bara två celler: th för tiden och en td.',
          '<td colspan="3">Lunch</td>',
        ],
        tests: [
          {
            description: 'Tre rader i tbody',
            code: "count('tbody tr')",
            expected: 3,
          },
          {
            description: 'Lunchen går över tre kolumner',
            code: "[text('td[colspan]'), attr('td[colspan]', 'colspan')]",
            expected: ['Lunch', '3'],
          },
          {
            description: 'Raden börjar med 11.30',
            code: "$$('tbody tr')[2]?.children[0]?.textContent.trim() ?? null",
            expected: '11.30',
          },
        ],
      },
    ],
  },
];

// Stegen som vanliga övningar, så att samma editor och rättning kan
// användas. Ett steg utan egen startkod börjar med förra stegets lösning.
export const PROJECT_STEPS = PROJECTS.flatMap(project =>
  project.steps.map((step, index) => ({
    ...step,
    id: `${project.id}-${index + 1}`,
    title: `${project.title}: ${step.title}`,
    track: project.track,
    project: project.id,
    stepNumber: index + 1,
    files: step.files ?? project.files,
    starterCode:
      step.starterCode ??
      `${project.steps[index - 1].solution}\n<!-- Steg ${index + 1}: ${step.title.toLowerCase()} -->\n`,
  })),
);

export function isProjectComplete(project, completedIds) {
  return project.steps.every((_, index) =>
    completedIds.includes(`${project.id}-${index + 1}`),
  );
}

// Ett projekt som byggs klart utan ledtrådar sparas som ett eget id
// bland de klara, så att bonusen följer med som allt annat.
export function noHintsId(project) {
  return `${project.id}-utan-ledtradar`;
}

// Bonusen för att bygga utan ledtrådar: hälften av projektets XP.
export function noHintsBonusXp(project) {
  const xp = project.steps.reduce((sum, step) => sum + step.xp, 0);
  return Math.round(xp / 2);
}
