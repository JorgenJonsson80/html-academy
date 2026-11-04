// Projekt som låses upp när en bana är klar. Eleven väljer ett av tre men
// kan göra alla. Varje projekt byggs i steg, och koden från förra steget
// följer med till nästa. why förklarar varför koden ser ut som den gör.
// reward: priset man får när projektet är klart. Facit följer samma
// regler som övningarna (se test/concepts.js).
const KATT = 'https://sv.wikipedia.org/wiki/Katt';

// Sidorna i CSS-projekten. Stegen ändrar bara <style>, så HTML:en står
// här en gång och funktionerna sätter ihop den med stegets CSS.
const withStyle = html => css => `<style>\n${css}</style>\n${html}`;

const AFFISCH = `<h1>Sommarkonsert</h1>
<p class="datum">Lördag 14 juni kl. 18</p>
<p>Skolans kör och band spelar i parken. Ta med filt och fika!</p>
<p class="pris">Fri entré</p>
`;
const affisch = withStyle(AFFISCH);

const KAFE = `<h1>Café Kanelbullen</h1>
<h2>Fika</h2>
<ul>
  <li>Kanelbulle <span class="pris">25 kr</span></li>
  <li>Chokladboll <span class="pris">20 kr</span> <span class="vegansk">vegansk</span></li>
</ul>
<h2>Att dricka</h2>
<ul>
  <li>Kaffe <span class="pris">30 kr</span></li>
  <li>Varm choklad <span class="pris">35 kr</span> <span class="vegansk">vegansk</span></li>
</ul>
<p>Hitta hit: <a href="https://www.openstreetmap.org">karta</a></p>
`;
const kafe = withStyle(KAFE);

const MORKT = `<h1>Min blogg</h1>
<p class="ingress">Om kod, katter och kanelbullar.</p>
<h2>Dagens inlägg</h2>
<p>Idag lärde jag mig CSS. Nu kan jag byta färg på allt!</p>
<p>Läs mer på <a href="https://developer.mozilla.org">MDN</a>.</p>
`;
const morkt = withStyle(MORKT);

const PROFIL = `<div class="profil">
  <img src="bilder/katt.svg" alt="Katten Måns som tittar in i kameran" width="200">
  <h2>Måns</h2>
  <p class="roll">Chefskatt</p>
  <p>Gillar lådor, solfläckar och att sitta på tangentbordet.</p>
</div>
`;
const profil = withStyle(PROFIL);

const KNAPPAR = `<h1>Vill du spara?</h1>
<p>
  <a class="knapp" href="#">Spara</a>
  <a class="knapp knapp-andra" href="#">Avbryt</a>
</p>
`;
const knappar = withStyle(KNAPPAR);

