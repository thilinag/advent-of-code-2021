const input = require('./input')
const data = input.split('\n')

let d = 0, f = 0

data.forEach((c) => {
    // get the value
    const x = +(c.split(' ')[1])
    
    if(c.startsWith('forward')) {
        f += x
    } else if (c.startsWith('down')) {
        d += x
    } else { // up
        d -= x
    }
})

console.log(f * d);
// 2272262