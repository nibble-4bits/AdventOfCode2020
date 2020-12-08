const fs = require('fs');
const path = require('path');

const INPUT_FILE = 'input.txt';
const BUFFER = fs.readFileSync(path.join(__dirname, INPUT_FILE));
const ANSWERS = BUFFER.toString().split('\n');

function day6Part1() {
  let currentGroup = [];
  let answerCount = 0;

  for (const answer of ANSWERS) {
    if (!answer) {
      answerCount += new Set(currentGroup).size;
      currentGroup = [];
    } else {
      currentGroup.push(...answer);
    }
  }

  return answerCount;
}

function day6Part2() {
  let currentGroup = [];
  let answerCount = 0;

  for (const answer of ANSWERS) {
    if (!answer) {
      let intersection = new Set(currentGroup[0]);
      for (let i = 1; i < currentGroup.length; i++) {
        const set = new Set(currentGroup[i]);
        intersection = new Set([...intersection].filter((x) => set.has(x)));
      }
      answerCount += intersection.size;
      currentGroup = [];
    } else {
      currentGroup.push(answer);
    }
  }

  return answerCount;
}

module.exports = [day6Part1, day6Part2];
