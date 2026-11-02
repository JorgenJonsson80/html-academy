import { describe, expect, it } from 'vitest';
import { buildAiPrompt } from './aiPrompt';

const lesson = {
  title: 'Ditt första program',
  task: 'Uppgift: Skriv ut `Hej, världen!` med print.',
};

describe('buildAiPrompt', () => {
  it('ber AI:n att inte ge lösningen och håller sig till det eleven kan', () => {
    const prompt = buildAiPrompt({
      lesson,
      code: 'print("fel")\n',
      feedback: null,
      learnedTracks: ['Grunderna i Python'],
    });
    expect(prompt).toContain('Ge mig INTE hela lösningen');
    expect(prompt).toContain(
      'lärt mig det här än så länge: Grunderna i Python',
    );
    expect(prompt).toContain('Skriv ut Hej, världen! med print.');
    expect(prompt).toContain('```html\nprint("fel")\n```');
    expect(prompt).toContain('Jag har inte kört koden än.');
  });

  it('tar med fel, underkända tester och utskrift', () => {
    const prompt = buildAiPrompt({
      lesson,
      code: 'print(namn)',
      feedback: {
        isCorrect: false,
        error: {
          type: 'NameError',
          message: "NameError: name 'namn' is not defined",
          line: 1,
        },
        results: [
          {
            description: 'Skriver ut hej',
            passed: false,
            text: 'utskriften blev ingenting',
          },
          { description: 'Klarar sig', passed: true, text: null },
        ],
        output: ['rad 1', 'rad 2'],
      },
      learnedTracks: ['Grunderna i Python', 'Loopar'],
    });
    expect(prompt).toContain("NameError: name 'namn' is not defined");
    expect(prompt).toContain('(Förklaring:');
    expect(prompt).toContain('- Skriver ut hej (utskriften blev ingenting)');
    expect(prompt).not.toContain('Klarar sig');
    expect(prompt).toContain('Programmet skrev ut:\nrad 1\nrad 2');
  });

  it('säger vad som hände när koden tog för lång tid', () => {
    const prompt = buildAiPrompt({
      lesson,
      code: 'while True:\n    pass',
      feedback: {
        isCorrect: false,
        message: 'Koden tog mer än 3 sekunder',
        results: [],
        output: [],
      },
      learnedTracks: ['Loopar'],
    });
    expect(prompt).toContain('Koden tog mer än 3 sekunder');
  });
});
