module.exports = {
    name: 'userinfo',
    aliases: ['user', 'u'],
    permissions: ["ADMINISTRATOR"],
    cooldown: 5,
    description: 'Fetch the Discord information of listed users',
    execute: (client, message, args, Discord, profileData) => {
        if (!args.length) return message.channel.send('Error: Argument cannot be empty.');

        let msg = '';

        for (const arg of args) { // Gives user info for each user in the arguments
            let userID = arg.includes('<@!') ? arg.replace('<@!', '').replace('>', '') : arg.includes('<@') ? arg.replace('<@', '').replace('>', '') : arg;

            if (userID == '') {
                msg += `Error: ${arg} is an invalid ID.\n\n`;
                continue;
            }

            let member = message.guild.members.cache.get(userID);

            if (!member) {
                msg += `Error: Could not find a member ${userID}\n\n`;
            } else {
                msg += `Member found: ${member.user.tag}.\n`;
                msg += `Username: ${member.user.username}.\n`;
                msg += `Discriminator: ${member.user.discriminator}.\n`;
                msg += `Avatar URL: ${member.user.avatarURL()}.\n`;
                msg += `Nickname: ${(member.displayName == member.user.username) ? 'None' : member.displayName}.\n`;
                msg += `Account Age: ${((Date.now() - member.user.createdAt) / (1000 * 60 * 60 * 24)).toFixed(2)} days old.\n`;
                msg += `Joined Server: ${member.joinedAt}.\n\n`;
            }
        }

        if (msg.length >= 2000) { // Safeguard against long messages
            return message.channel.send('Message is too long, please tell Alex to fix this')
        }

        message.channel.send(msg);
    }
}