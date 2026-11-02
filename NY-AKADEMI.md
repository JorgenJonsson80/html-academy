# Bygga en ny akademi för ett annat språk

Python Academy byggdes efter JS Academy och är tänkt som mall för nästa
akademi, t.ex. SQL, TypeScript eller HTML/CSS. Den här filen säger vad
som går att kopiera rakt av, vad som måste skrivas om och i vilken
ordning. Läs `SPEC.md` för _varför_ saker är som de är och `CLAUDE.md`
för hur koden hänger ihop.

Kort sagt: ungefär tre fjärdedelar av koden bryr sig inte om språket.
Det som är språkspecifikt är **körningen** (hur koden körs och rättas),
**editorstödet** (färger, hover, felförklaringar) och **innehållet**.

## Vad som är vad

### Kopiera rakt av

Ändra bara namn och texter (`Python` → `SQL`, `pyacademy-` → `sqlacademy-`).

| Fil                                                                       | Vad den gör                                                                                   |
| ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `src/components/` (utom `CodeEditor.jsx`, `StepPanel.jsx`)                | Hela gränssnittet: banor, övning, ledtrådar, feedback, Fastnat?, Lekplatsen, firandet, kontot |
| `src/App.jsx`, `App.css`, `index.css`                                     | Progress, utkast, låsning av banor och projekt                                                |
| `src/lib/storage.js`, `progress.js`, `supabase.js`, `useCloudProgress.js` | localStorage och synk. Byt tabellnamn i `useCloudProgress.js`                                 |
| `src/lib/aiPrompt.js`, `playground.js`                                    | Frågan till en AI, Lekplatsens sparade kod                                                    |
| `src/runner/diff.js`, `compare.js`                                        | Visa skillnaden, "din lösning är mycket längre än facit"                                      |
| `src/data/stages.js`, `encouragement.js`                                  | Figuren som växer och peppen                                                                  |
| `src/data/projects.js` (funktionerna längst ner)                          | `PROJECT_STEPS`, bonus utan ledtrådar                                                         |
| `supabase/migrations/`                                                    | Byt `py_progress` mot t.ex. `sql_progress`                                                    |
| `.github/workflows/deploy.yml`, `vite.config.js`                          | Byt `base: /py-academy/`                                                                      |
| Testerna för allt ovan                                                    | De följer med filerna                                                                         |

### Skriv om för språket

| Fil                                                                         | Vad som ändras                                                                 |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `src/runner/harness.py` + `pyWorker.js` + `pyodideVersion.js`               | Själva körningen. Ny fil, men **samma svar** (se kontraktet nedan)             |
| `src/runner/python.js`                                                      | Workern, timeouten och omstarten är desamma. Byt bara namn och vad som skickas |
| `src/runner/evaluate.js`                                                    | `pyRepr` visar värden som Python skriver dem. Gör en för språket               |
| `src/runner/friendlyErrors.js`                                              | Reglerna är per språk. Strukturen (mönster → svensk text) är densamma          |
| `src/editor/codeInfo.js`                                                    | Hover och förslag efter punkt. Bygg på språkets Lezer-träd om det finns        |
| `src/components/CodeEditor.jsx`                                             | Byt `@codemirror/lang-python` mot språkets paket                               |
| `src/test/nodePython.js`                                                    | Kör samma körning i Node, så att testerna rättar på riktigt                    |
| `src/test/concepts.js`                                                      | Begreppen som inte får användas före sin bana                                  |
| `src/data/tracks.js`, `lessons/`, `projects.js`, `ideas.js`, `resources.js` | Innehållet                                                                     |

### Kan skippas i början

- **Kör rad för rad** (`step_student`, `useStepper.js`, `StepPanel.jsx`).
  Det är det svåraste att bygga om och passar inte alla språk. För SQL är
  "visa resultatet efter varje del av frågan" ett bättre alternativ.
- Hover och förslag kan vänta till efter de första banorna.

## Kontraktet: vad körningen ska svara

Allt i gränssnittet bygger på det här svaret. Håller den nya körningen
samma form fungerar rättning, feedback, Visa skillnaden och Fastnat? utan
ändringar.

```js
// run({ code, tests, inputs }) svarar:
{
  syntaxError: null | { type, message, line },  // koden gick inte att läsa
  error: null | { type, message, line },        // koden kraschade
  tests: [
    { passed: true, actual: 6, repr: '6' },      // actual är JSON, repr för visning
    { passed: false, error: { type, message, line } },
  ],
  output: ['Hej!'],     // det programmet skrev ut, rad för rad
  console: ['…'],       // det som visas i Utskrift
}
```

En övning ser ut som i `SPEC.md` (`id`, `track`, `title`, `xp`,
`description`, `explain`, `example`, `task`, `starterCode`, `solution`,
`hints`, `tests`, `sourceChecks`). Bossar har `isBoss: true` och inga
ledtrådar. Det enda som skiljer mellan språken är vad `test.code` betyder.

## Språken

### SQL – mest nytta för minst jobb

- **Körning:** [sql.js](https://github.com/sql-js/sql.js) (SQLite i
  WebAssembly, ungefär 1 MB) i en worker. Startar på en bråkdel av tiden
  Pyodide tar.
