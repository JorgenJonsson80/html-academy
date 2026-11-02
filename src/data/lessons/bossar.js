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
};
