import formatCurrency  from "../scripts/utils/money.js";

let testSuiteString = '(test suite: formatCurrency) '
let testCaseString = '';

testCaseString = testSuiteString + 'converts cents to Dollars - '
testCaseString += (formatCurrency(2095) === '20.95') ? 'passed' : 'failed';
console.log (testCaseString);

testCaseString = testSuiteString + 'Works with 0 - '
testCaseString += (formatCurrency(0) === '0.00') ? 'passed' : 'failed';
console.log (testCaseString);

testCaseString = testSuiteString + 'Rounds up to the nearest cents - '
testCaseString += (formatCurrency(2000.5) === '20.01') ? 'passed' : 'failed';
console.log (testCaseString);

testCaseString = testSuiteString + 'Rounds down to the nearest cents - '
testCaseString += (formatCurrency(2000.4) === '20.00') ? 'passed' : 'failed';
console.log (testCaseString);

testCaseString = testSuiteString + 'works with negative value - '
testCaseString += (formatCurrency(-100) === '-1.00') ? 'passed' : 'failed';
console.log (testCaseString);
