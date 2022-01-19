require('dotenv').config();

module.exports = {
    name: 'shutdown',
    aliases: [],
    permissions: [],
    cooldown: 1,
    description: "Shuts down the bot",
    execute(client, message, args, Discord, profileData) {
        if(message.author.id != process.env.OWNER) {
            message.channel.send("Error: This command requires owner status");
            return;
        } else {
            message.channel.send('Shutting Down...').then(m => {
                client.destroy();
                console.log("Shutdown success");
                process.exit();
            });
        }
    }
}