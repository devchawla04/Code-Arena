const QUESTION_TITLES = [
  'Create Hello World Function',
  'Counter',
  'To Be Or Not To Be',
  'Counter II',
  'Apply Transform Over Each Element in Array',
  'Filter Elements from Array',
  'Array Reduce Transformation',
  'Function Composition',
  'Return Length of Arguments Passed',
  'Allow One Function Call',
  'Memoize',
  'Add Two Promises',
  'Sleep',
  'Timeout Cancellation',
  'Interval Cancellation',
  'Promise Time Limit',
  'Cache With Time Limit',
  'Debounce',
  'Execute Asynchronous Functions in Parallel',
  'Is Object Empty',
  'Chunk Array',
  'Array Prototype Last',
  'Group By',
  'Sort By',
  'Join Two Arrays by ID',
  'Flatten Deeply Nested Array',
  'Compact Object',
  'Event Emitter',
  'Array Wrapper',
  'Calculator with Method Chaining',
]

const ACCEPTANCE_RATES = [
  '86.2%',
  '78.4%',
  '73.1%',
  '70.6%',
  '75.8%',
  '74.2%',
  '69.5%',
  '67.9%',
  '82.1%',
  '76.3%',
  '58.7%',
  '81.9%',
  '72.4%',
  '65.1%',
  '63.8%',
  '61.7%',
  '57.3%',
  '60.2%',
  '55.8%',
  '79.2%',
  '74.9%',
  '77.4%',
  '62.5%',
  '72.6%',
  '59.4%',
  '56.1%',
  '58.6%',
  '53.7%',
  '64.4%',
  '52.3%',
]

