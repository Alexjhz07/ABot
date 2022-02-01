require('dotenv').config();

module.exports = {
    name: 'restart',
    aliases: [],
    permissions: [],
    cooldown: 1,
    description: "Restarts Bot",
    execute(client, message, args, Discord, profileData) {
        if(message.author.id != process.env.OWNER) {
            message.channel.send("Error: This command requires owner status");
            return;
        } else {
            message.channel.send('Restarting...').then(m => {
                client.destroy();
                client.login(process.env.TOKEN);
                message.channel.send('Restart Success');
            }); 
        }
    }
}