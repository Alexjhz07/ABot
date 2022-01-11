module.exports = {
    name: 'restart',
    description: "Restarts Bot",
    execute(message, args, client, TOKEN){
        message.channel.send('Restarting...').then(m => {
            client.destroy()
            client.login(TOKEN);
            message.channel.send('Restart Success');
        }); 
    }
}