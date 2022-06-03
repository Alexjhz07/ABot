const fs = require('fs');

module.exports = (client, Discord) => {
    const loadDir = (dirs) => { // Loading function
        // Filters out non .js files
        const eventFiles = fs.readdirSync(`./events/${dirs}`).filter(file => file.endsWith('.js'));

        // Bind all events in folder
        for (const file of eventFiles) {
            const event = require(`../events/${dirs}/${file}`);
            const eventName = file.split('.')[0];
            client.on(eventName, event.bind(null, client, Discord));
        }
    }

    // Iterates through folders
    ['client', 'guild'].forEach(e => loadDir(e));
}