import { isStringMap, readJson, writeJson } from './storage';

// Koden på Lekplatsen sparas i webbläsaren, en kod per idé.
const KEY = 'htmlacademy-playground';
// Platsen för fri kod, och platsen för kod som kopierats från en övning.
export const PLAYGROUND_FREE = 'fritt';
export const PLAYGROUND_COPY = 'kopia';

export function loadPlaygroundCodes() {
  return readJson(KEY, {}, isStringMap);
}

export function savePlaygroundCodes(codes) {
  writeJson(KEY, codes);
}

// Kopian får en egen plats, så att den fria koden inte skrivs över.
export function copyToPlayground(code, lessonTitle) {
  savePlaygroundCodes({
    ...loadPlaygroundCodes(),
    [PLAYGROUND_COPY]: `<!-- Kopia från övningen: ${lessonTitle}. Bryt ner den: ta bort en bit i taget och se vad som händer. -->\n\n${code}`,
  });
}
