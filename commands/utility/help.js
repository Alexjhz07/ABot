const fs = require('fs');
const { EmbedBuilder } = require("discord.js");
const paginationEmbed = require("../../utility/paginationEmbed");

let pages = [];

const loadDir = (dirs) => { // Load function for a directory
    const commandFiles = fs.readdirSync(`./commands/${dirs}`).filter(file => file.endsWith('.js'));

    const embed = new EmbedBuilder()
        .setColor(0xffffff)
        .setAuthor( { 
            name: 'Bond',
            iconURL: "https://cdn.discordapp.com/avatars/929927945626210326/61bf7c12deadea7434ae1817be5318db.webp",
            url: "https://bit.ly/BondSurprise"
        } )
        .setTitle(`Command Directory: ${dirs.toUpperCase()}`)
        .setTimestamp();

    let counter = 1;

    for (const file of commandFiles) { // Loads each file in a directory
        if (file == 'help.js') continue; // Skips help.js to avoid circular dependency

        const command = require(`../../commands/${dirs}/${file}`);

        if (++counter > 4) {
            counter = 0;
            embed.addFields({ name: '\u200B', value: '\u200B' },);
        }

        let commandBlock = {
            name: command.name,
            value: 
            `
            Aliases: ${command.aliases.length ? command.aliases.join(', ') : "None"}
            Permissions: ${command.permissions.length ? command.permissions.join(', ') : "Everyone"}
            Cooldown: ${command.cooldown} seconds
            Description: ${command.description}
            `, 
            inline: true
        }

        embed.addFields( commandBlock )
    }

    pages.push(embed);
}

['economy', 'recreation', 'stocks', 'utility'].forEach(e => loadDir(e));

module.exports = {
    name: 'help',
    aliases: ['h'],
    permissions: [],
    cooldown: 0,
    description: "Help command, sends commands to user dm.",
    execute(client, message, args, Discord, profileData) {
        message.channel.send('Commands have been sent to your direct messages.');
        paginationEmbed(message, pages, true);
    }
}