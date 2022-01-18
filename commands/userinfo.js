module.exports = {
    name: 'userinfo',
    aliases: [],
    description: 'Fetch the information of a single user',
    execute: (client, message, args, Discord, isBotOwner, profileData) => {
        // Usage: *whois <@user>, *whois user_id

        if(!args.length) {
            message.channel.send('Error: Argument cannot be empty.');
            return;
        }

        let msg = '';

        // Replace mentions to IDs
        // A mention is formatted like this: <@user_id> or <@!user_id>
        for(i in args) {
            let userID = args[i].includes('<@!') ? args[i].replace('<@!', '').replace('>', '') : args[i].includes('<@') ? args[i].replace('<@', '').replace('<', '') : '';

            if (userID == '') {
                msg += `Error: ${args[i]} is an invalid ID.\n\n`;
                continue;
            }

            // Check the 'Promises' part to learn about .then() and .catch()!
            let member = message.guild.members.cache.get(userID)
            
            if(!member) {
                msg += `Error: Could not find a member ${userID}\n\n`;
            } else {
                msg += `Member found: ${member.user.tag}.\nJoined: ${member.joinedAt}.\n\n`
            }
        }

        message.channel.send(msg);
    }
}