const fs = require('fs');
const path = require('path');

const INPUT_FILE = 'input.txt';
const BUFFER = fs.readFileSync(path.join(__dirname, INPUT_FILE));
const MAP_ROWS = BUFFER.toString().split('\n');
const TREE_CHAR = '#';

function day3Part1(deltaX, deltaY) {
  const ROW_SIZE = MAP_ROWS[0].length; // Each row in the map has the same length
  let [currRow, currCol] = [0, 0]; // Starting point is the top-left corner of the map
  let encounteredTrees = 0;

  while (currRow < MAP_ROWS.length - deltaY) {
    currRow += deltaY;
    currCol += deltaX;

    if (MAP_ROWS[currRow][currCol % ROW_SIZE] === TREE_CHAR) {
      encounteredTrees++;
    }
  }

  return encounteredTrees;
}

function day3Part2() {
  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];
  let answer = 1;

  for (const slope of slopes) {
    // Use the same function we already defined for Part 1 of the problem
    answer *= day3Part1(slope[0], slope[1]);
  }

  return answer;
}

module.exports = [day3Part1, day3Part2];
