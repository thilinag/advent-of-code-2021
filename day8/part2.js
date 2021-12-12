// const input = require('./example-input')
const input = require('./input')
const data = input.split('\n');

const outputValues = data.map(note => {
    const noteParts = note.split(' | ')
    const signals = noteParts[0].split(' ')
    // make output parts alpabatical order for easy string match
    const outputs = noteParts[1].split(' ').map(o => o.split('').sort().join(''))
    // placeholder array for numbers
    const numbers =  new Array(10)

    signals.forEach(signal => {
        switch (signal.length) {
            case 2: // if 2 segments are on, its #1
                numbers[1] = signal
                break;

            case 3: // if 3 segments are on, its #7
                numbers[7] = signal
                break;

            case 4: // if 4 segments are on, its #4
                numbers[4] = signal
                break;

            case 7: // if 7 segments are on, its #8
                numbers[8] = signal
                break;
        }
    })

    // for numbers with 6 segments on
    signals.filter(s => s.length === 6).forEach(signal => {
        switch (signal.length) {
            case 6:
                if (!numbers[7].split('').every(s => signal.includes(s))) {
                    // if 6 segments on and also all segments belog to #7 is  not on, 
                    // its #6
                    numbers[6] = signal
                } else if (numbers[4].split('').every(s => signal.includes(s))) {
                    // if 6 segments on and also all segments belog to #4 is on, 
                    // its #9
                    numbers[9] = signal
                } else {
                    // otherwise its #0
                    numbers[0] = signal
                }
                break;
        
            default:
                break;
        }
    })

    // for numbers with 5 segments on
    signals.filter(s => s.length === 5).forEach(signal => {
        switch (signal.length) {
            case 5:
                if (signal.split('').every(s => numbers[6].split('').includes(s))) {
                    // if 5 segments on and also all segments belog to #6, 
                    // its #5
                    numbers[5] = signal
                } else if (numbers[1].split('').every(s => signal.includes(s))) {
                    // if 5 segments on and also all segments belog to #1 is on, 
                    // its #3
                    numbers[3] = signal
                } else {
                    // otherwise its #2
                    numbers[2] = signal
                }
                break;

            default:
                break;
        }
    })

    // sort it alphabetically so its easier to compare
    const sortedNumbers = numbers.map(number => number.split('').sort().join(''))
    
    // find the index of matching number and join it together to get output value
    const outputValue = outputs.map(
        o => sortedNumbers.findIndex(number => number === o)
    ).join('')

    return outputValue
});

// sum of all of the output values
const sumOfOutputValues = outputValues.map(Number).reduce((p, c) => p + c, 0);
console.log(sumOfOutputValues)
// 946346