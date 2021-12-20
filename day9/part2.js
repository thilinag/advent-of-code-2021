// const input = require("./example-input")
const input = require("./input")
const data = input.split("\n").map((d) => d.split("").map(Number))

const basins = []
const visited = new Set()

const traverse = (rowIndex, columnIndex, current = []) => {
    if (
        rowIndex < 0 || // check left edge
        columnIndex < 0 || // check top edge
        rowIndex > data.length - 1 || // check bottom edge
        columnIndex > data[0].length - 1 // check right edge
    ) {
        return
    }
    if (
        data[rowIndex][columnIndex] === 9 || // if its the higest peak its end of basin
        visited.has(rowIndex + "_" + columnIndex)
    ) {
        return
    }
    current.push(rowIndex + "_" + columnIndex)
    visited.add(rowIndex + "_" + columnIndex)
    traverse(rowIndex, columnIndex + 1, current)
    traverse(rowIndex, columnIndex - 1, current)
    traverse(rowIndex - 1, columnIndex, current)
    traverse(rowIndex + 1, columnIndex, current)

    return current
}

for (let r = 0; r < data.length; r++) {
    for (let c = 0; c < data[r].length; c++) {
        if (visited.has(r + "_" + c)) continue
        const basinSize = traverse(r, c)
        if (basinSize) {
            basins.push(basinSize.length)
        }
    }
}

// multiply together the sizes of the three largest basins
console.log(
    basins
        .sort((a, b) => b - a) // sort by desc
        .slice(0, 3) // get first 3
        .reduce((p, c) => p * c, 1) // multiply first 3
)
//
