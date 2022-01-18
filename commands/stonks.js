const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'stonks',
    aliases: [],
    permissions: [],
    description: 'Gives the user a random amount of coins',
    async execute(client, message, args, Discord, isBotOwner, profileData) {
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
        
        if (randomNumber < 15) {
            return message.channel.send(`${message.author.username} just received ${randomNumber}.\nTheir balance is now ${response.coins + randomNumber}.`)
        } else if (randomNumber > 35) {
            return message.channel.send(`Not a bad day for stonks!\n${message.author.username} just received ${randomNumber}.\nTheir balance is now ${response.coins + randomNumber}.`)
        } else {
            return message.channel.send(`Big stonks!\n${message.author.username} just received ${randomNumber}.\nTheir balance is now ${response.coins + randomNumber}.`)
        }
    }
}