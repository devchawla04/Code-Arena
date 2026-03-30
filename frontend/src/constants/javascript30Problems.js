const JS_STARTER_BY_TITLE = {
  'Create Hello World Function': `/**
 * @return {Function}
 */
var createHelloWorld = function () {
  return function (...args) {
    // TODO
  };
};`,
  Counter: `/**
 * @param {number} n
 * @return {Function}
 */
var createCounter = function (n) {
  return function () {
    // TODO
  };
};`,
  'To Be Or Not To Be': `/**
 * @param {any} val
 * @return {{toBe: Function, notToBe: Function}}
 */
var expect = function (val) {
  return {
    toBe(other) {
      // TODO
    },
    notToBe(other) {
      // TODO
    },
  };
};`,
  'Counter II': `/**
 * @param {number} init
 * @return {{increment: Function, decrement: Function, reset: Function}}
 */
var createCounter = function (init) {
  return {
    increment() {
      // TODO
    },
    decrement() {
      // TODO
    },
    reset() {
      // TODO
    },
  };
};`,
  'Apply Transform Over Each Element in Array': `/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var map = function (arr, fn) {
  // TODO
};`,
  'Filter Elements from Array': `/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var filter = function (arr, fn) {
  // TODO
};`,
  'Array Reduce Transformation': `/**
 * @param {number[]} nums
 * @param {Function} fn
 * @param {number} init
 * @return {number}
 */
var reduce = function (nums, fn, init) {
  // TODO
};`,
  'Function Composition': `/**
 * @param {Function[]} functions
 * @return {Function}
 */
var compose = function (functions) {
  return function (x) {
    // TODO
  };
};`,
  'Return Length of Arguments Passed': `/**
 * @param {...(null|boolean|number|string|Array|Object)} args
 * @return {number}
 */
var argumentsLength = function (...args) {
  // TODO
};`,
  'Allow One Function Call': `/**
 * @param {Function} fn
 * @return {Function}
 */
var once = function (fn) {
  return function (...args) {
    // TODO
  };
};`,
  Memoize: `/**
 * @param {Function} fn
 * @return {Function}
 */
function memoize(fn) {
  return function (...args) {
    // TODO
  };
}`,
  'Add Two Promises': `/**
 * @param {Promise<number>} promise1
 * @param {Promise<number>} promise2
 * @return {Promise<number>}
 */
var addTwoPromises = async function (promise1, promise2) {
  // TODO
};`,
  Sleep: `/**
 * @param {number} millis
 */
async function sleep(millis) {
  // TODO
}`,
  'Timeout Cancellation': `/**
 * @param {Function} fn
 * @param {Array} args
 * @param {number} t
 * @return {Function}
 */
var cancellable = function (fn, args, t) {
  return function () {
    // TODO
  };
};`,
  'Interval Cancellation': `/**
 * @param {Function} fn
 * @param {Array} args
 * @param {number} t
 * @return {Function}
 */
var cancellable = function (fn, args, t) {
  // TODO
  return function () {
  };
};`,
  'Promise Time Limit': `/**
 * @param {Function} fn
 * @param {number} t
 * @return {Function}
 */
var timeLimit = function (fn, t) {
  return async function (...args) {
    // TODO
  };
};`,
  'Cache With Time Limit': `var TimeLimitedCache = function () {
  // TODO
};

/**
 * @param {number} key
 * @param {number} value
 * @param {number} duration time until expiration in ms
 * @return {boolean} true if unexpired key already existed
 */
TimeLimitedCache.prototype.set = function (key, value, duration) {
  // TODO
};

TimeLimitedCache.prototype.get = function (key) {
  // TODO
};

TimeLimitedCache.prototype.count = function () {
  // TODO
};`,
  Debounce: `/**
 * @param {Function} fn
 * @param {number} t
 * @return {Function}
 */
var debounce = function (fn, t) {
  return function (...args) {
    // TODO
  };
};`,
  'Execute Asynchronous Functions in Parallel': `/**
 * @param {Array<Function>} functions
 * @return {Promise<any>}
 */
var promiseAll = function (functions) {
  // TODO
};`,
  'Is Object Empty': `/**
 * @param {Object|Array} obj
 * @return {boolean}
 */
var isEmpty = function (obj) {
  // TODO
};`,
  'Chunk Array': `/**
 * @param {Array} arr
 * @param {number} size
 * @return {Array}
 */
var chunk = function (arr, size) {
  // TODO
};`,
  'Array Prototype Last': `/**
 * @return {null|boolean|number|string|Array|Object}
 */
Array.prototype.last = function () {
  // TODO
};`,
  'Group By': `/**
 * @param {Function} fn
 * @return {Object}
 */
Array.prototype.groupBy = function (fn) {
  // TODO
};`,
  'Sort By': `/**
 * @param {Array} arr
 * @param {Function} fn
 * @return {Array}
 */
var sortBy = function (arr, fn) {
  // TODO
};`,
  'Join Two Arrays by ID': `/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 */
var join = function (arr1, arr2) {
  // TODO
};`,
  'Flatten Deeply Nested Array': `/**
 * @param {Array} arr
 * @param {number} n
 * @return {Array}
 */
var flat = function (arr, n) {
  // TODO
};`,
  'Compact Object': `/**
 * @param {Object|Array} obj
 * @return {Object|Array}
 */
var compactObject = function (obj) {
  // TODO
};`,
  'Event Emitter': `class EventEmitter {
  constructor() {
    // TODO
  }

  subscribe(eventName, callback) {
    // TODO
  }

  emit(eventName, args = []) {
    // TODO
  }
}`,
  'Array Wrapper': `class ArrayWrapper {
  /** @param {number[]} nums */
  constructor(nums) {
    // TODO
  }

  valueOf() {
    // TODO
  }

  toString() {
    // TODO
  }
}`,
  'Calculator with Method Chaining': `class Calculator {
  /** @param {number} value */
  constructor(value) {
    // TODO
  }

  add(value) {
    // TODO
  }

  subtract(value) {
    // TODO
  }

  multiply(value) {
    // TODO
  }

  divide(value) {
    // TODO
  }

  power(value) {
    // TODO
  }

  getResult() {
    // TODO
  }
}`,
};

