
export default (input: string) => {

    const frequencies = input.split('\n');
    let frequency = 0;
    let foundFrequencies = new Set();
    let solution: false | number = false;

    while (!solution) {
        frequency = frequencies.reduce((acc, f) => {

            const freq = acc + parseInt(f, 10);

            if (foundFrequencies.has(freq) && !solution) {

                solution = freq;

            } else {

                foundFrequencies.add(freq);

            }

            return freq;

        }, frequency);

    }

    return solution;

};
