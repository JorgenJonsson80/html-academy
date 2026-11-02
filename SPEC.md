# HTML Academy – specifikation

En svensk, interaktiv kodskola i HTML och CSS för den som aldrig kodat.
Byggd på Python Academy (`../python från S`), som i sin tur bygger på JS
Academy. Allt som inte är språkspecifikt är kopierat därifrån.

Tänkt ordning för eleven: **HTML/CSS → JS Academy → Python Academy**.

## Mål och målgrupp

- Eleven har **noll erfarenhet** och läser svenska. All text på svenska.
- Eleven skriver riktig HTML och CSS i webbläsaren och ser sidan växa fram
  medan hen skriver. Ingen installation, ingen server.
- Det svåra är sällan _vad_ en tagg eller egenskap är, utan _när_ man tar
  till den. Varje övning och projektsteg säger varför.
- Fel ska kännas okej. HTML kraschar aldrig – webbläsaren gissar i stället
  – så feedbacken måste peka på det som syns fel på sidan.

## Teknik

| Del | Val | Kommentar |
| --- | --- | --- |
| Skal | Vite + React 19, JavaScript | Kopierat från Python Academy |
| Körning | Ingen. Sidan visas i en `<iframe srcdoc>` | Startar direkt, inga nedladdningar |
| Rättning | `runner/checkPage.js` mot iframen, jsdom i testerna | Samma kod på båda ställena |
| Editor | CodeMirror 6 + `@codemirror/lang-html` | Stänger taggar själv, CSS i `<style>` |
| Konton | Supabase (valfritt), tabell `html_progress` | Samma projekt som de andra akademierna |
| Publicering | GitHub Pages via GitHub Actions, `base: /html-academy/` | |

### Förhandsvisning och rättning

- **Förhandsvisningen** (`components/PagePreview.jsx`) uppdateras 300 ms
  efter senaste tangenttrycket. `sandbox="allow-scripts"` utan
  `allow-same-origin`, så att sidan inte kommer åt appen.
- **Rättningen** (`runner/page.js`) laddar sidan i en osynlig iframe med
  `sandbox="allow-same-origin"` (inga skript), läser dokumentet och kör
  testerna. Iframen är 800 × 600 px, så att layouten räknas ut.
- I testerna gör `test/nodePage.js` samma sak med jsdom. jsdom räknar
  **inte ut layout** (storlek, placering, flex och grid). Tester på det
  kan bara köras i webbläsaren – se "Öppna frågor".

### En övning

Som i Python Academy. `test.code` är ett JavaScript-uttryck med hjälparna
i `checkPage.js`:

| Hjälpare | Ger |
| --- | --- |
| `text('h1')` | texten i första träffen, mellanslag ihopslagna, eller `null` |
| `texts('li')` | texterna i alla träffar |
| `count('p')` | antal träffar |
| `attr('a', 'href')` | ett attribut, eller `null` |
| `css('h1', 'color')` | det beräknade värdet, t.ex. `rgb(255, 0, 0)` |
| `color('red')` | en färg som webbläsaren skriver den, att jämföra med `css()` |
| `$`, `$$`, `doc` | `querySelector`, alla träffar som lista, dokumentet |

```js
{
  id: 'grunder-01', track: 'grunder', title: 'Din första tagg', xp: 10,
  description: '…', explain: '…', example: '<h1>Välkommen!</h1>',
  task: 'Uppgift: Skriv en rubrik med `h1` som säger `Hej, världen!`.',
  starterCode: '<!-- Skriv din kod här -->\n',
  solution: '<h1>Hej, världen!</h1>\n',
  hints: ['vag', 'tydligare', 'nästan lösningen'],
  tests: [{ description: 'Rubriken säger Hej, världen!', code: "text('h1')", expected: 'Hej, världen!' }],
}
```

- Hjälparna ger `null` när elementet saknas, så att eleven får "hittade
  det inte på sidan" i stället för ett JavaScript-fel.
- Jämför färger med `color()`: `css('h1', 'color') === color('tomato')`
  med `expected: true`, så spelar det ingen roll om eleven skriver
  `tomato`, `#ff6347` eller `rgb(255, 99, 71)`.
- Storlekar: jsdom ger det eleven skrev (`2rem`), webbläsaren pixlar
  (`32px`). Testa hellre att regeln finns eller jämför två element med
  varandra än exakta värden – tills layouttesterna finns.

## Banor

