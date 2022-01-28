const profileModel = require('../../models/profileSchema');

module.exports = {
    name: 'poke',
    aliases: [],
    permissions: [],
    cooldown: 5,
    description: "Interactive command with mysterious properties...",
    async execute(client, message, args, Discord, profileData) {
        if(args.length != 1) {
            return message.channel.send(`||Poke must have one target!||`);
        }

        const userID = args[0].includes('<@!') ? args[0].replace('<@!', '').replace('>', '') : args[0].includes('<@') ? args[0].replace('<@', '').replace('>', '') : '';
        const receiver = message.guild.members.cache.get(userID);

        if(!receiver) {
            return message.channel.send(`||You must poke someone on the server||`);
        }

        if(message.author == receiver.user) {
            return message.channel.send(`||Silly peanut, you can't poke yourself!||`);
        }
        
        let rng = Math.floor(Math.random() * 100) + 1; //[1, 100]
        let amount = Math.floor(Math.random() * 9) + 2; //[2, 10]

        if(!profileData) {
            return message.channel.send('Error: Cannot locate your account. Please try again');
        }
        
        const receiverAcc = await profileModel.findOne(
            {
                userID: receiver.id
            }
        )

        if(!receiverAcc) {
            return message.channel.send(`Error: Cannot locate database account for ${receiver.user.username}.\nNote that bots and inactive users will not have a database account.`);
        }

        if(rng <= 10) {
            if(receiverAcc.coins - amount >= 0) {
                try {
                    receiverAcc.coins -= amount;
                    profileData.coins += amount;
                    profileData.stats.pokeSucceed++;
                    receiverAcc.save();
                    profileData.save();
                } catch(err) {
                    console.log(err);
                    return message.channel.send(`Error: Something unexpected occurred during this interaction from ${message.author.username} to ${receiver.user.username}`);
                }
                message.channel.send(`||${receiver.user.username} lets down their guard...\nYou successfully sneak away with ${amount} peanuts at their expense!||`);
            } else {
                try {
                    receiverAcc.coins += amount;
                    profileData.coins += amount;
                    profileData.stats.pokeFail++;
                    receiverAcc.save();
                    profileData.save();
                } catch(err) {
                    console.log(err);
                    return message.channel.send(`Error: Something unexpected occurred during this interaction from ${message.author.username} to ${receiver.user.username}`);
                }
                message.channel.send(`||You approach ${receiver.user.username} to poke them, but you both get hit by some peanuts falling from the sky!\n${amount} peanuts were found beside each of you after the strange incident.||`);
            }
        } else if(rng <= 20) {
            if(profileData.coins - amount >= 0) {
                try {
                    profileData.bank += amount;
                    profileData.coins -= amount;
                    profileData.stats.pokeFail++;
                    profileData.save();
                } catch(err) {
                    console.log(err);
                    return message.channel.send(`Error: Something unexpected occurred while editing your database account`);
                }
                message.channel.send(`||As you're approaching ${receiver.user.username}, you feel something move in your pockets.\n${amount} peanuts have gone missing... A bank deposit receipt sits in its place.||`);
            } else {
                try {
                    profileData.coins += amount;
                    profileData.stats.pokeFail++;
                    profileData.save();
                } catch(err) {
                    console.log(err);
                    return message.channel.send(`Error: Something unexpected occurred while editing your database account`);
                }
                message.channel.send(`||Some shimmering objects fall from the sky as you approach ${receiver.user.username}.\nYou manage to evade ${amount} peanuts and pick them up after.\nWhat a weird event!||`);
            }
        } else if(rng <= 30) {
            if(profileData.coins - amount >= 0) {
                try {
                    profileData.coins -= amount;
                    profileData.stats.pokeFail++;
                    profileData.save();
                } catch(err) {
                    console.log(err);
                    return message.channel.send(`Error: Something unexpected occurred while editing your database account`);
                }
                message.channel.send(`||Right as you're about to poke ${receiver.user.username}, a metallic sound rings out behind you.\nA hole in your pocket has allowed ${amount} peanuts to drop out!\nPerhaps Karma exists after all...||`);
            } else {
                try {
                    profileData.stats.pokeFail++;
                    profileData.save();
                } catch(err) {
                    console.log(err);
                    return message.channel.send(`Error: Something unexpected occurred while editing your database account`);
                }
                message.channel.send(`||The Poke Police make their way around a corner just as you close in on ${receiver.user.username}.\nYou manage to evade detection but boy was that close...\nToday doesn't seem like a very safe day for poking.||`);
            }
        } else if(rng <= 40) {
            try {
                profileData.stats.pokeSucceed++;
                profileData.save();
            } catch(err) {
                console.log(err);
                return message.channel.send(`Error: Something unexpected occurred while editing your database account`);
            }
            message.channel.send(`||You successfully poke ${receiver.user.username} and sneak away unnoticed...\nOh what a sly fox you are!||`);
        } else if(rng <= 50) {
            try {
                profileData.stats.pokeSucceed++;
                profileData.save();
            } catch(err) {
                console.log(err);
                return message.channel.send(`Error: Something unexpected occurred while editing your database account`);
            }
            message.channel.send(`||${receiver.user.username} does not notice as you sneak behind them and give them a little love tap on the shoulder.\nSeems like all that training has paid off!||`);
        } else if(rng <= 60) {
            try {
                profileData.stats.pokeSucceed++;
                profileData.save();
            } catch(err) {
                console.log(err);
                return message.channel.send(`Error: Something unexpected occurred while editing your database account`);
            }
            message.channel.send(`||Blending into a nearby crowd, you successfully poke ${receiver.user.username} on their shoulder as you pass by.\nThe look of confusion on their face as they searched for the culprit is everything you were looking for.||`);
        } else if(rng <= 70) {
            try {
                profileData.stats.pokeFail++;
                profileData.save();
            } catch(err) {
                console.log(err);
                return message.channel.send(`Error: Something unexpected occurred while editing your database account`);
            }
            message.channel.send(`||Years of training has led up to this moment.\nYou're weaving between people, hiding in the shadows.\nUnfortunately, ${receiver.user.username} notices you are you're forced to interact with them like a normal person.||`);
        } else if(rng <= 80) {
            try {
                profileData.stats.pokeFail++;
                profileData.save();
            } catch(err) {
                console.log(err);
                return message.channel.send(`Error: Something unexpected occurred while editing your database account`);
            }
            message.channel.send(`||The sweet scent of baked goods catches you off guard.\nYou follow the aroma to a local bakery.\nUnfortunately, they've just sold out and ${receiver.user.username} is gone when you turn around as well.||`);
        } else if(rng <= 90) {
            try {
                profileData.stats.pokeSucceed++;
                profileData.save();
            } catch(err) {
                console.log(err);
                return message.channel.send(`Error: Something unexpected occurred while editing your database account`);
            }
            message.channel.send(`||${receiver.user.username} is on their phone again, not paying attention to their suroundings.\nYou find an opportunity to sneak by and poke them in the back.\nIt's unfortunate that they were too preoccupied to even notice.||`);
        } else {
            try {
                profileData.stats.pokeFail++;
                profileData.save();
            } catch(err) {
                console.log(err);
                return message.channel.send(`Error: Something unexpected occurred while editing your database account`);
            }
            message.channel.send(`||You turn to look for ${receiver.user.username}, but a gust of wind passes by and woosh! They're gone!?||`);
        }

        try {
            receiverAcc.stats.beenPoked++;
            receiverAcc.save();
        } catch(err) {
            console.log(err);
            return message.channel.send(`Error: Something unexpected occurred during this interaction from ${message.author.username} to ${receiver.user.username}`);
        }
    }
}