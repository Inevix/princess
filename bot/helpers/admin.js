module.exports = async ({ status }) => {
    return status === 'creator' || status === 'administrator';
};
