// const input = require('./example-input')
const input = require('./input')
const data = input.split('\n').map(l => l.split(' | ')[1].split(' '));

const digits147count = data.flat().reduce((p, c) => {
    if (c.length === 2 || c.length === 3 || c.length === 4 || c.length === 7) {
        return p + 1
    } else {
        return p
    }
}, 0)

console.log(digits147count)