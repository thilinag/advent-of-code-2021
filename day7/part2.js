// const input = require('./example-input')
const input = require('./input')
const data = input.split(',').map(Number);

let lastFuelCost;

for (i = 0; i < Math.max(...data); i++) {
    // store the distance to move to aligned 
    const diffs = data.map(hp => (Math.abs(hp - i)))

    // fuel cost per distance point is infinite series so using n(n+1)/2 to get cost
    const fuelCost = diffs.reduce((p, c) => p + (c * (c+1) /2), 0)

    // if fuel cost is less than what was recorded, save the new value
    if (!lastFuelCost || fuelCost < lastFuelCost) {
        lastFuelCost = fuelCost
    } else { // if fuel cost is increasing, it means we have passed the sweetspot
        break;
    }
}

console.log(lastFuelCost)
// 93006301