import { describe, expect, it } from 'vitest';
import { evaluate } from '../../runner/evaluate';
import { nodeRunPage } from '../../test/nodePage';
import { LESSONS } from '.';
import { TRACKS } from '../tracks';
import { conceptsTooEarly } from '../../test/concepts';

const check = (lesson, code) =>
  evaluate(lesson, code, nodeRunPage({ code, tests: lesson.tests }));

describe.each(LESSONS.map(lesson => [lesson.id, lesson]))('%s', (_, lesson) => {
  it('facit klarar sina egna tester', () => {
    expect(check(lesson, lesson.solution).isCorrect).toBe(true);
  });

  it('startkoden underkänns', () => {
    expect(check(lesson, lesson.starterCode).isCorrect).toBe(false);
  });

  it('har tre ledtrådar (bossen inga) och en bana som finns', () => {
    expect(lesson.hints).toHaveLength(lesson.isBoss ? 0 : 3);
    expect(TRACKS.map(track => track.id)).toContain(lesson.track);
  });

  it('facit använder bara det banorna hittills lärt ut', () => {
    expect(conceptsTooEarly(lesson.solution, lesson.track)).toEqual([]);
  });

  it('bossen är sist i sin bana', () => {
    const inTrack = LESSONS.filter(other => other.track === lesson.track);
    expect(lesson.isBoss === true).toBe(inTrack.at(-1) === lesson);
  });

  it('har unikt id', () => {
    expect(LESSONS.filter(other => other.id === lesson.id)).toHaveLength(1);
  });
});
