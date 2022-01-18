module.exports = {
    name: 'shutdown',
    description: "Shuts down the bot",
    execute(client, message, args, Discord, isBotOwner) {
        if(!isBotOwner) {
            message.channel.send("Error: Insufficient permission");
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