
const findCommonCharacters = (hash1: string, hash2: string): string =>
    hash1.split('').reduce((acc, char, index) =>
        char === hash2[index] ? `${acc}${char}` : acc
    , '');

export default (input: string) => {

    const hashes = input.split('\n');

    return hashes.reduce((acc: string, hash1: string) => {

        return acc || hashes.reduce((bcc: string, hash2: string) => {

                const charsInCommon = findCommonCharacters(hash1, hash2);
                const diff = hash1.length - charsInCommon.length;

                return diff === 1 ? charsInCommon : bcc;

            }, '');

    }, '');

};
