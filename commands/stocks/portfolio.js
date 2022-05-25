module.exports = {
    name: 'portfolio',
    aliases: ['p'],
    permissions: [],
    cooldown: 1,
    description: "Show this to your investors",
    async execute(client, message, args, Discord, profileData) {
        if (profileData.stocks.owned.length > 0) {
            var msg = `**Portfolio of ${message.author.username}**\n`

            for (const e of profileData.stocks.owned) {
                msg += `\n${e.symbol}\nShares: ${e.shares}\nRecent Buy Price: ${e.buyPrice.toFixed(2)}\nTotal Invested: ${e.invested.toFixed(2)}\nTotal Returned: ${e.returned.toFixed(2)}\n`;
            }
            
            if (msg.length >= 2000) {
                return message.channel.send('Your portfolio is huge! Please tell Alex to stop being lazy and find a way to display your portfolio');
            } else {
                message.channel.send('Your portfolio has been sent to your direct messages');
                return client.users.cache.get(message.author.id).send(msg);
            }
        } else {
            return message.channel.send(`Empty portfolio`);
        }
    }
}