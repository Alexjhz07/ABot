const profileModel = require('../../models/profileSchema');

module.exports = {
    name: 'stats',
    aliases: [],
    permissions: [],
    cooldown: 5,
    description: 'Fetch the database information of a list of users',
    async execute(client, message, args, Discord, profileData) {
        if (!args.length) { // User requesting own stats
            return message.channel.send(`**===== Stats for ${message.author.username} [Level ${Math.floor(profileData.stats.exp / process.env.XPPERLEVEL)}] =====**\n
            Experience: ${profileData.stats.exp}
            Peanuts requested: ${profileData.stats.stonksUsed} times
            Peanuts received from stonks: ${profileData.stats.stonksReceived} peanuts
            Coin flips won: ${profileData.stats.flipsWon}
            Coin flips lost: ${profileData.stats.flipsLost}
            Peanuts won from flips: ${profileData.stats.flipsPeanutsWon}
            Peanuts lost from flips: ${profileData.stats.flipsPeanutsLost}
            Pokes succeeded: ${profileData.stats.pokeSucceed}
            Pokes failed: ${profileData.stats.pokeFail}
            Been poked: ${profileData.stats.beenPoked} times
            Questions asked: ${profileData.stats.worfAsked}`);
        }

        let msg = '';

        for (const arg of args) { // User requesting server member stats, iterates through each argument
            const userID = arg.includes('<@!') ? arg.replace('<@!', '').replace('>', '') : arg.includes('<@') ? arg.replace('<@', '').replace('>', '') : arg;

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

            if (!member) {
                msg += `Error: Could not find a member ${userID}\n\n`;
                continue;
            } else if (!account) {
                msg += `Error: Could not find an account for ${member.user.username}\n\n`;
                continue;
            } else {
                msg += `**=== Stats for ${member.user.username} [Level ${Math.floor(account.stats.exp / process.env.XPPERLEVEL)}] ===**\n
                Experience: ${account.stats.exp}
                Peanuts requested: ${account.stats.stonksUsed} times
                Peanuts received from stonks: ${account.stats.stonksReceived} peanuts
                Coin flips won: ${account.stats.flipsWon}
                Coin flips lost: ${account.stats.flipsLost}
                Peanuts won from flips: ${account.stats.flipsPeanutsWon}
                Peanuts lost from flips: ${account.stats.flipsPeanutsLost}
                Pokes succeeded: ${account.stats.pokeSucceed}
                Pokes failed: ${account.stats.pokeFail}
                Been poked: ${account.stats.beenPoked} times
                Questions asked: ${account.stats.worfAsked}\n\n`;
            }
        }

        if (msg.length >= 2000) { // Safeguard against long messages
            return message.channel.send('Message is too long, please tell Alex to fix this')
        }

        message.channel.send(msg);
    }
}