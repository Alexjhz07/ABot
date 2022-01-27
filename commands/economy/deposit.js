const profileModel = require('../../models/profileSchema');

module.exports = {
    name: 'deposit',
    aliases: [],
    permissions: [],
    cooldown: 5,
    description: "Deposit some money into the bank",
    async execute(client, message, args, Discord, profileData) {
        if(args.length != 1) {
            return message.channel.send(`Error: Deposit only accepts one argument`);
        }

        if(!profileData) {
            return message.channel.send('Error: Cannot locate your account. Please try again');
        }

        let amount;

        if (args[0].toUpperCase() == "ALL") {
            if(profileData.coins == 0) {
                return message.channel.send('Error: You have no money to deposit');
            }
            amount = profileData.coins;
        } else if (Number(args[0])) {
            amount = parseInt(args[0]);
        } 

        if(amount >= Number.MAX_SAFE_INTEGER || amount <= 0 || amount % 1 != 0) {
            return message.channel.send(`Error: ${args[0]} is out of bounds`);
        }

        if(0 > profileData.coins - amount) {
            return message.channel.send(`Error: You do not have enough to deposit ${amount} coins into your bank`);
        }

        try {
            profileData.bank += amount;
            profileData.coins -= amount;
            profileData.save();
        } catch(err) {
            console.log(err);
            return message.channel.send(`Error: Could not complete the deposit`);
        }

        return message.channel.send(`Successfully deposited ${amount} coins into your account.\nCurrent wallet: ${profileData.coins}\nCurrent bank: ${profileData.bank}`);
    }
}