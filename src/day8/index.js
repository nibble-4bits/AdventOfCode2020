const fs = require('fs');
const path = require('path');

const INPUT_FILE = 'input.txt';
const BUFFER = fs.readFileSync(path.join(__dirname, INPUT_FILE));
const LINES = BUFFER.toString().split('\n');

function day8Part1() {
  const visitedLines = new Set();
  let accumulator = 0;
  let lineNumber = 0;

  // While there are lines to read
  while (lineNumber < LINES.length) {
    // If we are in a line that we have already visited, then exit out of the loop
    if (visitedLines.has(lineNumber)) break;

    const currentLine = LINES[lineNumber];
    // Destructure the operation and the argument of the current instruction
    const [op, arg] = currentLine.split(' ');

    // Add this line to the set of visited lines
    visitedLines.add(lineNumber);

    // This block is self-explanatory
    switch (op) {
      case 'acc':
        accumulator += parseInt(arg);
        lineNumber++;
        break;
      case 'jmp':
        lineNumber += parseInt(arg);
        break;
      case 'nop':
        lineNumber++;
        break;
    }
  }

  return accumulator;
}

function day8Part2() {
  const LINES_COPY = LINES.slice();
  let accumulator = 0;
  let lineNumber = 0;

  // BRUTE FORCE SEARCH
  // Replace every jmp instruction with nop and viceversa
  for (let i = 0; i < LINES_COPY.length; i++) {
    // If we reached the end of the program, then break
    if (lineNumber >= LINES_COPY.length - 1) break;
    // If current line has the substring 'acc', then force the next iteration
    if (LINES_COPY[i].includes('acc')) continue;

    // Replace jmp instruction with nop and nop with jmp
    LINES_COPY[i] = LINES_COPY[i].replace(/jmp|nop/, (match) => {
      return match === 'jmp' ? 'nop' : 'jmp';
    });

    const visitedLines = new Set();
    accumulator = 0;
    lineNumber = 0;
    // This code block is the same as part 1 of the problem
    while (lineNumber < LINES_COPY.length) {
      if (visitedLines.has(lineNumber)) break;

      const currentLine = LINES_COPY[lineNumber];
      const [op, arg] = currentLine.split(' ');

      visitedLines.add(lineNumber);

      switch (op) {
        case 'acc':
          accumulator += parseInt(arg);
          lineNumber++;
          break;
        case 'jmp':
          lineNumber += parseInt(arg);
          break;
        case 'nop':
          lineNumber++;
          break;
      }
    }

    // If we didn't reach the end of the program, return the changed instruction as it was
    LINES_COPY[i] = LINES_COPY[i].replace(/jmp|nop/, (match) => {
      return match === 'jmp' ? 'nop' : 'jmp';
    });
  }

  return accumulator;
}

module.exports = [day8Part1, day8Part2];
