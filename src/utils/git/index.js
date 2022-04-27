const execute = require('exec-sh').promise;
const path = require('path');

const root = path.join(__dirname, '../../../../');
const demoDir = path.join(root, 'demo');

async function prepareDemoProject() {
    try {
        const removeDir = await execute('rm -rf demo', { cwd: root });
        const clone = await execute('git clone https://github.com/Kentico/kontent-sample-app-vue.git demo', { cwd: root });
        const instalDependencies = await execute('yarn', { cwd: demoDir });
        return removeDir.stderr === '' && clone.stderr === '' && instalDependencies.stderr === '';
    } catch (ex) {
        return ex;
    }
}

module.exports = {
    prepareDemoProject,
};
