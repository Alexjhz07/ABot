module.exports = {
    name: 'checkroles',
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    cooldown: 5,
    description: "Does something based on role of user",
    execute(client, message, args, Discord, profileData) {
        if(message.member.roles.cache.has('929930420718547004')) {
            message.channel.send('This is JHZDEV');
        } else {
            message.channel.send('No special interactions');
        }
    }
}