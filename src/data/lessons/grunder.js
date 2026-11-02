// Bana 1: taggar, rubriker, stycken, fet och kursiv. Ingen CSS än (bana 6),
// inga länkar eller bilder (bana 2) och inga listor (bana 3).
export const GRUNDER = [
  {
    id: 'grunder-01',
    track: 'grunder',
    title: 'Din första tagg',
    xp: 10,
    description:
      'En webbsida är text med taggar runt. Taggarna säger till webbläsaren vad varje bit är: en rubrik, ett stycke, en länk.',
    explain:
      'En tagg skrivs inom `<` och `>`. De flesta taggar kommer i par: `<h1>` öppnar och `</h1>` stänger, med ett snedstreck. Det som står mellan dem är innehållet.\n\n`h1` betyder rubrik på nivå 1, sidans största rubrik. Webbläsaren gör den stor och fet av sig själv – du ser det i rutan under editorn medan du skriver.',
    example: '<h1>Välkommen!</h1>',
    task: 'Uppgift: Skriv en rubrik med `h1` som säger `Hej, världen!`.',
    starterCode: '<!-- Skriv din kod här -->\n',
    solution: '<h1>Hej, världen!</h1>\n',
    hints: [
      'Rubriken börjar med <h1> och slutar med </h1>.',
      'Texten står mellan taggarna, utan citattecken.',
      '<h1>Hej, …</h1> – fyll i resten, med kommatecken och utropstecken.',
    ],
    tests: [
      { description: 'Det finns en h1', code: "count('h1')", expected: 1 },
      {
        description: 'Rubriken säger Hej, världen!',
        code: "text('h1')",
        expected: 'Hej, världen!',
      },
    ],
  },
  {
    id: 'grunder-02',
    track: 'grunder',
    title: 'Rubriker och stycken',
    xp: 10,
    description:
      'En sida har oftast en stor rubrik överst, mindre rubriker för varje del och vanlig text i stycken.',
    explain:
      'Rubriker finns i sex storlekar, från `<h1>` (störst) till `<h6>`. Använd dem i ordning: en `h1` för hela sidan och `h2` för delarna under.\n\nVanlig text står i `<p>`, ett stycke (paragraph). Webbläsaren bryr sig inte om radbrytningar i koden – vill du ha ett nytt stycke skriver du en ny `<p>`.',
    example: '<h1>Mitt kök</h1>\n<h2>Frukost</h2>\n<p>Gröt med äpple.</p>',
    task: 'Uppgift: Skriv rubriken `Min blogg` med `h1`, under den `Första inlägget` med `h2` och sist stycket `Idag lärde jag mig HTML.` med `p`.',
    starterCode: '<!-- Skriv din kod här -->\n',
    solution:
      '<h1>Min blogg</h1>\n<h2>Första inlägget</h2>\n<p>Idag lärde jag mig HTML.</p>\n',
    hints: [
      'Du behöver tre taggar: h1, h2 och p, i den ordningen.',
      'Varje tagg öppnas och stängs: <h2>…</h2>.',
      '<p>Idag lärde jag mig HTML.</p> blir stycket. Glöm inte punkten.',
    ],
    tests: [
      {
        description: 'h1 säger Min blogg',
        code: "text('h1')",
        expected: 'Min blogg',
      },
      {
        description: 'h2 säger Första inlägget',
        code: "text('h2')",
        expected: 'Första inlägget',
      },
      {
        description: 'Stycket säger Idag lärde jag mig HTML.',
        code: "text('p')",
        expected: 'Idag lärde jag mig HTML.',
      },
    ],
  },
  {
    id: 'grunder-03',
    track: 'grunder',
    title: 'Fet och kursiv',
    xp: 15,
    description:
      'Taggar kan ligga inuti andra taggar. Så gör du ett ord viktigt mitt i en mening.',
    explain:
      '`<strong>` betyder att något är viktigt, och webbläsaren visar det fetstilt. `<em>` betyder betoning och visas kursivt.\n\nDe ligger inuti stycket: `<p>Det är <strong>varmt</strong> idag.</p>`. Stäng den inre taggen innan den yttre – som lådor i lådor.',
    example:
      '<p>Ät <strong>inte</strong> den gula snön, <em>någonsin</em>.</p>',
    task: 'Uppgift: Skriv stycket `Stäng alltid dina taggar, men aldrig för tidigt.` där ordet `alltid` står i `strong` och `aldrig` i `em`.',
    starterCode: '<!-- Skriv din kod här -->\n',
    solution:
      '<p>Stäng <strong>alltid</strong> dina taggar, men <em>aldrig</em> för tidigt.</p>\n',
    hints: [
      'Hela meningen står i ett <p>. Ordet alltid får en <strong> runt sig.',
      'Mellanslagen står utanför de inre taggarna: Stäng <strong>alltid</strong> dina …',
      'aldrig skrivs som <em>aldrig</em>, mitt i meningen.',
    ],
    tests: [
      {
        description: 'Stycket har hela meningen',
        code: "text('p')",
        expected: 'Stäng alltid dina taggar, men aldrig för tidigt.',
      },
      {
        description: 'alltid står i strong',
        code: "text('p strong')",
        expected: 'alltid',
      },
      {
        description: 'aldrig står i em',
        code: "text('p em')",
        expected: 'aldrig',
      },
    ],
  },
];
