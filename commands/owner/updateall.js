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
            await profileModel.find()
                .then((users) => {
                    let a = [];
                    for (i  = 0; i < users.length; i++) {
                        // let member = message.guild.members.cache.get(users[i].userID);
                        a[i] = users[i].userID;
                    }
                    dataCreate(a);
                })
                .catch((e) => {
                    console.log(e);
                });
        }

        async function dataCreate(a) {
            data = await databaseModel.create({
                totalusers: a.length,
                userids: a
            });
            await data.save();
        }

        collector.on('end', (collected, reason) => {
            if (reason.includes('complete')) return;
            msg_confirm.reply("Update Status Expired");
        })
    }
}