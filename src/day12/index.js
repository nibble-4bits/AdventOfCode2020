const fs = require('fs');
const path = require('path');

const INPUT_FILE = 'input.txt';
const BUFFER = fs.readFileSync(path.join(__dirname, INPUT_FILE));
const INSTRUCTIONS = BUFFER.toString().split('\n');

function day12Part1() {
  const coords = [0, 0]; // [North/South, East/West]
  let currentDirection = 90;

  for (const instruction of INSTRUCTIONS) {
    const command = instruction[0];
    const argument = parseInt(instruction.slice(1));

    switch (command) {
      case 'N':
        coords[0] += argument;
        break;
      case 'S':
        coords[0] -= argument;
        break;
      case 'E':
        coords[1] += argument;
        break;
      case 'W':
        coords[1] -= argument;
        break;
      case 'L':
        currentDirection = (360 + (currentDirection - argument)) % 360;
        break;
      case 'R':
        currentDirection = (currentDirection + argument) % 360;
        break;
      case 'F':
        if (currentDirection === 0) {
          coords[0] += argument;
        } else if (currentDirection === 90) {
          coords[1] += argument;
        } else if (currentDirection === 180) {
          coords[0] -= argument;
        } else if (currentDirection === 270) {
          coords[1] -= argument;
        }
        break;
    }
  }

  return Math.abs(coords[0]) + Math.abs(coords[1]);
}

function day12Part2() {
  const coords = [0, 0]; // [North/South, East/West]
  let waypoint = [1, 10]; // [North/South, East/West]

  for (const instruction of INSTRUCTIONS) {
    const command = instruction[0];
    const argument = parseInt(instruction.slice(1));

    switch (command) {
      case 'N':
        waypoint[0] += argument;
        break;
      case 'S':
        waypoint[0] -= argument;
        break;
      case 'E':
        waypoint[1] += argument;
        break;
      case 'W':
        waypoint[1] -= argument;
        break;
      case 'L':
        for (let i = 0; i < argument / 90; i++) {
          waypoint = [waypoint[1], -waypoint[0]];
        }
        break;
      case 'R':
        for (let i = 0; i < argument / 90; i++) {
          waypoint = [-waypoint[1], waypoint[0]];
        }
        break;
      case 'F':
        coords[0] += waypoint[0] * argument;
        coords[1] += waypoint[1] * argument;
        break;
    }
  }

  return Math.abs(coords[0]) + Math.abs(coords[1]);
}

module.exports = [day12Part1, day12Part2];
