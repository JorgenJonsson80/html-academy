// Andra sätt att lära sig banans ämnen, för den som kört fast.
// read: en sida på MDN (på engelska).
// video: en sökning på YouTube. Vi länkar till en sökning i stället för
// enskilda videor, eftersom videor kan försvinna men sökningen finns kvar.
const LEARN = 'https://developer.mozilla.org/en-US/docs/Learn_web_development/';

export const RESOURCES = {
  grunder: [
    {
      topic: 'Taggar och element',
      read: `${LEARN}Core/Structuring_content/Basic_HTML_syntax`,
      video: 'html för nybörjare taggar',
    },
    {
      topic: 'Rubriker och stycken',
      read: `${LEARN}Core/Structuring_content/Headings_and_paragraphs`,
      video: 'html headings paragraphs beginners',
    },
    {
      topic: 'strong och em',
      read: `${LEARN}Core/Structuring_content/Emphasis_and_importance`,
      video: 'html strong em tags explained',
    },
  ],
  lankar: [
    {
      topic: 'Länkar',
      read: `${LEARN}Core/Structuring_content/Creating_links`,
      video: 'html länkar a href nybörjare',
    },
    {
      topic: 'Bilder och alt-text',
      read: `${LEARN}Core/Structuring_content/HTML_images`,
      video: 'html img alt text beginners',
    },
  ],
  listor: [
    {
      topic: 'Listor',
      read: `${LEARN}Core/Structuring_content/Lists`,
      video: 'html listor ul ol li',
    },
    {
      topic: 'Tabeller',
      read: `${LEARN}Core/Structuring_content/HTML_table_basics`,
      video: 'html tables beginners tr td th',
    },
  ],
  struktur: [
    {
      topic: 'header, nav, main och footer',
      read: `${LEARN}Core/Structuring_content/Structuring_documents`,
      video: 'semantic html header nav main footer',
    },
    {
      topic: 'Hela dokumentet och head',
      read: `${LEARN}Core/Structuring_content/Webpage_metadata`,
      video: 'html head title meta charset beginners',
    },
  ],
  formular: [
    {
      topic: 'Formulär och etiketter',
      read: `${LEARN}Extensions/Forms/Your_first_form`,
      video: 'html formulär label input',
    },
    {
      topic: 'Olika sorters fält',
      read: `${LEARN}Extensions/Forms/Basic_native_form_controls`,
      video: 'html form radio checkbox select beginners',
    },
  ],
};

export function videoSearchUrl(query) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}
