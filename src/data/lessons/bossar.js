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
};
