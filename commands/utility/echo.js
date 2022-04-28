module.exports = {
    name: 'echo',
    aliases: [],
    permissions: [],
    cooldown: 5,
    description: "Restates user arguments",
    execute(client, message, args, Discord, profileData) {
        if (!args.length) return message.channel.send('Error: Argument cannot be empty.');
            
        message.channel.send(args.join(' '));
    }
}