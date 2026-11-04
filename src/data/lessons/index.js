import { BOSSES } from './bossar';
import { GRUNDER } from './grunder';
import { LANKAR } from './lankar';
import { LISTOR } from './listor';
import { STRUKTUR } from './struktur';
import { FORMULAR } from './formular';
import { CSS } from './css';
import { BOXEN } from './boxen';

// Alla övningar i banornas ordning, med bossen sist i varje bana. Se
// SPEC.md för alla fält.
export const LESSONS = [
  ...GRUNDER,
  BOSSES.grunder,
  ...LANKAR,
  BOSSES.lankar,
  ...LISTOR,
  BOSSES.listor,
  ...STRUKTUR,
  BOSSES.struktur,
  ...FORMULAR,
  BOSSES.formular,
  ...CSS,
  BOSSES.css,
  ...BOXEN,
  BOSSES.boxen,
];
