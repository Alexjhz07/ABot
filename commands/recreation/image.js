var Scraper = require('images-scraper');
require('dotenv').config();

const google = new Scraper({
    puppeteer: {
        headless: true
    }
});

module.exports = {
    name: 'image',
    aliases: ['i', 'img'],
    permissions: [],
    cooldown: 10,
    description: "Scrapes an image from Google",
    async execute(client, message, args, Discord, profileData) {
        // Checks for owner permission
        if (message.author.id != process.env.OWNER) return message.channel.send("Error: This command requires owner status");

        const imageQuery = args.join(' ');
        if (!imageQuery) return message.channel.send('Error: Argument cannot be empty.');

        // Tracks the time we first requested for the query, later used to notify us how long the command took to execute
        const timeStart = Date.now();

        let msgId;

        message.channel.send(`Searching for ${imageQuery}`).then(msg => {
            msgId = msg.id;
        });

        // Async scraper for google images, fed with our query
        await google.scrape(imageQuery, process.env.IMGDEPTH).then((imageResults) => {
            const timeEnd = Date.now();
            message.channel.send(`Successfully searched for "${imageQuery}".\n${process.env.IMGDEPTH} images searched.\nTime taken: ${((timeEnd - timeStart)/1000).toFixed(1)} seconds.`);
            message.channel.send(imageResults[Math.floor(Math.random() * imageResults.length)].url);
        }).catch((err) => {
            console.log(err);
            message.channel.send('Error: Either this command is already in use or an error has occurred.\nPlease try again later.');
        });
        
        message.channel.messages.delete(msgId);
    }
}