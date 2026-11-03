// Egna sidor att bygga på Lekplatsen när ett projekt på banan är klart.
// Här finns inga tester – eleven bestämmer själv när det är klart.
// Idéerna använder bara det man lärt sig fram till och med banan.
// goals: vad sidan ska ha. extra: för den som vill ha mer.
export const IDEAS = [
  {
    id: 'idea-husdjur',
    track: 'grunder',
    emoji: '🐹',
    title: 'Mitt husdjur',
    summary: 'En sida om ditt husdjur – eller djuret du drömmer om.',
    goals: [
      'Djurets namn i en `h1`.',
      'Minst två delar med `h2`, till exempel `Det äter` och `Det gör det helst`.',
      'Det djuret är bäst på i `strong`.',
    ],
    extra: 'Lägg till en dikt om djuret med `<br>` mellan raderna.',
  },
  {
    id: 'idea-lat',
    track: 'grunder',
    emoji: '🎵',
    title: 'Min favoritlåt',
    summary: 'Texten till en låt du gillar, eller en du hittat på själv.',
    goals: [
      'Låtens namn i en `h1` och artisten i `em` under.',
      'Varje vers i ett eget stycke, med `<br>` mellan raderna.',
      'En `<hr>` före refrängen.',
    ],
    extra: 'Skriv `&copy;` och vem som äger låten längst ner.',
  },
  {
    id: 'idea-dagbok',
    track: 'grunder',
    emoji: '📔',
    title: 'Dagboken',
    summary: 'Tre dagar ur ditt liv, med en rubrik för varje dag.',
    goals: [
      'Dagboken har ett namn i en `h1`.',
      'En `h2` med datum för varje dag, och ett eller två stycken under.',
      'En kommentar med något hemligt som inte syns på sidan.',
    ],
    extra: 'Använd `h3` för delar av en dag, som `Morgon` och `Kväll`.',
  },
  {
    id: 'idea-fansida',
    track: 'lankar',
    emoji: '⭐',
    title: 'Fansidan',
    summary: 'En sida om någon eller något du är ett fan av.',
    goals: [
      'En bild med en alt-text som beskriver den.',
      'Minst tre länkar till mer att läsa, med länktexter som säger något.',
      'Länkar som lämnar sidan öppnas i en ny flik.',
    ],
    extra:
      'Bilder från nätet fungerar också: högerklicka på en bild och välj "Kopiera bildadress".',
  },
  {
    id: 'idea-resa',
    track: 'lankar',
    emoji: '🧳',
    title: 'Resedagboken',
    summary: 'En resa du gjort, eller vill göra, med bilder och länkar.',
    goals: [
      'En `h2` för varje plats, med ett id.',
      'Länkar överst som hoppar till platserna.',
      'En länk till en karta eller Wikipedia för varje plats.',
    ],
    extra: 'Lägg till en "Till toppen"-länk efter varje plats.',
  },
  {
    id: 'idea-museum',
    track: 'lankar',
    emoji: '🏛️',
    title: 'Minimuseet',
    summary: 'Ett museum med tre föremål – på riktigt eller påhittade.',
    goals: [
      'Tre föremål, var och en med bild, namn i `h2` och ett stycke.',
      'Bilderna är länkar till mer om föremålet.',
      'Alt-texterna säger vart länkarna går.',
    ],
    extra: 'Lägg till en kontaktlänk med `mailto:` längst ner.',
  },
  {
    id: 'idea-bucket',
    track: 'listor',
    emoji: '🪣',
    title: 'Bucket list',
    summary: 'Allt du vill göra någon gång i livet.',
    goals: [
      'En punktlista med minst fem saker.',
      'Dela upp listan med `h2`, till exempel `I sommar` och `Någon gång`.',
      'Det du vill mest står i `strong`.',
    ],
    extra: 'Gör en inre lista under någon sak, med vad du behöver för den.',
  },
  {
    id: 'idea-recept',
    track: 'listor',
    emoji: '🍰',
    title: 'Receptet',
    summary: 'Ditt bästa recept, från ingredienser till färdig rätt.',
    goals: [
      'Ingredienserna i en punktlista.',
      'Stegen i en numrerad lista.',
      'En bild, och en tabell med tid och antal portioner.',
    ],
    extra: 'Lägg till en länk som hoppar ner till stegen.',
  },
  {
    id: 'idea-tabell',
    track: 'listor',
    emoji: '⚽',
    title: 'Matchtabellen',
    summary: 'En tabell över lagen i en liga – på riktigt eller påhittad.',
    goals: [
      'En `caption` och en `thead` med `Lag`, `Matcher` och `Poäng`.',
      'Minst fyra lag i `tbody`.',
      'Lagets namn är en `th` i varje rad.',
    ],
    extra:
      'Lägg till en rad sist med `colspan` som säger när tabellen uppdaterades.',
  },
  {
    id: 'idea-portfolio',
    track: 'struktur',
    emoji: '🎨',
    title: 'Portfolion',
    summary: 'En sida som visar upp det du har gjort – teckningar, kod, foton.',
    goals: [
      'Ett helt dokument med titel, språk och teckenkodning.',
      'header med ditt namn och en meny, main och footer.',
      'Varje sak du visar upp är en `article` med bild och rubrik.',
    ],
    extra: 'Lägg till ett avsnitt `Om mig` som menyn hoppar till.',
  },
  {
    id: 'idea-recension',
    track: 'struktur',
    emoji: '🎮',
    title: 'Spelrecensionen',
    summary: 'Recensera ett spel, en film eller en bok du gillar.',
    goals: [
      'Recensionen är en `article` i `main`.',
      'Avsnitt med `section` för `Handling`, `Bra` och `Mindre bra`.',
      'Ett betyg i en tabell eller lista.',
    ],
    extra:
      'Skriv två recensioner till och lägg alla i ett avsnitt `Recensioner`.',
  },
  {
    id: 'idea-skoltidning',
    track: 'struktur',
    emoji: '🗞️',
    title: 'Skoltidningen',
    summary: 'Förstasidan på en skoltidning med flera nyheter.',
    goals: [
      'Tidningens namn i `header` och en meny med avdelningar.',
      'Minst tre nyheter, var och en en `article` med `h2`.',
      'Utgivare och © i `footer`.',
    ],
    extra: 'Märk ut datumet i varje nyhet med en `span`.',
  },
  {
    id: 'idea-gastbok',
    track: 'formular',
    emoji: '📖',
    title: 'Gästboken',
    summary: 'Ett formulär där besökare kan lämna en hälsning.',
    goals: [
      'Fält för namn och hälsning, med etiketter.',
      'Hälsningen är ett `textarea` som måste fyllas i.',
      'Under formuläret några påhittade hälsningar som `article`.',
    ],
    extra: 'Låt besökaren välja ett humör med radioknappar: 😀 😐 😢.',
  },
  {
    id: 'idea-quiz',
    track: 'formular',
    emoji: '❓',
    title: 'Quizet',
    summary: 'Ett quiz med frågor om något du kan mycket om.',
    goals: [
      'Minst tre frågor, var och en i en `fieldset` med `legend`.',
      'Radioknappar för svaren, med samma `name` i varje fråga.',
      'En knapp som skickar svaren. Prova och se vad som skickas.',
    ],
    extra: 'Lägg till en fråga där man får välja flera svar.',
  },
  {
    id: 'idea-biljett',
    track: 'formular',
    emoji: '🎟️',
    title: 'Biljettbokningen',
    summary: 'Boka biljetter till en konsert, match eller bio.',
    goals: [
      'En meny för föreställning och ett sifferfält för antal biljetter.',
      'Namn och e-post, som måste fyllas i.',
      'En kryssruta för att godkänna villkoren.',
    ],
    extra:
      'Testa `min` och `max` på sifferfältet, så att man inte kan boka 1000 biljetter.',
  },
];

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
