const input = require('./input')
const data = input.split('\n')

let p, count = 0

data.forEach((d) => {
    // if has prev value and current value is greater than prev
    if(p && p < d) {
        ++count
    }
  
    // save previous value
    p = d
})

console.log(count)
//1446