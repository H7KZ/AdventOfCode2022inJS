const { readFileSync } = require('fs');

const input = readFileSync('./input.txt', 'utf8');

const elvesCalories = new Int32Array(input.split('\n\n').map((line) => line.split('\n')).map((calories) => calories.reduce((acc, cur) => parseInt(acc) + parseInt(cur)))).sort((a, b) => b - a);

console.log(elvesCalories[0]);
console.log(elvesCalories.slice(0, 3).reduce((a, b) => a + b));