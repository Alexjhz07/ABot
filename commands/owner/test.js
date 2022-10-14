const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: 'test',
    aliases: [],
    permissions: [],
    cooldown: 0,
    description: "Command For Feature Testing",
    execute(client, message, args, Discord, profileData) {
        
        // 2022-10-06 
        // Title: Embed Builder Testing
        // Objective: Understand how to format embeds in Discord.js v14

        const embed = new EmbedBuilder()
            .setAuthor({ name: "Phil Swift" , iconURL: "https://i.imgur.com/AfFp7pu.png", url: "https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwi5rNa6-Mz6AhXrMDQIHSOgDwUQwqsBegQICRAB&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DdQw4w9WgXcQ&usg=AOvVaw0aHtehaphMhOCAkCydRLZU"})
            .setTitle("Vacuum")
            .setDescription("Now with 40% extra power");
        
        message.channel.send({ embeds: [embed] });
        
    }
}