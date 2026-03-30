const { PROBLEM_TESTS, LANGUAGE_CONFIG } = require('../constants/problemCatalog')

const JUDGE0_URL = process.env.JUDGE0_URL || 'https://ce.judge0.com'

function getTests(problemId, mode) {
  const bucket = PROBLEM_TESTS[problemId]
  if (!bucket) return null
  return mode === 'submit' ? bucket.submit : bucket.run
}

function buildJavascriptHarness(problemId, userCode, tests) {
  if (problemId === 1) {
    return `${userCode}\n\nconst __tests = ${JSON.stringify(tests)};\nconst __solver = new Solution();\nlet __passed = 0;\nconst __details = [];\nfor (let i = 0; i < __tests.length; i++) {\n  const tc = __tests[i];\n  const actual = __solver.twoSum(tc.nums, tc.target);\n  const passed = JSON.stringify(actual) === JSON.stringify(tc.expected);\n  if (passed) __passed += 1;\n  __details.push({ case: i + 1, passed, expected: tc.expected, actual });\n}\nconsole.log(JSON.stringify({ passed: __passed, total: __tests.length, details: __details }));`
  }

  if (problemId === 2) {
    return `${userCode}\n\nconst __tests = ${JSON.stringify(tests)};\nconst __solver = new Solution();\nlet __passed = 0;\nconst __details = [];\nfor (let i = 0; i < __tests.length; i++) {\n  const tc = __tests[i];\n  const actual = __solver.lengthOfLongestSubstring(tc.s);\n  const passed = actual === tc.expected;\n  if (passed) __passed += 1;\n  __details.push({ case: i + 1, passed, expected: tc.expected, actual });\n}\nconsole.log(JSON.stringify({ passed: __passed, total: __tests.length, details: __details }));`
  }

  return `${userCode}\n\nconst __tests = ${JSON.stringify(tests)};\nconst __solver = new Solution();\nlet __passed = 0;\nconst __details = [];\nfor (let i = 0; i < __tests.length; i++) {\n  const tc = __tests[i];\n  const actual = __solver.merge(tc.intervals);\n  const passed = JSON.stringify(actual) === JSON.stringify(tc.expected);\n  if (passed) __passed += 1;\n  __details.push({ case: i + 1, passed, expected: tc.expected, actual });\n}\nconsole.log(JSON.stringify({ passed: __passed, total: __tests.length, details: __details }));`
}

function buildPythonHarness(problemId, userCode, tests) {
  if (problemId === 1) {
    return `${userCode}\n\nimport json\n__tests = ${JSON.stringify(tests)}\n__solver = Solution()\n__passed = 0\n__details = []\nfor i, tc in enumerate(__tests):\n    actual = __solver.twoSum(tc['nums'], tc['target'])\n    passed = actual == tc['expected']\n    if passed:\n        __passed += 1\n    __details.append({'case': i + 1, 'passed': passed, 'expected': tc['expected'], 'actual': actual})\nprint(json.dumps({'passed': __passed, 'total': len(__tests), 'details': __details}))`
  }

  if (problemId === 2) {
    return `${userCode}\n\nimport json\n__tests = ${JSON.stringify(tests)}\n__solver = Solution()\n__passed = 0\n__details = []\nfor i, tc in enumerate(__tests):\n    actual = __solver.lengthOfLongestSubstring(tc['s'])\n    passed = actual == tc['expected']\n    if passed:\n        __passed += 1\n    __details.append({'case': i + 1, 'passed': passed, 'expected': tc['expected'], 'actual': actual})\nprint(json.dumps({'passed': __passed, 'total': len(__tests), 'details': __details}))`
  }

  return `${userCode}\n\nimport json\n__tests = ${JSON.stringify(tests)}\n__solver = Solution()\n__passed = 0\n__details = []\nfor i, tc in enumerate(__tests):\n    actual = __solver.merge(tc['intervals'])\n    passed = actual == tc['expected']\n    if passed:\n        __passed += 1\n    __details.append({'case': i + 1, 'passed': passed, 'expected': tc['expected'], 'actual': actual})\nprint(json.dumps({'passed': __passed, 'total': len(__tests), 'details': __details}))`
}

