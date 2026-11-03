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
};
