const input = require('./input')
const data = input.split('\n').map(Number)

let p, count = 0

data.forEach((d, i) => {
    const a =  d;
    // get next 2 values
    const b =  data[i+1];
    const c =  data[i+2];
    
    const s = a + b + c;

    if (a && b && c && p && p < s) {
       ++count;
    } 
    p = s;
});

console.log(count)
//1486