module.exports = {
    name: 'userinfo',
    aliases: ['user', 'u'],
    permissions: ["ADMINISTRATOR"],
    cooldown: 5,
    description: 'Fetch the Discord information of listed users',
    execute: (client, message, args, Discord, profileData) => {

        if(!args.length) {
            return message.channel.send('Error: Argument cannot be empty.');
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
                msg += `Error: Could not find a member ${userID}\n\n`;
            } else {
                msg += `Member found: ${member.user.tag}.\nNickname: ${(member.displayName == member.user.username) ? 'None' : member.displayName}.\nAccount Age: ${((Date.now() - member.user.createdAt) / (1000 * 60 * 60 * 24)).toFixed(2)} days old.\nJoined Server: ${member.joinedAt}.\n\n`;
            }
        }

        message.channel.send(msg);
    }
}