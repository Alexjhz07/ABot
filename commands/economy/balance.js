const profileModel = require('../../models/profileSchema');

module.exports = {
    name: 'balance',
    aliases: ['bal', 'bank', 'b'],
    permissions: [],
    cooldown: 0,
    description: 'Returns the user balance',
    async execute(client, message, args, Discord, profileData) {
        // No arguments, self-profile requested
        if (!args.length) {
            return message.channel.send(`Hi, ${message.author.username}.\nYou have ${profileData.coins.toFixed(2)} peanuts in your pocket.\nYour peanut stash is at ${profileData.bank.toFixed(2)}.`);
        }

        let msg = '';

        // Loops through each user in the argument
        for (const arg of args) {
            // Convert argument format from discord ping to user id
            const userID = arg.includes('<@!') ? arg.replace('<@!', '').replace('>', '') : arg.includes('<@') ? arg.replace('<@', '').replace('>', '') : arg;

            // No user id
            if (userID == '') {
                msg += `Error: ${arg} is an invalid ID.\n\n`;
                continue;
            }

            const member = message.guild.members.cache.get(userID);

            // No member with id
            if (!member) {
                msg += `Error: Could not find a member ${userID}.\n\n`;
                continue;
            }

            // Find member profile
            const account = await profileModel.findOne(
                {
                    userID: userID
                }
            )

            // No account for this member
            if (!account) {
                msg += `Error: Could not locate an account for ${member.user.username}.\n\n`;
                continue;
            }

            msg += `Account Owner: ${member.user.username}\nAccount Wallet: ${account.coins.toFixed(2)} peanuts\nAccount Bank: ${account.bank.toFixed(2)} peanuts\n\n`;
        }

        message.channel.send(msg);
    }
}