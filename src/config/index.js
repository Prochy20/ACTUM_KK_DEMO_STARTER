const path = require('path');

module.exports = {
    PATH: {
        TEMP: path.join(path.dirname(require.main.filename), '../temp'),
        DEMO: path.join(path.dirname(require.main.filename), '../temp/demo'),
    },
};
