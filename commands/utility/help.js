const fs = require('fs');

let msg = '**=== COMMANDS LIST ===**\n\n';

const loadDir = (dirs) => { // Load function for a directory
    const commandFiles = fs.readdirSync(`./commands/${dirs}`).filter(file => file.endsWith('.js'));

    msg += `***${dirs.toUpperCase()}***\n\n`;

    for (const file of commandFiles) { // Loads each file in a directory
        if (file == 'help.js') continue; // Skips help.js to avoid circular dependency

        const command = require(`../../commands/${dirs}/${file}`);
        msg += `Command Name: ${command.name}\n`;

        if (command.aliases.length) msg += `Aliases: ${command.aliases.join(', ')}\n`;
        if (command.permissions.length) msg += `Permissions: ${command.permissions.join(', ')}\n`;
        msg += `Description: ${command.description}\nCooldown: ${command.cooldown} seconds\n\n`
    }
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

        if (msg.length >= 2000) { // Safeguard against long messages
            return message.channel.send('Message is too long, please tell Alex to fix this')
        }

        client.users.cache.get(message.author.id).send(msg);
    }
}