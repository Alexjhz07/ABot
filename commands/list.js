module.exports = {
    name: 'list',
    aliases: [],
    permissions: [],
    cooldown: 5,
    description: 'Outputs data requested by user',
    execute(client, message, args, Discord, profileData) {
        if(!args.length) {
            message.channel.send('Error: Argument cannot be empty');
        } else {
            msg = "";

            args.forEach(element => {
                switch (element) {
                    case 'selfid': {
                        msg += message.author.id;
                        break;
                    }
                    case 'channelid': {
                        msg += message.channel.id;
                        break;
                    }
                    default: {
                        msg += 'undefined';
                    }
                }
                msg += " ";
            });

            message.channel.send(msg);
        }
    }
}