const fs = require('fs');

module.exports = (client, Discord) => {
    const loadDir = (dirs) => { // Loading function
        // Filters out non .js files
        const commandFiles = fs.readdirSync(`./commands/${dirs}`).filter(file => file.endsWith('.js'));

        // Add all events to command collection
        for (const file of commandFiles) {
            const command = require(`../commands/${dirs}/${file}`);
            if (command.name) {
                client.commands.set(command.name, command);
            } else {
                continue;
            }
        }
    }

    ['economy', 'owner', 'recreation', 'special', 'stocks', 'testing', 'utility'].forEach(e => loadDir(e));
}