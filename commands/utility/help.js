const fs = require('fs');

let msg = '**=== COMMANDS LIST ===**\n\n';

const loadDir = (dirs) => {
    const commandFiles = fs.readdirSync(`./commands/${dirs}`).filter(file => file.endsWith('.js'));

    msg += `***${dirs.toUpperCase()}***\n\n`;

    for (const file of commandFiles) {
        if (file == 'help.js') continue;

        const command = require(`../../commands/${dirs}/${file}`);
        msg += `Command Name: ${command.name}\n`;

        if (command.aliases.length) msg += `Aliases: ${command.aliases.join(', ')}\n`;
        if (command.permissions.length) msg += `Permissions: ${command.permissions.join(', ')}\n`;
        msg += `Description: ${command.description}\nCooldown: ${command.cooldown} seconds\n\n`
    }
}

['economy', 'recreation', 'utility'].forEach(e => loadDir(e));

module.exports = {
    name: 'help',
    aliases: ['h'],
    permissions: [],
    cooldown: 0,
    description: "Help command, sends commands to user dm.",
    execute(client, message, args, Discord, profileData) {
        message.channel.send('Commands have been sent to your direct messages.');
        client.users.cache.get(message.author.id).send(msg);
    }
}