const fs = require('fs');
const path = require('path');

const INPUT_FILE = 'input.txt';
const BUFFER = fs.readFileSync(path.join(__dirname, INPUT_FILE));
const LINES = BUFFER.toString().split('\n');

function day4Part1() {
  let validPassports = 0;
  let foundFields = [];

  for (const line of LINES) {
    if (line === '') {
      if (foundFields.length === 8 || (foundFields.length === 7 && !foundFields.includes('cid'))) {
        validPassports++;
      }
      foundFields = [];
    } else {
      foundFields = foundFields.concat(line.match(/\w{3}(?=:)/g));
    }
  }

  return validPassports;
}

function day4Part2() {
  let validPassports = 0;
  let currentPassport = {};
  const fields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

  for (const line of LINES) {
    if (line === '') {
      let isValid = true;
      let allFieldsPresent = true;

      for (const field of fields) {
        if (!currentPassport[field]) {
          isValid = false;
          allFieldsPresent = false;
          break;
        }
      }

      if (allFieldsPresent) {
        if (currentPassport.byr < 1920 || currentPassport.byr > 2002) isValid = false;
        else if (currentPassport.iyr < 2010 || currentPassport.iyr > 2020) isValid = false;
        else if (currentPassport.eyr < 2020 || currentPassport.eyr > 2030) isValid = false;
        else if (!/((1[5-8][0-9]|19[0-3])cm$)|((59|6[0-9]|7[0-6])in$)/.test(currentPassport.hgt))
          isValid = false;
        else if (!/^#[0-9a-f]{6}$/.test(currentPassport.hcl)) isValid = false;
        else if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(currentPassport.ecl))
          isValid = false;
        else if (!/^\d{9}$/.test(currentPassport.pid)) isValid = false;
      }

      if (isValid) validPassports++;
      currentPassport = {};
    } else {
      const keyValues = line.split(' ');
      for (const keyVal of keyValues) {
        const [key, value] = keyVal.split(':');
        if (key === 'byr' || key === 'iyr' || key === 'eyr') {
          currentPassport[key] = parseInt(value);
        } else {
          currentPassport[key] = value;
        }
      }
    }
  }

  return validPassports;
}

module.exports = [day4Part1, day4Part2];
