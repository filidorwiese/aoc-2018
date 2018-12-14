
const alphaBet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const react = (polymer: string): string => {

    const regEx = new RegExp(alphaBet.map((l: string) => `${l}${l.toUpperCase()}|${l.toUpperCase()}${l}`).join('|'));

    return polymer.replace(regEx, '');

};

const fullyReact = (polymer: string): string => {

    let loop = true;
    while (loop) {
        let _polymer = react(polymer);
        if (_polymer.length === polymer.length) loop = false;
        polymer = _polymer;
    }

    return polymer;

};

export default (input: string, part: string) => {

    if (part === 'a') {

        return fullyReact(input).length;

    } else {

        return alphaBet.reduce((acc: number, l: string): number => {
            const p = fullyReact(input.replace(new RegExp(l, 'gi'), ''))
            return !acc || p.length < acc ? p.length : acc;
        }, 0);

    }

};
