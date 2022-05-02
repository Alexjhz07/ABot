const profileModel = require('../../models/profileSchema');

module.exports = {
    name: 'poke',
    aliases: [],
    permissions: [],
    cooldown: 5,
    description: "Interactive command with mysterious properties...",
    async execute(client, message, args, Discord, profileData) {
        if (args.length != 1) return message.channel.send(`||Poke must have one target!||`);

        const userID = args[0].includes('<@!') ? args[0].replace('<@!', '').replace('>', '') : args[0].includes('<@') ? args[0].replace('<@', '').replace('>', '') : '';
        const receiver = message.guild.members.cache.get(userID);

        if (!receiver) return message.channel.send(`||You must poke someone on the server||`);
        if (message.author == receiver.user) return message.channel.send(`||Silly peanut, you can't poke yourself!||`);
        
        const receiverAcc = await profileModel.findOne(
            {
                userID: receiver.id
            }
        )

        if (!receiverAcc) return message.channel.send(`Error: Cannot locate database account for ${receiver.user.username}.\nNote that bots and inactive users will not have a database account.`);
        
        let rng = Math.floor(Math.random() * 15); //[0, 14]
        let amount = Math.floor(Math.random() * 14) + 2; //[2, 15]
        let msg = '';

        async function updateStates(uGet, rGet, pSucceed) {
            profileData.coins += uGet;
            receiverAcc.coins += rGet;

            if(pSucceed) {
                profileData.stats.pokeSucceed++;
            } else {
                profileData.stats.pokeFail++;                    
            }

            receiverAcc.stats.beenPoked++;
            await profileData.save();
            await receiverAcc.save();
        }

        switch(rng) {
            case 0:
                updateStates(amount, -amount, true);
                msg += `||${receiver.user.username} lets down their guard...\nYou successfully sneak away with ${amount} peanuts at their expense!||`;
                break;
            case 1:
                updateStates(amount, amount, false);
                msg += `||You approach ${receiver.user.username} to poke them, but you both get hit by some peanuts falling from the sky!\n${amount} peanuts were found beside each of you after the strange incident.||`;
                break;
            case 2:
                updateStates(-amount, 0, false);
                msg += `||As you're approaching ${receiver.user.username}, you feel something move in your pockets.\n${amount} peanuts have gone missing... Now where could they have gone?||`;
                break;
            case 3:
                updateStates(amount, 0, false);
                msg += `||Some shimmering objects fall from the sky as you approach ${receiver.user.username}.\nYou manage to evade ${amount} peanuts and pick them up after.\nWhat a weird event!||`;
                break;
            case 4:
                updateStates(-amount, 0, false);
                msg += `||Right as you're about to poke ${receiver.user.username}, a metallic sound rings out behind you.\nA hole in your pocket has allowed ${amount} peanuts to drop out!\nPerhaps Karma exists after all...||`;
                break;
            case 5:
                updateStates(0, 0, false);
                msg += `||The Poke Police make their way around a corner just as you close in on ${receiver.user.username}.\nYou manage to evade detection but boy was that close...\nToday doesn't seem like a very safe day for poking.||`;
                break;
            case 6:
                updateStates(0, 0, true);
                msg += `||You successfully poke ${receiver.user.username} and sneak away unnoticed...\nOh what a sly fox you are!||`;
                break;
            case 7:
                updateStates(0, 0, true);
                msg += `||${receiver.user.username} does not notice as you sneak behind them and give them a little love tap on the shoulder.\nSeems like all that training has paid off!||`;
                break;
            case 8:
                updateStates(0, 0, true);
                msg += `||Blending into a nearby crowd, you successfully poke ${receiver.user.username} on their shoulder as you pass by.\nThe look of confusion on their face as they searched for the culprit is everything you were looking for.||`;
                break;
            case 9:
                updateStates(0, 0, false);
                msg += `||Years of training has led up to this moment.\nYou're weaving between people, hiding in the shadows.\nUnfortunately, ${receiver.user.username} notices you are you're forced to interact with them like a normal person.||`;
                break;
            case 10:
                updateStates(0, 0, false);
                msg += `||The sweet scent of baked goods catches you off guard.\nYou're lured by the aroma to a local bakery.\nUnfortunately, they've just sold out and ${receiver.user.username} is gone when you turn around as well.||`;
                break;
            case 11:
                updateStates(0, 0, true);
                msg += `||${receiver.user.username} is on their phone again, not paying attention to their suroundings.\nYou find an opportunity to sneak by and poke them in the back.\nIt's unfortunate that they were too preoccupied to even notice.||`;
                break;
            case 12:
                updateStates(-amount, amount, false);
                msg += `||You go in for the attack, but ${receiver.user.username} is too quick!\nBefore you know it, you're on the ground at their mercy.\nYou're forced to bribe them with ${amount} peanuts to let you go.||`;
                break;
            case 13:
                updateStates(amount, -amount, true);
                msg += `||${receiver.user.username} is making their way downtown, when you come out of nowhere and give them a solid poke!\nStartled, they flail around and ${amount} peanuts fall out the pockets onto the ground before they run away.\nYou, being the kind person you are, pick the peanuts up afterwards... and keep them.||`;
                break;
            case 14:
                updateStates(amount, 0, true);
                msg += `||Swimming through the shadows like a fish in water, you quickly approach ${receiver.user.username} and complete your mission!\nOn your escape route, you find a small bag containing ${amount} peanuts in an alleyway.\,Finders keepers!||`;
                break;
            default:
                updateStates(0, 0, false);
                msg += `||You turn to look for ${receiver.user.username}, but a gust of wind passes by and woosh! They're gone!?||`;
        }
        
        message.channel.send(msg);
    }
}