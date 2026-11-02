// Det figuren säger när koden inte är rätt än. Byter efter hur många
// gånger man försökt, och tröstar extra vid syntaxfel, som känns
// värst men oftast bara är ett tecken.
const TRY_AGAIN = [
  'Inte än – men det är så man lär sig. Kolla testraderna nedan, de visar vad som saknas.',
  'Nära! Läs vad som gick fel och ändra en sak i taget.',
  'Ingen fara, programmerare får fel hela tiden. Felet är en ledtråd, inte ett betyg.',
  'Den här är klurig. Testa en ledtråd, eller 👣 Kör rad för rad för att se vad som händer.',
  'Du är envis, det är bra! Läs uppgiften en gång till, ord för ord.',
];

const SYNTAX = [
  'Ingen fara – det är bara ett tecken som fattas eller är för mycket. Alla glömmer citattecken, kolon och parenteser ibland.',
  'Python är petig med tecken och indrag. Läs förklaringen nedan, så hittar du det.',
];

const CRASH = [
  'Koden stoppade med ett fel. Läs förklaringen – den pekar ut raden.',
  'Ett fel är bara Python som säger vad den inte förstår. Titta på raden som nämns.',
];

// kind: 'syntax', 'crash' eller 'tests'
export function encouragement(failedAttempts, kind) {
  const list =
    kind === 'syntax' ? SYNTAX : kind === 'crash' ? CRASH : TRY_AGAIN;
  return list[failedAttempts % list.length];
}
