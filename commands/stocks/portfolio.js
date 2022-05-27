const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fetch = require("cross-fetch");

module.exports = {
    name: 'portfolio',
    aliases: ['p'],
    permissions: [],
    cooldown: 1,
    description: "Displays your portfolio. Use ';p full' to include the current prices.",
    async execute(client, message, args, Discord, profileData) {
        if (args.length > 1) return message.channel.send('Error, portfolio only accepts 0 or 1 arguments.\nUse "full" as the argument to include the current prices. (Will take longer to return)');
        
        let full = false; 
        if (args[0]) {
            full = args[0].toUpperCase() == "FULL" ? true : false;
        }        

        if (profileData.stocks.owned.length > 0) {
            var msg = `**Portfolio of ${message.author.username}**\n`
            let currentPrice;

            for (const e of profileData.stocks.owned) {
                msg += `\n${e.symbol}\nShares: ${e.shares}\n`
                if (full) {
                    try {
                        const response = await fetch(`https://ca.finance.yahoo.com/quote/${e.symbol}`);
                        const text = await response.text();
                        const dom = new JSDOM(text);
                        const parent = dom.window.document.querySelector("#quote-header-info");
                        const child = parent.querySelector('fin-streamer[data-field="regularMarketPrice"]');
                        currentPrice = parseFloat(child.textContent.replace(/,/g, '')).toFixed(2);
                    } catch (e) {
                        console.log(e);
                        currentPrice = "Error";
                    }

                    msg += `Current Price: ${currentPrice}\n`;
                }
                msg += `Recent Buy Price: ${e.buyPrice.toFixed(2)}\nTotal Invested: ${e.invested.toFixed(2)}\nTotal Returned: ${e.returned.toFixed(2)}\n`;
            }
            
            if (msg.length >= 2000) {
                return message.channel.send('Your portfolio is huge! Please tell Alex to stop being lazy and find a way to display your portfolio');
            } else {
                message.channel.send('Your portfolio has been sent to your direct messages');
                return client.users.cache.get(message.author.id).send(msg);
            }
        } else {
            return message.channel.send(`Empty portfolio`);
        }
    }
}