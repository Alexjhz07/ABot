module.exports = {
    name: 'reactionrole',
    description: "Sets up a simple reaction role message",
    async execute(message, args, Discord, client, BOTCHNL) {
        const channel = BOTCHNL; //Bot commands channel
        const tt1 = message.guild.roles.cache.find(role => role.name === "Test Team 1");
        const tt2 = message.guild.roles.cache.find(role => role.name === "Test Team 2");

        const tt1e = '🟣';
        const tt2e = '🔴';

        let embed = new Discord.MessageEmbed()
            .setColor('#e42643')
            .setTitle('Reaction Roles')
            .setDescription('Choose an emoji to be assigned to a test team.');
        let messageEmbed = await message.channel.send(embed);

        messageEmbed.react(tt1e);
        messageEmbed.react(tt2e);
    }
}