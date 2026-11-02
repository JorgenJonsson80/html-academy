import { BOSSES } from './bossar';
import { GRUNDER } from './grunder';

// Alla övningar i banornas ordning, med bossen sist i varje bana. Se
// SPEC.md för alla fält.
export const LESSONS = [...GRUNDER, BOSSES.grunder];
