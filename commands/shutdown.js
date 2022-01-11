module.exports = {
    name: 'shutdown',
    description: "Shuts down the bot",
    execute(message, args, client){
        message.channel.send('Shutting Down...').then(m => {
            client.destroy();
            console.log("Shutdown success");
            process.exit();
        })
    }
}