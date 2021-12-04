const input = require('./input')
const data = input.split('\n')

// get the length of single data entry
const dataL = data[0].length

// create a matrix
const dataB = Array.from(Array(dataL)).map((h, i) => (
    data.map(c => (+c.at(i))) // needs node > 16 
));

// find most common and convert to int so we can store as 1/0
const sA = dataB.map((h, i) => (
    +(h.filter(c => c).length > h.filter(c => !c).length)
))

// get decimal of 
const ga = parseInt(sA.join(''), 2);
// invert to get the epsilon rate since its the inverse and get decimal
const ep = parseInt(sA.map(c => +!+c).join(''), 2);

// power consumption = gamma rate x epsilon rate
console.log(ga * ep);
// 4138664