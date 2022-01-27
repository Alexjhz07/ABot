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

        let amount;

        try {
            if (amount.toUpperCase() == "ALL"){
                amount = profileData.coins;
            }
            else{
                amount = parseInt(args[0]);
            }
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