const input = require('./input')
const inputData = input.split('\n')

const data = inputData
    .map(cords => cords.split(' -> ')
        .map(cord => cord.split(',').map(Number)))

// get the highest number
const maxValue = (Math.max(...data.flat(2)))

// make a grid with higest number x higest number
const grid = Array.from(Array(maxValue+1), () => new Array(maxValue+1).fill(0))

data.forEach(([[x1, y1], [x2, y2]]) => {
    // if horizontal line
    if (y1 === y2) {
        const diff = Math.abs(x1 - x2)
        for (let i = 0; i < diff + 1; i++) {
            // mark point by adding 1 to the current point value
            grid[y1][Math.min(x1, x2)+i] += 1
        }
    }

    //if vertical line
    if (x1 === x2) {
        const diff = Math.abs(y1 - y2)
        for (let i = 0; i < diff + 1; i++) {
            // mark point by adding 1 to the current point value
            grid[Math.min(y1, y2)+i][x1] += 1
        }
    }
});

// the number of points where at least two lines overlap (grid value is 2 or larger if overlapping)
console.log(grid.flat().filter(v => v >= 2).length)
// 5294
