module.exports = {
    name: 'checkroles',
    description: "Does something based on role of user",
    execute(message, args){
        if(message.member.roles.cache.has('929930420718547004')) {
            message.channel.send('This is JHZDEV');
        } else {
            message.channel.send('No special interactions');
        }
    }
}