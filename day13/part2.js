// const input = require('./example-input')
const input = require('./input')
const data = input.split('\n\n')
const dots = data[0].split('\n').map(d => d.split(',').map(Number))
const foldInstructions = data[1].split('\n').map(i => i.split('fold along ')[1].split('='))

// make a copy of our dots
let dotsmap = [...dots]

/**
 * Mutate the dotsmap after folding
 * 
 * @param {Array} dots updated dotsmap
 * @param {Object} fi fold instruction  
 */
function getMap(dots, fi) {
    const currentDotsmap = dots.map(dot => {
        const currentDot = [...dot]
        const foldLine = Number(fi[1])
        const currentCoordinate = currentDot[fi[0] === 'y' ? 1 : 0]

        // find folding over points
        if (currentCoordinate > foldLine) {
            currentDot[fi[0] === 'y' ? 1 : 0] = foldLine - (currentCoordinate - foldLine)
        }
    
        return currentDot
    })

    dotsmap = currentDotsmap
}

foldInstructions.forEach(fi => {
    getMap(dotsmap, fi)
})

// find grid size
const gridXSize = Math.max(...dotsmap.map(r => r[1]))
const gridYSize = Math.max(...dotsmap.map(r => r[0]))

// make a grid
const grid = Array.from(Array(gridXSize+1), () => new Array(gridYSize+1).fill(0))

// update grid with our final dotsmap
dotsmap.forEach(([x, y]) => grid[y][x] = 1)
console.log(grid.map(r => r.map(c => c ? '#' : '.').join('')))
// [
//     '####..##..#..#.#..#.###..####..##..###.',
//     '#....#..#.#..#.#.#..#..#.#....#..#.#..#',
//     '###..#..#.####.##...#..#.###..#....#..#',
//     '#....####.#..#.#.#..###..#....#....###.',
//     '#....#..#.#..#.#.#..#.#..#....#..#.#...',
//     '####.#..#.#..#.#..#.#..#.####..##..#...'
//   ]

// EAHKRECP