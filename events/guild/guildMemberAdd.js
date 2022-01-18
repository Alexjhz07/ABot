const generateImage = require("../../utility/generateImage");
const profileModel = require('../../models/profileSchema');
require('dotenv').config();
const BOTCHNL = process.env.BOTCHNL;

module.exports = async (client, Discord, member) => {
    const img = await generateImage(member);
    member.guild.channels.cache.get(BOTCHNL).send({
        content: `<@${member.id}> Welcome to the server`,
        files: [img]
    });

    try {
        profileData = await profileModel.findOne({ userID: member.id })

        if(!profileData) {
            let profile = await profileModel.create({
                userID: member.id,
                serverID: member.guild.id,
                coins: 1000,
                bank: 0
            });
            profile.save();
        }
    } catch(err) {
        console.log(err);
    }
}