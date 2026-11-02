import { checkPage } from './checkPage';

// Elevens sida laddas i en osynlig iframe och rättas där. sandbox utan
// allow-scripts: skript på sidan körs inte, men vi kommer åt dokumentet
// eftersom det har samma ursprung (allow-same-origin).
export function runPage({ code, tests }) {
  return new Promise(resolve => {
    const frame = document.createElement('iframe');
    frame.setAttribute('sandbox', 'allow-same-origin');
    frame.setAttribute('aria-hidden', 'true');
    frame.tabIndex = -1;
    // Utanför skärmen men med riktig storlek, så att layouten räknas ut.
    Object.assign(frame.style, {
      position: 'fixed',
      left: '-10000px',
      top: '0',
      width: '800px',
      height: '600px',
      border: '0',
    });
    frame.addEventListener('load', () => {
      const result = checkPage(frame.contentDocument, tests);
      frame.remove();
      resolve(result);
    });
    frame.srcdoc = code;
    document.body.append(frame);
  });
}
