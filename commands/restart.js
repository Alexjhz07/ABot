require('dotenv').config();
const TOKEN = process.env.TOKEN;

module.exports = {
    name: 'restart',
    description: "Restarts Bot",
    execute(client, message, args, Discord, isBotOwner) {
        if(!isBotOwner) {
            message.channel.send("Error: Insufficient permission");
            return;
        } else {
            message.channel.send('Restarting...').then(m => {
                client.destroy()
                client.login(TOKEN);
                message.channel.send('Restart Success');
            }); 
        }
    }
}