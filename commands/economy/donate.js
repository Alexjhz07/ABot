const profileModel = require('../../models/profileSchema');

module.exports = {
    name: 'donate',
    aliases: ['give'],
    permissions: [],
    cooldown: 5,
    description: "Donate some money to another player",
    async execute(client, message, args, Discord, profileData) {
        if(args.length != 2) {
            return message.channel.send(`Error: Donate only accepts two arguments`);
        }

        const userID = args[0].includes('<@!') ? args[0].replace('<@!', '').replace('>', '') : args[0].includes('<@') ? args[0].replace('<@', '').replace('<', '') : '';
        const receiver = message.guild.members.cache.get(userID);
        let amount;

        if(!receiver) {
            return message.channel.send(`Error: Receiver ${userID} not found`);
        }
        
        if (args[1].toUpperCase() == "ALL") {
            amount = profileData.coins;
        } else if (Number(args[1])) {
            amount = parseInt(args[1]);
        } 

        if(amount >= Number.MAX_SAFE_INTEGER || amount <= 0 || amount % 1 != 0) {
            return message.channel.send(`Error: ${args[1]} is out of bounds`);
        }

        if(message.author == receiver.user) {
            return message.channel.send('Error: Cannot send money to yourself');
        }

        const receiverAcc = await profileModel.findOne(
            {
                userID: receiver.id
            }
        )

        if(!receiverAcc) {
            return message.channel.send(`Error: Cannot locate account for ${receiver.user.username}. Please try again`);
        }

        if(!profileData) {
            return message.channel.send('Error: Cannot locate your account. Please try again');
        }

        if(0 > profileData.coins - amount) {
            return message.channel.send(`Error: You do not have enough to send ${amount} coins to ${receiver.user.username}`);
        }

        try {
            receiverAcc.coins += amount;
            profileData.coins -= amount;
            receiverAcc.save();
            profileData.save();
        } catch(err) {
            console.log(err);
            return message.channel.send(`Error: Could not complete the transfer from ${message.author.username} to ${receiver.user.username}`);
        }

        return message.channel.send(`Successfully transferred ${amount} coins from ${message.author.username} to ${receiver.user.username}`);
    }
}