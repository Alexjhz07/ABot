const generateImage = require("../../utility/generateImage");
const profileModel = require('../../models/profileSchema');
require('dotenv').config();
const BOTCHNL = process.env.BOTCHNL;

module.exports = async (client, Discord, member) => {
    const img = await generateImage(member);
    const currentTime = Date.now();
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
                coins: 0,
                bank: 0,
                stats: {
                    exp: 0,
                    expNext: currentTime,
                    dailyNext: currentTime,
                    monthlyNext: currentTime,
                    stonksUsed: 0,
                    stonksReceived: 0,
                    flipsWon: 0,
                    flipsLost: 0,
                    pokeSucceed: 0,
                    pokeFail: 0,
                    beenPoked: 0,
                    worfAsked: 0
                }
            });
            profile.save();
        }
    } catch(err) {
        console.log(err);
    }
}