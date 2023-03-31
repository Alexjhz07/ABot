// const { EmbedBuilder } = require("discord.js");
// const paginationEmbed = require("../../utility/paginationEmbed");

module.exports = {
    name: 'test',
    aliases: [],
    permissions: [],
    cooldown: 0,
    description: "Command For Feature Testing",
    execute(client, message, args, Discord, profileData) {
        if (message.author.id != process.env.OWNER) return message.channel.send('Error: This command requires owner status');

        /**
         * 2022-10-16
         * Title: Embed Builder Testing
         * Objective: Understand how to format embeds in Discord.js v14
         */


        // const embed = new EmbedBuilder()
        //     .setColor(0x0000ff)
        //     .setAuthor( {
        //         name: `${message.author.username} - Level ${String(Math.floor(profileData.stats.exp / 500))}`,
        //         iconURL: message.author.avatarURL(),
        //         url: message.author.avatarURL()
        //     } )
        //     .setTitle("Vacuum")
        //     .setDescription("Now with 40% extra power")
        //     .addFields(
        //         { name: 'Level', value: String(Math.floor(profileData.stats.exp / 500)) },
        //         { name: '\u200B', value: '\u200B' },
        //         { name: 'Wallet', value: String(profileData.coins), inline: true },
        //         { name: 'Bank', value: String(profileData.bank), inline: true },
        //         { name: 'Hidden test', value: '||Some value here||', inline: true },
        //         { name: '\u200B', value: '\u200B' },
        //         { name: 'Code test', value: '`Some value here`', inline: true },
        //         { name: 'Inline field title', value: 'Some value here', inline: true },
        //         { name: 'Inline field title', value: 'Some value here', inline: true },
        //     )
        //     .setTimestamp()

        // const embed2 = new EmbedBuilder()
        //     .setColor(0x0000ff)
        //     .setAuthor( {
        //         name: message.author.username,
        //         iconURL: message.author.avatarURL(),
        //         url: message.author.avatarURL()
        //     } )
        //     .setTitle("AAAAA")
        //     .setDescription("Now with 40% extra power")
        //     .addFields(
        //         { name: 'Level', value: String(profileData.stats.exp / 500) },
        //         { name: '\u200B', value: '\u200B' },
        //         { name: 'Wallet', value: String(profileData.coins), inline: true },
        //         { name: 'Bank', value: String(profileData.bank), inline: true },
        //         { name: 'Inline field title', value: 'Some value here', inline: true },
        //         { name: '\u200B', value: '\u200B' },
        //         { name: 'Inline field title', value: 'Some value here', inline: true },
        //         { name: 'Inline field title', value: 'Some value here', inline: true },
        //         { name: 'Inline field title', value: 'Some value here', inline: true },
        //     )
        //     .setTimestamp()

        // const embed3 = new EmbedBuilder()
        //     .setColor(0x0000ff)
        //     .setAuthor( {
        //         name: message.author.username,
        //         iconURL: message.author.avatarURL(),
        //         url: message.author.avatarURL()
        //     } )
        //     .setTitle("BBBBB")
        //     .setDescription("Now with 40% extra power")
        //     .addFields(
        //         { name: 'Level', value: String(profileData.stats.exp / 500) },
        //         { name: '\u200B', value: '\u200B' },
        //         { name: 'Wallet', value: String(profileData.coins), inline: true },
        //         { name: 'Bank', value: String(profileData.bank), inline: true },
        //         { name: 'Inline field title', value: 'Some value here', inline: true },
        //         { name: '\u200B', value: '\u200B' },
        //         { name: 'Inline field title', value: 'Some value here', inline: true },
        //         { name: 'Inline field title', value: 'Some value here', inline: true },
        //         { name: 'Inline field title', value: 'Some value here', inline: true },
        //     )
        //     .setTimestamp()

        // let pages = [embed, embed2, embed3];
        // paginationEmbed(message, pages);

        // message.channel.send({ embeds: [embed] });

        // Getting Bond's icon url for future use
        // message.channel.send(client.user.avatarURL())

        /**
         * 2022-10-18
         * End Embed Builder Testing
         * Status: More familiar with Discord.js embeds, refer to documentation and examples for details
         */
    }
}