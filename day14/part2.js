// const input = require('./example-input')
const input = require('./input')
const data = input.split('\n\n')

// get template
const polymerTemplate = data[0].split('')

// get pair insertion rules 
const pairInsertionRulesArr = data[1].split('\n').map(r => {
    const ruleParts = r.split(' -> ')
    return { [ruleParts[0]]: ruleParts[1] }
})
// make pair insertion rules easier to find by turning it into key value object
const pairInsertionRules = Object.assign({}, ...pairInsertionRulesArr)

// make an object of pairs as key and count of each pair as value
let polymer = polymerTemplate.reduce((prev, curr, currIndex) => {
    if (polymerTemplate[currIndex+1]) {
        prev[`${curr}${polymerTemplate[currIndex+1]}`] = (prev[`${curr}${polymerTemplate[currIndex+1]}`] || 0) + 1        
    } 
    return prev
}, {})

// last element in the template will not have a pair
const leftoverElement = polymerTemplate.at(-1)

function step(currentPloymer) {
    const upatedPolymer = {}
    for (const [elementPair, count] of Object.entries(currentPloymer)) {
        // get rule
        const partInsertion = pairInsertionRules[elementPair]

        // if element pair = AB, we need to create a pair with A<partInsertion> and <partInsertion>B
        // if newly added element pair exists, use it's count to increase the count
        // also we need to do it for each existing pair
        upatedPolymer[`${elementPair[0]}${partInsertion}`] = (upatedPolymer[`${elementPair[0]}${partInsertion}`] || 0) + count
        upatedPolymer[`${partInsertion}${elementPair[1]}`] = (upatedPolymer[`${partInsertion}${elementPair[1]}`] || 0) + count
    }
    // mutate the polymer
    polymer = upatedPolymer
}

// apply steps
for (let i = 0; i < 40; i++) {
    step(polymer)
}

// make an object with element as the key and  the number of occorunces as the value
const elementCountsWithoutLastElement = Object.entries(polymer).reduce((prev, curr) => {
    prev[curr[0][0]] = (prev[curr[0][0]] || 0) + curr[1]
    return prev
}, [])


// add the leftover element if it exists
const elementCounts = {
    ...elementCountsWithoutLastElement,
    [leftoverElement] : elementCountsWithoutLastElement[leftoverElement] + 1
}

// quantity of the most common element and subtract the quantity of the least common element
console.log(Math.max(...Object.values(elementCounts)) - Math.min(...Object.values(elementCounts)))
// 3776553567525