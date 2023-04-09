const profileModel = require('../../models/profileSchema');
const databaseModel = require('../../models/databaseSchema');

module.exports = {
    name: 'updateall',
    aliases: [],
    permissions: [],
    cooldown: 0,
    description: 'Update the schema for all users in the database',
    async execute(client, message, args, Discord, profileData) {
        if (message.author.id != process.env.OWNER) return message.channel.send("Error: This command requires owner status");

        let filter = (m) => m.author.id === message.author.id;

        const msg_confirm = await message.channel.send(`Are you sure to update all data? \`YES\` / \`NO\`\n\`\`\`elm\nMake Sure You Have Backed Up The Data\`\`\``);
        const collector = msg_confirm.channel.createMessageCollector({filter, max: 3, time: 10000});

        collector.on('collect', (m) => {
            const res = m.content.toUpperCase();
            if (res == 'YES' || res == 'Y') {
                msg_confirm.reply("Update Confirmed");
                collector.stop(['complete']);
                updateAll();
            } else if (res == 'NO' || res == 'N') {
                msg_confirm.reply("Update Cancelled");
                collector.stop(['complete']);
            } else {
                m.reply("Invalid Response");
            }
        });

        async function updateAll() {
            await databaseModel.find()
                .then((db) => {
                    users = db[0].userids;
                    for (i  = 0; i < users.length; i++) {
                        updateUser(users[i])
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }

        async function updateUser(uid) {
            const user = await profileModel.findOne({ userID: uid });
            message.guild.members.fetch(uid)
                .then((member) => {
                    console.log(`Updating ${uid}`);
                    user.discord.nickname = (member.displayName == member.user.username) ? member.user.username : member.displayName;
                    console.log(user.discord.nickname);
                    user.discord.discriminator = member.user.discriminator;
                    user.discord.avatarURL = member.user.avatarURL() || 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png';
                    console.log(user.discord.avatarURL);
                    user.save();
                })
                .catch((e) => {
                    console.log(`User ${uid} not found`);
                });
        }

        collector.on('end', (collected, reason) => {
            if (reason.includes('complete')) return;
            msg_confirm.reply("Update Status Expired");
        })
    }
}