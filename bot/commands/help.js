const bot = require('../bot');
const isForwarded = require('../helpers/forward');
const messages = require('../i18n/messages');

bot.help(async ctx => {
    try {
        if (isForwarded(ctx)) {
            return ctx;
        }

        const faq = [];

        for (let { question, answer } of messages.help) {
            if (answer.match('%repo')) {
                answer = answer.replace('%repo', process.env.GITHUB_REPO_URL);
            }

            if (answer.match(/%wishlist/)) {
                answer = answer
                    .replace('%wishlistUrlTg', process.env.WISHLIST_TG_URL)
                    .replace(
                        '%wishlistUrlGH',
                        process.env.WISHLIST_GITHUB_REPO_URL
                    );
            }

            if (answer.match(/%chat.*/g)) {
                answer = answer
                    .replace('%chatGPTUrlTg', process.env.CHATGPT_TG_URL)
                    .replace(
                        '%chatGPTUrlGH',
                        process.env.CHATGPT_GITHUB_REPO_URL
                    );
            }

            faq.push(`<strong>${question}</strong>\n${answer}`);
        }

        return await ctx.replyWithHTML(
            messages.faq
                .replace('%faq', faq.join('\n\n'))
                .replace('%url', process.env.AUTHOR_TWITTER_LINK)
        );
    } catch (error) {
        console.error('help.js', error);
        await ctx.sendMessage(messages.error);
    }
});

module.exports = bot;
