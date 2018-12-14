import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';

const argv = process.argv[2];
if (!argv.match(/^[0-9]{1,2}-[a-b]$/)) {
    console.log(chalk.red(`Example usage: ${process.argv[1]} 2-a`));
    process.exit();
}

try {

    const [ day, part ] = argv.split('-');
    const input = fs.readFileSync(path.join(__dirname, `./day${day}/input-${part}.txt`));
    const puzzle = require(`./day${day}/${part}.ts`);

    console.log(chalk.yellow(`Advent of Code 2018 - https://adventofcode.com/2018/day/${day}\n`));
    console.log(chalk.green(`Puzzle: ${chalk.bold(argv)}`));

    const startTime = Date.now();
    const solution = puzzle.default(input.toString(), part);
    const duration = `${Date.now() - startTime}ms`;

    console.log(chalk.green(`Answer: ${chalk.bold(solution)}`));
    console.log(chalk.green(`Time took: ${chalk.bold(duration)}\n`));

} catch (e) {

    console.log(chalk.red(e.message));
    process.exit();

}
