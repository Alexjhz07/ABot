const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_EMOJIS_AND_STICKERS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"] 
});
const PREFIX = '.';
const fs = require('fs');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
const TOKEN = process.env.TOKEN;
const OWNER = process.env.OWNER;
const BOTCHNL = process.env.BOTCHNL;

const generateImage = require("./utility/generateImage");

for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log(`ABot is Online, logged in as ${client.user.tag}`);
});

client.on('messageCreate', message => {
    if(!message.content.startsWith(PREFIX) || message.author.bot) return;

    let isBotOwner = message.author.id == OWNER;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
    switch(command){
        case 'ping': {
            client.commands.get('ping').execute(message, args);
            break;
        }
        case 'shutdown': {
            if(!isBotOwner) {
                message.channel.send("Error: Insufficient permission");
                return;
            } else {
                client.commands.get('shutdown').execute(message, args, client);
            }
            break;
        }
        case 'restart': {
            if(!isBotOwner) {
                message.channel.send("Error: Insufficient permission");
                return;
            } else {
                client.commands.get('restart').execute(message, args, client, TOKEN);
            }
            break;
        }
        case 'echo': {
            client.commands.get('echo').execute(message, args);
            break;
        }
        case 'checkroles': {
            client.commands.get('checkroles').execute(message, args);
            break;
        }
        case 'reactionrole': {
            client.commands.get('reactionrole').execute(message, args, Discord, client, BOTCHNL);
            break;
        }
        default: {
            message.channel.send(`Error: ${command} is not a valid command`);
        }
    }
});

client.on("guildMemberAdd", async (member) => {
    const img = await generateImage(member);
    member.guild.channels.cache.get(BOTCHNL).send({
        content: `<@${member.id}> Welcome to the server`,
        files: [img]
    });
});

// Must be last line V
client.login(TOKEN);