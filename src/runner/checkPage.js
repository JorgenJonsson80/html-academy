// Rättar en färdig sida. Samma kod körs mot en iframe i webbläsaren och
// mot jsdom i testerna, så att facit rättas likadant på båda ställena.
//
// test.code är ett JavaScript-uttryck med hjälparna nedan, t.ex.
// `text('h1')` eller `css('h1', 'color')`. Hjälparna ger null i stället
// för att krascha när elementet saknas, så att eleven får "fick null men
// skulle vara …" och inte ett JavaScript-fel.

function helpers(doc) {
  const view = doc.defaultView;
  const $ = selector => doc.querySelector(selector);
  const $$ = selector => [...doc.querySelectorAll(selector)];
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
    // En färg som webbläsaren skriver den, t.ex. color('red') ger
    // 'rgb(255, 0, 0)', så att testet kan jämföra med css().
    color: value => {
      const probe = doc.createElement('span');
      probe.style.color = value;
      doc.body.append(probe);
      const result = view.getComputedStyle(probe).color;
      probe.remove();
      return result;
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