function buildJavaHarness(problemId, userCode, tests) {
  if (problemId === 1) {
    return `${userCode}\n\nclass Main {\n  public static void main(String[] args) {\n    int[][] numsTests = new int[][] { {2,7,11,15}, {3,2,4}, {3,3}, {-1,-2,-3,-4,-5}, {0,4,3,0} };\n    int[] targetTests = new int[] {9, 6, 6, -8, 0};\n    int[][] expectedTests = new int[][] { {0,1}, {1,2}, {0,1}, {2,4}, {0,3} };\n    Solution s = new Solution();\n    int passed = 0;\n    StringBuilder details = new StringBuilder();\n    details.append("[");\n    for (int i = 0; i < numsTests.length; i++) {\n      int[] actual = s.twoSum(numsTests[i], targetTests[i]);\n      boolean ok = java.util.Arrays.equals(actual, expectedTests[i]);\n      if (ok) passed++;\n      details.append("{\\\"case\\\":").append(i + 1)\n        .append(",\\\"passed\\\":").append(ok)\n        .append(",\\\"expected\\\":").append(java.util.Arrays.toString(expectedTests[i]).replace(" ", ""))\n        .append(",\\\"actual\\\":").append(java.util.Arrays.toString(actual).replace(" ", ""))\n        .append("}");\n      if (i < numsTests.length - 1) details.append(",");\n    }\n    details.append("]");\n    System.out.println("{\\\"passed\\\":" + passed + ",\\\"total\\\":" + numsTests.length + ",\\\"details\\\":" + details + "}");\n  }\n}`
  }

  if (problemId === 2) {
    return `${userCode}\n\nclass Main {\n  public static void main(String[] args) {\n    String[] input = new String[] {"abcabcbb", "bbbbb", "pwwkew", "", "dvdf", "tmmzuxt"};\n    int[] expected = new int[] {3, 1, 3, 0, 3, 5};\n    Solution s = new Solution();\n    int passed = 0;\n    StringBuilder details = new StringBuilder();\n    details.append("[");\n    for (int i = 0; i < input.length; i++) {\n      int actual = s.lengthOfLongestSubstring(input[i]);\n      boolean ok = actual == expected[i];\n      if (ok) passed++;\n      details.append("{\\\"case\\\":").append(i + 1)\n        .append(",\\\"passed\\\":").append(ok)\n        .append(",\\\"expected\\\":").append(expected[i])\n        .append(",\\\"actual\\\":").append(actual)\n        .append("}");\n      if (i < input.length - 1) details.append(",");\n    }\n    details.append("]");\n    System.out.println("{\\\"passed\\\":" + passed + ",\\\"total\\\":" + input.length + ",\\\"details\\\":" + details + "}");\n  }\n}`
  }

  return `${userCode}\n\nclass Main {\n  static String arr2DToJson(int[][] arr) {\n    StringBuilder sb = new StringBuilder("[");\n    for (int i = 0; i < arr.length; i++) {\n      sb.append(java.util.Arrays.toString(arr[i]).replace(" ", ""));\n      if (i < arr.length - 1) sb.append(",");\n    }\n    sb.append("]");\n    return sb.toString();\n  }\n  public static void main(String[] args) {\n    int[][][] input = new int[][][] {\n      {{1,3},{2,6},{8,10},{15,18}},\n      {{1,4},{4,5}},\n      {{1,4},{0,0}},\n      {{1,4},{2,3}},\n      {{1,4},{0,2},{3,5}}\n    };\n    int[][][] expected = new int[][][] {\n      {{1,6},{8,10},{15,18}},\n      {{1,5}},\n      {{0,0},{1,4}},\n      {{1,4}},\n      {{0,5}}\n    };\n    Solution s = new Solution();\n    int passed = 0;\n    StringBuilder details = new StringBuilder();\n    details.append("[");\n    for (int i = 0; i < input.length; i++) {\n      int[][] actual = s.merge(input[i]);\n      boolean ok = arr2DToJson(actual).equals(arr2DToJson(expected[i]));\n      if (ok) passed++;\n      details.append("{\\\"case\\\":").append(i + 1)\n        .append(",\\\"passed\\\":").append(ok)\n        .append(",\\\"expected\\\":").append(arr2DToJson(expected[i]))\n        .append(",\\\"actual\\\":").append(arr2DToJson(actual))\n        .append("}");\n      if (i < input.length - 1) details.append(",");\n    }\n    details.append("]");\n    System.out.println("{\\\"passed\\\":" + passed + ",\\\"total\\\":" + input.length + ",\\\"details\\\":" + details + "}");\n  }\n}`
}

