module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
    },
    extends: [
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        semi: [2, 'always', { omitLastInOneLineBlock: true }],
        indent: ['error', 4],
    },
};