- **Varje övning** får fältet `setup` med SQL som skapar tabellerna och
  fyller dem. Databasen skapas på nytt vid varje körning, så eleven kan
  aldrig förstöra något.
- **Tester:** `test.code` är en SQL-fråga som körs efter elevens kod, och
  `expected` är raderna som en lista med listor. Eller `__result`: raderna
  elevens egen fråga gav, motsvarigheten till `__output`.
- Jämför utan hänsyn till ordningen, utom när uppgiften kräver `ORDER BY`.
- **Visning:** resultatet som en tabell i stället för Utskrift. Visa
  skillnaden jämför tabellerna rad för rad.
- **Editor:** `@codemirror/lang-sql` har färger och kan föreslå tabell-
  och kolumnnamn från `setup`.
- **Banor:** SELECT och kolumner → WHERE → ORDER BY och LIMIT →
  räkna med COUNT/SUM/AVG → GROUP BY och HAVING → JOIN → egna tabeller
  (CREATE, INSERT, UPDATE, DELETE) → delfrågor → slutprojekt.
- **Begreppsregler:** ingen `JOIN` före sin bana osv. Lätt att kolla med
  reguljära uttryck, precis som `concepts.js`.

### TypeScript – fortsättning på JS Academy

- Utgå hellre från **JS Academy** än härifrån, eftersom körningen redan
  är JavaScript.
- `typescript` från npm i en worker: `ts.transpileModule` gör om koden
  till JavaScript, som sedan körs som i JS Academy.
- Typfelen kommer från en `LanguageService` med `getSemanticDiagnostics`.
  Visa dem som syntaxfel med radnummer, så lär sig eleven att typfel
  stoppar koden.
- Övningar kan rättas på typerna: "den här koden ska ge typfel" är ett
  test som går att skriva.

### HTML och CSS – för de allra första stegen

- Ingen körmiljö behövs. Elevens kod visas i en `<iframe srcdoc>` med
  `sandbox`.
- Tester är JavaScript-uttryck mot sidan i iframen, t.ex.
  `document.querySelector('button')?.textContent === 'Köp'` eller
  `getComputedStyle(h1).color`.
- Resultatet syns direkt bredvid koden, och det motiverar nybörjare mest.

### Mindre lämpligt

Java, C#, C++, Rust och Go går att köra i webbläsaren, men kräver stora
nedladdningar och långsam kompilering. De passar bättre för en skola med
server. R (webR) och Lua (wasmoon) fungerar bra tekniskt, men R överlappar
med pandas och Lua har mindre nytta i ett jobb.

## Ordning att bygga i

Samma etapper som i `SPEC.md`, och användaren testar efter varje:

1. **Skal:** kopiera repot, byt namn, töm `src/data/lessons/`, skriv
   körningen enligt kontraktet och få _en_ övning att rättas. Publicera
   direkt, så att det finns en länk att testa.
2. **Bana 1–2** med felförklaringar på svenska och kvalitetstesterna
   (facit klarar sina tester, startkoden underkänns, tre ledtrådar).
3. **Projekt, Lekplatsen, idéer och Fastnat?**, banorna 3–6.
4. **Hover och förslag** i editorn.
5. **Resten av banorna med bossar**, sedan inloggning med Supabase.
6. **Slutprojekt.**

## Checklista för en ny bana

Gäller här i Python Academy också.

- [ ] `tracks.js`: `id`, `title`, `teaches`, `reward` (emojin får inte
      finnas hos någon annan bana eller något projekt), `canBuild` och `docs`
- [ ] `lessons/<bana>.js` med 9 övningar, samlade i `lessons/index.js`
- [ ] `lessons/bossar.js`: en boss, sist i banan i `index.js`
- [ ] `projects.js`: tre projekt med tre steg, `why` på varje steg
- [ ] `ideas.js`: tre idéer, `resources.js`: minst två ämnen
- [ ] `concepts.js`: regel för det nya begreppet, om det inte får
      användas tidigare
- [ ] Hover och felförklaringar för det nya begreppet, med tester
- [ ] `npx vitest run`, `npm run lint`, `npx prettier --check src`, `npm run build`
- [ ] Lös hela banan i Chrome med Playwright: alla övningar, bossen,
      firandet och konsolen utan fel
- [ ] Commit, push och kolla live-sidan

## Konton

Alla akademier kan dela samma Supabase-projekt. Varje akademi får en egen
tabell, så att framstegen inte blandas ihop:

1. Kopiera migrationen och byt tabellnamnet. Användaren kör SQL:en själv i
   Supabase, eftersom databasen delas med de andra akademierna.
2. Lägg till den nya sidans adress under **Authentication → URL
   Configuration → Redirect URLs**.
3. Sätt `VITE_SUPABASE_URL` och `VITE_SUPABASE_ANON_KEY` som variabler i
   det nya GitHub-repot (`gh variable set`), samma värden som här.

## Att börja med Claude

Öppna en ny mapp och skriv ungefär:

> Bygg en SQL Academy efter Python Academy i `../python från S`. Läs
> `NY-AKADEMI.md`, `SPEC.md` och `CLAUDE.md` där först. Skriv en `SPEC.md`
> för SQL med banorna och bygg sedan etapp 1.