function buildTemplates(title) {
  const jsStarter =
    JS_STARTER_BY_TITLE[title] ||
    `// JavaScript starter\nfunction solve() {\n  // TODO\n}`;

  return {
    cpp: `// This track is JavaScript-first on LeetCode.\n// Switch to JavaScript for the exact function signature.\n\nint main() {\n  return 0;\n}`,
    java: `// This track is JavaScript-first on LeetCode.\n// Switch to JavaScript for the exact function signature.\n\nclass Solution {\n  public static void main(String[] args) {}\n}`,
    python: `# This track is JavaScript-first on LeetCode.\n# Switch to JavaScript for the exact function signature.\n\ndef solve():\n    pass`,
    javascript: jsStarter,
  };
}

const PROBLEM_DETAILS = [
  {
    title: 'Create Hello World Function',
    statement: 'Return a function that always returns "Hello World" regardless of input.',
    examples: [{ input: 'createHelloWorld()()', output: '"Hello World"' }],
  },
  {
    title: 'Counter',
    statement: 'Return a function that increments from a starting integer each call.',
    examples: [{ input: 'counter(10) -> 10, 11, 12', output: '[10,11,12]' }],
  },
  {
    title: 'To Be Or Not To Be',
    statement: 'Create expect(val) with toBe and notToBe assertion helpers.',
    examples: [{ input: 'expect(5).toBe(5)', output: 'true (no throw)' }],
  },
  {
    title: 'Counter II',
    statement: 'Build an object counter with increment, decrement, and reset methods.',
    examples: [{ input: 'createCounter(5).increment()', output: '6' }],
  },
  {
    title: 'Apply Transform Over Each Element in Array',
    statement: 'Apply a transform(arr[i], i) to each element and return mapped array.',
    examples: [{ input: 'arr=[1,2,3], fn=x=>x+1', output: '[2,3,4]' }],
  },
  {
    title: 'Filter Elements from Array',
    statement: 'Return elements where predicate(arr[i], i) is truthy.',
    examples: [{ input: 'arr=[0,10,20,30], fn=n=>n>10', output: '[20,30]' }],
  },
  {
    title: 'Array Reduce Transformation',
    statement: 'Reduce array with reducer(acc, val) from initial value.',
    examples: [{ input: 'arr=[1,2,3,4], init=0, sum', output: '10' }],
  },
  {
    title: 'Function Composition',
    statement: 'Compose functions so output of one becomes input of previous.',
    examples: [{ input: 'compose([x=>x+1, x=>2*x])(4)', output: '9' }],
  },
  {
    title: 'Return Length of Arguments Passed',
    statement: 'Return the number of arguments received.',
    examples: [{ input: 'argumentsLength(1,2,3)', output: '3' }],
  },
  {
    title: 'Allow One Function Call',
    statement: 'Wrap a function so it can be invoked only once.',
    examples: [{ input: 'once(fn)(1), once(fn)(2)', output: 'first call value, then undefined' }],
  },
  {
    title: 'Memoize',
    statement: 'Cache function outputs by arguments to avoid recomputation.',
    examples: [{ input: 'memoizedSum(2,3) twice', output: '5, then 5 from cache' }],
  },
  {
    title: 'Add Two Promises',
    statement: 'Resolve two promises and return sum of resolved values.',
    examples: [{ input: 'Promise(2), Promise(5)', output: '7' }],
  },
  {
    title: 'Sleep',
    statement: 'Create sleep(millis) returning promise resolved after millis.',
    examples: [{ input: 'await sleep(100)', output: 'resolves after about 100ms' }],
  },
  {
    title: 'Timeout Cancellation',
    statement: 'Schedule a function and return cancel function to stop execution.',
    examples: [{ input: 'cancel before delay', output: 'scheduled fn does not run' }],
  },
  {
    title: 'Interval Cancellation',
    statement: 'Run function repeatedly with interval and support cancel.',
    examples: [{ input: 'cancel after 3 ticks', output: 'fn called exactly 3 times' }],
  },
  {
    title: 'Promise Time Limit',
    statement: 'Wrap async fn so it rejects if execution exceeds t milliseconds.',
    examples: [{ input: 'fn takes 200ms, t=100', output: 'rejects with time limit message' }],
  },
  {
    title: 'Cache With Time Limit',
    statement: 'Set/get/count entries that expire after duration.',
    examples: [{ input: 'set(1,42,1000), get(1)', output: '42 before expiry, -1 after expiry' }],
  },
  {
    title: 'Debounce',
    statement: 'Delay invocation until no calls happen for t milliseconds.',
    examples: [{ input: 'rapid calls within t', output: 'only last call executes once' }],
  },
  {
    title: 'Execute Asynchronous Functions in Parallel',
    statement: 'Run async functions in parallel and resolve all outputs.',
    examples: [{ input: '[fn1, fn2, fn3]', output: 'resolves [v1, v2, v3]' }],
  },
  {
    title: 'Is Object Empty',
    statement: 'Return true if object/array has no own enumerable properties/elements.',
    examples: [{ input: '{} and []', output: 'true and true' }],
  },
  {
    title: 'Chunk Array',
    statement: 'Split array into chunks of size n.',
    examples: [{ input: 'arr=[1,2,3,4,5], n=2', output: '[[1,2],[3,4],[5]]' }],
  },
  {
    title: 'Array Prototype Last',
    statement: 'Implement Array.prototype.last() returning last element or -1.',
    examples: [{ input: '[1,2,3].last()', output: '3' }],
  },
  {
    title: 'Group By',
    statement: 'Group array items by key returned from callback.',
    examples: [{ input: '[1,2,3,4], key=x=>x%2', output: '{0:[2,4],1:[1,3]}' }],
  },
  {
    title: 'Sort By',
    statement: 'Sort array ascending by computed key.',
    examples: [{ input: '[{x:1},{x:0}], fn=o=>o.x', output: '[{x:0},{x:1}]' }],
  },
  {
    title: 'Join Two Arrays by ID',
    statement: 'Merge two object arrays by id with values from second overriding first.',
    examples: [{ input: '[{id:1,x:1}], [{id:1,y:2}]', output: '[{id:1,x:1,y:2}]' }],
  },
  {
    title: 'Flatten Deeply Nested Array',
    statement: 'Flatten nested arrays up to depth n.',
    examples: [{ input: '[1,[2,[3]]], n=1', output: '[1,2,[3]]' }],
  },
  {
    title: 'Compact Object',
    statement: 'Recursively remove falsy values from objects and arrays.',
    examples: [{ input: '{a:null,b:[0,1,false,2]}', output: '{b:[1,2]}' }],
  },
  {
    title: 'Event Emitter',
    statement: 'Implement subscribe/unsubscribe/emit event system.',
    examples: [{ input: 'emit("x",[1]) after subscribe', output: 'returns listener outputs array' }],
  },
  {
    title: 'Array Wrapper',
    statement: 'Wrap array to support custom valueOf and toString behavior.',
    examples: [{ input: 'new ArrayWrapper([1,2]) + new ArrayWrapper([3])', output: '6' }],
  },
  {
    title: 'Calculator with Method Chaining',
    statement: 'Implement chainable calculator operations and result().',
    examples: [{ input: 'new Calculator(10).add(5).subtract(3).result()', output: '12' }],
  },
]

