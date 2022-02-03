const DAILY = 60;
const MONTHLY = 600;

module.exports = {
    name: 'daily',
    aliases: ['monthly'],
    permissions: [],
    cooldown: 5,
    description: 'A periodic income for the user',
    async execute(client, message, args, Discord, profileData) {
        const currentTime = Date.now();
        let msg = message.content.substring(1, 6);

        if(msg.includes('daily')) {
            if(currentTime >= profileData.stats.dailyNext || !profileData.stats.dailyNext) {
                try {
                    profileData.coins += DAILY;
                    profileData.stats.dailyNext = currentTime + 86400000;
                    await profileData.save();
                    message.channel.send(`Successfully collected ${DAILY} peanuts from daily.\nYou now have ${profileData.coins} peanuts in your wallet.`);
                } catch(err) {
                    return console.log(err);
                }
            } else {
                message.channel.send(`Your next daily will be in ${((profileData.stats.dailyNext - currentTime) / (1000 * 3600)).toFixed(1)} hours.`);
            }
        } else if(msg.includes('month')) {
            if(currentTime >= profileData.stats.monthlyNext || !profileData.stats.monthlyNext) {
                try {
                    profileData.coins += MONTHLY;
                    profileData.stats.monthlyNext = currentTime + 86400000 * 30;
                    await profileData.save();
                    message.channel.send(`Successfully collected ${MONTHLY} peanuts from monthly.\nYou now have ${profileData.coins} peanuts in your wallet.`);
                } catch(err) {
                    return console.log(err);
                }
            } else {
                message.channel.send(`Your next monthly will be in ${((profileData.stats.monthlyNext - currentTime) / (1000 * 3600 * 24)).toFixed(1)} days.`);
            }
        }
    }
}