const profileModel = require('../../models/profileSchema');

module.exports = {
    name: 'updateall',
    aliases: [],
    permissions: [],
    cooldown: 0,
    description: 'Update the schema for all users in the database',
    async execute(client, message, args, Discord, profileData) {
        let filter = (m) => m.author.id === message.author.id;

        const msg_confirm = await message.channel.send(`Are you sure to update all data? \`YES\` / \`NO\`\n\`\`\`elm\nMake Sure You Have Backed Up The Data\`\`\``);
        const collector = msg_confirm.channel.createMessageCollector({filter, max: 3, time: 10000});

        collector.on('collect', (m) => {
            const res = m.content.toUpperCase();
            if (res == 'YES' || res == 'Y') {
                msg_confirm.reply("Update Confirmed");
                collector.stop(['complete']);
            } else if (res == 'NO' || res == 'N') {
                msg_confirm.reply("Update Cancelled");
                collector.stop(['complete']);
            } else {
                m.reply("Invalid Response");
            }
        });

        collector.on('end', (collected, reason) => {
            if (reason.includes('complete')) return;
            msg_confirm.reply("Update Status Expired");
        })
    }
}