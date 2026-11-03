// Banorna i ordning. reward är föremålet eleven får när banan är klar, och
// canBuild avslutar meningen "Nu kan du t.ex. bygga …" i firandet. docs
// länkar till MDN för den som vill läsa mer. Resten av banorna står i
// SPEC.md och läggs till en i taget.
const MDN = 'https://developer.mozilla.org/en-US/docs/';

export const TRACKS = [
  {
    id: 'grunder',
    title: 'Din första webbsida',
    teaches: ['h1–h6', 'p', 'strong', 'em', 'br', 'hr', '<!-- -->'],
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
  {
    id: 'lankar',
    title: 'Länkar och bilder',
    teaches: ['a href', 'target', 'img src alt', 'width', 'id', 'mailto:'],
    reward: { emoji: '🪀', name: 'Jojo' },
    canBuild:
      'en receptsida med bilder, länkar till mer att läsa och en meny som hoppar ner på sidan',
    docs: [
      {
        title: 'Länkar',
        url: `${MDN}Learn_web_development/Core/Structuring_content/Creating_links`,
      },
      {
        title: 'Bilder',
        url: `${MDN}Learn_web_development/Core/Structuring_content/HTML_images`,
      },
      {
        title: 'Alt-text',
        url: `${MDN}Web/HTML/Reference/Elements/img#authoring_meaningful_alternate_descriptions`,
      },
    ],
  },
  {
    id: 'listor',
    title: 'Listor och tabeller',
    teaches: ['ul', 'ol', 'li', 'table', 'tr', 'th', 'td', 'caption'],
    reward: { emoji: '🪁', name: 'Drake' },
    canBuild:
      'en matsedel, en topplista eller ett schema där allt står i rätt rad och kolumn',
    docs: [
      {
        title: 'Listor',
        url: `${MDN}Learn_web_development/Core/Structuring_content/Lists`,
      },
      {
        title: 'Tabeller',
        url: `${MDN}Learn_web_development/Core/Structuring_content/HTML_table_basics`,
      },
    ],
  },
  {
    id: 'struktur',
    title: 'Sidans delar',
    teaches: [
      '<!doctype>',
      'head',
      'title',
      'header',
      'nav',
      'main',
      'section',
      'article',
      'footer',
      'div',
      'span',
    ],
    reward: { emoji: '🎲', name: 'Tärning' },
    canBuild:
      'en hel hemsida för en klubb eller ett företag, med meny, avsnitt och sidfot',
    docs: [
      {
        title: 'Sidans delar',
        url: `${MDN}Learn_web_development/Core/Structuring_content/Structuring_documents`,
      },
      {
        title: 'Det som står i head',
        url: `${MDN}Learn_web_development/Core/Structuring_content/Webpage_metadata`,
      },
    ],
  },
  {
    id: 'formular',
    title: 'Formulär',
    teaches: [
      'form',
      'label',
      'input',
      'textarea',
      'select',
      'button',
      'name',
      'required',
    ],
    reward: { emoji: '🎈', name: 'Ballong' },
    canBuild:
      'en anmälan, en beställning eller en enkät där alla vet vad de ska fylla i',
    docs: [
      {
        title: 'Ditt första formulär',
        url: `${MDN}Learn_web_development/Extensions/Forms/Your_first_form`,
      },
      {
        title: 'Fälten i ett formulär',
        url: `${MDN}Learn_web_development/Extensions/Forms/Basic_native_form_controls`,
      },
    ],
  },
];
