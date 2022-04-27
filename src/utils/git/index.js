const execute = require('exec-sh').promise;

const env = require('./environment');
const { PATH } = require('../../config');

async function prepareDemoProject(localDependencies = true, projectID = null) {
    try {
        await execute('rm -rf demo', { cwd: PATH.TEMP });
        await execute('git clone https://github.com/Kentico/kontent-sample-app-vue.git demo', { cwd: PATH.TEMP });
        if (localDependencies) {
            await execute('yarn', { cwd: PATH.DEMO });
        }

        if (projectID !== null) {
            await env.createDotENV(projectID);
        }

        return true;
    } catch (ex) {
        return ex;
    }
}

module.exports = {
    prepareDemoProject,
};
