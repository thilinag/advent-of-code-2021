const input = require('./example-input')
// const input = require('./input')
const data = input.split(',').map(Number);

const noOfDays = 80;
let noOfFish = data.length;

for(d = 1; d <= noOfDays; d++) {
    data.forEach((f, i) => {
        if (f === 0) {
            data.push(8)
            data[i] = 6;
        } else {
            data[i] = f - 1;
        }
    });
}

console.log(data.length)
// 352195
