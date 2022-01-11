module.exports = {
    name: 'echo',
    description: "Restates user arguments",
    execute(message, args){
        message.channel.send(message);
    }
}