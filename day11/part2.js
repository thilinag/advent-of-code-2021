// const input = require('./example-input')
const input = require('./input')
const data = input.split('\n').map(d => d.split('').map(Number));

function updateEnergy(rowIndex, columnIndex, flashed) {
    if (
        rowIndex < 0 || // check left edge
        columnIndex < 0 || // check top edge
        rowIndex > data.length - 1 || // check bottom edge
        columnIndex > data[0].length - 1 // check right edge
    ) {
        return
    }

    const octopus = rowIndex + "_" + columnIndex

    // if we already checked this octopus, stop
    if (flashed.includes(octopus)) return

    // increase energy of current octopus
    data[rowIndex][columnIndex]++
    
    // if energy is more than 9 we need to flash
    if (data[rowIndex][columnIndex] > 9) {

        // after flashing it should reset energy level to 0 
        data[rowIndex][columnIndex] = 0;

        // remember the flashed octopus
        flashed.push(octopus)

        // update energy for adjacent octopuses
        // can probably use a loop to update
        updateEnergy(rowIndex, columnIndex + 1, flashed)
        updateEnergy(rowIndex, columnIndex - 1, flashed)
        updateEnergy(rowIndex - 1, columnIndex, flashed)
        updateEnergy(rowIndex + 1, columnIndex, flashed)
        updateEnergy(rowIndex - 1, columnIndex - 1, flashed)
        updateEnergy(rowIndex - 1 , columnIndex + 1, flashed)
        updateEnergy(rowIndex + 1, columnIndex - 1, flashed)
        updateEnergy(rowIndex + 1, columnIndex + 1, flashed)
            
    }
}


function step() {
    
    const flashed = []

    data.forEach((row, i) => {
        data.forEach((column, j) => {
            // trigger update enegry of octopuses
            updateEnergy(i,j, flashed)
        });
    });

    // return flashed count for each step
    return flashed.length
}

let currentStep = 1;
// run steps until we have all octopuses flashing (synchronizing)
while(step() !== data.flat(2).length) {
    currentStep++;
}

// first synchronized step
console.log(currentStep)
// 519