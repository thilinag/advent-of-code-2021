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

// make a copy
let polymer = [...polymerTemplate];

function step(currentPloymer) {
    const upatedPolymer = []
    currentPloymer.forEach((element, j) => {
        // add the current element to the stack
        upatedPolymer.push(element)
        
        // if its not the last item
        if(currentPloymer[j+1]) {
            // find the pair insertion rule
            const partInsertion = pairInsertionRules[`${element}${currentPloymer[j+1]}`]
            // if we have a rule, add it to the stack
            if (partInsertion) {
                upatedPolymer.push(partInsertion)
            }
        }
    })

    // mutate the polymer
    polymer = upatedPolymer
}

// apply steps
for (let i = 0; i < 10; i++) {
    step(polymer)
}

// make an object with element as the key and  the number of occorunces as the value
const elementCounts = polymer.reduce((prev, curr) => {
    prev[curr] = (prev[curr] || 0) + 1
    return prev
}, {})

// quantity of the most common element and subtract the quantity of the least common element
console.log(Math.max(...Object.values(elementCounts)) - Math.min(...Object.values(elementCounts)))
// 3342