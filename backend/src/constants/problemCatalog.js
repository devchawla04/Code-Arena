const PROBLEM_TESTS = {
  1: {
    run: [
      { nums: [2, 7, 11, 15], target: 9, expected: [0, 1] },
      { nums: [3, 2, 4], target: 6, expected: [1, 2] },
      { nums: [3, 3], target: 6, expected: [0, 1] },
    ],
    submit: [
      { nums: [2, 7, 11, 15], target: 9, expected: [0, 1] },
      { nums: [3, 2, 4], target: 6, expected: [1, 2] },
      { nums: [3, 3], target: 6, expected: [0, 1] },
      { nums: [-1, -2, -3, -4, -5], target: -8, expected: [2, 4] },
      { nums: [0, 4, 3, 0], target: 0, expected: [0, 3] },
    ],
  },
  2: {
    run: [
      { s: 'abcabcbb', expected: 3 },
      { s: 'bbbbb', expected: 1 },
      { s: 'pwwkew', expected: 3 },
    ],
    submit: [
      { s: 'abcabcbb', expected: 3 },
      { s: 'bbbbb', expected: 1 },
      { s: 'pwwkew', expected: 3 },
      { s: '', expected: 0 },
      { s: 'dvdf', expected: 3 },
      { s: 'tmmzuxt', expected: 5 },
    ],
  },
  3: {
    run: [
      { intervals: [[1, 3], [2, 6], [8, 10], [15, 18]], expected: [[1, 6], [8, 10], [15, 18]] },
      { intervals: [[1, 4], [4, 5]], expected: [[1, 5]] },
    ],
    submit: [
      { intervals: [[1, 3], [2, 6], [8, 10], [15, 18]], expected: [[1, 6], [8, 10], [15, 18]] },
      { intervals: [[1, 4], [4, 5]], expected: [[1, 5]] },
      { intervals: [[1, 4], [0, 0]], expected: [[0, 0], [1, 4]] },
      { intervals: [[1, 4], [2, 3]], expected: [[1, 4]] },
      { intervals: [[1, 4], [0, 2], [3, 5]], expected: [[0, 5]] },
    ],
  },
}

const LANGUAGE_CONFIG = {
  javascript: { judge0LanguageId: 63 },
  python: { judge0LanguageId: 71 },
  java: { judge0LanguageId: 62 },
  cpp: { judge0LanguageId: 54 },
}

module.exports = {
  PROBLEM_TESTS,
  LANGUAGE_CONFIG,
}
