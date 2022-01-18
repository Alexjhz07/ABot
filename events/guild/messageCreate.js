const profileModel = require('../../models/profileSchema');
require('dotenv').config();
const OWNER = process.env.OWNER;
const PREFIX = process.env.PREFIX;

module.exports = async (client, Discord, message) => {
    if(!message.content.startsWith(PREFIX) || message.author.bot) return;

    let profileData;

    try {
        profileData = await profileModel.findOne({ userID: message.author.id })

        if(!profileData) {
            let profile = await profileModel.create({
                userID: message.author.id,
                serverID: message.guild.id,
                coins: 1000,
                bank: 0
            });
            profile.save();
        }
    } catch(err) {
        console.log(err);
    }

    let isBotOwner = message.author.id == OWNER;
    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd);

    if(command) {
        command.execute(client, message, args, Discord, isBotOwner, profileData);
    } else {
        message.channel.send(`Error: ${cmd} is not a valid command`);
    }
}