const input = require('./input')

function getRating(type) {
    let data = input.split('\n')

    // get the length of single data entry
    const dataL = data[0].length

		// create intial dataset 
    let dataB = Array.from(Array(dataL)).map((h, i) => (
        data.map(c => (+c.at(i))) // needs node > 16 
    ));
		
	// we will save array of selected bits for bit criteria
    const sRArr = []

    Array.from(Array(dataL)).forEach((h, i) => {
        let sR
				
		// check if we have enough data entries 
        if (data.length > 1) {
            const ones = dataB[i].filter(c => c).length
            const zeros = dataB[i].filter(c => !c).length

			// criteria logic
			// make the boolean an int so we can store it as 1/0
            sR = type === 'ogr' ? +(ones >= zeros) : +(ones < zeros)

			// filter array and update data with matching entries
            data = data.filter(j =>  j.startsWith(sRArr.join('')) && +j.at(i) === sR)
			// geneate the matrix again with new data
            dataB = Array.from(Array(dataL)).map((h, i) => (
                data.map(c => (+c.at(i)))  // needs node > 16 
            ));
        } else {
			// use the leftover data entry to fill the rest
            sR = data[0].at(i) // needs node > 16 
        }
				
		// add selected bit to bit criteria
        sRArr.push(sR)
    })
		
	// convert to decimal
    return parseInt(sRArr.join(''), 2)
}

// life support rating = oxygen generator rating x CO2 scrubber rating
console.log(getRating('ogr') * getRating())
// 4273224