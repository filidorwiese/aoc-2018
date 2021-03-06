
type Fabric = number[][];

interface Claim {
    x: number;
    y: number;
    w: number;
    h: number;
}

const inputRegEx = new RegExp('#(\\d+) @ (\\d+),(\\d+): (\\d+)x(\\d+)');

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

const placeClaims = (fabric: Fabric, line: string) => {

    const parts = line.match(inputRegEx);
    if (parts) {

        const claim = {
            id: +parts[1],
            x: +parts[2],
            y: +parts[3],
            w: +parts[4],
            h: +parts[5]
        };

        const didOverlap = processClaim(fabric, claim);

        return didOverlap ? null : claim.id;

    }

};


export default (input: string) => {

    const fabric = generateFabric(1000, 1000);

    const claims = input.split('\n');

    claims.map((line) => placeClaims(fabric, line));

    // console.log(visualizeFabric(fabric));

    return countOverlap(fabric);

};
