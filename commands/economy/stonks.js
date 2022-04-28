module.exports = {
    name: 'stonks',
    aliases: ['s', 'beg'],
    permissions: [],
    cooldown: 180,
    description: 'Gives the user a random number of peanuts',
    async execute(client, message, args, Discord, profileData) {
        const randomNumber = Math.floor(Math.random() * 50) + 1; //[1, 50]
        const jackPot = Math.floor(Math.random() * 100) + 1; //[1, 100]

        if (jackPot == 42) {
            profileData.coins += 300;
            profileData.stats.stonksUsed++;
            profileData.stonksReceived += randomNumber;
            await profileData.save();
            return message.channel.send(`***JACKPOT!***\n${message.author.username} just won the stonks jackpot!\n*300* peanuts were added to their balance!`);
        }
        
        profileData.coins += randomNumber;
        profileData.stats.stonksUsed++;
        profileData.stats.stonksReceived += randomNumber;
        await profileData.save();
        
        if (randomNumber == 1) {
            return message.channel.send(`The stonks are not very high today...\n${message.author.username} just received ${randomNumber} peanut from the heavens.\nTheir pocket is now at ${profileData.coins} peanuts.`);
        } else if (randomNumber < 15) {
            return message.channel.send(`${message.author.username} just had ${randomNumber} more peanuts added to their pockets.\nTheir balance is now ${profileData.coins} peanuts.`);
        } else if (randomNumber < 35) {
            return message.channel.send(`Not a bad day for stonks!\n${message.author.username} just received ${randomNumber} peanuts.\nTheir balance is now ${profileData.coins} peanuts.`);
        } else {
            return message.channel.send(`Big stonks!\n${message.author.username} just received ${randomNumber} peanuts.\nTheir balance is now ${profileData.coins} peanuts.`);
        }
    }
}