const CONSTRAINTS_BY_TITLE = {
  'Create Hello World Function': ['0 <= arguments.length <= 10'],
  Counter: ['-1000 <= n <= 1000', 'At most 1000 calls'],
  'To Be Or Not To Be': ['Any JSON-serializable input', 'Throw on assertion mismatch'],
  'Counter II': ['-1000 <= init <= 1000', 'At most 1000 method calls'],
  'Apply Transform Over Each Element in Array': ['0 <= arr.length <= 1000'],
  'Filter Elements from Array': ['0 <= arr.length <= 1000'],
  'Array Reduce Transformation': ['0 <= arr.length <= 1000'],
  'Function Composition': ['1 <= functions.length <= 1000'],
  'Return Length of Arguments Passed': ['0 <= args.length <= 100'],
  'Allow One Function Call': ['At most 10 calls to wrapped function'],
  Memoize: ['At most 10^5 invocations', 'Arguments are JSON-serializable'],
  'Add Two Promises': ['-1000 <= value <= 1000'],
  Sleep: ['1 <= millis <= 1000'],
  'Timeout Cancellation': ['0 <= delay <= 1000'],
  'Interval Cancellation': ['0 <= delay <= 1000', '0 <= period <= 1000'],
  'Promise Time Limit': ['1 <= t <= 1000'],
  'Cache With Time Limit': ['0 <= key, value <= 10^9', '1 <= duration <= 10^9'],
  Debounce: ['1 <= t <= 1000'],
  'Execute Asynchronous Functions in Parallel': ['1 <= functions.length <= 10'],
  'Is Object Empty': ['Input is object or array'],
  'Chunk Array': ['0 <= arr.length <= 1000', '1 <= n <= 1000'],
  'Array Prototype Last': ['0 <= arr.length <= 1000'],
  'Group By': ['1 <= array.length <= 1000'],
  'Sort By': ['1 <= arr.length <= 1000'],
  'Join Two Arrays by ID': ['1 <= arr1.length, arr2.length <= 1000'],
  'Flatten Deeply Nested Array': ['0 <= arr.length <= 1000', '0 <= n <= 1000'],
  'Compact Object': ['Input depth <= 1000'],
  'Event Emitter': ['At most 10^3 subscriptions/emits'],
  'Array Wrapper': ['0 <= nums.length <= 1000'],
  'Calculator with Method Chaining': ['Values are within 32-bit signed integer range'],
}

const JAVASCRIPT_30_PROBLEMS = PROBLEM_DETAILS.map((problem, index) => ({
  id: index + 1,
  title: problem.title,
  difficulty: index < 10 ? 'Easy' : index < 22 ? 'Medium' : 'Hard',
  acceptance: 'N/A',
  tags: ['JavaScript', '30 Days of JS'],
  statement: problem.statement,
  examples: problem.examples,
  constraints: CONSTRAINTS_BY_TITLE[problem.title] ?? ['Refer to the official LeetCode constraints.'],
  templates: buildTemplates(problem.title),
}))

export { JAVASCRIPT_30_PROBLEMS }
