const fs = require('fs');
const path = require('path');

const INPUT_FILE = 'input.txt';
const BUFFER = fs.readFileSync(path.join(__dirname, INPUT_FILE));
const PASSWORD_POLICIES = BUFFER.toString()
  .split('\n')
  .map((line) => {
    const [minMax, letter, password] = line.replace(':', '').split(' ');
    const [min, max] = minMax.split('-').map(Number);

    return {
      min,
      max,
      letter,
      password,
    };
  });

function day2Part1() {
  let validCount = 0;

  for (const policy of PASSWORD_POLICIES) {
    const regex = new RegExp(policy.letter, 'g');
    const matchCount = (policy.password.match(regex) || []).length;
    if (matchCount >= policy.min && matchCount <= policy.max) {
      validCount++;
    }
  }

  return validCount;
}

function day2Part2() {
  let validCount = 0;

  for (const policy of PASSWORD_POLICIES) {
    const firstPos = policy.password[policy.min - 1];
    const secondPos = policy.password[policy.max - 1];
    if (
      (firstPos === policy.letter && secondPos !== policy.letter) ||
      (firstPos !== policy.letter && secondPos === policy.letter)
    ) {
      validCount++;
    }
  }

  return validCount;
}

module.exports = [day2Part1, day2Part2];
