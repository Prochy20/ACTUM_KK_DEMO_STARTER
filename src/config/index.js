const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

module.exports = {
    PATH: {
        TEMP: path.join(path.dirname(require.main.filename), '../temp'),
        DEMO: path.join(path.dirname(require.main.filename), '../temp/demo'),
        SRC: path.dirname(require.main.filename),
    },

    KONTENT: {
        PROJECT_ID: process.env.KONTENT_PROJECT_ID,
        MASTER_ENV_ID: process.env.KONTENT_MASTER_ENV_ID,
        MANAGEMENT_API: process.env.KONTENT_MANAGEMENT_API,
        SUBSCRIPTION_ID: process.env.KONTENT_SUBSCRIPTION_ID,
        ENV_LIMIT: Number(process.env.KONTENT_ENV_LIMIT),
    },
};
