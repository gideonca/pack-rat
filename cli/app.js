#!/usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import ora from 'ora';
import figlet from 'figlet';

// Display a welcome message
console.log(
    chalk.blue(
        figlet.textSync('Welcome to the Pack-Rat CLI!', 
                { horizontalLayout: 'full' })
    )
);

// Initialize the CLI program
program
    .version('1.0.0')
    .description('A simple CLI tool to test pack-rat Redis');

program.action(() => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'choice',
                message: "Choose an option:",
                choices: ["Option 1", "Option 2", "Option 3"],
            },
        ])
        .then((result) => {
            const spinner = ora(`Doing ${result.choice}...`).start(); // Start a spinner

            setTimeout(() => {
                spinner.succeed(chalk.green("Done!"));
            }, 3000);

            //console.log(chalk.green(`Hello, ${answers.name}!`));
        });
});

program.parse(process.argv);