const profileModel = require('../../models/profileSchema');

module.exports = {
    name: 'balance',
    aliases: ['bal', 'bank', 'b'],
    permissions: [],
    cooldown: 0,
    description: 'Returns the user balance',
    async execute(client, message, args, Discord, profileData) {
        if (!args.length) {
            return message.channel.send(`Hi, ${message.author.username}.\nYou have ${profileData.coins} peanuts in your pocket.\nYour peanut stash is at ${profileData.bank}.`);
        }

        let msg = '';

        for (const arg of args) {
            const userID = arg.includes('<@!') ? arg.replace('<@!', '').replace('>', '') : arg.includes('<@') ? arg.replace('<@', '').replace('>', '') : '';

            if (userID == '') {
                msg += `Error: ${arg} is an invalid ID.\n\n`;
                continue;
            }

            const member = message.guild.members.cache.get(userID);

            if (!member) {
                msg += `Error: Could not find a member ${userID}.\n\n`;
                continue;
            }

            const account = await profileModel.findOne(
                {
                    userID: userID
                }
            )
    
            if (!account) {
                msg += `Error: Could not locate an account for ${member.user.username}.\n\n`;
                continue;
            }

            msg += `Account Owner: ${member.user.username}\nAccount Wallet: ${account.coins.toFixed(2)} peanuts\nAccount Bank: ${account.bank.toFixed(2)} peanuts\n\n`;
        }

        message.channel.send(msg);
    }
}