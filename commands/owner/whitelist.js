const profileModel = require('../../models/profileSchema');

module.exports = {
    name: 'whitelist',
    aliases: ['wl'],
    permissions: [],
    cooldown: 1,
    description: "Whitelist users",
    async execute(client, message, args, Discord, profileData) {
        if (message.author.id != process.env.OWNER) return message.channel.send('Error: This command requires owner status');
        if (args.length != 2) return message.channel.send(`Whitelist takes 2 arguments`);

        const userID = args[1].includes('<@!') ? args[1].replace('<@!', '').replace('>', '') : args[1].includes('<@') ? args[1].replace('<@', '').replace('>', '') : '';
        const receiver = message.guild.members.cache.get(userID);

        if (!receiver) return message.channel.send(`Could not find a user with ID ${userID}`)

        const receiverAcc = await profileModel.findOne(
            {
                userID: receiver.id
            }
        )

        if (!receiverAcc) return message.channel.send(`Error: Cannot locate account for ${receiver.user.username}. Please try again`);

        const listArg = args[0].toUpperCase();

        if (listArg == "ADD") {
            receiverAcc.permissions.worfAccess = true;
            message.channel.send(`User ${receiver.user.username} added.`);
        } else if (listArg == "REMOVE") {
            receiverAcc.permissions.worfAccess = false;
            message.channel.send(`User ${receiver.user.username} removed.`);
        } else {
            return message.channel.send('Improper listArg input');
        }

        receiverAcc.save();
    }
}