function buildCppHarness(problemId, userCode, tests) {
  if (problemId === 1) {
    return `${userCode}\n\n#include <iostream>\n#include <sstream>\n\nstd::string vecToJson(const std::vector<int>& v) {\n  std::ostringstream out; out << \"[\";\n  for (size_t i = 0; i < v.size(); ++i) { out << v[i]; if (i + 1 < v.size()) out << \",\"; }\n  out << \"]\"; return out.str();\n}\n\nint main() {\n  std::vector<std::vector<int>> nums = {{2,7,11,15},{3,2,4},{3,3},{-1,-2,-3,-4,-5},{0,4,3,0}};\n  std::vector<int> target = {9,6,6,-8,0};\n  std::vector<std::vector<int>> expected = {{0,1},{1,2},{0,1},{2,4},{0,3}};\n  Solution s; int passed = 0;\n  std::ostringstream details; details << \"[\";\n  for (size_t i = 0; i < nums.size(); ++i) {\n    auto actual = s.twoSum(nums[i], target[i]);\n    bool ok = actual == expected[i];\n    if (ok) passed++;\n    details << \"{\\\"case\\\":\" << (i + 1) << \",\\\"passed\\\":\" << (ok ? \"true\" : \"false\")\n            << \",\\\"expected\\\":\" << vecToJson(expected[i])\n            << \",\\\"actual\\\":\" << vecToJson(actual) << \"}\";\n    if (i + 1 < nums.size()) details << \",\";\n  }\n  details << \"]\";\n  std::cout << \"{\\\"passed\\\":\" << passed << \",\\\"total\\\":\" << nums.size() << \",\\\"details\\\":\" << details.str() << \"}\";\n}\n`
  }

  if (problemId === 2) {
    return `${userCode}\n\n#include <iostream>\n#include <sstream>\n\nint main() {\n  std::vector<std::string> input = {\"abcabcbb\",\"bbbbb\",\"pwwkew\",\"\",\"dvdf\",\"tmmzuxt\"};\n  std::vector<int> expected = {3,1,3,0,3,5};\n  Solution s; int passed = 0;\n  std::ostringstream details; details << \"[\";\n  for (size_t i = 0; i < input.size(); ++i) {\n    int actual = s.lengthOfLongestSubstring(input[i]);\n    bool ok = actual == expected[i];\n    if (ok) passed++;\n    details << \"{\\\"case\\\":\" << (i + 1) << \",\\\"passed\\\":\" << (ok ? \"true\" : \"false\")\n            << \",\\\"expected\\\":\" << expected[i]\n            << \",\\\"actual\\\":\" << actual << \"}\";\n    if (i + 1 < input.size()) details << \",\";\n  }\n  details << \"]\";\n  std::cout << \"{\\\"passed\\\":\" << passed << \",\\\"total\\\":\" << input.size() << \",\\\"details\\\":\" << details.str() << \"}\";\n}\n`
  }

  return `${userCode}\n\n#include <iostream>\n#include <sstream>\n\nstd::string vec2ToJson(const std::vector<std::vector<int>>& vv) {\n  std::ostringstream out; out << \"[\";\n  for (size_t i = 0; i < vv.size(); ++i) {\n    out << \"[\";\n    for (size_t j = 0; j < vv[i].size(); ++j) { out << vv[i][j]; if (j + 1 < vv[i].size()) out << \",\"; }\n    out << \"]\";\n    if (i + 1 < vv.size()) out << \",\";\n  }\n  out << \"]\"; return out.str();\n}\n\nint main() {\n  std::vector<std::vector<std::vector<int>>> input = {\n    {{1,3},{2,6},{8,10},{15,18}},\n    {{1,4},{4,5}},\n    {{1,4},{0,0}},\n    {{1,4},{2,3}},\n    {{1,4},{0,2},{3,5}}\n  };\n  std::vector<std::vector<std::vector<int>>> expected = {\n    {{1,6},{8,10},{15,18}},\n    {{1,5}},\n    {{0,0},{1,4}},\n    {{1,4}},\n    {{0,5}}\n  };\n  Solution s; int passed = 0;\n  std::ostringstream details; details << \"[\";\n  for (size_t i = 0; i < input.size(); ++i) {\n    auto actual = s.merge(input[i]);\n    bool ok = actual == expected[i];\n    if (ok) passed++;\n    details << \"{\\\"case\\\":\" << (i + 1) << \",\\\"passed\\\":\" << (ok ? \"true\" : \"false\")\n            << \",\\\"expected\\\":\" << vec2ToJson(expected[i])\n            << \",\\\"actual\\\":\" << vec2ToJson(actual) << \"}\";\n    if (i + 1 < input.size()) details << \",\";\n  }\n  details << \"]\";\n  std::cout << \"{\\\"passed\\\":\" << passed << \",\\\"total\\\":\" << input.size() << \",\\\"details\\\":\" << details.str() << \"}\";\n}\n`
}

