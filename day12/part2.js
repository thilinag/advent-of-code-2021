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
function getPaths(cave, visitedCaves, paths, hasVisitedSmallCaveTwice) {
    visitedCaves.push(cave)
    
    // if we are at the end we found a complete path 
    if (cave === 'end') {
        paths.push(visitedCaves)
        return
    }

    for(const nextCave of map[cave]) {
        
        // we can only visit start once
        if (nextCave === 'start') continue

        // if its a small cave and we have visitedCaves this cave,
        if(/[a-z]/.test(nextCave[0]) && visitedCaves.includes(nextCave)){
            if (hasVisitedSmallCaveTwice || 
                // check if we have visited twice after this visit
                visitedCaves.filter(cave => cave === nextCave).length >= 2) {
                continue
            }
            getPaths(nextCave, [...visitedCaves], paths, true)
        } else {
            getPaths(nextCave, [...visitedCaves], paths, hasVisitedSmallCaveTwice)
        }
            
    }
}

const paths = []
getPaths('start', [], paths, false)
console.log(paths.length)
// 93572