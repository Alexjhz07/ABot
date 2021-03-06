const DAILY = 60;
const WEEKLY = 180;
const MONTHLY = 800;

module.exports = {
    name: 'daily',
    aliases: ['weekly','monthly'],
    permissions: [],
    cooldown: 0,
    description: 'A periodic income for the user',
    async execute(client, message, args, Discord, profileData) {
        const currentTime = Date.now();
        let msg = message.content.substring(1, 6);

        // Controls daily, weekly, & monthly.
        // Checks cooldown stored in user database profile before providing peanuts
        if (msg.includes('daily')) {
            if (currentTime >= profileData.stats.dailyNext || !profileData.stats.dailyNext) {
                profileData.coins += DAILY;
                profileData.stats.dailyNext = currentTime + 86400000;
                await profileData.save();
                message.channel.send(`Successfully collected ${DAILY} peanuts from daily.\nYou now have ${profileData.coins.toFixed(2)} peanuts in your wallet.`);
            } else {
                message.channel.send(`Your next daily will be in ${((profileData.stats.dailyNext - currentTime) / (1000 * 3600)).toFixed(1)} hours.`);
            }
        } else if (msg.includes('weekl')) {
            if (currentTime >= profileData.stats.weeklyNext || !profileData.stats.weeklyNext) {
                profileData.coins += WEEKLY;
                profileData.stats.weeklyNext = currentTime + 86400000 * 7;
                await profileData.save();
                message.channel.send(`Successfully collected ${WEEKLY} peanuts from weekly.\nYou now have ${profileData.coins.toFixed(2)} peanuts in your wallet.`);
            } else {
                message.channel.send(`Your next weekly will be in ${((profileData.stats.weeklyNext - currentTime) / (1000 * 3600 * 24)).toFixed(1)} days.`);
            }
        } else if (msg.includes('month')) {
            if (currentTime >= profileData.stats.monthlyNext || !profileData.stats.monthlyNext) {
                profileData.coins += MONTHLY;
                profileData.stats.monthlyNext = currentTime + 86400000 * 30;
                await profileData.save();
                message.channel.send(`Successfully collected ${MONTHLY} peanuts from monthly.\nYou now have ${profileData.coins.toFixed(2)} peanuts in your wallet.`);
            } else {
                message.channel.send(`Your next monthly will be in ${((profileData.stats.monthlyNext - currentTime) / (1000 * 3600 * 24)).toFixed(1)} days.`);
            }
        }
    }
}