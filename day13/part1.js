// const input = require('./example-input')
const input = require('./input')
const data = input.split('\n\n')
const dots = data[0].split('\n').map(d => d.split(',').map(Number))
const firstFoldInstruction = data[1].split('\n')[0].split('fold along ')[1].split('=')

const a = dots.map(dot => {
    const currentDot = [...dot]
    const foldLine = Number(firstFoldInstruction[1])
    const currentCoordinate = currentDot[firstFoldInstruction[0] === 'y' ? 1 : 0]

    // find folding over points
    if (currentCoordinate > foldLine) {
        currentDot[firstFoldInstruction[0] === 'y' ? 1 : 0] = foldLine - (currentCoordinate - foldLine)
    }

    return currentDot
})

// remove duplicates 
const map = new Map()
a.forEach((item) => map.set(item.join(), item))

// How many dots are visible after completing just the first fold instruction ?
console.log(map.size)
// 827