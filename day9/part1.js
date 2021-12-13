// const input = require('./example-input')
const input = require('./input')
const data = input.split('\n').map(d => d.split('').map(Number));

const riskLevels = [];

data.forEach((row, r) => {
    row.forEach((cell, c) => {

        // collect adjacent locations
        const up = data[r - 1]?.[c]
        const right = row[c + 1]
        const down = data[r + 1]?.[c]
        const left = row[c - 1]
        
        const adjacentLocations = [
            ...up !== undefined ? [up] : [],
            ...down !== undefined ? [down] : [],
            ...left !== undefined ? [left] : [],
            ...right !== undefined ? [right] : [],
        ]

        // if adjacent locations are larger than currenct cell, 
        // its a low point
        if (adjacentLocations.every(l => l > cell)) {
            riskLevels.push(cell + 1)
        }
    })
})

// sum of all low points
console.log(riskLevels.reduce((p, c) => p + c, 0))
// 535