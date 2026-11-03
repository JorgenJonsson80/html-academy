import { BOSSES } from './bossar';
import { GRUNDER } from './grunder';
import { LANKAR } from './lankar';

// Alla övningar i banornas ordning, med bossen sist i varje bana. Se
// SPEC.md för alla fält.
export const LESSONS = [...GRUNDER, BOSSES.grunder, ...LANKAR, BOSSES.lankar];
