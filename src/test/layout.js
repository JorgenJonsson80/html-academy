import { LAYOUT_HELPERS } from '../runner/checkPage';

const CALLS = new RegExp(`\\b(${LAYOUT_HELPERS.join('|')})\\(`);

// Övningar som mäter layout eller rättas i en annan bredd går inte att
// rätta i jsdom. De rättas bara i Chrome (grading.browser.test.js).
export const needsBrowser = item =>
  item.tests.some(test => test.width || CALLS.test(test.code));
