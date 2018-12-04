
type TwosAndThrees = [number, number];

interface CharCount {
    [index: string]: number
}

const charCounter = (hash: string) =>
    hash.split('').reduce((acc: CharCount, k: string) => ({
        ...acc,
        [k]: acc[k] ? acc[k] + 1 : 1
    }), {});

const hasTwoOfAKind = (charCount: CharCount): boolean =>
    !!Object.values(charCount).filter((c) => c === 2).length;

const hasThreeOfAKind = (charCount: CharCount): boolean =>
    !!Object.values(charCount).filter((c) => c === 3).length;

export default (input: string) => {

    const twosAndThrees = input.split('\n').reduce((acc: TwosAndThrees, hash: string) => {

        const charCount = charCounter(hash);
        if (hasTwoOfAKind(charCount)) acc[0]++;
        if (hasThreeOfAKind(charCount)) acc[1]++;

        return acc;

    }, [0, 0]);

    return twosAndThrees[0] * twosAndThrees[1];

};