function buildHarness(problemId, language, userCode, tests) {
  if (language === 'javascript') return buildJavascriptHarness(problemId, userCode, tests)
  if (language === 'python') return buildPythonHarness(problemId, userCode, tests)
  if (language === 'java') return buildJavaHarness(problemId, userCode, tests)
  return buildCppHarness(problemId, userCode, tests)
}

async function executeOnJudge0({ sourceCode, languageId }) {
  const response = await fetch(`${JUDGE0_URL}/submissions?base64_encoded=false&wait=true`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      source_code: sourceCode,
      language_id: languageId,
      stdin: '',
      cpu_time_limit: 5,
      memory_limit: 256000,
    }),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Judge0 request failed: ${response.status} ${text}`)
  }

  return response.json()
}

function safeParseJson(text) {
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

async function runAgainstTests({ problemId, language, code, mode }) {
  const tests = getTests(problemId, mode)
  const languageConfig = LANGUAGE_CONFIG[language]

  if (!tests) {
    throw new Error('Unsupported problem id')
  }

  if (!languageConfig) {
    throw new Error('Unsupported language')
  }

  const sourceCode = buildHarness(problemId, language, code, tests)
  const execution = await executeOnJudge0({ sourceCode, languageId: languageConfig.judge0LanguageId })

  if (execution.compile_output) {
    return {
      status: 'Compilation Error',
      passed: 0,
      total: tests.length,
      runtime: execution.time || 'N/A',
      memory: execution.memory || 'N/A',
      details: [],
      error: execution.compile_output,
    }
  }

  if (execution.stderr) {
    return {
      status: 'Runtime Error',
      passed: 0,
      total: tests.length,
      runtime: execution.time || 'N/A',
      memory: execution.memory || 'N/A',
      details: [],
      error: execution.stderr,
    }
  }

  const parsed = safeParseJson(execution.stdout || '')
  if (!parsed || typeof parsed.passed !== 'number') {
    return {
      status: execution.status?.description || 'Execution Error',
      passed: 0,
      total: tests.length,
      runtime: execution.time || 'N/A',
      memory: execution.memory || 'N/A',
      details: [],
      error: execution.stdout || 'Unable to parse execution output',
    }
  }

  return {
    status: parsed.passed === parsed.total ? 'Accepted' : 'Wrong Answer',
    passed: parsed.passed,
    total: parsed.total,
    runtime: execution.time || 'N/A',
    memory: execution.memory || 'N/A',
    details: parsed.details || [],
  }
}

module.exports = {
  runAgainstTests,
}
