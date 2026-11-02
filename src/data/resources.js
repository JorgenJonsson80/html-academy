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
};

export function videoSearchUrl(query) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}
