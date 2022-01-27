const profileModel = require('../../models/profileSchema');

module.exports = {
    name: 'stonks',
    aliases: ['s', 'beg'],
    permissions: [],
    cooldown: 300,
    description: 'Gives the user a random amount of coins',
    async execute(client, message, args, Discord, profileData) {
        const randomNumber = Math.floor(Math.random() * 50) + 1; //[1, 50]
        const response = await profileModel.findOneAndUpdate(
            {
                userID: message.author.id
            },
            {
                $inc: { //increment
                    coins: randomNumber
                }
            }
        );
        
        if(randomNumber == 1) {
            return message.channel.send(`The stonks are not very high today...\n${message.author.username} just received ${randomNumber} coin from the heavens.\nTheir balance is now ${response.coins + randomNumber}.`);
        } else if (randomNumber < 15) {
            return message.channel.send(`${message.author.username} just had ${randomNumber} more coins added to their wallet.\nTheir balance is now ${response.coins + randomNumber}.`);
        } else if (randomNumber < 35) {
            return message.channel.send(`Not a bad day for stonks!\n${message.author.username} just received ${randomNumber} coins.\nTheir balance is now ${response.coins + randomNumber}.`);
        } else {
            return message.channel.send(`Big stonks!\n${message.author.username} just received ${randomNumber} coins.\nTheir balance is now ${response.coins + randomNumber}.`);
        }
    }
}