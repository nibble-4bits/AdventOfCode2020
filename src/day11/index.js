const fs = require('fs');
const path = require('path');

const INPUT_FILE = 'input.txt';
const BUFFER = fs.readFileSync(path.join(__dirname, INPUT_FILE));
const LAYOUT = BUFFER.toString().split('\n');

function isLayoutDifferent(previousLayout, newLayout) {
  for (let i = 0; i < previousLayout.length; i++) {
    for (let j = 0; j < previousLayout[i].length; j++) {
      if (previousLayout[i][j] !== newLayout[i][j]) {
        return true;
      }
    }
  }

  return false;
}

function checkAdjacentSeats(layout, row, col) {
  let emptySeats = 0,
    occupiedSeats = 0;

  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      if (
        i >= 0 &&
        j >= 0 &&
        i < layout.length &&
        j < layout[i].length &&
        (i !== row || j !== col)
      ) {
        if (layout[i][j] === 'L') {
          emptySeats++;
        } else if (layout[i][j] === '#') {
          occupiedSeats++;
        }
      }
    }
  }

  return [emptySeats, occupiedSeats];
}

function countSeats(layout) {
  let emptySeats = 0,
    occupiedSeats = 0;

  for (let i = 0; i < layout.length; i++) {
    for (let j = 0; j < layout[i].length; j++) {
      if (layout[i][j] === 'L') {
        emptySeats++;
      } else if (layout[i][j] === '#') {
        occupiedSeats++;
      }
    }
  }

  return [emptySeats, occupiedSeats];
}

function day11Part1() {
  let previousLayout, newLayout, newRow, occupiedSeats;

  do {
    previousLayout = (newLayout || LAYOUT).slice();
    newLayout = [];
    for (let i = 0; i < previousLayout.length; i++) {
      newRow = '';
      for (let j = 0; j < previousLayout[i].length; j++) {
        switch (previousLayout[i][j]) {
          case 'L':
            [, occupiedSeats] = checkAdjacentSeats(previousLayout, i, j);
            newRow += occupiedSeats === 0 ? '#' : 'L';
            break;
          case '#':
            [, occupiedSeats] = checkAdjacentSeats(previousLayout, i, j);
            newRow += occupiedSeats >= 4 ? 'L' : '#';
            break;
          default:
            newRow += '.';
            break;
        }
      }
      newLayout.push(newRow);
    }
  } while (isLayoutDifferent(previousLayout, newLayout));

  const [, finalOccupiedSeats] = countSeats(newLayout);
  return finalOccupiedSeats;
}

function checkDistantSeats(layout, row, col) {
  let emptySeats = 0,
    occupiedSeats = 0;
  let seen = [false, false, false, false, false, false, false, false];
  let direction;

  for (let k = 1; k < layout.length; k++) {
    direction = 0;
    for (let i = row - k; i <= row + k; i += k) {
      for (let j = col - k; j <= col + k; j += k) {
        if (
          !seen[direction] &&
          i >= 0 &&
          j >= 0 &&
          i < layout.length &&
          j < layout[i].length &&
          (i !== row || j !== col)
        ) {
          if (layout[i][j] === 'L') {
            emptySeats++;
            seen[direction] = true;
          } else if (layout[i][j] === '#') {
            occupiedSeats++;
            seen[direction] = true;
          }
        }
        direction++;
      }
    }
  }

  return [emptySeats, occupiedSeats];
}

function day11Part2() {
  let previousLayout, newLayout, newRow, occupiedSeats;

  do {
    previousLayout = (newLayout || LAYOUT).slice();
    newLayout = [];
    for (let i = 0; i < previousLayout.length; i++) {
      newRow = '';
      for (let j = 0; j < previousLayout[i].length; j++) {
        switch (previousLayout[i][j]) {
          case 'L':
            [, occupiedSeats] = checkDistantSeats(previousLayout, i, j);
            newRow += occupiedSeats === 0 ? '#' : 'L';
            break;
          case '#':
            [, occupiedSeats] = checkDistantSeats(previousLayout, i, j);
            newRow += occupiedSeats >= 5 ? 'L' : '#';
            break;
          default:
            newRow += '.';
            break;
        }
      }
      newLayout.push(newRow);
    }
  } while (isLayoutDifferent(previousLayout, newLayout));

  const [, finalOccupiedSeats] = countSeats(newLayout);
  return finalOccupiedSeats;
}

module.exports = [day11Part1, day11Part2];