const PROBLEM_DETAILS = {
  'Create Hello World Function': {
    statement: 'Return a function that always returns "Hello World" regardless of arguments.',
    examples: [{ input: 'createHelloWorld()()', output: '"Hello World"' }],
    constraints: ['0 <= arguments.length <= 10'],
  },
  Counter: {
    statement: 'Return a function that returns n on first call and increments on every call.',
    examples: [{ input: 'counter(10) -> 10, 11, 12', output: '[10,11,12]' }],
    constraints: ['-1000 <= n <= 1000', 'At most 1000 calls'],
  },
  'To Be Or Not To Be': {
    statement: 'Implement expect(val) with toBe and notToBe assertions.',
    examples: [{ input: 'expect(5).toBe(5)', output: 'true (no throw)' }],
    constraints: ['Values are JSON-serializable'],
  },
  'Counter II': {
    statement: 'Return object with increment, decrement and reset for initial value.',
    examples: [{ input: 'createCounter(5).increment()', output: '6' }],
    constraints: ['-1000 <= init <= 1000', 'At most 1000 method calls'],
  },
  'Apply Transform Over Each Element in Array': {
    statement: 'Apply fn(arr[i], i) for each element and return transformed array.',
    examples: [{ input: 'arr=[1,2,3], fn=x=>x+1', output: '[2,3,4]' }],
    constraints: ['0 <= arr.length <= 1000'],
  },
  'Filter Elements from Array': {
    statement: 'Return only elements where fn(arr[i], i) is truthy.',
    examples: [{ input: 'arr=[0,10,20,30], fn=n=>n>10', output: '[20,30]' }],
    constraints: ['0 <= arr.length <= 1000'],
  },
  'Array Reduce Transformation': {
    statement: 'Reduce array using fn(acc, value) from init value.',
    examples: [{ input: 'arr=[1,2,3,4], init=0, sum', output: '10' }],
    constraints: ['0 <= arr.length <= 1000'],
  },
  'Function Composition': {
    statement: 'Compose a list of functions from right to left.',
    examples: [{ input: 'compose([x=>x+1, x=>2*x])(4)', output: '9' }],
    constraints: ['1 <= functions.length <= 1000'],
  },
  'Return Length of Arguments Passed': {
    statement: 'Return how many arguments are passed into the function.',
    examples: [{ input: 'argumentsLength(1,2,3)', output: '3' }],
    constraints: ['0 <= args.length <= 100'],
  },
  'Allow One Function Call': {
    statement: 'Create wrapper that executes fn only once and then returns undefined.',
    examples: [{ input: 'once(fn)(1), once(fn)(2)', output: 'first call value, then undefined' }],
    constraints: ['At most 10 calls to wrapper'],
  },
  Memoize: {
    statement: 'Cache function outputs by argument list to avoid recomputation.',
    examples: [{ input: 'memoizedSum(2,3) twice', output: '5, then cached 5' }],
    constraints: ['At most 10^5 invocations'],
  },
  'Add Two Promises': {
    statement: 'Resolve both promises and return sum of their resolved values.',
    examples: [{ input: 'Promise(2), Promise(5)', output: '7' }],
    constraints: ['-1000 <= resolved values <= 1000'],
  },
  Sleep: {
    statement: 'Implement sleep(millis) that resolves after millis milliseconds.',
    examples: [{ input: 'await sleep(100)', output: 'resolves after ~100ms' }],
    constraints: ['1 <= millis <= 1000'],
  },
  'Timeout Cancellation': {
    statement: 'Schedule a delayed function call and return a cancel callback.',
    examples: [{ input: 'cancel before delay', output: 'scheduled call does not run' }],
    constraints: ['0 <= delay <= 1000'],
  },
  'Interval Cancellation': {
    statement: 'Run function immediately and at each interval until canceled.',
    examples: [{ input: 'cancel after 3 ticks', output: 'function executes exactly 3 times' }],
    constraints: ['0 <= t <= 1000'],
  },
  'Promise Time Limit': {
    statement: 'Wrap async fn to reject if it exceeds time limit t.',
    examples: [{ input: 'fn takes 200ms, t=100', output: 'rejects "Time Limit Exceeded"' }],
    constraints: ['1 <= t <= 1000'],
  },
  'Cache With Time Limit': {
    statement: 'Implement cache with expiring entries and set/get/count API.',
    examples: [{ input: 'set(1,42,1000), get(1)', output: '42 before expiry, -1 after expiry' }],
    constraints: ['0 <= key, value <= 10^9'],
  },
  Debounce: {
    statement: 'Delay function execution until calls stop for t ms.',
    examples: [{ input: 'rapid calls within t', output: 'only last call executes once' }],
    constraints: ['1 <= t <= 1000'],
  },
  'Execute Asynchronous Functions in Parallel': {
    statement: 'Execute async functions in parallel and resolve all results.',
    examples: [{ input: '[fn1, fn2, fn3]', output: 'resolves [v1, v2, v3]' }],
    constraints: ['1 <= functions.length <= 10'],
  },
  'Is Object Empty': {
    statement: 'Return true when object or array has no own keys/elements.',
    examples: [{ input: '{} and []', output: 'true and true' }],
    constraints: ['Input is object or array'],
  },
  'Chunk Array': {
    statement: 'Split array into chunks of size n.',
    examples: [{ input: 'arr=[1,2,3,4,5], n=2', output: '[[1,2],[3,4],[5]]' }],
    constraints: ['0 <= arr.length <= 1000', '1 <= n <= 1000'],
  },
  'Array Prototype Last': {
    statement: 'Return last element of array or -1 if empty.',
    examples: [{ input: '[1,2,3].last()', output: '3' }],
    constraints: ['0 <= arr.length <= 1000'],
  },
  'Group By': {
    statement: 'Group array values by computed key fn(value).',
    examples: [{ input: '[1,2,3,4], x=>x%2', output: '{0:[2,4],1:[1,3]}' }],
    constraints: ['1 <= array.length <= 1000'],
  },
  'Sort By': {
    statement: 'Sort values by computed key fn(value).',
    examples: [{ input: '[{x:1},{x:0}], fn=o=>o.x', output: '[{x:0},{x:1}]' }],
    constraints: ['1 <= arr.length <= 1000'],
  },
  'Join Two Arrays by ID': {
    statement: 'Merge two arrays of objects by id with right-side overwrite.',
    examples: [{ input: '[{id:1,x:1}], [{id:1,y:2}]', output: '[{id:1,x:1,y:2}]' }],
    constraints: ['1 <= arr1.length, arr2.length <= 1000'],
  },
  'Flatten Deeply Nested Array': {
    statement: 'Flatten nested array up to depth n.',
    examples: [{ input: '[1,[2,[3]]], n=1', output: '[1,2,[3]]' }],
    constraints: ['0 <= arr.length <= 1000', '0 <= n <= 1000'],
  },
  'Compact Object': {
    statement: 'Recursively remove falsy values from objects/arrays.',
    examples: [{ input: '{a:null,b:[0,1,false,2]}', output: '{b:[1,2]}' }],
    constraints: ['Input depth <= 1000'],
  },
  'Event Emitter': {
    statement: 'Implement event emitter with subscribe/unsubscribe/emit.',
    examples: [{ input: 'emit("x", [1]) after subscribe', output: 'returns listener outputs array' }],
    constraints: ['At most 10^3 operations'],
  },
  'Array Wrapper': {
    statement: 'Support addition and string conversion for wrapped numeric arrays.',
    examples: [{ input: 'new ArrayWrapper([1,2]) + new ArrayWrapper([3])', output: '6' }],
    constraints: ['0 <= nums.length <= 1000'],
  },
  'Calculator with Method Chaining': {
    statement: 'Implement chainable calculator with arithmetic methods.',
    examples: [{ input: 'new Calculator(10).add(5).subtract(3).result()', output: '12' }],
    constraints: ['Values fit in signed 32-bit range'],
  },
}

function buildTemplates() {
  return {
    cpp: `// JavaScript-first track. Switch to JS tab for official signature.\nint main() { return 0; }`,
    java: `// JavaScript-first track. Switch to JS tab for official signature.\nclass Solution { public static void main(String[] args) {} }`,
    python: `# JavaScript-first track. Switch to JS tab for official signature.\ndef solve():\n    pass`,
    javascript: `/**\n * Starter template\n */\nfunction solve() {\n  // TODO\n}`,
  }
}

const SEEDED_PROBLEMS = QUESTION_TITLES.map((title, index) => {
  const details = PROBLEM_DETAILS[title]

  return {
    problemId: index + 1,
    title,
    difficulty: index < 10 ? 'Easy' : index < 22 ? 'Medium' : 'Hard',
    acceptance: ACCEPTANCE_RATES[index] || 'N/A',
    tags: ['JavaScript', '30 Days of JS'],
    statement: details?.statement || `LeetCode 30 Days of JavaScript: ${title}.`,
    examples: details?.examples || [{ input: 'See prompt examples', output: 'Expected output from prompt' }],
    constraints: details?.constraints || ['Refer to official constraints for this question'],
    templates: buildTemplates(),
  }
})

module.exports = {
  SEEDED_PROBLEMS,
}
