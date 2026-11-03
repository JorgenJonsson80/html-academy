// Frågor för nivåtestet och för "Testa dig förbi". Fyra frågor per bana.
// Det rätta svaret står alltid först i options. Ordningen blandas när
// frågan visas. Frågor med page kollas i quiz.test.js: check körs mot
// sidan och ska ge det rätta svaret.
export const QUIZ = {
  grunder: [
    {
      question: 'Vilken rubrik blir störst?',
      code: '<h3>A</h3>\n<h1>B</h1>\n<h2>C</h2>',
      options: ['B', 'A', 'C', 'Alla blir lika stora'],
      explain: 'h1 är den största rubriken, h6 den minsta.',
    },
    {
      question: 'Hur många stycken blir det på sidan?',
      code: '<p>Hej\npå\ndig</p>',
      options: ['1', '3', '0', '2'],
      explain:
        'Radbrytningar i koden syns inte. Det är ett enda p, alltså ett stycke.',
      check: "count('p')",
    },
    {
      question: 'Vilket ord blir fetstilt?',
      code: '<p>En <em>liten</em> och <strong>stor</strong> katt</p>',
      options: ['stor', 'liten', 'katt', 'Inget'],
      explain: 'strong visas fetstilt, em kursivt.',
      check: "text('strong')",
    },
    {
      question: 'Hur stänger man taggen <p>?',
      options: ['</p>', '<p/>', '<\\p>', '<end p>'],
      explain: 'Den stängande taggen har ett snedstreck före namnet: </p>.',
    },
  ],
  lankar: [
    {
      question: 'Vart går länken?',
      code: '<a href="https://mdn.dev">Läs mer</a>',
      options: ['https://mdn.dev', 'Läs mer', 'Ingenstans', 'href'],
      explain:
        'Adressen står i href. Texten mellan taggarna är det man klickar på.',
      check: "attr('a', 'href')",
    },
    {
      question: 'Vad är alt-texten till för?',
      options: [
        'Den beskriver bilden för den som inte ser den',
        'Den gör bilden större',
        'Den visas som rubrik över bilden',
        'Den bestämmer bildens filnamn',
      ],
      explain:
        'Skärmläsare läser upp alt-texten, och den visas om bilden inte laddar.',
    },
    {
      question: 'Vilken tagg stängs aldrig?',
      options: ['<img>', '<a>', '<p>', '<strong>'],
      explain: '<img> har inget innehåll, så det finns ingen </img>.',
    },
    {
      question: 'Vilken länktext är bäst?',
      options: [
        'Läs hela receptet',
        'Klicka här',
        'Länk',
        'https://example.com/recept',
      ],
      explain:
        'Länktexten ska säga vart länken går, även när den läses upp ensam.',
    },
  ],
  listor: [
    {
      question: 'Hur många saker med punkt eller siffra blir det?',
      code: '<ul>\n  <li>A</li>\n  <li>B</li>\n</ul>\n<ol>\n  <li>C</li>\n</ol>',
      options: ['3', '2', '1', '0'],
      explain: 'Varje li blir en sak, både i ul och ol.',
      check: "count('li')",
    },
    {
      question: 'Vilken lista passar för stegen i ett recept?',
      options: ['<ol>', '<ul>', '<table>', '<p>'],
      explain: 'Stegen måste göras i ordning, och ol numrerar dem åt dig.',
    },
    {
      question: 'Vilken tagg är en rubrikcell i en tabell?',
      options: ['<th>', '<td>', '<tr>', '<caption>'],
      explain: 'th är en rubrikcell, td en vanlig cell och tr en rad.',
    },
    {
      question: 'Vad står i den andra cellen på första raden?',
      code: '<table>\n  <tr><td>Ost</td><td>30 kr</td></tr>\n  <tr><td>Bröd</td><td>25 kr</td></tr>\n</table>',
      options: ['30 kr', 'Bröd', 'Ost', '25 kr'],
      explain: 'Raden läses från vänster: Ost först, sedan 30 kr.',
      check: "$('tr').children[1].textContent",
    },
  ],
};

// Id:t som sparas bland de klara när man klarat en banas test. Det följer
// då med till kontot som allt annat, utan en egen kolumn i databasen.
export const passedId = trackId => `${trackId}-testad`;

export function passedTrackIdsFrom(completedIds, tracks) {
  return tracks
    .map(track => track.id)
    .filter(id => completedIds.includes(passedId(id)));
}

// Frågorna för en bana. Med perTrack väljs så många ut, i bankens ordning.
export function trackQuestions(trackId, perTrack, random = Math.random) {
  const all = (QUIZ[trackId] ?? []).map(question => ({ ...question, trackId }));
  if (!perTrack || perTrack >= all.length) return all;
  const keep = new Set(
    all
      .map((_, index) => ({ index, sort: random() }))
      .sort((a, b) => a.sort - b.sort)
      .slice(0, perTrack)
      .map(item => item.index),
  );
  return all.filter((_, index) => keep.has(index));
}

// Nivåtestet: tre frågor per bana, bana för bana i kursens ordning.
export function placementQuestions(tracks, random = Math.random) {
  return tracks.flatMap(track => trackQuestions(track.id, 3, random));
}

// Banorna man klarat: alla banor före den första där man svarade fel
// eller inte hann svara på alla frågor. answers är trackId och om svaret
// var rätt, i ordning. questions är frågorna som ställdes.
export function passedTracks(tracks, answers, questions) {
  const passed = [];
  for (const track of tracks) {
    const asked = questions.filter(question => question.trackId === track.id);
    const forTrack = answers.filter(answer => answer.trackId === track.id);
    if (asked.length === 0 || forTrack.length < asked.length) break;
    if (forTrack.some(answer => !answer.correct)) break;
    passed.push(track.id);
  }
  return passed;
}

// Blandar svarsalternativen. Returnerar alternativen och var rätt svar
// hamnade.
export function shuffleOptions(options, random = Math.random) {
  const order = options.map((option, index) => ({ option, index }));
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return {
    options: order.map(item => item.option),
    answer: order.findIndex(item => item.index === 0),
  };
}