| # | id | Bana | Lär ut |
| --- | --- | --- | --- |
| 1 | `grunder` | Din första webbsida | taggar, `h1`–`h6`, `p`, `strong`, `em`, kommentarer |
| 2 | `lankar` | Länkar och bilder | `a href`, `img src alt`, sökvägar, `target` |
| 3 | `listor` | Listor och tabeller | `ul`, `ol`, `li`, `table`, `tr`, `th`, `td` |
| 4 | `struktur` | Sidans delar | `header`, `nav`, `main`, `section`, `footer`, `div`, `span`, hela dokumentet med `<!doctype>` och `<head>` |
| 5 | `formular` | Formulär | `form`, `label`, `input` (text, e-post, kryssruta), `select`, `button` |
| 6 | `css` | Färg och form med CSS | `<style>`, selektorer, `class`, `id`, `color`, `background`, typsnitt |
| 7 | `boxen` | Boxmodellen | `margin`, `padding`, `border`, `width`, `box-sizing` |
| 8 | `flexbox` | Flexbox | `display: flex`, `gap`, `justify-content`, `align-items` |
| 9 | `grid` | Grid | `grid-template-columns`, `fr`, `gap`, områden |
| 10 | `responsivt` | Mobil och dator | `@media`, `rem`, `%`, `max-width`, bilder som krymper |
| 11 | `slutprojekt` | Slutprojekt: din egen hemsida | allt ovan i ett större projekt |
| 12 | `tailwind` | Bonus: Tailwind | samma sak med klasser: `p-4`, `flex`, `text-xl`, `md:` |

- Varje bana: 9 övningar + en boss, tre projekt, tre idéer, fyra
  quizfrågor och minst två resurser (MDN + YouTube-sökning).
- **Tailwind** är en bonusbana sist, som Streamlit i Python Academy. Den
  förutsätter vanlig CSS: `p-4` är bara `padding: 1rem` i kortform.
  Tekniskt: `@tailwindcss/browser` som skript i elevens sida (fast
  version från jsDelivr). Förhandsvisningen tillåter redan skript.
  Rättningen gör det inte – den behöver `allow-scripts` och vänta på att
  Tailwind har skrivit sina stilar innan testerna körs.
- Ingen JavaScript i den här kursen. Det är JS Academy.

## Kvalitetsregler (som tester)

- Facit klarar sina egna tester. **Startkoden underkänns.**
- Facit använder bara det tidigare banor lärt ut (`test/concepts.js`):
  inga länkar/bilder före bana 2, inga listor före bana 3, inga formulär
  före bana 5, ingen CSS före bana 6, ingen flex, grid eller `@media`
  före sina banor och ingen Tailwind före bana 12. En regel gäller först
  när dess bana finns i `tracks.js`.
- Tre ledtrådar per övning, bossen inga. Bossen är sist i sin bana.
- Tester kontrollerar resultatet på sidan, inte exakt hur koden är skriven.
- Nya övningar i en bana som redan finns får `addedLater: true`.
- Prylarnas emojis får inte upprepas mellan banor och projekt.

## Lärdomar från Python Academy

- Testa i en riktig webbläsare (Playwright mot `npx vite`) innan commit.
  Selektorer: `button:has-text(…)`, inte `text=…`.
- Två syskon i React får aldrig samma `key`.
- Kortkommandon: läs `event.code`, inte tecknet.
- "Ny på det här?" är öppen i de tre första övningarna.
- Föreslå nytt innehåll och låt användaren reagera innan det byggs.

## Öppna frågor

- **Layouttester** för flexbox, grid och responsivt: jsdom räknar inte ut
  layout. Alternativ: kör de banornas tester i Playwright (vitest browser
  mode), eller testa beräknade stilar (`display`, `justify-content`) i
  stället för placering. Bestäm innan bana 8.
- **Felförklaringar:** HTML ger inga fel. Vanliga misstag går att hitta
  själv: en tagg som aldrig stängs, en stängande tagg utan öppnande,
  `<img>` utan `alt`, stavfel i taggnamn (`<h7>`, `<pp>`). Visa dem som
  vänliga varningar ovanför testraderna (`friendlyErrors.js`).
- **Hover** i editorn: förklara taggar och CSS-egenskaper på svenska, som
  `codeInfo.js` i Python Academy.

## Etapper

Användaren testar efter varje etapp.

1. ✅ **Skal:** kopia av Python Academy utan Pyodide, förhandsvisning,
   rättning mot iframen och jsdom, bana 1 med tre övningar och en boss.
2. **Bana 1–2 färdiga** (9 övningar var) och varningar för vanliga
   HTML-misstag.
3. **Projekt, Lekplatsens idéer, Fastnat?-resurser** och bana 3–5.
4. **Hover** i editorn för taggar och egenskaper.
5. **Bana 6–10** med CSS, och layouttesterna inför bana 8.
6. **Slutprojektet** och **Tailwind**.
