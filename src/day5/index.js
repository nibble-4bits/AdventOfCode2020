const fs = require('fs');
const path = require('path');

const INPUT_FILE = 'input.txt';
const BUFFER = fs.readFileSync(path.join(__dirname, INPUT_FILE));
const BOARDING_PASSES = BUFFER.toString().split('\n');
const MAX_ROW = 127;
const MAX_COL = 7;

function day5Part1() {
  const seatIds = [];

  for (const pass of BOARDING_PASSES) {
    let [minRow, maxRow] = [0, MAX_ROW];
    let [minCol, maxCol] = [0, MAX_COL];
    for (const char of pass) {
      if (char === 'F') {
        maxRow = Math.floor((maxRow - minRow) / 2 + minRow);
      } else if (char === 'B') {
        minRow = Math.ceil((maxRow - minRow) / 2 + minRow);
      } else if (char === 'L') {
        maxCol = Math.floor((maxCol - minCol) / 2 + minCol);
      } else if (char === 'R') {
        minCol = Math.ceil((maxCol - minCol) / 2 + minCol);
      }
    }
    seatIds.push(maxRow * 8 + maxCol);
  }

  return Math.max(...seatIds);
}

function day5Part2() {
  const seatIds = [];
  let answer = 0;

  for (const pass of BOARDING_PASSES) {
    let [minRow, maxRow] = [0, MAX_ROW];
    let [minCol, maxCol] = [0, MAX_COL];
    for (const char of pass) {
      if (char === 'F') {
        maxRow = Math.floor((maxRow - minRow) / 2 + minRow);
      } else if (char === 'B') {
        minRow = Math.ceil((maxRow - minRow) / 2 + minRow);
      } else if (char === 'L') {
        maxCol = Math.floor((maxCol - minCol) / 2 + minCol);
      } else if (char === 'R') {
        minCol = Math.ceil((maxCol - minCol) / 2 + minCol);
      }
    }
    seatIds.push(maxRow * 8 + maxCol);
  }

  seatIds.sort((a, b) => a - b);
  for (let i = 1; i < seatIds.length; i++) {
    if (seatIds[i] - 1 !== seatIds[i - 1]) {
      // If current number is not consecutive, then we found our seat
      answer = seatIds[i] - 1;
    }
  }

  return answer;
}

module.exports = [day5Part1, day5Part2];
