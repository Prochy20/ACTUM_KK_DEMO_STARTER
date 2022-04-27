const inquirer = require('inquirer');

const styles = require('./utils/styles');
const git = require('./utils/git');
const deploy = require('./utils/vercel');

function run() {
    inquirer
        .prompt([
            {
                type: 'confirm',
                name: 'cleanDemo',
                message: 'Do you want to prepare clean demo ENV?',
                default: true,
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
        ])
        .then(async (answers) => {
            if (answers.cleanDemo) {
                await git.prepareDemoProject();
            }

            if (answers.changeColors) {
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
                await deploy.deploy();
            }
        });
}
run();
