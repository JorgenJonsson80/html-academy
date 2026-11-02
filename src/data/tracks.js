// Banorna i ordning. reward är föremålet eleven får när banan är klar, och
// canBuild avslutar meningen "Nu kan du t.ex. bygga …" i firandet. docs
// länkar till MDN för den som vill läsa mer. Resten av banorna står i
// SPEC.md och läggs till en i taget.
const MDN = 'https://developer.mozilla.org/en-US/docs/';

export const TRACKS = [
  {
    id: 'grunder',
    title: 'Din första webbsida',
    teaches: ['h1–h6', 'p', 'strong', 'em'],
    reward: { emoji: '🧸', name: 'Nalle' },
    canBuild:
      'en enkel sida om dig själv, med rubriker, stycken och ord som sticker ut',
    docs: [
      {
        title: 'Komma igång med HTML',
        url: `${MDN}Learn_web_development/Core/Structuring_content/Basic_HTML_syntax`,
      },
      {
        title: 'Rubriker och stycken',
        url: `${MDN}Learn_web_development/Core/Structuring_content/Headings_and_paragraphs`,
      },
      {
        title: '<strong> och <em>',
        url: `${MDN}Learn_web_development/Core/Structuring_content/Emphasis_and_importance`,
      },
    ],
  },
];
