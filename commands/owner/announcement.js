module.exports = {
    name: 'announcement',
    aliases: ['ann'],
    permissions: [],
    cooldown: 1,
    description: "Owner announcement to friend server",
    execute(client, message, args, Discord, profileData) {
        const [head, ...rest] = args;

        if (message.author.id != process.env.OWNER) return message.channel.send("Error: This command requires owner status");
        if (!args.length) return message.channel.send("Error: Arguments cannot be empty");

        let guild = client.guilds.cache.get(process.env.FSERVER);
        let channel;

        if (guild) {
            if (head.toLowerCase() == 'general') {
                channel = guild.channels.cache.get(process.env.FGCHANNEL);
            } else if (head.toLowerCase() == 'bot'){
                channel = guild.channels.cache.get(process.env.FBCHANNEL);
            } else {
                return message.channel.send(`Error: ${head} is an invalid channel.\nValid channels are "General" and "Bot".`);
            }

            if (!rest.length) {
                return message.channel.send(`Error: Announcement cannot be empty.`);
            }
            
            if (channel) {
                channel.send(rest.join(' '));
            } else {
                console.log(`Error identifying channel`);
            }
        } else {
            console.log(`Error identifying guild`);
        }
    }
}