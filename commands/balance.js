module.exports = {
    name: 'balance',
    aliases: ['bal', 'bl', 'b'],
    permissions: [],
    cooldown: 5,
    description: 'Returns the user balance',
    execute(client, message, args, Discord, profileData) {
        message.channel.send(`Hi, ${message.author.username}.\nYour wallet balance is ${profileData.coins}.\nYour bank balance is ${profileData.bank}.`);
    }
}