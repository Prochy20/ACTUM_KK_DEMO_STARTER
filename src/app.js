/* eslint-disable no-console */
const inquirer = require('inquirer');
const clc = require('cli-color');

const styles = require('./utils/styles');
const git = require('./utils/git');
const deploy = require('./utils/vercel');

const msg = require('./cli');

function run() {
    console.log(`${clc.bold(clc.green((msg.logo)))}`);

    inquirer
        .prompt([
            {
                type: 'confirm',
                name: 'cleanDemo',
                message: 'Do you want to prepare clean demo ENV?',
                default: true,
            },
            {
                type: 'input',
                name: 'kenticoProjectID',
                message: 'State your Kentico Kontent Project ID (leave blank if you dont want to set it in config)',
                default: null,
                when: (answers) => answers.cleanDemo,
            },
            {
                type: 'confirm',
                name: 'changeColors',
                message: 'Do you want to change project colors?',
                default: true,
            },
            {
                type: 'input',
                name: 'primary',
                message: 'Primary color',
                default: '#B24143',
                when: (answers) => answers.changeColors,
            },
            {
                type: 'input',
                name: 'primaryHover',
                message: 'Primary hover color',
                default: '#BA5455',
                when: (answers) => answers.changeColors,
            },
            {
                type: 'input',
                name: 'secondary',
                message: 'Secondary color',
                default: '#08768C',
                when: (answers) => answers.changeColors,
            },
            {
                type: 'input',
                name: 'btnText',
                message: 'Button text color',
                default: '#08768C',
                when: (answers) => answers.changeColors,
            },
            {
                type: 'input',
                name: 'btnBackground',
                message: 'Button background color',
                default: '#ffffff',
                when: (answers) => answers.changeColors,
            },
            {
                type: 'input',
                name: 'btnBorder',
                message: 'Button border color',
                default: '#08768C',
                when: (answers) => answers.changeColors,
            },
            {
                type: 'input',
                name: 'btnTextHover',
                message: 'Button text - Hover color',
                default: '#000000',
                when: (answers) => answers.changeColors,
            },
            {
                type: 'input',
                name: 'btnBackgroundHover',
                message: 'Button background - Hover color',
                default: '#ffffff',
                when: (answers) => answers.changeColors,
            },
            {
                type: 'input',
                name: 'btnBorderHover',
                message: 'Button border - Hover color',
                default: '#000000',
                when: (answers) => answers.changeColors,
            },
            {
                type: 'confirm',
                name: 'deploy',
                message: 'Do you want to deploy your project?',
                default: true,
            },
            {
                type: 'confirm',
                name: 'localDependencies',
                message: 'Do you want to instal local dependencies?',
                default: false,
            },
        ])
        .then(async (answers) => {
            if (answers.cleanDemo) {
                console.log(`${clc.bold(clc.green((msg.creatLocalRepo)))}`);
                await git.prepareDemoProject(answers.localDependencies, answers.kenticoProjectID);
            }

            if (answers.changeColors) {
                console.log(`${clc.bold(clc.green((msg.setColors)))}`);
                await styles.writeStyles(
                    answers.primary,
                    answers.primaryHover,
                    answers.secondary,
                    answers.btnText,
                    answers.btnBackground,
                    answers.btnBorder,
                    answers.btnTextHover,
                    answers.btnBackgroundHover,
                    answers.btnBorderHover,
                );
            }

            if (answers.deploy) {
                console.log(`${clc.bold(clc.green((msg.deploy)))}`);
                await deploy.deploy();
            }

            console.log(`${clc.bold(clc.green((msg.done)))}`);

            if (answers.deploy) {
                console.log(clc.bold(clc.redBright('FIND TICK SYMBOL ( ✅ ) ABOVE TO SEE PRODUCTION URL')));
            }
        });
}
run();
