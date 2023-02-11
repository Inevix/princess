require('./connect-db')()
    .then(async () => {
        const bot = require('./bot');
        const Channel = require('./models/channel');
        const cleanDB = require('./helpers/clean-db');
        const releasesToPost = require('./helpers/releases');
        const getVersions = require('./helpers/versions');
        const getVersion = require('./helpers/version');
        const searchCriteria = require('./helpers/search-criteria');

        require('./commands');
        require('./listeners');

        try {
            bot.launch(); // don't add await before. launch() returns promise always in pending

            console.log('Bot successfully launched!');

            await cleanDB();

            const channels = await Channel.find(searchCriteria());

            if (!channels.length) {
                return this;
            }

            for await (const channel of channels) {
                const releaseIndex = Object.keys(getVersions()).findIndex(
                    version => version.toString() === channel.release.toString()
                );

                await bot.telegram.sendMessage(
                    channel.entity_id,
                    releasesToPost(releaseIndex),
                    {
                        parse_mode: 'Markdown'
                    }
                );
            }

            await Channel.updateMany(searchCriteria(), {
                release: getVersion()
            });
        } catch (error) {
            console.log(error);
        }
    })
    .catch(error => console.log(error));
