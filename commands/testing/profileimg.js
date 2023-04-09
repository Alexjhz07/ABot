const profileModel = require('../../models/profileSchema');

module.exports = {
    name: 'profileimg',
    aliases: [],
    permissions: [],
    cooldown: 0,
    description: 'Get the profile image url of the current user or a mentioned user',
    async execute(client, message, args, Discord, profileData) {
        if (message.author.id != process.env.OWNER) return message.channel.send('Error: This command requires owner status');

        if (!args.length) {
            return message.channel.send(`Hi, ${message.author.username}.\nYour profile image url is ${message.author.avatarURL()}\nYour banner url is ${message.author.bannerURL()}`);
        };

        if (args.length > 1) {
            return message.channel.send('This command is restricted to one user at a time for testing');
        }

        const arg = args[0];

        const userID = arg.includes('<@!') ? arg.replace('<@!', '').replace('>', '') : arg.includes('<@') ? arg.replace('<@', '').replace('>', '') : arg;

        // No user id
        if (userID == '') {
            return message.channel.send(`Error: ${arg} is an invalid ID.\n\n`);
        };

        const member = message.guild.members.cache.get(userID);

        console.log(member);

        // No member with id
        if (!member) {
            return message.channel.send(`Error: Could not find a member ${userID}.\n\n`);
        };

        // Find member profile
        const account = await profileModel.findOne(
            {
                userID: userID
            }
        )

        // No account for this member
        if (!account) {
            return message.channel.send(`Error: Could not locate an account for ${member.user.username}.\n\n`);
        };

        return message.channel.send(`Hi, ${message.author.username}.\n${member.user.username}'s profile image url is ${member.user.avatarURL()}\nYour banner url is ${member.user.bannerURL()}`)
    }
}