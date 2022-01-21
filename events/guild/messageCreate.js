const { set } = require('mongoose');
const profileModel = require('../../models/profileSchema');
require('dotenv').config();

const cooldowns = new Map();

const validPermissions = [
    "CREATE_INSTANT_INVITE",
    "KICK_MEMBERS",
    "BAN_MEMBERS",
    "ADMINISTRATOR",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD",
    "ADD_REACTIONS",
    "VIEW_AUDIT_LOG",
    "PRIORITY_SPEAKER",
    "STREAM",
    "VIEW_CHANNEL",
    "SEND_MESSAGES",
    "SEND_TTS_MESSAGES",
    "MANAGE_MESSAGES",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "READ_MESSAGE_HISTORY",
    "MENTION_EVERYONE",
    "USE_EXTERNAL_EMOJIS",
    "VIEW_GUILD_INSIGHTS",
    "CONNECT",
    "SPEAK",
    "MUTE_MEMBERS",
    "DEAFEN_MEMBERS",
    "MOVE_MEMBERS",
    "USE_VAD",
    "CHANGE_NICKNAME",
    "MANAGE_NICKNAMES",
    "MANAGE_ROLES",
    "MANAGE_WEBHOOKS",
    "MANAGE_EMOJIS"
]

module.exports = async (client, Discord, message) => {
    if(!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

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

    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd)); 

    if(!command) {
        return message.channel.send(`Error: "${cmd}" is not a valid command`);
    }

    if(command.permissions.length) {
        let invalidPerms = [];
        for(const perm of command.permissions) {
            if(!validPermissions.includes(perm)) {
                message.channel.send(`Error: An invalid permission "${perm}" was located while attempting this command.\nPlease notify the my owner about this bug.`);
                return console.log(`Invalid permission "${perm}" detected while attempting command "${cmd}" from user ${message.author.username}`);
            }
            if(!message.member.permissions.has(perm)) {
                invalidPerms.push(perm);
                break;
            }
        }
        if(invalidPerms.length) {
            return message.channel.send(`Error: Missing permissions ${invalidPerms}`);
        }
    }

    if(!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const currentTime = Date.now();
    const timeStamps = cooldowns.get(command.name);
    const cooldown = (command.cooldown) * 1000;

    if(timeStamps.has(message.author.id)) {
        const expirationTime = timeStamps.get(message.author.id) + cooldown;

        if(currentTime < expirationTime) {
            let unit = 'seconds';
            let timeLeft = Math.ceil((expirationTime - currentTime) / 1000);

            if(timeLeft > 60) {
                timeLeft = (timeLeft / 60).toFixed(1);
                unit = 'minutes';
            } else if(timeLeft == 60) {
                timeLeft = 1;
                unit = 'minute';
            } else if(timeLeft == 1) {
                unit = 'second';
            }

            return message.channel.send(`Cooldown: Please wait ${timeLeft} more ${unit} before using the "${cmd}" command again.`);
        }
    }

    timeStamps.set(message.author.id, currentTime);
    setTimeout(() => timeStamps.delete(message.author.id), cooldown);
    
    command.execute(client, message, args, Discord, profileData);
}