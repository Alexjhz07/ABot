const profileModel = require('../../models/profileSchema');

module.exports = {
    name: 'assassinate',
    aliases: [],
    permissions: [],
    cooldown: 300,
    description: "Interactive command with mysterious properties...",
    async execute(client, message, args, Discord, profileData) {
        if(message.author.id != process.env.YOR) {
            return message.channel.send(`||Heh||`);
        }

        if(args.length != 1) {
            return message.channel.send(`||Invalid target specified!||`);
        }

        const userID = args[0].includes('<@!') ? args[0].replace('<@!', '').replace('>', '') : args[0].includes('<@') ? args[0].replace('<@', '').replace('>', '') : '';
        const receiver = message.guild.members.cache.get(userID);

        if(!receiver) {
            return message.channel.send(`||You tried looking for a target but found none...||`);
        }

        if(message.author == receiver.user) {
            return message.channel.send(`||...That would be dangerous||`);
        }
        
        const receiverAcc = await profileModel.findOne(
            {
                userID: receiver.id
            }
        )

        if(!receiverAcc) {
            return message.channel.send(`Error: Cannot locate database account for ${receiver.user.username}.\nNote that bots and inactive users will not have a database account.`);
        }
        
        let rng = Math.floor(Math.random() * 6); //[0, 5]
        let amount = Math.floor(Math.random() * 14) + 2; //[2, 15]

        let msg = '';

        async function updateStates(uGet, rGet, pSucceed) {
            try {
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
            } catch(err) {
                return console.log(err);
            }
        }

        switch(rng) {
            case 0:
                updateStates(amount, -amount, true);
                msg += `||Hiya! You've successfully downed ${receiver.user.username} and gotten away with ${amount} of their peanuts.\nIt seems like they're still alive though, as you can hear distant sounds of malding.||`;
                break;
            case 1:
                updateStates(0, 0, false);
                msg += `||As you sneak behind ${receiver.user.username} with your blade,\nthey suddenly turn around and you're forced to retreat before they spot you...\nPerhaps their demise can be delayed for another day.||`;
                break;
            case 2:
                updateStates(-amount, amount, false);
                msg += `||Urgh... What happened? ${receiver.user.username} seemed so vulnerable when they were on that bench.\nYet, not a second after you got behind them, you're knocked out cold and ${amount} peanuts have gone missing from your pockets.\nBetter be more cautious next time.||`;
                break;
            case 3:
                updateStates(amount, -amount, true);
                msg += `||Swimming around in the alleyway shadows, you slowly snake your way towards ${receiver.user.username}.\nWhen they pass your alleyway, you jump out and grab them.\n${receiver.user.username} wakes up an hour later, a little light headed and ${amount} peanuts poorer.||`;
                break;
            case 4:
                updateStates(amount, -amount, true);
                msg += `||***BAM!!!***\n${receiver.user.username} is knocked out cold thanks to your legendary air hammer.\nYou're quick to locate ${amount} peanuts in their back pocket and run off.||`;
                break;
            default:
                updateStates(5 * amount, 5 * amount, false);
                msg += `||Just as you swing your blade at ${receiver.user.username}, a bag of ${amount * 10} coins falls from the sky onto your blade and gets cut in half.\nThe two of you awkwardly stare at your blade, still frozen in the air.\nEventually, you both decide to take ${amount * 5} coins and forget about the whole situation.||`;
        }
        
        message.channel.send(msg);
    }
}