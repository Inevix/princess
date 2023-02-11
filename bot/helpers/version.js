module.exports = () => {
    return (
        process.env.RELEASE ?? Object.keys(require('../../changelog.json'))[0]
    );
};
