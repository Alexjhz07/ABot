/**
 * Client Event - Ready
 * Broadcasted when client initially connects through Discord API
 */

const {ActivityType} = require("discord.js");

module.exports = (client) => {
    console.log(`ABot is Online, logged in as ${client.user.tag}`);
    
    client.user.setActivity("Catching Baddies", {
        type: ActivityType.Competing
      });
}