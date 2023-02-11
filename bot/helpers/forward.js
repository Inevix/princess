module.exports = ctx => {
    return !!ctx.message?.forward_from;
};
