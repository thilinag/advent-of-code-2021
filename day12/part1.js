// const input = require('./example-input')
const input = require('./input')
const data = input.split('\n').map(p => p.split('-'))

const map = [];

// create a map with return paths
data.forEach(([s, e]) => {
    map[s] = [...map[s] || [], e]
    map[e] = [...map[e] || [], s]
})

// https://en.wikipedia.org/wiki/Depth-first_search
function getPaths(cave, visitedCaves, paths) {
    visitedCaves.push(cave)

    // if we are at the end we found a complete path 
    if (cave === 'end') {
        paths.push(visitedCaves)
        return
    }

    for(const nextCave of map[cave]) {
        // if its a small cave and we have visited this cave,
        // we don't have time to visit this one again
        if(/[a-z]/.test(nextCave[0]) && visitedCaves.includes(nextCave)) {
            continue
        }
        getPaths(nextCave, [...visitedCaves], paths)
    }
}

const paths = []
getPaths('start', [], paths)
console.log(paths.length)
// 3298