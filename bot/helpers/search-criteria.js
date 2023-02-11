const getVersion = require('./version');

module.exports = (searchCriteria = {}) => {
    searchCriteria['release'] = {
        $ne: getVersion()
    };

    return searchCriteria;
};
