const fs = require('fs');
const path = require('path');

const PLACEHOLDERS = require('./placeholders');

const replaceAll = require('../replaceAll');

// eslint-disable-next-line max-len
async function writeStyles(primary, primaryHover, secondary, btnText, btnBg, btnBorder, btnTextHover, btnBgHover, btnBorderHover) {
    try {
        const stylesTemplate = fs.readFileSync(path.join(__dirname, '../../templates/index.css')).toString();
        // Replace primary
        let result = replaceAll(stylesTemplate, PLACEHOLDERS.COLORS.PRIMARY, primary);
        result = replaceAll(result, PLACEHOLDERS.COLORS.SECONDARY, secondary);
        result = replaceAll(result, PLACEHOLDERS.COLORS.PRIMARY_HOVER, primaryHover);

        result = replaceAll(result, PLACEHOLDERS.BTN.TEXT, btnText);
        result = replaceAll(result, PLACEHOLDERS.BTN.BACKGROUND, btnBg);
        result = replaceAll(result, PLACEHOLDERS.BTN.BORDER, btnBorder);

        result = replaceAll(result, PLACEHOLDERS.BTN.TEXT_HOVER, btnTextHover);
        result = replaceAll(result, PLACEHOLDERS.BTN.BACKGROUND_HOVER, btnBgHover);
        result = replaceAll(result, PLACEHOLDERS.BTN.BORDER_HOVER, btnBorderHover);

        fs.writeFileSync(path.join(__dirname, '../../../../demo/src/index.css'), result.toString());

        return true;
    } catch (ex) {
        return ex;
    }
}

module.exports = {
    writeStyles,
};
