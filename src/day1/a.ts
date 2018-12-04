
export default (input: string) => {

    return input.split('\n').reduce((acc, v) => acc + parseInt(v, 10), 0);

};
