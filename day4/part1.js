const input = require('./input')
const data = input.split('\n\n')

// separate draw numbers
const drawNos = data.shift()

// create a matrix of boards
const boards = data.map(t => (t.split('\n'))).map(b => (
    b.map(r => (
        r.split(' ').map(c => 
            c && c
        ).filter(a => a) // clear out any extra empty cells 
    ))
));

const drawNosArr = drawNos.split(',')
let winningBoardIndex
let lastDrawnNo

drawLoop:
for (let d = 0; d < drawNosArr.length; d++) { // every draw
    for (let b = 0; b < boards.length; b++) { // every board
        // check rows
        for (let r = 0; r < boards[b].length; r++) { // every row 
            boards[b][r].forEach((c, j) => { // every cell
                if(c === drawNosArr[d]) {
                    boards[b][r][j] = 0 // set cell value to 0 if matching
                }
            });
            
            // if rows have all 0s, we won
            if (boards[b][r].every(c => c === 0)) {
                lastDrawnNo = drawNosArr[d]
                winningBoardIndex = b

                // stop playing
                break drawLoop;
            }
        }

        // check columns
        for (let col = 0; col < 5; col++) {
            let currCol = []
            // go through each call and store cell in temp arr
            for (let colc = 0; colc < 5; colc++) {
                // console.log(boards[b][colc][0]);
                currCol.push(boards[b][colc][col])
            }

            // if temp arr has all 0s we won
            if (currCol.every(c => c === 0)) {
                lastDrawnNo = drawNosArr[d]
                winningBoardIndex = b

                // stop playing
                break drawLoop
            }
        }
    }
}

const sumOfUnmarked = boards[winningBoardIndex].flat().map(Number).reduce((prevVal, currVal) => prevVal + currVal)
// score = sum of all unmarked numbers on winning board * number that was just called 
console.log(sumOfUnmarked * lastDrawnNo);
// 8136
