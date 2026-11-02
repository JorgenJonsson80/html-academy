// Egna sidor att bygga på Lekplatsen när ett projekt på banan är klart.
// Här finns inga tester – eleven bestämmer själv när det är klart.
// Idéerna använder bara det man lärt sig fram till och med banan.
// goals: vad sidan ska ha. extra: för den som vill ha mer.
// Fylls på i etapp 3, se SPEC.md.
export const IDEAS = [];

const FREE_START = `<!-- Skriv vad du vill. Sidan syns under editorn. -->
<h1>Min sida</h1>
<p>Hej! Ändra texten och se vad som händer.</p>
`;

// Startkoden för en idé: målen som en kommentar, så att de syns medan man
// bygger. Utan idé börjar Lekplatsen med ett litet exempel.
export function ideaStarterCode(idea) {
  if (!idea) return FREE_START;
  const goals = idea.goals.map(goal => `  - ${goal.replace(/`/g, '')}`);
  return `<!--\n  ${idea.emoji} ${idea.title}\n${goals.join('\n')}\n-->\n\n${idea.starterCode ?? ''}`;
}
