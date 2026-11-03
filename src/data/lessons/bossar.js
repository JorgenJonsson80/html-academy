// En boss per bana: en större uppgift som använder allt från banan, utan
// ledtrådar. Banan räknas inte som klar förrän bossen är besegrad.
// index.js lägger varje boss sist i sin bana.

const BOSS_INTRO = 'Bossen har inga ledtrådar – visa vad du kan! ';

export const BOSSES = {
  grunder: {
    id: 'grunder-boss',
    track: 'grunder',
    title: 'Boss: Presentationen',
    isBoss: true,
    xp: 40,
    description:
      BOSS_INTRO +
      'Här behöver du allt från banan: rubriker i två storlekar, stycken och taggar inuti taggar.',
    task: `Uppgift: Bygg en presentation av Ada Lovelace, världens första programmerare.
  1. Överst rubriken \`Ada Lovelace\` med \`h1\`.
  2. Sedan rubriken \`Om mig\` med \`h2\`, och direkt under den ett stycke som innehåller ordet \`programmerare\` i \`strong\`.
  3. Sist rubriken \`Mina intressen\` med \`h2\`, och direkt under den ett stycke där ordet \`matematik\` står i \`em\`.`,
    starterCode: '<!-- Skriv din kod här -->\n',
    solution: `<h1>Ada Lovelace</h1>
<h2>Om mig</h2>
<p>Jag var världens första <strong>programmerare</strong>.</p>
<h2>Mina intressen</h2>
<p>Jag älskar <em>matematik</em> och maskiner.</p>
`,
    hints: [],
    tests: [
      {
        description: 'h1 säger Ada Lovelace',
        code: "text('h1')",
        expected: 'Ada Lovelace',
      },
      {
        description: 'Två h2 i rätt ordning',
        code: "texts('h2')",
        expected: ['Om mig', 'Mina intressen'],
      },
      {
        description: 'Två stycken',
        code: "count('p')",
        expected: 2,
      },
      {
        description: 'Under Om mig står programmerare i strong',
        code: "$('h2')?.nextElementSibling?.querySelector('strong')?.textContent ?? null",
        expected: 'programmerare',
      },
      {
        description: 'Under Mina intressen står matematik i em',
        code: "$$('h2')[1]?.nextElementSibling?.querySelector('em')?.textContent ?? null",
        expected: 'matematik',
      },
    ],
  },
  lankar: {
    id: 'lankar-boss',
    track: 'lankar',
    title: 'Boss: Receptkortet',
    isBoss: true,
    xp: 50,
    description:
      BOSS_INTRO +
      'Ett receptkort med bild, en länk som hoppar ner på sidan och en länk till källan.',
    task: `Uppgift: Bygg ett receptkort för pannkakor.
  1. Överst rubriken \`Pannkakor\` med \`h1\`.
  2. Under den en länk med texten \`Till receptet\` som hoppar ner till rubriken i punkt 4.
  3. Bilden \`bilder/pannkakor.svg\`, 300 pixlar bred, med en alt-text som beskriver den.
  4. Rubriken \`Gör så här\` med \`h2\` och ett stycke om hur man gör.
  5. Sist ett stycke med länken \`Källa\` till \`https://sv.wikipedia.org/wiki/Pannkaka\`, som öppnas i en ny flik.`,
    starterCode: '<!-- Skriv din kod här -->\n',
    solution: `<h1>Pannkakor</h1>
<p><a href="#gor-sa-har">Till receptet</a></p>
<img src="bilder/pannkakor.svg" alt="En hög pannkakor med sylt" width="300">
<h2 id="gor-sa-har">Gör så här</h2>
<p>Vispa mjöl, mjölk och ägg. Stek tunna pannkakor i smör.</p>
<p><a href="https://sv.wikipedia.org/wiki/Pannkaka" target="_blank">Källa</a></p>
`,
    hints: [],
    tests: [
      {
        description: 'h1 säger Pannkakor',
        code: "text('h1')",
        expected: 'Pannkakor',
      },
      {
        description: 'Till receptet hoppar till rubriken Gör så här',
        code: "(() => { const link = $$('a').find(a => a.textContent.trim() === 'Till receptet'); const href = link?.getAttribute('href') ?? ''; return href.startsWith('#') ? doc.getElementById(href.slice(1))?.textContent.trim() ?? null : null; })()",
        expected: 'Gör så här',
      },
      {
        description: 'Bilden är bilder/pannkakor.svg, 300 pixlar bred',
        code: "[attr('img', 'src'), attr('img', 'width')]",
        expected: ['bilder/pannkakor.svg', '300'],
      },
      {
        description: 'Bilden har en alt-text som inte är tom',
        code: "attr('img', 'alt') === null ? null : attr('img', 'alt').trim() !== ''",
        expected: true,
      },
      {
        description: 'Rubriken Gör så här har ett stycke under sig',
        code: "$$('h2').find(h => h.textContent.trim() === 'Gör så här')?.nextElementSibling?.tagName ?? null",
        expected: 'P',
      },
      {
        description: 'Källa går till Wikipedia och öppnas i ny flik',
        code: "(() => { const link = $$('a').find(a => a.textContent.trim() === 'Källa'); return link ? [link.getAttribute('href'), link.getAttribute('target')] : null; })()",
        expected: ['https://sv.wikipedia.org/wiki/Pannkaka', '_blank'],
      },
    ],
  },
  listor: {
    id: 'listor-boss',
    track: 'listor',
    title: 'Boss: Veckomenyn',
    isBoss: true,
    xp: 50,
    description:
      BOSS_INTRO +
      'En matsedel med en tabell, en punktlista och en numrerad lista.',
    task: `Uppgift: Bygg skolans veckomeny.
  1. Överst rubriken \`Veckomenyn\` med \`h1\`.
  2. En tabell med rubriken \`Lunch\` (\`caption\`). I \`thead\` rubrikraden \`Dag\`, \`Rätt\` och \`Pris\`. I \`tbody\` tre rader: \`Måndag\` \`Pannkakor\` \`45 kr\`, \`Tisdag\` \`Fiskpinnar\` \`55 kr\` och \`Onsdag\` \`Soppa\` \`40 kr\`.
  3. Rubriken \`Handla\` med \`h2\` och direkt under den en punktlista med minst tre saker.
  4. Rubriken \`Pannkakor så här\` med \`h2\` och direkt under den en numrerad lista med tre steg.`,
    starterCode: '<!-- Skriv din kod här -->\n',
    solution: `<h1>Veckomenyn</h1>
<table>
  <caption>Lunch</caption>
  <thead>
    <tr><th>Dag</th><th>Rätt</th><th>Pris</th></tr>
  </thead>
  <tbody>
    <tr><td>Måndag</td><td>Pannkakor</td><td>45 kr</td></tr>
    <tr><td>Tisdag</td><td>Fiskpinnar</td><td>55 kr</td></tr>
    <tr><td>Onsdag</td><td>Soppa</td><td>40 kr</td></tr>
  </tbody>
</table>
<h2>Handla</h2>
<ul>
  <li>Mjöl</li>
  <li>Mjölk</li>
  <li>Ägg</li>
</ul>
<h2>Pannkakor så här</h2>
<ol>
  <li>Vispa ihop mjöl, mjölk och ägg</li>
  <li>Stek i smör</li>
  <li>Ät med sylt</li>
</ol>
`,
    hints: [],
    tests: [
      {
        description: 'h1 säger Veckomenyn',
        code: "text('h1')",
        expected: 'Veckomenyn',
      },
      {
        description: 'Tabellen heter Lunch',
        code: "text('table caption')",
        expected: 'Lunch',
      },
      {
        description: 'Rubrikraden i thead: Dag, Rätt och Pris',
        code: "texts('thead th')",
        expected: ['Dag', 'Rätt', 'Pris'],
      },
      {
        description: 'Tre rader i tbody med rätt celler',
        code: "$$('tbody tr').map(tr => [...tr.children].map(cell => cell.textContent.trim()))",
        expected: [
          ['Måndag', 'Pannkakor', '45 kr'],
          ['Tisdag', 'Fiskpinnar', '55 kr'],
          ['Onsdag', 'Soppa', '40 kr'],
        ],
      },
      {
        description: 'Under Handla: en punktlista med minst tre saker',
        code: "(() => { const list = $$('h2').find(h => h.textContent.trim() === 'Handla')?.nextElementSibling; return list ? [list.tagName, list.children.length >= 3] : null; })()",
        expected: ['UL', true],
      },
      {
        description: 'Under Pannkakor så här: en numrerad lista med tre steg',
        code: "(() => { const list = $$('h2').find(h => h.textContent.trim() === 'Pannkakor så här')?.nextElementSibling; return list ? [list.tagName, list.children.length] : null; })()",
        expected: ['OL', 3],
      },
    ],
  },
  struktur: {
    id: 'struktur-boss',
    track: 'struktur',
    title: 'Boss: Klubbsidan',
    isBoss: true,
    xp: 60,
    description:
      BOSS_INTRO +
      'En hel sida från första till sista raden, med alla delar på rätt plats.',
    task: `Uppgift: Bygg sidan för schackklubben, som ett helt dokument.
  1. \`<!doctype html>\`, \`html\` med svenska som språk, och i \`head\` \`<meta charset="utf-8">\` och titeln \`Schackklubben\`.
  2. En \`header\` med rubriken \`Schackklubben\` (\`h1\`) och en \`nav\` med tre länkar som hoppar till avsnitten i punkt 3.
  3. En \`main\` med tre \`section\`: \`Om klubben\`, \`Träningar\` och \`Bli medlem\`, var och en med \`h2\` och ett \`id\`.
  4. En \`footer\` med en länk som mejlar till \`schack@example.com\`.`,
    starterCode: '<!-- Skriv din kod här -->\n',
    solution: `<!doctype html>
<html lang="sv">
  <head>
    <meta charset="utf-8">
    <title>Schackklubben</title>
  </head>
  <body>
    <header>
      <h1>Schackklubben</h1>
      <nav>
        <ul>
          <li><a href="#om">Om klubben</a></li>
          <li><a href="#traningar">Träningar</a></li>
          <li><a href="#medlem">Bli medlem</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <section id="om">
        <h2>Om klubben</h2>
        <p>Vi spelar schack för alla åldrar, nybörjare som proffs.</p>
      </section>
      <section id="traningar">
        <h2>Träningar</h2>
        <p>Tisdagar och torsdagar klockan 18 i biblioteket.</p>
      </section>
      <section id="medlem">
        <h2>Bli medlem</h2>
        <p>Kom på en träning, så fixar vi resten.</p>
      </section>
    </main>
    <footer>
      <p><a href="mailto:schack@example.com">Mejla oss</a></p>
    </footer>
  </body>
</html>
`,
    hints: [],
    tests: [
      {
        description: 'Ett helt dokument på svenska',
        code: "[doc.doctype?.name ?? null, doc.documentElement.getAttribute('lang')]",
        expected: ['html', 'sv'],
      },
      {
        description: 'utf-8 och titeln Schackklubben i head',
        code: "[attr('head meta[charset]', 'charset')?.toLowerCase() ?? null, text('head title')]",
        expected: ['utf-8', 'Schackklubben'],
      },
      {
        description: 'Rubriken och menyn står i header',
        code: "[text('header h1'), count('header nav a')]",
        expected: ['Schackklubben', 3],
      },
      {
        description: 'Tre avsnitt i main',
        code: "texts('main > section > h2')",
        expected: ['Om klubben', 'Träningar', 'Bli medlem'],
      },
      {
        description: 'Menyns länkar hoppar till avsnitten, i ordning',
        code: "$$('nav a').map(a => doc.getElementById((a.getAttribute('href') ?? '').slice(1))?.querySelector('h2')?.textContent.trim() ?? null)",
        expected: ['Om klubben', 'Träningar', 'Bli medlem'],
      },
      {
        description: 'Sidfoten mejlar till schack@example.com',
        code: "attr('footer a', 'href')",
        expected: 'mailto:schack@example.com',
      },
    ],
    sourceChecks: [
      { description: 'Koden har <head>', pattern: /<head[\s>]/i },
      { description: 'Koden har <body>', pattern: /<body[\s>]/i },
    ],
  },
  formular: {
    id: 'formular-boss',
    track: 'formular',
    title: 'Boss: Anmälan till lägret',
    isBoss: true,
    xp: 60,
    description:
      BOSS_INTRO +
      'Ett anmälningsformulär med alla sorters fält – och alla med etikett.',
    task: `Uppgift: Bygg anmälan till sommarlägret i en \`form\`. Alla fält ska ha en etikett och ett \`name\`.
  1. \`Namn\` (text) och \`E-post\` (email), som båda måste fyllas i.
  2. \`Ålder\` som ett fält för siffror.
  3. En meny för vecka med \`Vecka 26\`, \`Vecka 27\` och \`Vecka 28\`.
  4. Tre radioknappar i samma grupp för boende: \`Tält\`, \`Stuga\` och \`Hemma\`.
  5. Ett stort textfält för \`Allergier\`.
  6. En knapp som säger \`Anmäl mig\`.`,
    starterCode: '<!-- Skriv din kod här -->\n',
    solution: `<form>
  <label for="namn">Namn *</label>
  <input type="text" id="namn" name="namn" required>
  <label for="epost">E-post *</label>
  <input type="email" id="epost" name="epost" required>
  <label for="alder">Ålder</label>
  <input type="number" id="alder" name="alder">
  <label for="vecka">Vecka</label>
  <select id="vecka" name="vecka">
    <option value="26">Vecka 26</option>
    <option value="27">Vecka 27</option>
    <option value="28">Vecka 28</option>
  </select>
  <p>Boende</p>
  <label><input type="radio" name="boende" value="talt"> Tält</label>
  <label><input type="radio" name="boende" value="stuga"> Stuga</label>
  <label><input type="radio" name="boende" value="hemma"> Hemma</label>
  <label for="allergier">Allergier</label>
  <textarea id="allergier" name="allergier" rows="3"></textarea>
  <button>Anmäl mig</button>
</form>
`,
    hints: [],
    tests: [
      {
        description: 'Alla fält ligger i formuläret',
        code: "count('form input, form select, form textarea')",
        expected: 8,
      },
      {
        description: 'Alla fält har en etikett',
        code: "$$('input, select, textarea').every(field => field.labels?.length > 0)",
        expected: true,
      },
      {
        description: 'Alla fält har ett name',
        code: "$$('input, select, textarea').every(field => field.name !== '')",
        expected: true,
      },
      {
        description: 'Text, e-post och siffror först',
        code: "$$('input').slice(0, 3).map(input => input.type)",
        expected: ['text', 'email', 'number'],
      },
      {
        description: 'Namn och e-post måste fyllas i',
        code: "$$('input').slice(0, 2).map(input => input.required)",
        expected: [true, true],
      },
      {
        description: 'Menyn har vecka 26–28',
        code: "texts('select option')",
        expected: ['Vecka 26', 'Vecka 27', 'Vecka 28'],
      },
      {
        description: 'Tre radioknappar i samma grupp',
        code: "(() => { const radios = $$('input[type=radio]'); return radios.length === 3 ? new Set(radios.map(r => r.name)).size : radios.length; })()",
        expected: 1,
      },
      {
        description: 'Radioknapparna heter Tält, Stuga och Hemma',
        code: "$$('input[type=radio]').map(input => input.labels?.[0]?.textContent.trim() ?? null)",
        expected: ['Tält', 'Stuga', 'Hemma'],
      },
      {
        description: 'Ett textarea för Allergier och knappen Anmäl mig',
        code: "[$('textarea')?.labels?.[0]?.textContent.trim() ?? null, text('form button')]",
        expected: ['Allergier', 'Anmäl mig'],
      },
    ],
  },
};
