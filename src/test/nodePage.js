import { JSDOM } from 'jsdom';
import { checkPage } from '../runner/checkPage';

// Samma rättning som i webbläsaren, mot jsdom. jsdom räknar inte ut
// layout, så tester på storlek och placering får vänta på Playwright.
export function nodeRunPage({ code, tests }) {
  const { window } = new JSDOM(code);
  const result = checkPage(window.document, tests);
  window.close();
  return result;
}
