const input = require('./input')
const data = input.split('\n')

let d = 0, f = 0, a = 0

data.forEach((c) => {
    // get the value and convert to int
    x = +(c.split(' ')[1])

    if(c.startsWith('forward')) {
        f += x 
        d += a * x; // depth = aim * X.
    } else if (c.startsWith('down')) {
        a += x;
    } else { // up
        a -= x
    }
})

console.log(f * d)
// 2134882034