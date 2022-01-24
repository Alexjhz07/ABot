module.exports = {
    name: 'userinfo',
    aliases: ['user', 'u'],
    permissions: ["ADMINISTRATOR"],
    cooldown: 5,
    description: 'Fetch the information of a single user',
    execute: (client, message, args, Discord, profileData) => {
        // Usage: *whois <@user>, *whois user_id

        if(!args.length) {
            message.channel.send('Error: Argument cannot be empty.');
            return;
        }

        let msg = '';

        // Replace mentions to IDs
        // A mention is formatted like this: <@user_id> or <@!user_id>
        for(const arg of args) {
            let userID = arg.includes('<@!') ? arg.replace('<@!', '').replace('>', '') : arg.includes('<@') ? arg.replace('<@', '').replace('<', '') : '';

            if (userID == '') {
                msg += `Error: ${arg} is an invalid ID.\n\n`;
                continue;
            }

            // Check the 'Promises' part to learn about .then() and .catch()!
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