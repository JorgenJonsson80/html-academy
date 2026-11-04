// Rättar en färdig sida. Samma kod körs mot en iframe i webbläsaren och
// mot jsdom i testerna, så att facit rättas likadant på båda ställena.
//
// test.code är ett JavaScript-uttryck med hjälparna nedan, t.ex.
// `text('h1')` eller `css('h1', 'color')`. Hjälparna ger null i stället
// för att krascha när elementet saknas, så att eleven får "fick null men
// skulle vara …" och inte ett JavaScript-fel.
//
// jsdom räknar inte ut layout och ger värdena som eleven skrev dem (2rem),
// webbläsaren ger pixlar (32px). Hjälparna för CSS ger samma svar på
// båda ställena: px() räknar om till pixlar, colorOf() ger färgens namn,
// och boxWidth() och centered() mäter i webbläsaren men räknar från
// stilarna i jsdom.
import { colorName } from './cssColors';

const ROOT_PX = 16;
const BORDER_WIDTHS = { thin: 1, medium: 3, thick: 5 };
const round = number => Math.round(number * 10) / 10;

function helpers(doc) {
  const view = doc.defaultView;
  const $ = selector => doc.querySelector(selector);
  const $$ = selector => [...doc.querySelectorAll(selector)];
  const style = element => view.getComputedStyle(element);
  // Bara webbläsaren ger elementen en storlek.
  const hasLayout = () => doc.documentElement.getBoundingClientRect().width > 0;

  // Ett värde i pixlar som tal, eller värdet som det står (auto, 50%).
  function toPx(element, property) {
    if (!element) return null;
    const value = style(element).getPropertyValue(property).trim();
    if (/^border-.*-width$/.test(property)) {
      const side = property.replace('-width', '-style');
      if (style(element).getPropertyValue(side) === 'none') return 0;
      if (value in BORDER_WIDTHS) return BORDER_WIDTHS[value];
    }
    if (property === 'font-size' && value === 'medium') return ROOT_PX;
    const parts = value.match(/^(-?[\d.]+)(px|rem|em)?$/);
    if (!parts) return value;
    const number = parseFloat(parts[1]);
    if (parts[2] === 'px') return round(number);
    if (parts[2] === 'rem') return round(number * ROOT_PX);
    if (parts[2] === 'em') {
      const base = property === 'font-size' ? element.parentElement : element;
      return round(number * (base ? toPx(base, 'font-size') : ROOT_PX));
    }
    if (number === 0) return 0;
    // Ett tal utan enhet i line-height är gånger textens storlek.
    return property === 'line-height'
      ? round(number * toPx(element, 'font-size'))
      : number;
  }

  // Det som står i regler med :hover som gäller elementet.
  function hover(selector, property) {
    const element = $(selector);
    if (!element) return null;
    let found = null;
    const visit = rules => {
      for (const rule of rules) {
        if (rule.cssRules && !rule.selectorText) visit(rule.cssRules);
        if (!rule.selectorText?.includes(':hover')) continue;
        const value = rule.style.getPropertyValue(property);
        if (!value) continue;
        const matches = rule.selectorText.split(',').some(part => {
          if (!part.includes(':hover')) return false;
          try {
            return element.matches(part.replaceAll(':hover', ''));
          } catch {
            return false;
          }
        });
        if (matches) found = value.trim();
      }
    };
    for (const sheet of doc.styleSheets) visit(sheet.cssRules);
    return found;
  }

  // En färg som webbläsaren skriver den: 'red' → 'rgb(255, 0, 0)'.
  const color = value => {
    const probe = doc.createElement('span');
    probe.style.color = value;
    doc.body.append(probe);
    const result = view.getComputedStyle(probe).color;
    probe.remove();
    return result;
  };

  const pxOf = (element, property) => {
    const value = toPx(element, property);
    return typeof value === 'number' ? value : 0;
  };

  return {
    doc,
    $,
    $$,
    // Texten i första elementet, med mellanslag och radbrytningar ihopslagna.
    text: selector =>
      $(selector)?.textContent.replace(/\s+/g, ' ').trim() ?? null,
    texts: selector =>
      $$(selector).map(element =>
        element.textContent.replace(/\s+/g, ' ').trim(),
      ),
    count: selector => $$(selector).length,
    attr: (selector, name) => $(selector)?.getAttribute(name) ?? null,
    css: (selector, property) => {
      const element = $(selector);
      return element
        ? view.getComputedStyle(element).getPropertyValue(property)
        : null;
    },
    // color('red') ger 'rgb(255, 0, 0)', att jämföra med css().
    color,
    // Vilken färg som helst som namn eller hex: 'tomato', '#1e3a8a'.
    colorName: value => (value ? colorName(color(value)) : null),
    colorOf: (selector, property = 'color') => {
      const element = $(selector);
      return element
        ? colorName(style(element).getPropertyValue(property))
        : null;
    },
    colorsOf: (selector, property = 'color') =>
      $$(selector).map(element =>
        colorName(style(element).getPropertyValue(property)),
      ),
    px: (selector, property) => toPx($(selector), property),
    // Första typsnittet, utan citattecken och med små bokstäver.
    font: selector => {
      const element = $(selector);
      if (!element) return null;
      const [first] = style(element).fontFamily.split(',');
      return first
        .trim()
        .replace(/^["']|["']$/g, '')
        .toLowerCase();
    },
    hover,
    // Hela bredden med padding och kant, i pixlar.
    boxWidth: selector => {
      const element = $(selector);
      if (!element) return null;
      if (hasLayout()) return round(element.getBoundingClientRect().width);
      let width = toPx(element, 'width');
      if (typeof width !== 'number') return null;
      const max = toPx(element, 'max-width');
      if (typeof max === 'number') width = Math.min(width, max);
      if (style(element).boxSizing === 'border-box') return width;
      return round(
        width +
          pxOf(element, 'padding-left') +
          pxOf(element, 'padding-right') +
          pxOf(element, 'border-left-width') +
          pxOf(element, 'border-right-width'),
      );
    },
    // Står elementet mitt i sin förälder, med lika mycket luft på båda
    // sidor? I jsdom: margin auto på båda sidor och en bredd.
    centered: selector => {
      const element = $(selector);
      if (!element) return null;
      const own = style(element);
      if (!hasLayout()) {
        const sized = own.width !== 'auto' || own.maxWidth !== 'none';
        return sized && own.marginLeft === 'auto' && own.marginRight === 'auto';
      }
      const parent = element.parentElement;
      const outer = parent.getBoundingClientRect();
      const inner = element.getBoundingClientRect();
      const left =
        inner.left -
        outer.left -
        pxOf(parent, 'border-left-width') -
        pxOf(parent, 'padding-left');
      const right =
        outer.right -
        inner.right -
        pxOf(parent, 'border-right-width') -
        pxOf(parent, 'padding-right');
      return left > 1 && Math.abs(left - right) <= 1;
    },
  };
}

const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// Svarar som körningen i Python Academy, se NY-AKADEMI.md.
export function checkPage(doc, tests) {
  const tools = helpers(doc);
  const names = Object.keys(tools);
  return {
    syntaxError: null,
    error: null,
    tests: tests.map(test => {
      try {
        // Testerna skrivs av oss, inte av eleven.
        const actual = new Function(...names, `return (${test.code});`)(
          ...Object.values(tools),
        );
        const value = actual === undefined ? null : actual;
        return {
          passed: same(value, test.expected),
          actual: value,
          repr: JSON.stringify(value),
        };
      } catch (error) {
        return {
          passed: false,
          error: { type: error.name, message: error.message, line: null },
        };
      }
    }),
    output: [],
    console: [],
  };
}
