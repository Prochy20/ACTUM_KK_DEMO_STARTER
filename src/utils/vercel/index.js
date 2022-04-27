const execute = require('exec-sh').promise;

const { PATH } = require('../../config');

async function deploy() {
    try {
        const vercelCmd = await execute('vercel --prod', { cwd: PATH.DEMO });
        return vercelCmd.stderr;
    } catch (ex) {
        return false;
    }
}

module.exports = {
    deploy,
};
