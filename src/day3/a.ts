
type Fabric = number[][];

interface Claim {
    x: number;
    y: number;
    w: number;
    h: number;
}

const generateFabric = (w: number, h: number): Fabric => {

    return Array.from(Array(h), () => new Array(w).fill(0));

};

const processClaim = (fabric: Fabric, claim: Claim): Fabric => {

    for (let x = claim.x; x < claim.x + claim.w; x++) {
        for (let y = claim.y; y < claim.y + claim.h; y++) {

            fabric[y][x] += 1;

        }
    }

    return fabric;

};

const countOverlap = (fabric: Fabric): number => {

    return fabric.reduce((acc, y) =>
        y.reduce((acc, x) => x > 1 ? acc += 1 : acc, acc), 0);

};

const visualizeFabric = (fabric: Fabric) => {

    let log = '';
    fabric.map((y) => {
        y.map((pos) => {

            log += pos > 0 ? pos : '.';

        });
        log += '\n';
    });

    return log;

};

export default (input: string) => {

    const inputRegEx = new RegExp('#\\d+\\s@\\s(\\d+),(\\d+):\\s(\\d+)x(\\d+)');
    const fabric = generateFabric(1000, 1000);

    input.split('\n').map((line) => {

        const parts = line.match(inputRegEx);
        if (parts) {

            const claim = {
                x: +parts[1],
                y: +parts[2],
                w: +parts[3],
                h: +parts[4]
            };

            processClaim(fabric, claim);

        }

    });

    // console.log(visualizeFabric(fabric));

    return countOverlap(fabric);

};
