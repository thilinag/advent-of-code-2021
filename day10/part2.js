// const input = require('./example-input')
const input = require('./input')
const data = input.split('\n').map(d => d.split(''));

const chunkSyntax = {
    '(': ')', 
    '[': ']', 
    '{': '}', 
    '<': '>'
}

const pointsTable = {
    ')' : 1,
    ']' : 2,
    '}' : 3,
    '>' : 4
}

const allMissingChars = []

for (r = 0; r < data.length; r++) {

    const expectedChars = []
    let isCorrupt = false

    for (c = 0; c < data[r].length; c++) {

        const currentChar = data[r][c];

        // if starting char, push to arr
        if (/\(|\[|\{|\</.test(currentChar)) {
            expectedChars.push(chunkSyntax[currentChar])
        } else {
            // if closing char, it should match the last pushed char for it to be legal
            if(expectedChars.pop() !== currentChar) {
                // mark as corrupt
                isCorrupt = true;
                // if we found the first illegal char, stop checking this row
                break;
            }
        }
    }

    // if line is not corrupt, it should be an incomplete line
    if (!isCorrupt) {
        // reverse the stack before saving so its in the entered order.
        allMissingChars.push(expectedChars.reverse())
    }
}

// Start with a total score of 0. Then, for each character, multiply the total score by 5 
// and then increase the total score by the point value
const scores = allMissingChars.map(r => 
    r.reduce((p, c) => (p * 5) + pointsTable[c], 0))
    .sort((a, b) => a - b)

// middle score
console.log(scores[Math.floor(scores.length / 2)]);
// 4001832844
