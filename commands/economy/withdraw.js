const profileModel = require('../../models/profileSchema');

module.exports = {
    name: 'withdraw',
    aliases: ['rob'],
    permissions: [],
    cooldown: 5,
    description: "Withdraw some money from the bank",
    async execute(client, message, args, Discord, profileData) {
        if(args.length != 1) {
            return message.channel.send(`Error: Withdraw only accepts one argument`);
        }

        let amount;

        try {
            amount = parseInt(args[0]);
        } catch(err) {
            console.log(err);
            return message.channel.send(`Error: ${args[0]} is not a positive integer`);
        }

        if(amount >= Number.MAX_SAFE_INTEGER || amount <= 0 || args[0] % 1 != 0) {
            return message.channel.send(`Error: ${args[0]} is out of bounds`);
        }

        if(!profileData) {
            return message.channel.send('Error: Cannot locate your account. Please try again');
        }

        if(0 > profileData.bank - amount) {
            return message.channel.send(`Error: You do not have enough in the bank to withdraw ${amount} coins`);
        }

        try {
            profileData.coins += amount;
            profileData.bank -= amount;
            profileData.save();
        } catch(err) {
            console.log(err);
            return message.channel.send(`Error: Could not complete the withdraw`);
        }

        return message.channel.send(`Successfully withdrew ${amount} coins from your account.\nCurrent wallet: ${profileData.coins}\nCurrent bank: ${profileData.bank}`);
    }
}