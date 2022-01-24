const profileModel = require('../../models/profileSchema');

module.exports = {
    name: 'balance',
    aliases: ['bal', 'bl', 'b'],
    permissions: [],
    cooldown: 5,
    description: 'Returns the user balance',
    async execute(client, message, args, Discord, profileData) {
        if(!args.length) {
            return message.channel.send(`Hi, ${message.author.username}.\nYour wallet balance is ${profileData.coins}.\nYour bank balance is ${profileData.bank}.`);
        }

        let msg = '';

        for(const arg of args) {
            let userID = arg.includes('<@!') ? arg.replace('<@!', '').replace('>', '') : arg.includes('<@') ? arg.replace('<@', '').replace('<', '') : '';

            if (userID == '') {
                msg += `Error: ${arg} is an invalid ID.\n\n`;
                continue;
            }

            let member = message.guild.members.cache.get(userID);

            if(!member) {
                msg += `Error: Could not find a member ${userID}.\n\n`;
                continue;
            }

            const account = await profileModel.findOne(
                {
                    userID: userID
                }
            )
    
            if(!account) {
                msg += `Error: Could not locate an account for ${member.user.username}.\n\n`;
                continue;
            }

            msg += `Account Owner: ${member.user.username}\nAccount Wallet: ${account.coins}\nAccount Bank: ${account.bank}\n\n`;
        }

        message.channel.send(msg);
    }
}