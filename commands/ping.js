module.exports = {
    name: 'ping',
    aliases: [],
    permissions: [],
    cooldown: 1,
    description: "This is a ping command",
    execute(client, message, args, Discord, profileData) {
        message.channel.send('Pong!');
    }
}