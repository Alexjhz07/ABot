const Discord = require('discord.js');
const GatewayIntentBits = Discord.GatewayIntentBits;
const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config();

// Create discord client & initialize intents
const client = new Discord.Client({
    intents: [
        GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, 
        GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent
    ] 
});


// Load all commands
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['commandHandler', 'eventHandler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
});

// Connect to database
mongoose.connect(process.env.MONGODBSRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to Database Successfully');
}).catch((err) => {
    console.log(err);
});

// Connect to discord, must be last line
client.login(process.env.TOKEN);