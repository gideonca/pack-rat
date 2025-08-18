#!/usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import ora from 'ora';
import figlet from 'figlet';
import net from 'net';

// must run npm link for the pack command to run

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
                choices: ["Ping", "Echo"],
            },
        ])
        .then((result) => {
            const spinner = ora(`Doing ${result.choice}...`).start(); // Start a spinner

            const client = net.createConnection({ port: 6379 }, () => {
                console.log('Connected to Pack Rat server');
            });

            switch(result.choice.toString().toLowerCase()) {
                case 'ping':
                    spinner.text = 'Pinging the server...'; 

                    client.write('Ping'); // Send the PING command to the server

                    client.on('error', (err) => {   // Handle connection errors
                        spinner.fail(chalk.red(`Error: ${err.message}`));
                        console.error(err);
                    });

                    client.on('data', (data) => { // Handle incoming data from the server
                        console.log(`Received: ${data.toString()}`);
                        client.end(); // Close the connection after receiving data
                        return;
                    });

                    break;
                case 'echo':
                    spinner.text = 'Echoing a message...';
                    // TODO: Implement the ECHO command

                    client.write('Echo hello world'); // Send the ECHO command to the server

                    client.on('data', (data) => { // Handle incoming data from the server
                        console.log(`Received: ${data.toString()}`);
                        client.end(); // Close the connection after receiving data
                        return;
                    });

                    // console.log(chalk.yellow("Echo command is not yet implemented."));
                    // spinner.fail(chalk.red("Failed to echo message."));
                    break;
                default:
                    spinner.text = 'Processing...';
            }

            setTimeout(() => {
                spinner.succeed(chalk.green("Done!"));
            }, 3000);
        });
});

program.parse(process.argv);