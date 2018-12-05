
type Fabric = number[][];

interface Claim {
    id: number;
    x: number;
    y: number;
    w: number;
    h: number;
}

const inputRegEx = new RegExp('#(\\d+) @ (\\d+),(\\d+): (\\d+)x(\\d+)');

const generateFabric = (w: number, h: number): Fabric => {

    return Array.from(Array(h), () => new Array(w).fill(0));

};

const processClaim = (fabric: Fabric, claim: Claim): boolean => {

    let didOverlap = false;

    for (let x = claim.x; x < claim.x + claim.w; x++) {
        for (let y = claim.y; y < claim.y + claim.h; y++) {

            if (fabric[y][x] > 1) {

                didOverlap = true;

            }

            fabric[y][x] += 1;

        }
    }

    return didOverlap;

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

    const nonOverlappingIds = claims
        .map((line) => placeClaims(fabric, line))
        .filter((id) => id);

    // console.log(visualizeFabric(fabric));

    return nonOverlappingIds[0];

};
