const profileModel = require('../../models/profileSchema');

module.exports = {
    name: 'worf',
    aliases: ['ask', 'woof'],
    permissions: [],
    cooldown: 5,
    description: "Utilize Bond's predictive powers!",
    async execute(client, message, args, Discord, profileData) {
        if(!args.length) {
            return message.channel.send(`You must specify a question for Bond!`);
        }

        const responses = [
            "It is certain.",
            "It is decidedly so.",
            "Without a doubt.",
            "Yes definitely.",
            "You may rely on it.",
            "As I see it, yes.",
            "Most likely.",
            "Outlook good.",
            "Yes.",
            "Signs point to yes.",
            "Reply hazy, try again.",
            "Ask again later.",
            "Better not tell you now.",
            "Cannot predict now.",
            "Concentrate and ask again.",
            "Don't count on it.",
            "My reply is no.",
            "My sources say no.",
            "Outlook not so good.",
            "Very doubtful."
        ]
        
        let rng = Math.floor(Math.random() * responses.length); //[0, 20]

        message.channel.send(responses[rng]);
    }
}