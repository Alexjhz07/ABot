const profileModel = require('../../models/profileSchema');

module.exports = {
    name: 'stats',
    aliases: [],
    permissions: [],
    cooldown: 5,
    description: 'Fetch the database information of a list of users',
    async execute(client, message, args, Discord, profileData) {
        // Usage: *whois <@user>, *whois user_id

        if(!args.length) {
            return message.channel.send(`**=====Stats for ${message.author.username}=====**\n
            Experience: ${profileData.stats.exp}
            Peanuts requested: ${profileData.stats.stonksUsed} times
            Peanuts received from stonks: ${profileData.stats.stonksReceived} peanuts
            Coin flips won: ${profileData.stats.flipsWon}
            Coin flips lost: ${profileData.stats.flipsLost}
            Pokes succeeded: ${profileData.stats.pokeSucceed}
            Pokes failed: ${profileData.stats.pokeFail}
            Been poked: ${profileData.stats.beenPoked} times
            Questions asked: ${profileData.stats.worfAsked}`);
        }

        let msg = '';

        for(const arg of args) {
            const userID = arg.includes('<@!') ? arg.replace('<@!', '').replace('>', '') : arg.includes('<@') ? arg.replace('<@', '').replace('<', '') : '';

            if (userID == '') {
                msg += `Error: ${arg} is an invalid ID.\n\n`;
                continue;
            }

            const member = message.guild.members.cache.get(userID);
            const account = await profileModel.findOne(
                {
                    userID: userID
                }
            )

            if(!member) {
                msg += `Error: Could not find a member ${userID}\n\n`;
                continue;
            } else if (!account) {
                msg += `Error: Could not find an account for ${member.user.username}\n\n`;
                continue;
            } else {
                msg += `**===Stats for ${member.user.username}===**\n
                Experience: ${account.stats.exp}
                Peanuts requested: ${account.stats.stonksUsed} times
                Peanuts received from stonks: ${account.stats.stonksReceived} peanuts
                Coin flips won: ${account.stats.flipsWon}
                Coin flips lost: ${account.stats.flipsLost}
                Pokes succeeded: ${account.stats.pokeSucceed}
                Pokes failed: ${account.stats.pokeFail}
                Been poked: ${account.stats.beenPoked} times
                Questions asked: ${account.stats.worfAsked}\n\n`;
            }
        }

        message.channel.send(msg);
    }
}