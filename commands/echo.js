module.exports = {
    name: 'echo',
    description: "Restates user arguments",
    execute(message, args){
        if(!args.length) {
            message.channel.send('Error: Argument cannot be empty.');
        } else {
            let msg = '';
            args.forEach(element => {
                msg += element;
                msg += " ";
            });
            message.channel.send(msg);
        }
    }
}