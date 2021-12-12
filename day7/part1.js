// const input = require('./example-input')
const input = require('./input')
const data = input.split(',').map(Number);

let lastFuelCost;

for (i = 0; i < Math.max(...data); i++) {
    // store the distance to move to aligned 
    const diffs = data.map(hp => (Math.abs(hp - i)))

    // 1 distance point takes 1 fuel
    const fuelCost = diffs.reduce((p, c) => p + c, 0)

    // if fuel cost is less than what was recorded, save the new value
    if (!lastFuelCost || fuelCost < lastFuelCost) {
        lastFuelCost = fuelCost
    } else { // if fuel cost is increasing, it means we have passed the sweetspot
        break;
    }
}

console.log(lastFuelCost)
// 342641