const profileModel = require('../../models/profileSchema');

module.exports = {
    name: 'donate',
    aliases: ['give', 'feed'],
    permissions: [],
    cooldown: 0,
    description: "Donate some peanuts to another player",
    async execute(client, message, args, Discord, profileData) {
        if (args.length != 2) {
            return message.channel.send(`Error: Donate only accepts two arguments`);
        }

        // Convert argument format from discord ping to user id
        const userID = args[1].includes('<@!') ? args[1].replace('<@!', '').replace('>', '') : args[1].includes('<@') ? args[1].replace('<@', '').replace('>', '') : args[1];
        const receiver = message.guild.members.cache.get(userID);

        // Check if receiver exists and if receiver is user
        if (!receiver) return message.channel.send(`Error: Receiver ${userID} not found`);
        if (message.author == receiver.user) return message.channel.send('Error: Cannot send peanuts to yourself');

        let amount;

        // Sets amount to full balance if arg is all
        if (args[0].toUpperCase() == "ALL") {
            if(profileData.coins == 0) {
                return message.channel.send('Error: You have no peanuts to donate');
            }
            amount = profileData.coins;
        } else if (Number(args[0])) {
            amount = Math.round(args[0] * 1e2) / 1e2;
        }

        // Amount range check
        if (amount >= Number.MAX_SAFE_INTEGER || amount <= 0) {
            return message.channel.send(`Error: ${args[0]} is out of bounds`);
        }

        // Find receiver profile
        const receiverAcc = await profileModel.findOne(
            {
                userID: receiver.id
            }
        )

        // No profile located
        if (!receiverAcc) {
            return message.channel.send(`Error: Cannot locate account for ${receiver.user.username}. Please try again`);
        }

        // Account sufficient balance for donation check
        if (0 > profileData.coins - amount) {
            return message.channel.send(`Error: You do not have enough to send ${amount.toFixed(2)} peanuts to ${receiver.user.username}`);
        }

        receiverAcc.coins += amount;
        profileData.coins -= amount;
        receiverAcc.save();
        profileData.save();

        return message.channel.send(`Successfully transferred ${amount.toFixed(2)} peanuts from ${message.author.username} to ${receiver.user.username}`);
    }
}