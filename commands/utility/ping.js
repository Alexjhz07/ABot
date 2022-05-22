const { CommandInteractionOptionResolver } = require("discord.js");

module.exports = {
    name: 'ping',
    aliases: [],
    permissions: [],
    cooldown: 1,
    description: "This is a ping command",
    async execute(client, message, args, Discord, profileData) {
        message.channel.send('Calculating latency').then(msg => {
            msg.delete();
            message.channel.send(`Pong!\nLatency: ${msg.createdTimestamp - message.createdTimestamp}ms\nAPI Latency: ${client.ws.ping}ms`);
        });
    }
}