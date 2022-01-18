module.exports = {
    name: 'ping',
    description: "This is a ping command",
    execute(client, message, args, Discord, isBotOwner) {
        message.channel.send('Pong!');
    }
}