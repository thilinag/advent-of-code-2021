// const input = require('./example-input')
const input = require('./input')
const data = input.split(',').map(Number);
const fishStages = 9

const noOfDays = 80;

// initial state
const fishSchool = Array.from(Array(fishStages).fill(0))

// hydrate with starting fish school
data.forEach(fish => fishSchool[fish]++)

for(d = 1; d <= noOfDays; d++) {
    // move fish internal timer forward by shifting state
    const reproducingFish = fishSchool.shift()

    // reset the reproducing fish's inernal timer to 6
    fishSchool[6] = fishSchool[6] + reproducingFish
    
    // add new fish with internal timer of 8
    fishSchool.push(reproducingFish)
}

console.log(fishSchool.reduce((p, c) => p + c, 0))
// 352195
