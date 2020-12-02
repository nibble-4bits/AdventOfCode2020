const fs = require('fs');
const path = require('path');

const INPUT_FILE = 'input.txt';
const BUFFER = fs.readFileSync(path.join(__dirname, INPUT_FILE));
const NUMBERS = BUFFER.toString().split('\n').map(Number);
const SUM_GOAL = 2020;

function day1Part1() {
  const set = new Set();

  let pair = null;
  for (const number of NUMBERS) {
    if (set.has(SUM_GOAL - number)) {
      pair = [number, SUM_GOAL - number];
      break;
    }
    set.add(number);
  }

  return pair[0] * pair[1];
}

// Recursive algorithm using backtracking
function day1Part2Helper(n = 3, i = 0, possibleNums = []) {
  if (possibleNums.reduce((acc, num) => acc + num, 0) === SUM_GOAL) {
    return possibleNums;
  } else if (possibleNums.length === n) {
    return [];
  } else {
    while (i < NUMBERS.length) {
      possibleNums.push(NUMBERS[i]);

      if (day1Part2Helper(n, ++i, possibleNums).length === n) {
        return possibleNums;
      }

      possibleNums.pop();
    }
    return [];
  }
}

function day1Part2() {
  const numbers = day1Part2Helper();
  return numbers.reduce((acc, num) => acc * num, 1);
}

module.exports = [day1Part1, day1Part2];
