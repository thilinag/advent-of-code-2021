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
    ')' : 3,
    ']' : 57,
    '}' : 1197,
    '>' : 25137
}

const illegalChars = []

for (r = 0; r < data.length; r++) {

    const expectedChars = []

    for (c = 0; c < data[r].length; c++) {

        const currentChar = data[r][c];

        // if starting char, push to arr
        if (/\(|\[|\{|\</.test(currentChar)) {
            expectedChars.push(chunkSyntax[currentChar])
        } else {
            // if closing char, it should match the last pushed char for it to be legal
            if(expectedChars.pop() !== currentChar) {
                // remember illegal chars
                illegalChars.push(currentChar)
                
                // if we found the first illegal char, stop checking this row
                break;
            }
        }
    }
}

// total syntax error score
console.log(illegalChars.reduce((p, c) => p + pointsTable[c], 0));
// 392139
