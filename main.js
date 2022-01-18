const Discord = require('discord.js');
const fs = require('fs')
const mongoose = require('mongoose');
require('dotenv').config();

const TOKEN = process.env.TOKEN;
const MONGODBSRV = process.env.MONGODBSRV;

const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_EMOJIS_AND_STICKERS", "GUILD_INTEGRATIONS", 
    "GUILD_MESSAGES", "GUILD_MESSAGE_TYPING", "GUILD_MESSAGE_REACTIONS"] 
});

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['commandHandler', 'eventHandler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})

mongoose.connect(MONGODBSRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to Database Successfully');
}).catch((err) => {
    console.log(err);
});

// Must be last line V
client.login(TOKEN);