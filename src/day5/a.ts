
const react = (polymer: string): string => {

    const alphaBet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    const regEx1 = new RegExp(alphaBet.map((l: string) => `${l}${l.toUpperCase()}`).join('|'));
    const regEx2 = new RegExp(alphaBet.map((l: string) => `${l.toUpperCase()}${l}`).join('|'));

    return polymer.replace(regEx1, '').replace(regEx2, '');

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

export default (input: string) => {

    return fullyReact(input).length;

};
