# HTML Academy

En interaktiv kodskola i HTML och CSS på svenska för den som aldrig
kodat. Eleven skriver riktig HTML i webbläsaren, ser sidan växa fram och
koden rättas med tester. Hela planen och alla regler står i `SPEC.md` –
läs den först. Kopierad från Python Academy (`../python från S`);
`NY-AKADEMI.md` säger vad som återanvänts.
Byggs i etapper enligt slutet av SPEC.md; användaren testar efter varje.

Vite + React 19 (JavaScript, inte TypeScript), CodeMirror 6 med
`@codemirror/lang-html`. Ingen egen server. Supabase för inloggning och
synkade framsteg (valfritt – utan nycklar i `.env.local` sparas allt bara
i localStorage). Samma Supabase-projekt som JS och Python Academy, men
egen tabell `html_progress` (se `supabase/migrations/`).

## Kommandon

- `npm run dev` – utvecklingsserver
- `npx vitest run` – testerna rättar facit med jsdom
- `npm run lint` och `npx prettier --check src`
- `npm run build` – byggs med `base: /html-academy/`

Push till `main` kör testerna och publicerar via
`.github/workflows/deploy.yml`.

## Arkitektur

- `src/runner/checkPage.js` – rättar ett färdigt dokument: kör
  testuttrycken med hjälparna (`text`, `texts`, `count`, `attr`, `css`,
  `color`, `$`, `$$`, `doc`) och svarar som körningen i Python Academy
  (`syntaxError`, `error`, `tests`, `output`, `console`).
- `src/runner/page.js` – laddar elevens kod i en osynlig iframe
  (`sandbox="allow-same-origin"`, inga skript) och kör `checkPage`.
- `src/test/nodePage.js` – samma rättning med jsdom i testerna. jsdom
  räknar inte ut layout.
- `src/components/PagePreview.jsx` – förhandsvisningen under editorn,
  300 ms efter senaste ändringen, `sandbox="allow-scripts allow-forms"`.
  Ett tillagt skript rullar till `#id`-länkar, öppnar andra länkar i ny
  flik och visar vad ett formulär skulle ha skickat.
- `src/runner/htmlWarnings.js` – varningar för vanliga HTML-misstag
  (tagg som aldrig stängs, fel ordning, `<h7>`, `<img>` utan `alt`), med
  radnummer. Visas i gula rutan i `FeedbackPanel`. Facit får inte varna.
- `src/editor/codeInfo.js` – förklaringen när man håller musen över
  koden, byggd på syntaxträdet (`@codemirror/lang-html`, med CSS i
  `<style>`). Säger också var en tagg stängs och vilken tagg den ligger i.
  Lägg till taggar, attribut och CSS-egenskaper i tabellerna överst när
  nya banor använder dem.
- `src/runner/evaluate.js` – gör om svaret till feedback i klartext.
  `showValue` visar värden som JSON.
- `src/runner/friendlyErrors.js` – förklaringar på svenska av fel i
  testerna.
- `src/data/` – innehållet är data, inte kod:
  - `tracks.js` banorna i ordning med `teaches`, `reward`, `docs` (MDN)
    och `canBuild`
  - `lessons/` en fil per bana, samlade i `lessons/index.js`.
    `lessons.test.js` rättar varje facit och startkod
  - `lessons/bossar.js` en boss per bana (`isBoss`, inga ledtrådar)
  - bilderna i övningarna ligger i `public/bilder/` (egna SVG:er, så att
    övningarna fungerar utan internet). Lokalt körs appen på `/`
  - `projects.js` tre projekt per bana med steg (`why` på varje steg).
    Fri text testas på formen, inte exakta ord. Facit får inte varna
  - `ideas.js` tre idéer per bana till Lekplatsen
  - `sourceChecks` på en övning kollar koden med regex – för det
    webbläsaren lagar själv, som `html`, `head` och `body` som saknas
  - `resources.js` länkar per bana till Fastnat?-panelen
  - `quiz.js` fyra frågor per bana. En fråga med `check` rättas mot
    `code` i `quiz.test.js`
  - `stages.js` figuren som växer en ålder per klar bana
- `src/test/concepts.js` – begrepp som facit inte får använda före sin
  bana. En regel slår till först när dess bana finns i `tracks.js`.
- `src/lib/storage.js` – localStorage i try/catch. Nycklarna börjar med
  `htmlacademy-`.
- `src/components/` – UI. `App.jsx` äger progress och utkast,
  `LessonPanel.jsx` en övning (byts ut med `key` per övning).

## En övning

Som i SPEC.md. Inga länkar eller bilder före bana 2, inga listor före
bana 3, inga `header`/`nav`/`main`/`section`/`article`/`footer` före
bana 4, inga formulär före bana 5, ingen CSS före bana 6, ingen
flex/grid/`@media` före sina banor och ingen Tailwind före bana 12 i
facit.

## Kod

- Prettier: `singleQuote`, `arrowParens: avoid`. Kommentarer på svenska
  och förklarar varför, inte vad.
- Två syskon får aldrig samma `key` – använd prefix.
- Kortkommandon: läs `event.code`, inte tecknet.
- Testa i en riktig webbläsare (Playwright mot `npx vite`) innan commit.
  Selektorer: `button:has-text(…)`, inte `text=…`.
- Svara användaren på svenska. Föreslå nytt innehåll innan det byggs.
