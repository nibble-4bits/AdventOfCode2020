const fs = require('fs');
const path = require('path');

const INPUT_FILE = 'input.txt';
const BUFFER = fs.readFileSync(path.join(__dirname, INPUT_FILE));
const NUMBERS = BUFFER.toString().split('\n').map(Number);
const PREAMBLE_LENGTH = 25;

function isSumOfPair(idx) {
  for (let i = idx - PREAMBLE_LENGTH; i < idx; i++) {
    for (let j = i + 1; j < idx; j++) {
      if (NUMBERS[i] + NUMBERS[j] === NUMBERS[idx]) {
        return true;
      }
    }
  }
  return false;
}

function day9Part1() {
  for (let i = PREAMBLE_LENGTH; i < NUMBERS.length; i++) {
    if (!isSumOfPair(i)) {
      return NUMBERS[i];
    }
  }
  return null;
}

function findContiguousSet(invalidNum) {
  let range = [];

  for (let i = 0; i < NUMBERS.length; i++) {
    let attemptedSum = NUMBERS[i];
    range.push(NUMBERS[i]);

    for (let j = i + 1; j < NUMBERS.length; j++) {
      if (attemptedSum >= invalidNum) break;

      attemptedSum += NUMBERS[j];
      range.push(NUMBERS[j]);
    }

    if (attemptedSum === invalidNum) return range;

    range = [];
  }

  return range;
}

function day9Part2() {
  const invalidNum = day9Part1();
  const contiguousSet = findContiguousSet(invalidNum);

  return contiguousSet[0] + contiguousSet[contiguousSet.length - 1];
}

module.exports = [day9Part1, day9Part2];
