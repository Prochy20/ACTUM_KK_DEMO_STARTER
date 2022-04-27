const execute = require('exec-sh').promise;
const path = require('path');

const root = path.join(__dirname, '../../../../');
const demoDir = path.join(root, 'demo');

async function deploy() {
    try {
        const vercelCmd = await execute('vercel --prod', { cwd: demoDir });
        return vercelCmd.stderr;
    } catch (ex) {
        return false;
    }
}

module.exports = {
    deploy,
};