const LAPPAR = `<h1>Att göra</h1>
<div class="lapp">Köp mjölk och bröd</div>
<div class="lapp viktig">Lämna in läxan på måndag</div>
<div class="lapp">Ring mormor</div>
`;
const lappar = withStyle(LAPPAR);

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
  {
    id: 'proj-blogg',
    track: 'struktur',
    title: 'Bloggen',
    reward: { emoji: '✏️', name: 'Penna' },
    summary: 'En blogg med sidhuvud, meny, inlägg och sidfot.',
    steps: [
      {
        title: 'Sidhuvudet',
        why: 'Sidhuvudet är samma på alla sidor i bloggen. Menyn ligger i nav så att en skärmläsare kan hoppa direkt till den.',
        xp: 15,
        description:
          'Du bygger en blogg. Först sidhuvudet med namnet och menyn.',
        task: 'Uppgift: Skriv en `header` med bloggens namn i en `h1` och en `nav` med en punktlista med två länkar: `Inlägg` till `#inlagg` och `Om mig` till `#om`.',
        starterCode: '<!-- Steg 1: sidhuvudet -->\n',
        solution: `<header>
  <h1>Adas blogg</h1>
  <nav>
    <ul>
      <li><a href="#inlagg">Inlägg</a></li>
      <li><a href="#om">Om mig</a></li>
    </ul>
  </nav>
</header>
`,
        hints: [
          'header runt både h1 och nav.',
          'I nav: en ul med två li och en a i varje.',
          '<li><a href="#inlagg">Inlägg</a></li>',
        ],
        tests: [
          {
            description: 'Bloggens namn står i header',
            code: "count('header h1')",
            expected: 1,
          },
          {
            description: 'Menyn har Inlägg och Om mig',
            code: "texts('header nav li a')",
            expected: ['Inlägg', 'Om mig'],
          },
          {
            description: 'Länkarna går till #inlagg och #om',
            code: "$$('nav a').map(a => a.getAttribute('href'))",
            expected: ['#inlagg', '#om'],
          },
        ],
      },
      {
        title: 'Inläggen',
        why: 'Varje inlägg är en article, eftersom det går att läsa för sig. Avsnitten är section och har id:na som menyn pekar på.',
        xp: 20,
        description: 'Nu kommer bloggens innehåll: inläggen och lite om dig.',
        task: 'Uppgift: Skriv en `main` med två `section`. Den första har id:t `inlagg`, rubriken `Inlägg` och två `article` med `h3` och ett stycke. Den andra har id:t `om`, rubriken `Om mig` och ett stycke.',
        solution: `<header>
  <h1>Adas blogg</h1>
  <nav>
    <ul>
      <li><a href="#inlagg">Inlägg</a></li>
      <li><a href="#om">Om mig</a></li>
    </ul>
  </nav>
</header>
<main>
  <section id="inlagg">
    <h2>Inlägg</h2>
    <article>
      <h3>Min första sida</h3>
      <p>Idag byggde jag min första webbsida.</p>
    </article>
    <article>
      <h3>Nu kan jag formulär</h3>
      <p>Snart kan jag bygga en gästbok.</p>
    </article>
  </section>
  <section id="om">
    <h2>Om mig</h2>
    <p>Jag heter Ada och lär mig HTML.</p>
  </section>
</main>
`,
        hints: [
          'main efter </header>, och båda section i main.',
          'Den första section har två article, var och en med h3 och p.',
          '<section id="inlagg">\n  <h2>Inlägg</h2>\n  <article>…</article>',
        ],
        tests: [
          {
            description: 'Två avsnitt i main med id:na inlagg och om',
            code: "$$('main > section').map(section => section.id)",
            expected: ['inlagg', 'om'],
          },
          {
            description: 'Två inlägg i avsnittet Inlägg',
            code: "$$('#inlagg article').map(a => a.querySelector('h3') ? 'h3' : null)",
            expected: ['h3', 'h3'],
          },
          {
            description: 'Om mig har en rubrik och ett stycke',
            code: "[text('#om h2'), count('#om p')]",
            expected: ['Om mig', 1],
          },
        ],
      },
      {
        title: 'Sidfoten',
        why: 'Sidfoten är där man letar efter kontakt och vem som äger sidan. Den står efter main, aldrig inuti.',
        xp: 15,
        description: 'Sist sidfoten, med © och ett sätt att nå dig.',
        task: 'Uppgift: Skriv en `footer` efter `main` med två stycken: ett med `©`, året och ditt namn, och ett med länken `Mejla mig` till `mailto:` och en adress.',
        solution: `<header>
  <h1>Adas blogg</h1>
  <nav>
    <ul>
      <li><a href="#inlagg">Inlägg</a></li>
      <li><a href="#om">Om mig</a></li>
    </ul>
  </nav>
</header>
<main>
  <section id="inlagg">
    <h2>Inlägg</h2>
    <article>
      <h3>Min första sida</h3>
      <p>Idag byggde jag min första webbsida.</p>
    </article>
    <article>
      <h3>Nu kan jag formulär</h3>
      <p>Snart kan jag bygga en gästbok.</p>
    </article>
  </section>
  <section id="om">
    <h2>Om mig</h2>
    <p>Jag heter Ada och lär mig HTML.</p>
  </section>
</main>
<footer>
  <p>&copy; 2026 Ada</p>
  <p><a href="mailto:ada@example.com">Mejla mig</a></p>
</footer>
`,
        hints: [
          'footer efter </main>.',
          '&copy; blir ©.',
          '<a href="mailto:ada@example.com">Mejla mig</a>',
        ],
        tests: [
          {
            description: 'Sidfoten står efter main',
            code: "$('main')?.nextElementSibling?.tagName ?? null",
            expected: 'FOOTER',
          },
          {
            description: 'Sidfoten har ©',
            code: "text('footer')?.includes('©') ?? null",
            expected: true,
          },
          {
            description: 'Mejla mig går till en mailto-adress',
            code: "(() => { const link = $$('footer a').find(a => a.textContent.trim() === 'Mejla mig'); return link ? link.getAttribute('href').startsWith('mailto:') : null; })()",
            expected: true,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-forening',
    track: 'struktur',
    title: 'Föreningssidan',
    reward: { emoji: '🪺', name: 'Fågelbo' },
    summary: 'En hel sida för fågelklubben, från doctype till sidfot.',
    steps: [
      {
        title: 'Skalet',
        why: 'Skalet är samma på varje sida du gör: doctype, språk, teckenkodning och titel. Titeln är det som syns i fliken och på Google.',
        xp: 15,
        description:
          'Du bygger en sida för fågelklubben, som ett helt dokument.',
        task: 'Uppgift: Skriv ett helt dokument på svenska med `<meta charset="utf-8">` och titeln `Fågelklubben`. I `body` en `header` med rubriken `Fågelklubben`.',
        starterCode: '<!-- Steg 1: skalet -->\n',
        solution: `<!doctype html>
<html lang="sv">
  <head>
    <meta charset="utf-8">
    <title>Fågelklubben</title>
  </head>
  <body>
    <header>
      <h1>Fågelklubben</h1>
    </header>
  </body>
</html>
`,
        hints: [
          '<!doctype html> först, sedan <html lang="sv">.',
          'meta och title i head, header i body.',
          '<header>\n  <h1>Fågelklubben</h1>\n</header>',
        ],
        tests: [
          {
            description: 'Ett helt dokument på svenska',
            code: "[doc.doctype?.name ?? null, doc.documentElement.getAttribute('lang')]",
            expected: ['html', 'sv'],
          },
          {
            description: 'utf-8 och titeln Fågelklubben',
            code: "[attr('meta[charset]', 'charset')?.toLowerCase() ?? null, doc.title]",
            expected: ['utf-8', 'Fågelklubben'],
          },
          {
            description: 'Rubriken står i header',
            code: "text('header h1')",
            expected: 'Fågelklubben',
          },
        ],
      },
      {
        title: 'Avsnitten',
        why: 'Varje avsnitt får ett id redan nu, så att menyn i nästa steg har något att hoppa till.',
        xp: 20,
        description: 'Nu kommer det klubben vill berätta.',
        task: 'Uppgift: Skriv en `main` efter `header` med tre `section`: `Om oss` (id `om`), `Utflykter` (id `utflykter`) och `Bli medlem` (id `medlem`). Var och en har `h2` och ett stycke, och `Utflykter` en punktlista med minst två utflykter i stället för stycket.',
        solution: `<!doctype html>
<html lang="sv">
  <head>
    <meta charset="utf-8">
    <title>Fågelklubben</title>
  </head>
  <body>
    <header>
      <h1>Fågelklubben</h1>
    </header>
    <main>
      <section id="om">
        <h2>Om oss</h2>
        <p>Vi tittar på fåglar varje helg, året runt.</p>
      </section>
      <section id="utflykter">
        <h2>Utflykter</h2>
        <ul>
          <li>Tranorna vid sjön i april</li>
          <li>Ugglekväll i skogen i maj</li>
        </ul>
      </section>
      <section id="medlem">
        <h2>Bli medlem</h2>
        <p>Det kostar 100 kr om året. Kikare finns att låna.</p>
      </section>
    </main>
  </body>
</html>
`,
        hints: [
          'main efter </header>, inuti body.',
          'Tre section med id, h2 och innehåll.',
          '<section id="utflykter">\n  <h2>Utflykter</h2>\n  <ul>…</ul>\n</section>',
        ],
        tests: [
          {
            description: 'Tre avsnitt med rätt id',
            code: "$$('main > section').map(section => section.id)",
            expected: ['om', 'utflykter', 'medlem'],
          },
          {
            description: 'Rubrikerna är Om oss, Utflykter och Bli medlem',
            code: "texts('main section > h2')",
            expected: ['Om oss', 'Utflykter', 'Bli medlem'],
          },
          {
            description: 'Utflykterna står i en punktlista',
            code: "count('#utflykter ul li') >= 2",
            expected: true,
          },
        ],
      },
      {
        title: 'Meny och sidfot',
        why: 'Menyn i header gör att man kan hoppa direkt till det man söker. Sidfoten säger hur man når klubben.',
        xp: 20,
        description: 'Sist en meny som hoppar till avsnitten, och en sidfot.',
        task: 'Uppgift: Skriv en `nav` i `header`, efter rubriken, med tre länkar till avsnitten. Skriv en `footer` efter `main` med en länk som ringer `tel:+46701234567`.',
        solution: `<!doctype html>
<html lang="sv">
  <head>
    <meta charset="utf-8">
    <title>Fågelklubben</title>
  </head>
  <body>
    <header>
      <h1>Fågelklubben</h1>
      <nav>
        <ul>
          <li><a href="#om">Om oss</a></li>
          <li><a href="#utflykter">Utflykter</a></li>
          <li><a href="#medlem">Bli medlem</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <section id="om">
        <h2>Om oss</h2>
        <p>Vi tittar på fåglar varje helg, året runt.</p>
      </section>
      <section id="utflykter">
        <h2>Utflykter</h2>
        <ul>
          <li>Tranorna vid sjön i april</li>
          <li>Ugglekväll i skogen i maj</li>
        </ul>
      </section>
      <section id="medlem">
        <h2>Bli medlem</h2>
        <p>Det kostar 100 kr om året. Kikare finns att låna.</p>
      </section>
    </main>
    <footer>
      <p><a href="tel:+46701234567">Ring oss</a></p>
    </footer>
  </body>
</html>
`,
        hints: [
          'nav står i header, efter </h1>.',
          'Länkarna går till #om, #utflykter och #medlem.',
          '<footer>\n  <p><a href="tel:+46701234567">Ring oss</a></p>\n</footer>',
        ],
        tests: [
          {
            description: 'Menyn i header hoppar till de tre avsnitten',
            code: "$$('header nav a').map(a => a.getAttribute('href'))",
            expected: ['#om', '#utflykter', '#medlem'],
          },
          {
            description: 'Sidfoten ringer klubben',
            code: "attr('footer a', 'href')",
            expected: 'tel:+46701234567',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-restaurang',
    track: 'struktur',
    title: 'Restaurangen',
    reward: { emoji: '🍽️', name: 'Tallrik' },
    summary: 'En restaurangsida från noll, med meny som tabell och adress.',
    steps: [
      {
        title: 'Från noll',
        why: 'Du skriver hela skalet själv igen – efter några gånger sitter det i fingrarna.',
        xp: 15,
        description: 'Du bygger en sida för en pizzeria, från första raden.',
        task: 'Uppgift: Skriv ett helt dokument på svenska med `utf-8` och titeln `Pizzeria Luna`. I `body` en `header` med rubriken `Pizzeria Luna` och ett stycke under: `Stenugnsbakat sedan 1998`.',
        starterCode: '<!-- Steg 1: från noll -->\n',
        solution: `<!doctype html>
<html lang="sv">
  <head>
    <meta charset="utf-8">
    <title>Pizzeria Luna</title>
  </head>
  <body>
    <header>
      <h1>Pizzeria Luna</h1>
      <p>Stenugnsbakat sedan 1998</p>
    </header>
  </body>
</html>
`,
        hints: [
          'doctype, html med lang, head med meta och title, body.',
          'Både h1 och stycket står i header.',
          '<header>\n  <h1>Pizzeria Luna</h1>\n  <p>Stenugnsbakat sedan 1998</p>\n</header>',
        ],
        tests: [
          {
            description: 'Ett helt dokument på svenska med utf-8',
            code: "[doc.doctype?.name ?? null, doc.documentElement.getAttribute('lang'), attr('meta[charset]', 'charset')?.toLowerCase() ?? null]",
            expected: ['html', 'sv', 'utf-8'],
          },
          {
            description: 'Titeln är Pizzeria Luna',
            code: 'doc.title',
            expected: 'Pizzeria Luna',
          },
          {
            description: 'Sidhuvudet har rubriken och stycket',
            code: "[text('header h1'), text('header p')]",
            expected: ['Pizzeria Luna', 'Stenugnsbakat sedan 1998'],
          },
        ],
      },
      {
        title: 'Menyn',
        why: 'Pizzorna och priserna är data i rader och kolumner, så de blir en tabell. Den står i en section med rubrik inuti main.',
        xp: 20,
        description: 'Nu kommer matmenyn.',
        task: 'Uppgift: Skriv en `main` med en `section` som har rubriken `Meny` (`h2`) och en tabell. Tabellen har rubrikraden `Pizza` och `Pris` i `thead`, och minst tre pizzor i `tbody`.',
        solution: `<!doctype html>
<html lang="sv">
  <head>
    <meta charset="utf-8">
    <title>Pizzeria Luna</title>
  </head>
  <body>
    <header>
      <h1>Pizzeria Luna</h1>
      <p>Stenugnsbakat sedan 1998</p>
    </header>
    <main>
      <section>
        <h2>Meny</h2>
        <table>
          <thead>
            <tr><th>Pizza</th><th>Pris</th></tr>
          </thead>
          <tbody>
            <tr><td>Margherita</td><td>95 kr</td></tr>
            <tr><td>Vesuvio</td><td>105 kr</td></tr>
            <tr><td>Capricciosa</td><td>110 kr</td></tr>
          </tbody>
        </table>
      </section>
    </main>
  </body>
</html>
`,
        hints: [
          'main efter </header>, en section i main.',
          'h2 och sedan table i section.',
          '<tr><td>Margherita</td><td>95 kr</td></tr>',
        ],
        tests: [
          {
            description: 'Ett avsnitt Meny i main',
            code: "text('main section h2')",
            expected: 'Meny',
          },
          {
            description: 'Rubrikraden är Pizza och Pris',
            code: "texts('main thead th')",
            expected: ['Pizza', 'Pris'],
          },
          {
            description: 'Minst tre pizzor med två celler var',
            code: "(() => { const rows = $$('main tbody tr'); return rows.length >= 3 && rows.every(row => row.children.length === 2); })()",
            expected: true,
          },
        ],
      },
      {
        title: 'Hitta hit',
        why: 'Adressens rader hör ihop, så de står i ett stycke med br. Telefonnumret är en länk, så att man kan ringa direkt från mobilen.',
        xp: 15,
        description: 'Sist sidfoten, med adress och telefon.',
        task: 'Uppgift: Skriv en `footer` efter `main` med adressen i ett stycke: `Månvägen 1`, `<br>`, `123 45 Småstad`. Sedan ett stycke med länken `Ring och beställ` till `tel:+46401234567`.',
        solution: `<!doctype html>
<html lang="sv">
  <head>
    <meta charset="utf-8">
    <title>Pizzeria Luna</title>
  </head>
  <body>
    <header>
      <h1>Pizzeria Luna</h1>
      <p>Stenugnsbakat sedan 1998</p>
    </header>
    <main>
      <section>
        <h2>Meny</h2>
        <table>
          <thead>
            <tr><th>Pizza</th><th>Pris</th></tr>
          </thead>
          <tbody>
            <tr><td>Margherita</td><td>95 kr</td></tr>
            <tr><td>Vesuvio</td><td>105 kr</td></tr>
            <tr><td>Capricciosa</td><td>110 kr</td></tr>
          </tbody>
        </table>
      </section>
    </main>
    <footer>
      <p>Månvägen 1<br>123 45 Småstad</p>
      <p><a href="tel:+46401234567">Ring och beställ</a></p>
    </footer>
  </body>
</html>
`,
        hints: [
          'footer efter </main>.',
          '<p>Månvägen 1<br>123 45 Småstad</p>',
          '<a href="tel:+46401234567">Ring och beställ</a>',
        ],
        tests: [
          {
            description: 'Adressen står på två rader i sidfoten',
            code: "(() => { const p = $('footer p'); return p ? [...p.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent.trim()).filter(Boolean) : null; })()",
            expected: ['Månvägen 1', '123 45 Småstad'],
          },
          {
            description: 'Ring och beställ går till telefonnumret',
            code: "(() => { const link = $('footer a'); return link ? [link.textContent.trim(), link.getAttribute('href')] : null; })()",
            expected: ['Ring och beställ', 'tel:+46401234567'],
          },
        ],
      },
    ],
  },
  {
    id: 'proj-kontakt',
    track: 'formular',
    title: 'Kontaktformuläret',
    reward: { emoji: '✉️', name: 'Kuvert' },
    summary: 'Ett formulär där besökarna kan skriva till dig.',
    steps: [
      {
        title: 'Vem är du?',
        why: 'id kopplar ihop etiketten och fältet, name är det som skickas. Typen email gör att mobilen visar @ på tangentbordet.',
        xp: 15,
        description: 'Du bygger ett kontaktformulär. Först: vem skriver?',
        task: 'Uppgift: Skriv en `form` med två fält med etiketter: `Namn` (text, id och name `namn`) och `E-post` (email, id och name `epost`).',
        starterCode: '<!-- Steg 1: vem är du? -->\n',
        solution: `<form>
  <label for="namn">Namn</label>
  <input type="text" id="namn" name="namn">
  <label for="epost">E-post</label>
  <input type="email" id="epost" name="epost">
</form>
`,
        hints: [
          'form runt allt, och en label före varje input.',
          'Varje input har type, id och name.',
          '<label for="epost">E-post</label>\n<input type="email" id="epost" name="epost">',
        ],
        tests: [
          {
            description: 'Två fält i formuläret: text och email',
            code: "$$('form input').map(input => input.type)",
            expected: ['text', 'email'],
          },
          {
            description: 'Fälten heter namn och epost',
            code: "$$('form input').map(input => input.name)",
            expected: ['namn', 'epost'],
          },
          {
            description: 'Etiketterna Namn och E-post hör till fälten',
            code: "$$('form input').map(input => input.labels?.[0]?.textContent.trim() ?? null)",
            expected: ['Namn', 'E-post'],
          },
        ],
      },
      {
        title: 'Meddelandet',
        why: 'Ett meddelande är flera rader, så det blir ett textarea. Ett tomt meddelande är meningslöst att skicka – därför required, på alla tre.',
        xp: 15,
        description: 'Nu kommer själva meddelandet, och inget får vara tomt.',
        task: 'Uppgift: Lägg till ett `textarea` med etiketten `Meddelande` (id och name `meddelande`, 5 rader). Gör alla tre fälten obligatoriska.',
        solution: `<form>
  <label for="namn">Namn</label>
  <input type="text" id="namn" name="namn" required>
  <label for="epost">E-post</label>
  <input type="email" id="epost" name="epost" required>
  <label for="meddelande">Meddelande</label>
  <textarea id="meddelande" name="meddelande" rows="5" required></textarea>
</form>
`,
        hints: [
          'label och textarea efter sista input.',
          'required på alla tre fälten, även textarea.',
          '<textarea id="meddelande" name="meddelande" rows="5" required></textarea>',
        ],
        tests: [
          {
            description: 'Ett textarea med etiketten Meddelande',
            code: "[$('textarea')?.name ?? null, $('textarea')?.labels?.[0]?.textContent.trim() ?? null]",
            expected: ['meddelande', 'Meddelande'],
          },
          {
            description: 'Alla tre fälten måste fyllas i',
            code: "$$('input, textarea').map(field => field.required)",
            expected: [true, true, true],
          },
        ],
      },
      {
        title: 'Skicka',
        why: 'Kryssrutan skickas bara när den är ikryssad, och då med sitt value. Prova att skicka med och utan kryss i rutan.',
        xp: 20,
        description: 'Sist en kryssruta och knappen.',
        task: 'Uppgift: Lägg till en kryssruta med etiketten `Skicka en kopia till mig` (`name="kopia"`, `value="ja"`) och en knapp som säger `Skicka`. Prova sedan att skicka i rutan.',
        solution: `<form>
  <label for="namn">Namn</label>
  <input type="text" id="namn" name="namn" required>
  <label for="epost">E-post</label>
  <input type="email" id="epost" name="epost" required>
  <label for="meddelande">Meddelande</label>
  <textarea id="meddelande" name="meddelande" rows="5" required></textarea>
  <label>
    <input type="checkbox" name="kopia" value="ja"> Skicka en kopia till mig
  </label>
  <button>Skicka</button>
</form>
`,
        hints: [
          'label runt kryssrutan och texten.',
          'type="checkbox" name="kopia" value="ja"',
          '<button>Skicka</button> sist i formuläret.',
        ],
        tests: [
          {
            description: 'En kryssruta för kopia',
            code: "(() => { const box = $('input[type=checkbox]'); return box ? [box.name, box.value, box.labels?.[0]?.textContent.trim() ?? null] : null; })()",
            expected: ['kopia', 'ja', 'Skicka en kopia till mig'],
          },
          {
            description: 'Knappen säger Skicka',
            code: "text('form button')",
            expected: 'Skicka',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-pizza',
    track: 'formular',
    title: 'Pizzabeställningen',
    reward: { emoji: '🍕', name: 'Pizza' },
    summary: 'Beställ en pizza: storlek, botten, fyllning och telefonnummer.',
    steps: [
      {
        title: 'Storleken',
        why: 'Fyra storlekar tar mycket plats som radioknappar, men får plats i en meny. value är det köket får veta.',
        xp: 15,
        description: 'Du bygger en pizzabeställning. Först storleken.',
        task: 'Uppgift: Skriv en `form` med en meny med etiketten `Storlek` (id och name `storlek`) och alternativen `Barn`, `Vanlig`, `Familj` och `Party`. Lägg till knappen `Beställ`.',
        starterCode: '<!-- Steg 1: storleken -->\n',
        solution: `<form>
  <label for="storlek">Storlek</label>
  <select id="storlek" name="storlek">
    <option value="barn">Barn</option>
    <option value="vanlig">Vanlig</option>
    <option value="familj">Familj</option>
    <option value="party">Party</option>
  </select>
  <button>Beställ</button>
</form>
`,
        hints: [
          'En label, en select med fyra option och en button.',
          'Varje option har ett value.',
          '<option value="barn">Barn</option>',
        ],
        tests: [
          {
            description: 'Menyn har etiketten Storlek och name storlek',
            code: "[$('select')?.labels?.[0]?.textContent.trim() ?? null, $('select')?.name ?? null]",
            expected: ['Storlek', 'storlek'],
          },
          {
            description: 'Fyra storlekar',
            code: "texts('select option')",
            expected: ['Barn', 'Vanlig', 'Familj', 'Party'],
          },
          {
            description: 'Knappen Beställ',
            code: "text('form button')",
            expected: 'Beställ',
          },
        ],
      },
      {
        title: 'Botten och fyllning',
        why: 'Botten väljer man en av – radioknappar med samma name. Fyllning kan man välja flera av – kryssrutor, också med samma name, så att köket får en lista.',
        xp: 20,
        description: 'Nu väljer man botten och vad som ska vara på.',
        task: 'Uppgift: Före knappen: två radioknappar med `name="botten"` – `Vanlig` och `Glutenfri` – och tre kryssrutor med `name="fyllning"` – `Skinka`, `Svamp` och `Ananas`. Alla med etiketter och värden.',
        solution: `<form>
  <label for="storlek">Storlek</label>
  <select id="storlek" name="storlek">
    <option value="barn">Barn</option>
    <option value="vanlig">Vanlig</option>
    <option value="familj">Familj</option>
    <option value="party">Party</option>
  </select>
  <p>Botten</p>
  <label><input type="radio" name="botten" value="vanlig"> Vanlig</label>
  <label><input type="radio" name="botten" value="glutenfri"> Glutenfri</label>
  <p>Fyllning</p>
  <label><input type="checkbox" name="fyllning" value="skinka"> Skinka</label>
  <label><input type="checkbox" name="fyllning" value="svamp"> Svamp</label>
  <label><input type="checkbox" name="fyllning" value="ananas"> Ananas</label>
  <button>Beställ</button>
</form>
`,
        hints: [
          'Radioknappar: type="radio", samma name="botten".',
          'Kryssrutor: type="checkbox", samma name="fyllning".',
          '<label><input type="checkbox" name="fyllning" value="svamp"> Svamp</label>',
        ],
        tests: [
          {
            description: 'Två radioknappar för botten',
            code: "$$('input[type=radio]').map(r => [r.name, r.labels?.[0]?.textContent.trim() ?? null])",
            expected: [
              ['botten', 'Vanlig'],
              ['botten', 'Glutenfri'],
            ],
          },
          {
            description: 'Tre kryssrutor för fyllning',
            code: "$$('input[type=checkbox]').map(c => [c.name, c.labels?.[0]?.textContent.trim() ?? null])",
            expected: [
              ['fyllning', 'Skinka'],
              ['fyllning', 'Svamp'],
              ['fyllning', 'Ananas'],
            ],
          },
          {
            description: 'Alla har ett value',
            code: "$$('input').every(input => input.getAttribute('value'))",
            expected: true,
          },
        ],
      },
      {
        title: 'Vem beställer?',
        why: 'Utan telefonnummer kan pizzerian inte ringa när pizzan är klar, så det är required. type="tel" ger siffertangentbordet på mobilen.',
        xp: 15,
        description: 'Sist: vem ska pizzan till?',
        task: 'Uppgift: Före knappen: ett fält med etiketten `Telefon`, `type="tel"`, id och name `telefon`, som måste fyllas i. Prova sedan att beställa i rutan.',
        solution: `<form>
  <label for="storlek">Storlek</label>
  <select id="storlek" name="storlek">
    <option value="barn">Barn</option>
    <option value="vanlig">Vanlig</option>
    <option value="familj">Familj</option>
    <option value="party">Party</option>
  </select>
  <p>Botten</p>
  <label><input type="radio" name="botten" value="vanlig"> Vanlig</label>
  <label><input type="radio" name="botten" value="glutenfri"> Glutenfri</label>
  <p>Fyllning</p>
  <label><input type="checkbox" name="fyllning" value="skinka"> Skinka</label>
  <label><input type="checkbox" name="fyllning" value="svamp"> Svamp</label>
  <label><input type="checkbox" name="fyllning" value="ananas"> Ananas</label>
  <label for="telefon">Telefon</label>
  <input type="tel" id="telefon" name="telefon" required>
  <button>Beställ</button>
</form>
`,
        hints: [
          'En label och en input före knappen.',
          'type="tel" och required.',
          '<input type="tel" id="telefon" name="telefon" required>',
        ],
        tests: [
          {
            description: 'Ett telefonfält med etiketten Telefon',
            code: "[$('input[type=tel]')?.name ?? null, $('input[type=tel]')?.labels?.[0]?.textContent.trim() ?? null]",
            expected: ['telefon', 'Telefon'],
          },
          {
            description: 'Telefonen måste fyllas i',
            code: "$('input[type=tel]')?.required ?? null",
            expected: true,
          },
        ],
      },
    ],
  },
  {
    id: 'proj-enkat',
    track: 'formular',
    title: 'Enkäten',
    reward: { emoji: '📋', name: 'Klippbräda' },
    summary: 'En enkät efter lägret, med frågor grupperade i rutor.',
    steps: [
      {
        title: 'Betyget',
        why: 'fieldset samlar knappar som hör ihop, och legend är frågan. Skärmläsaren läser upp frågan före varje knapp: "Hur var lägret? 3".',
        xp: 20,
        description:
          'Du gör en enkät. Första frågan är ett betyg från 1 till 5.',
        task: 'Uppgift: Skriv en `form` med en `fieldset`. I den en `legend` som säger `Hur var lägret?` och fem radioknappar med `name="betyg"`, värdena och etiketterna `1` till `5`.',
        starterCode: '<!-- Steg 1: betyget -->\n',
        solution: `<form>
  <fieldset>
    <legend>Hur var lägret?</legend>
    <label><input type="radio" name="betyg" value="1"> 1</label>
    <label><input type="radio" name="betyg" value="2"> 2</label>
    <label><input type="radio" name="betyg" value="3"> 3</label>
    <label><input type="radio" name="betyg" value="4"> 4</label>
    <label><input type="radio" name="betyg" value="5"> 5</label>
  </fieldset>
</form>
`,
        hints: [
          'fieldset i form, och legend först i fieldset.',
          'Fem radioknappar med samma name: betyg.',
          '<label><input type="radio" name="betyg" value="1"> 1</label>',
        ],
        tests: [
          {
            description: 'Frågan står i en legend i en fieldset',
            code: "text('form fieldset legend')",
            expected: 'Hur var lägret?',
          },
          {
            description: 'Fem radioknappar i gruppen betyg',
            code: "$$('fieldset input[type=radio]').map(r => r.name + '=' + r.value)",
            expected: ['betyg=1', 'betyg=2', 'betyg=3', 'betyg=4', 'betyg=5'],
          },
        ],
      },
      {
        title: 'Det bästa',
        why: 'Man kan tycka att flera saker var bäst, så det är kryssrutor. En egen fieldset gör det tydligt att det är en ny fråga.',
        xp: 20,
        description: 'Andra frågan: vad var bäst? Man får välja flera.',
        task: 'Uppgift: Skriv en fieldset till med `legend` `Vad var bäst?` och tre kryssrutor med `name="bast"`: `Bada`, `Maten` och `Lägerelden`.',
        solution: `<form>
  <fieldset>
    <legend>Hur var lägret?</legend>
    <label><input type="radio" name="betyg" value="1"> 1</label>
    <label><input type="radio" name="betyg" value="2"> 2</label>
    <label><input type="radio" name="betyg" value="3"> 3</label>
    <label><input type="radio" name="betyg" value="4"> 4</label>
    <label><input type="radio" name="betyg" value="5"> 5</label>
  </fieldset>
  <fieldset>
    <legend>Vad var bäst?</legend>
    <label><input type="checkbox" name="bast" value="bada"> Bada</label>
    <label><input type="checkbox" name="bast" value="maten"> Maten</label>
    <label><input type="checkbox" name="bast" value="lagerelden"> Lägerelden</label>
  </fieldset>
</form>
`,
        hints: [
          'En ny fieldset efter den första, med en egen legend.',
          'Kryssrutor: type="checkbox" och name="bast".',
          '<label><input type="checkbox" name="bast" value="bada"> Bada</label>',
        ],
        tests: [
          {
            description: 'Två frågor',
            code: "texts('legend')",
            expected: ['Hur var lägret?', 'Vad var bäst?'],
          },
          {
            description: 'Tre kryssrutor i den andra frågan',
            code: "$$('fieldset')[1] ? [...$$('fieldset')[1].querySelectorAll('input[type=checkbox]')].map(c => c.labels?.[0]?.textContent.trim() ?? null) : null",
            expected: ['Bada', 'Maten', 'Lägerelden'],
          },
          {
            description: 'Kryssrutorna heter bast',
            code: "$$('input[type=checkbox]').every(c => c.name === 'bast')",
            expected: true,
          },
        ],
      },
      {
        title: 'Något mer?',
        why: 'Ett fritt textfält fångar det frågorna missade. Det är inte required – alla har inte något mer att säga.',
        xp: 15,
        description: 'Sist ett fritt fält och knappen.',
        task: 'Uppgift: Efter fieldseten: ett `textarea` med etiketten `Något mer?` (id och name `ovrigt`) och en knapp som säger `Skicka svar`. Prova att skicka i rutan.',
        solution: `<form>
  <fieldset>
    <legend>Hur var lägret?</legend>
    <label><input type="radio" name="betyg" value="1"> 1</label>
    <label><input type="radio" name="betyg" value="2"> 2</label>
    <label><input type="radio" name="betyg" value="3"> 3</label>
    <label><input type="radio" name="betyg" value="4"> 4</label>
    <label><input type="radio" name="betyg" value="5"> 5</label>
  </fieldset>
  <fieldset>
    <legend>Vad var bäst?</legend>
    <label><input type="checkbox" name="bast" value="bada"> Bada</label>
    <label><input type="checkbox" name="bast" value="maten"> Maten</label>
    <label><input type="checkbox" name="bast" value="lagerelden"> Lägerelden</label>
  </fieldset>
  <label for="ovrigt">Något mer?</label>
  <textarea id="ovrigt" name="ovrigt" rows="4"></textarea>
  <button>Skicka svar</button>
</form>
`,
        hints: [
          'label och textarea efter sista </fieldset>.',
          'id och name är ovrigt, utan ö.',
          '<button>Skicka svar</button> sist.',
        ],
        tests: [
          {
            description: 'Ett textarea med etiketten Något mer?',
            code: "[$('textarea')?.name ?? null, $('textarea')?.labels?.[0]?.textContent.trim() ?? null]",
            expected: ['ovrigt', 'Något mer?'],
          },
          {
            description: 'Knappen säger Skicka svar',
            code: "text('form button')",
            expected: 'Skicka svar',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-affisch',
    track: 'css',
    title: 'Affischen',
    reward: { emoji: '🖼️', name: 'Tavla' },
    summary:
      'En affisch för en sommarkonsert, med mörk bakgrund, stora bokstäver och det viktiga i färg.',
    steps: [
      {
        title: 'Färgerna',
        why: 'En affisch ska synas på långt håll. Mörk bakgrund med ljus text ger stark kontrast, och en egen färg på rubriken drar blicken dit först.',
        xp: 15,
        description:
          'Texten till affischen finns redan. Nu får den färg – börja med bakgrunden och texten.',
        task: 'Uppgift: Lägg till en `<style>` överst. Ge `body` bakgrunden `midnightblue` och texten `white`. Gör rubriken `gold`.',
        starterCode: `<!-- Steg 1: färgerna -->
${AFFISCH}`,
        solution: affisch(`  body {
    background-color: midnightblue;
    color: white;
  }
  h1 { color: gold; }
`),
        hints: [
          'Två regler: en för body och en för h1.',
          'color på body ärvs av alla stycken.',
          'body { background-color: midnightblue; color: white; }\nh1 { color: gold; }',
        ],
        tests: [
          {
            description: 'Sidan har bakgrunden midnightblue',
            code: "colorOf('body', 'background-color')",
            expected: 'midnightblue',
          },
          {
            description: 'Styckena är vita',
            code: "colorsOf('p')",
            expected: ['white', 'white', 'white'],
          },
          {
            description: 'Rubriken är gold',
            code: "colorOf('h1')",
            expected: 'gold',
          },
        ],
      },
      {
        title: 'Typsnitten',
        why: 'Ett kraftigt typsnitt i stor storlek gör rubriken till affischens huvudperson. Text i mitten känns som en affisch och inte som en bok.',
        xp: 15,
        description: 'Nu ska rubriken bli stor och allt ställa sig i mitten.',
        task: 'Uppgift: Ge rubriken typsnittet `Impact, sans-serif` och storleken `4rem`. Ställ all text i mitten med en regel på `body`, och gör styckena `1.25rem`.',
        solution: affisch(`  body {
    background-color: midnightblue;
    color: white;
    text-align: center;
  }
  h1 {
    color: gold;
    font-family: Impact, sans-serif;
    font-size: 4rem;
  }
  p { font-size: 1.25rem; }
`),
        hints: [
          'text-align ärvs, så den kan stå på body.',
          'font-family och font-size i h1, och en ny regel för p.',
          'h1 { … font-family: Impact, sans-serif; font-size: 4rem; }\np { font-size: 1.25rem; }',
        ],
        tests: [
          {
            description:
              'Rubriken har typsnittet Impact och storleken 4rem (64px)',
            code: "[font('h1'), px('h1', 'font-size')]",
            expected: ['impact', 64],
          },
          {
            description: 'Texten står i mitten',
            code: "css('p', 'text-align')",
            expected: 'center',
          },
          {
            description: 'Styckena är 1.25rem (20px)',
            code: "px('p', 'font-size')",
            expected: 20,
          },
        ],
      },
      {
        title: 'Det viktiga sticker ut',
        why: 'Datum och pris är det besökaren letar efter. Med klasser får just de styckena egna färger, utan att resten ändras.',
        xp: 20,
        description:
          'Styckena har redan klasserna `datum` och `pris`. Använd dem.',
        task: 'Uppgift: Gör `.datum` `gold` och `1.5rem`. Ge `.pris` bakgrunden `crimson`.',
        solution: affisch(`  body {
    background-color: midnightblue;
    color: white;
    text-align: center;
  }
  h1 {
    color: gold;
    font-family: Impact, sans-serif;
    font-size: 4rem;
  }
  p { font-size: 1.25rem; }
  .datum {
    color: gold;
    font-size: 1.5rem;
  }
  .pris { background-color: crimson; }
`),
        hints: [
          'Klasserna väljs med punkt: .datum och .pris.',
          'En klass vinner över en tagg, så .datum slår regeln för p.',
          '.datum { color: gold; font-size: 1.5rem; }\n.pris { background-color: crimson; }',
        ],
        tests: [
          {
            description: 'Datumet är gold och 1.5rem (24px)',
            code: "[colorOf('.datum'), px('.datum', 'font-size')]",
            expected: ['gold', 24],
          },
          {
            description: 'Priset har bakgrunden crimson och vit text',
            code: "[colorOf('.pris', 'background-color'), colorOf('.pris')]",
            expected: ['crimson', 'white'],
          },
        ],
      },
    ],
  },
  {
    id: 'proj-kafe',
    track: 'css',
    title: 'Kaféets meny',
    reward: { emoji: '☕', name: 'Kaffekopp' },
    summary:
      'En meny för ett kafé med varma färger, priser som syns och en märkning för veganskt.',
    steps: [
      {
        title: 'Kaféets färger',
        why: 'Färgerna ger kaféet en känsla innan någon har läst ett ord. Med komma mellan h1 och h2 räcker en regel för alla rubriker.',
        xp: 15,
        description: 'Menyn finns redan som HTML. Ge den kaféets färger.',
        task: 'Uppgift: Ge `body` bakgrunden `linen`. Gör alla rubriker (`h1` och `h2`) `saddlebrown` med **en** regel.',
        starterCode: `<!-- Steg 1: kaféets färger -->
${KAFE}`,
        solution: kafe(`  body { background-color: linen; }
  h1, h2 { color: saddlebrown; }
`),
        hints: [
          'En regel för body och en för h1 och h2.',
          'Komma mellan selektorerna: h1, h2',
          'body { background-color: linen; }\nh1, h2 { color: saddlebrown; }',
        ],
        tests: [
          {
            description: 'Sidan har bakgrunden linen',
            code: "colorOf('body', 'background-color')",
            expected: 'linen',
          },
          {
            description: 'Alla rubriker är saddlebrown',
            code: "colorsOf('h1, h2')",
            expected: ['saddlebrown', 'saddlebrown', 'saddlebrown'],
          },
        ],
      },
      {
        title: 'Priser och märkning',
        why: 'Priserna har klassen pris, så alla får samma färg med en regel. Märkningen ska se ut som en liten etikett: ljus text på mörk bakgrund och lite mindre.',
        xp: 20,
        description:
          'Priserna och märkningen står i `span` med klasserna `pris` och `vegansk`.',
        task: 'Uppgift: Gör alla `.pris` `seagreen`. Ge `.vegansk` vit text, bakgrunden `olivedrab` och storleken `0.75rem`.',
        solution: kafe(`  body { background-color: linen; }
  h1, h2 { color: saddlebrown; }
  .pris { color: seagreen; }
  .vegansk {
    color: white;
    background-color: olivedrab;
    font-size: 0.75rem;
  }
`),
        hints: [
          'Två nya regler: .pris och .vegansk.',
          '0.75rem är tre fjärdedelar av den vanliga textstorleken.',
          '.pris { color: seagreen; }\n.vegansk { color: white; background-color: olivedrab; font-size: 0.75rem; }',
        ],
        tests: [
          {
            description: 'Alla priser är seagreen',
            code: "colorsOf('.pris')",
            expected: ['seagreen', 'seagreen', 'seagreen', 'seagreen'],
          },
          {
            description: 'Märkningen är vit på olivedrab och 0.75rem (12px)',
            code: "[colorOf('.vegansk'), colorOf('.vegansk', 'background-color'), px('.vegansk', 'font-size')]",
            expected: ['white', 'olivedrab', 12],
          },
        ],
      },
      {
        title: 'Typsnitt och länk',
        why: 'Ett typsnitt med klackar känns hemtrevligt, som en griffeltavla på ett kafé. Hover-färgen visar att länken går att klicka på.',
        xp: 20,
        description: 'Sista handen: kaféets namn och länken till kartan.',
        task: 'Uppgift: Ge `h1` typsnittet `Georgia, serif` och ställ den i mitten. Gör länken `sienna`, och `chocolate` när musen är över.',
        solution: kafe(`  body { background-color: linen; }
  h1, h2 { color: saddlebrown; }
  .pris { color: seagreen; }
  .vegansk {
    color: white;
    background-color: olivedrab;
    font-size: 0.75rem;
  }
  h1 {
    font-family: Georgia, serif;
    text-align: center;
  }
  a { color: sienna; }
  a:hover { color: chocolate; }
`),
        hints: [
          'En ny regel för h1, en för a och en för a:hover.',
          'h1 kan ha en egen regel fast den också står i h1, h2.',
          'a { color: sienna; }\na:hover { color: chocolate; }',
        ],
        tests: [
          {
            description:
              'Kaféets namn har typsnittet Georgia och står i mitten',
            code: "[font('h1'), css('h1', 'text-align')]",
            expected: ['georgia', 'center'],
          },
          {
            description: 'Länken är sienna',
            code: "colorOf('a')",
            expected: 'sienna',
          },
          {
            description: 'Länken blir chocolate när musen är över',
            code: "colorName(hover('a', 'color'))",
            expected: 'chocolate',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-morkt',
    track: 'css',
    title: 'Mörkt läge',
    reward: { emoji: '🌙', name: 'Måne' },
    summary:
      'Gör om en blogg till mörkt läge – skönt för ögonen på kvällen, och lite hemligt.',
    steps: [
      {
        title: 'Släck lampan',
        why: 'Helt svart med helt vit text bländar. En mycket mörk blå och en ljusgrå text är skönare för ögonen – så gör de flesta appar i mörkt läge.',
        xp: 15,
        description: 'Bloggen är ljus. Gör hela sidan mörk med ljus text.',
        task: 'Uppgift: Ge `body` bakgrunden `#111827` och texten `gainsboro`.',
        starterCode: `<!-- Steg 1: släck lampan -->
${MORKT}`,
        solution: morkt(`  body {
    background-color: #111827;
    color: gainsboro;
  }
`),
        hints: [
          'En regel för body med två egenskaper.',
          'Hexkoden skrivs med # och sex tecken.',
          'body { background-color: #111827; color: gainsboro; }',
        ],
        tests: [
          {
            description: 'Sidan har bakgrunden #111827',
            code: "colorOf('body', 'background-color')",
            expected: '#111827',
          },
          {
            description: 'Texten är gainsboro',
            code: "colorOf('p')",
            expected: 'gainsboro',
          },
        ],
      },
      {
        title: 'Rubriker som lyser',
        why: 'I mörker syns starka färger extra bra. Ingressen är en sammanfattning, så den får vara lite större men mer dämpad än resten.',
        xp: 20,
        description:
          'Rubrikerna och ingressen behöver egna färger för att synas i mörkret.',
        task: 'Uppgift: Gör `h1` `gold` och `h2` `skyblue`. Ge `.ingress` färgen `darkgray` och storleken `1.25rem`.',
        solution: morkt(`  body {
    background-color: #111827;
    color: gainsboro;
  }
  h1 { color: gold; }
  h2 { color: skyblue; }
  .ingress {
    color: darkgray;
    font-size: 1.25rem;
  }
`),
        hints: [
          'Tre nya regler: h1, h2 och .ingress.',
          '.ingress vinner över body eftersom den gäller stycket direkt.',
          'h1 { color: gold; }\nh2 { color: skyblue; }\n.ingress { color: darkgray; font-size: 1.25rem; }',
        ],
        tests: [
          {
            description: 'h1 är gold och h2 skyblue',
            code: "[colorOf('h1'), colorOf('h2')]",
            expected: ['gold', 'skyblue'],
          },
          {
            description: 'Ingressen är darkgray och 1.25rem (20px)',
            code: "[colorOf('.ingress'), px('.ingress', 'font-size')]",
            expected: ['darkgray', 20],
          },
        ],
      },
      {
        title: 'Länkar som syns i mörkret',
        why: 'Länkens vanliga blå syns knappt på mörk bakgrund. En egen färg utan streck, som blir vit vid hover, är lätt att se och visar ändå att den går att klicka på.',
        xp: 20,
        description:
          'Sist länken, som nästan försvinner mot den mörka bakgrunden.',
        task: 'Uppgift: Gör länken `violet` utan streck under. När musen är över ska den bli `white`.',
        solution: morkt(`  body {
    background-color: #111827;
    color: gainsboro;
  }
  h1 { color: gold; }
  h2 { color: skyblue; }
  .ingress {
    color: darkgray;
    font-size: 1.25rem;
  }
  a {
    color: violet;
    text-decoration: none;
  }
  a:hover { color: white; }
`),
        hints: [
          'En regel för a och en för a:hover.',
          'Strecket tas bort med text-decoration: none.',
          'a { color: violet; text-decoration: none; }\na:hover { color: white; }',
        ],
        tests: [
          {
            description: 'Länken är violet utan streck',
            code: "[colorOf('a'), css('a', 'text-decoration-line')]",
            expected: ['violet', 'none'],
          },
          {
            description: 'Länken blir vit när musen är över',
            code: "colorName(hover('a', 'color'))",
            expected: 'white',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-profilkort',
    track: 'boxen',
    title: 'Profilkortet',
    reward: { emoji: '🪪', name: 'ID-kort' },
    summary:
      'Ett profilkort som på sociala medier: en låda med luft, kant, runda hörn och en rund bild.',
    steps: [
      {
        title: 'Lådan',
        why: 'Padding ger texten luft från kanten, och en tunn ljus kant med runda hörn gör att kortet ser ut som ett kort och inte bara som text.',
        xp: 15,
        description:
          'Innehållet finns redan i ett `div` med klassen `profil`. Gör det till en låda.',
        task: 'Uppgift: Ge `.profil` vit bakgrund, `24px` padding, kanten `1px solid lightgray` och hörnen `12px`.',
        starterCode: `<!-- Steg 1: lådan -->
${PROFIL}`,
        solution: profil(`  .profil {
    background-color: white;
    padding: 24px;
    border: 1px solid lightgray;
    border-radius: 12px;
  }
`),
        hints: [
          'Fyra egenskaper i en ny regel för .profil.',
          'border har tre delar: 1px solid lightgray.',
          '.profil { background-color: white; padding: 24px; border: 1px solid lightgray; border-radius: 12px; }',
        ],
        tests: [
          {
            description: 'Kortet har vit bakgrund och 24px padding',
            code: "[colorOf('.profil', 'background-color'), px('.profil', 'padding-top')]",
            expected: ['white', 24],
          },
          {
            description: 'Kortet har en 1px lightgray kant och 12px hörn',
            code: "[px('.profil', 'border-top-width'), colorOf('.profil', 'border-top-color'), css('.profil', 'border-radius')]",
            expected: [1, 'lightgray', '12px'],
          },
        ],
      },
      {
        title: 'Rätt bredd mitt på sidan',
        why: 'Med border-box blir kortet precis så brett som det står, även med padding och kant. margin auto på sidorna ställer det i mitten.',
        xp: 20,
        description:
          'Kortet är lika brett som sidan. Gör det smalt och ställ det i mitten.',
        task: 'Uppgift: Gör kortet exakt `300px` brett med padding och kant. Ge det `margin: 40px auto` så att det står mitt på sidan med luft ovanför.',
        solution: profil(`  .profil {
    background-color: white;
    padding: 24px;
    border: 1px solid lightgray;
    border-radius: 12px;
    box-sizing: border-box;
    width: 300px;
    margin: 40px auto;
  }
`),
        hints: [
          'box-sizing: border-box gör att width räknar med padding och kant.',
          'margin: 40px auto ger 40px uppe och nere och auto på sidorna.',
          'box-sizing: border-box;\nwidth: 300px;\nmargin: 40px auto;',
        ],
        tests: [
          {
            description: 'Kortet är 300px brett med padding och kant',
            code: "boxWidth('.profil')",
            expected: 300,
          },
          {
            description: 'Kortet står mitt på sidan med 40px luft ovanför',
            code: "[centered('.profil'), px('.profil', 'margin-top')]",
            expected: [true, 40],
          },
        ],
      },
      {
        title: 'Bilden och texten',
        why: 'En rund profilbild är något alla känner igen. Text i mitten passar ett smalt kort, och rollen i grått blir en undertitel som inte tar över.',
        xp: 20,
        description: 'Sist bilden och texten.',
        task: 'Uppgift: Gör bilden rund med `border-radius: 50%`. Ställ texten i kortet i mitten och gör `.roll` `gray`.',
        solution: profil(`  .profil {
    background-color: white;
    padding: 24px;
    border: 1px solid lightgray;
    border-radius: 12px;
    box-sizing: border-box;
    width: 300px;
    margin: 40px auto;
    text-align: center;
  }
  .profil img { border-radius: 50%; }
  .roll { color: gray; }
`),
        hints: [
          'text-align: center i .profil, och två nya regler.',
          '.profil img väljer bilden inuti kortet.',
          '.profil img { border-radius: 50%; }\n.roll { color: gray; }',
        ],
        tests: [
          {
            description: 'Bilden har hörnen 50%',
            code: "css('.profil img', 'border-radius')",
            expected: '50%',
          },
          {
            description: 'Texten i kortet står i mitten',
            code: "css('.profil h2', 'text-align')",
            expected: 'center',
          },
          {
            description: 'Rollen är gray',
            code: "colorOf('.roll')",
            expected: 'gray',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-knappar',
    track: 'boxen',
    title: 'Knapparna',
    reward: { emoji: '🔘', name: 'Knapp' },
    summary:
      'Två knappar som på en riktig sajt: en fylld huvudknapp och en med bara kant.',
    steps: [
      {
        title: 'En riktig knapp',
        why: 'En länk är inline och står i texten. Med inline-block blir den en riktig låda, så att padding och runda hörn fungerar som på en knapp.',
        xp: 15,
        description:
          'Två länkar har klassen `knapp`. Få dem att se ut som knappar.',
        task: 'Uppgift: Gör `.knapp` till `inline-block` med padding `12px 24px`, bakgrunden `royalblue`, vit text och hörnen `8px`.',
        starterCode: `<!-- Steg 1: en riktig knapp -->
${KNAPPAR}`,
        solution: knappar(`  .knapp {
    display: inline-block;
    padding: 12px 24px;
    background-color: royalblue;
    color: white;
    border-radius: 8px;
  }
`),
        hints: [
          'Fem egenskaper i en regel för .knapp.',
          'display: inline-block gör länken till en låda.',
          '.knapp { display: inline-block; padding: 12px 24px; background-color: royalblue; color: white; border-radius: 8px; }',
        ],
        tests: [
          {
            description: 'Knappen är inline-block med padding 12px 24px',
            code: "[css('.knapp', 'display'), px('.knapp', 'padding-top'), px('.knapp', 'padding-left')]",
            expected: ['inline-block', 12, 24],
          },
          {
            description: 'Knappen är vit på royalblue med 8px hörn',
            code: "[colorOf('.knapp'), colorOf('.knapp', 'background-color'), css('.knapp', 'border-radius')]",
            expected: ['white', 'royalblue', '8px'],
          },
        ],
      },
      {
        title: 'Utan streck och med hover',
        why: 'Strecket under är till för länkar i text. På en knapp stör det. Att knappen blir mörkare under musen visar att den går att trycka på.',
        xp: 15,
        description:
          'Knapparna har fortfarande streck under, och ingenting händer när musen är över.',
        task: 'Uppgift: Ta bort strecket under `.knapp`. Ge den bakgrunden `navy` när musen är över.',
        solution: knappar(`  .knapp {
    display: inline-block;
    padding: 12px 24px;
    background-color: royalblue;
    color: white;
    border-radius: 8px;
    text-decoration: none;
  }
  .knapp:hover { background-color: navy; }
`),
        hints: [
          'text-decoration i .knapp och en ny regel med :hover.',
          'Hover-regeln ändrar bara background-color.',
          'text-decoration: none;\n.knapp:hover { background-color: navy; }',
        ],
        tests: [
          {
            description: 'Knappen har inget streck under',
            code: "css('.knapp', 'text-decoration-line')",
            expected: 'none',
          },
          {
            description: 'Knappen blir navy när musen är över',
            code: "colorName(hover('.knapp', 'background-color'))",
            expected: 'navy',
          },
        ],
      },
      {
        title: 'Den andra knappen',
        why: 'Den viktigaste knappen ska synas mest. Den andra får bara en kant, så att man förstår vilken man ska trycka på. Regeln står sist och vinner därför över .knapp.',
        xp: 20,
        description:
          'Avbryt-knappen har också klassen `knapp-andra`. Den ska se mindre viktig ut.',
        task: 'Uppgift: Ge `.knapp-andra` vit bakgrund, texten `royalblue` och kanten `2px solid royalblue`. Skriv regeln efter `.knapp`.',
        solution: knappar(`  .knapp {
    display: inline-block;
    padding: 12px 24px;
    background-color: royalblue;
    color: white;
    border-radius: 8px;
    text-decoration: none;
  }
  .knapp:hover { background-color: navy; }
  .knapp-andra {
    background-color: white;
    color: royalblue;
    border: 2px solid royalblue;
  }
`),
        hints: [
          'En ny regel för .knapp-andra, sist i <style>.',
          'Två lika starka regler: den som står sist vinner.',
          '.knapp-andra { background-color: white; color: royalblue; border: 2px solid royalblue; }',
        ],
        tests: [
          {
            description: 'Andra knappen är royalblue på vitt',
            code: "[colorOf('.knapp-andra'), colorOf('.knapp-andra', 'background-color')]",
            expected: ['royalblue', 'white'],
          },
          {
            description: 'Andra knappen har en 2px royalblue kant',
            code: "[px('.knapp-andra', 'border-top-width'), colorOf('.knapp-andra', 'border-top-color')]",
            expected: [2, 'royalblue'],
          },
          {
            description: 'Första knappen är fortfarande royalblue',
            code: "colorOf('.knapp', 'background-color')",
            expected: 'royalblue',
          },
        ],
      },
    ],
  },
  {
    id: 'proj-lappar',
    track: 'boxen',
    title: 'Anteckningslapparna',
    reward: { emoji: '🗒️', name: 'Anteckningsblock' },
    summary:
      'En att göra-lista som gula lappar, med en färgad kant på den viktigaste.',
    steps: [
      {
        title: 'Lappar med luft',
        why: 'Padding ger texten luft inuti lappen och margin ger luft mellan lapparna. Utan dem blir det en enda gul klump.',
        xp: 15,
        description: 'Varje sak att göra står i ett `div` med klassen `lapp`.',
        task: 'Uppgift: Ge `.lapp` bakgrunden `lightyellow`, `16px` padding och `12px` margin under.',
        starterCode: `<!-- Steg 1: lappar med luft -->
${LAPPAR}`,
        solution: lappar(`  .lapp {
    background-color: lightyellow;
    padding: 16px;
    margin-bottom: 12px;
  }
`),
        hints: [
          'En regel för .lapp med tre egenskaper.',
          'Luften under är margin-bottom.',
          '.lapp { background-color: lightyellow; padding: 16px; margin-bottom: 12px; }',
        ],
        tests: [
          {
            description: 'Alla lappar är lightyellow',
            code: "colorsOf('.lapp', 'background-color')",
            expected: ['lightyellow', 'lightyellow', 'lightyellow'],
          },
          {
            description: 'Lapparna har 16px padding och 12px margin under',
            code: "[px('.lapp', 'padding-top'), px('.lapp', 'margin-bottom')]",
            expected: [16, 12],
          },
        ],
      },
      {
        title: 'En kant som markerar',
        why: 'En tjock kant på bara ena sidan är ett vanligt sätt att markera något. Den viktiga lappen har två klasser, så en egen regel kan byta bara färgen.',
        xp: 20,
        description:
          'Ge lapparna en kant till vänster, och den viktiga en egen färg.',
        task: 'Uppgift: Ge `.lapp` kanten `6px solid gold` bara till vänster. Ge `.viktig` kantfärgen `crimson` med `border-left-color`.',
        solution: lappar(`  .lapp {
    background-color: lightyellow;
    padding: 16px;
    margin-bottom: 12px;
    border-left: 6px solid gold;
  }
  .viktig { border-left-color: crimson; }
`),
        hints: [
          'Kanten till vänster heter border-left.',
          '.viktig står efter .lapp och vinner därför.',
          'border-left: 6px solid gold;\n.viktig { border-left-color: crimson; }',
        ],
        tests: [
          {
            description: 'Lapparna har en 6px gold kant till vänster',
            code: "[px('.lapp', 'border-left-width'), colorOf('.lapp', 'border-left-color')]",
            expected: [6, 'gold'],
          },
          {
            description: 'Ingen kant ovanför',
            code: "px('.lapp', 'border-top-width')",
            expected: 0,
          },
          {
            description: 'Den viktiga lappen har en crimson kant',
            code: "colorOf('.viktig', 'border-left-color')",
            expected: 'crimson',
          },
        ],
      },
      {
        title: 'Samla lapparna i mitten',
        why: 'body är också en låda. Med max-width och margin auto på body hamnar hela sidan i en spalt i mitten, utan att du behöver ändra någon HTML.',
        xp: 20,
        description:
          'På en bred skärm blir lapparna jättelånga. Samla dem i en spalt.',
        task: 'Uppgift: Ge `body` en högsta bredd på `400px` och ställ den mitt på sidan med `margin: 0 auto`. Ställ rubriken i mitten.',
        solution: lappar(`  body {
    max-width: 400px;
    margin: 0 auto;
  }
  h1 { text-align: center; }
  .lapp {
    background-color: lightyellow;
    padding: 16px;
    margin-bottom: 12px;
    border-left: 6px solid gold;
  }
  .viktig { border-left-color: crimson; }
`),
        hints: [
          'En ny regel för body och en för h1.',
          'max-width: 400px och margin: 0 auto.',
          'body { max-width: 400px; margin: 0 auto; }\nh1 { text-align: center; }',
        ],
        tests: [
          {
            description: 'Sidan är högst 400px bred',
            code: "px('body', 'max-width')",
            expected: 400,
          },
          {
            description: 'Sidan står i mitten',
            code: "centered('body')",
            expected: true,
          },
          {
            description: 'Rubriken står i mitten',
            code: "css('h1', 'text-align')",
            expected: 'center',
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
