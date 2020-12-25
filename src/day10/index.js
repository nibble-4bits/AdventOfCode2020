const fs = require('fs');
const path = require('path');

const INPUT_FILE = 'input.txt';
const BUFFER = fs.readFileSync(path.join(__dirname, INPUT_FILE));
const NUMBERS = BUFFER.toString()
  .split('\n')
  .map(Number)
  .sort((a, b) => a - b);

function day10Part1() {
  const diffs = [NUMBERS[0], 0, 1];

  for (let i = 1; i < NUMBERS.length; i++) {
    const previous = NUMBERS[i - 1];
    const current = NUMBERS[i];
    diffs[current - previous - 1]++;
  }

  return diffs[0] * diffs[2];
}

function day10Part2() {
  const series = NUMBERS.map((num) => [num, 0]);
  series.push([series[series.length - 1][0] + 3, 0]);
  series.unshift([0, 0]);

  series[0][1] = 1;
  for (let i = 0; i < series.length - 1; i++) {
    for (let j = 1; j <= 3; j++) {
      if (series[i + j] && series[i + j][0] - series[i][0] <= 3) {
        series[i + j][1] += series[i][1];
      }
    }
  }

  return series[series.length - 1][1];
}

module.exports = [day10Part1, day10Part2];
