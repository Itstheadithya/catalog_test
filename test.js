// Function to decode a value from a specific base
function decodeValue(base, value) {
    return parseInt(value, parseInt(base));
}

// Lagrange interpolation to find the constant term
function lagrangeInterpolation(xValues, yValues, x) {
    let total = 0;
    const n = xValues.length;

    for (let i = 0; i < n; i++) {
        let term = yValues[i];
        
        for (let j = 0; j < n; j++) {
            if (j !== i) {
                term *= (xValues[j]) / (xValues[i] - xValues[j]);
            }
        }
        total += term;
    }
    return total;
}

// Main function to process input and calculate the constant term
function main(filePath) {
    // Read the JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file: ${err}`);
            return;
        }

    const data = JSON.parse(input);
    const n = data.keys.n;

    let xValues = [];
    let yValues = [];

    // Decode each root
    for (let i = 1; i <= n; i++) {
        const base = data[i].base;
        const value = data[i].value;
        const x = parseInt(i); // Key is used directly as x
        const y = decodeValue(base, value); // Decode y value

        xValues.push(x);
        yValues.push(y);
    }

    // Calculate c (constant term)
    const c = lagrangeInterpolation(xValues, yValues, 0); // Evaluating at x=0 for c
    console.log(`The constant term (c) is: ${c}`);
}

// Run the main function
const filePath = './input.json';
main(filePath);
