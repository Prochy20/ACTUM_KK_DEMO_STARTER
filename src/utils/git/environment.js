const fs = require('fs');
const path = require('path');
const { stringify: ENVStringify } = require('envfile');

const { PATH } = require('../../config');

async function createDotENV(projectID) {
    try {
        fs.writeFileSync(path.join(PATH.DEMO, '.env'), ENVStringify({
            VUE_APP_PROJECT_ID: projectID.toString(),
        }));
        return true;
    } catch (ex) {
        return ex;
    }
}

module.exports = {
    createDotENV,
};
