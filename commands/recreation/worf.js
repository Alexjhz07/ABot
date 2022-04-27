const profileModel = require('../../models/profileSchema');

module.exports = {
    name: 'worf',
    aliases: ['ask', 'woof'],
    permissions: [],
    cooldown: 0,
    description: "Utilize Bond's predictive powers!",
    async execute(client, message, args, Discord, profileData) {
        if(profileData.permissions.worfAccess == false) {
            return message.channel.send('Worf is undergoing reconstruction, please check again later.');
        }

        if(!args.length) {
            return message.channel.send(`Input cannot be empty!`);
        }

        message.channel.send("Done");
        //profileData.stats.worfAsked++;
        //profileData.save();
    }
}