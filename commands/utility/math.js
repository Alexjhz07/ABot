const math = require('mathjs');

module.exports = {
    name: 'math',
    aliases: ['m'],
    permissions: [],
    cooldown: 0,
    description: "Evaluates a mathematical expression",
    execute(client, message, args, Discord, profileData) {
        if (!args.length) return message.channel.send('Error: Argument cannot be empty.');
        
        try {
            message.channel.send(String(math.evaluate(args.join(' '))));
        } catch (e) {
            message.channel.send("Error: Invalid equation format");
        }
    }
}