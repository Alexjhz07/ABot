const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fetch = require("cross-fetch");

module.exports = {
    name: 'quote',
    aliases: ['q', 'wallstreet', 'ws'],
    permissions: [],
    cooldown: 1,
    description: "Checks a stock. Argument: stock_symbol",
    async execute(client, message, args, Discord, profileData) {
        if (args.length != 1) return message.channel.send('Quote can only accept 1 stock symbol as its argument');
        
        let requestSymbol =  args[0].toUpperCase();
        let currentPrice;

        try { // Scrape Yahoo Finance with the given symbol
            const response = await fetch(`https://ca.finance.yahoo.com/quote/${requestSymbol}`);
            const text = await response.text();
            const dom = new JSDOM(text);
            const parent = dom.window.document.querySelector("#quote-header-info");
            const child = parent.querySelector('fin-streamer[data-field="regularMarketPrice"]');
            currentPrice = parseFloat(child.textContent.replace(/,/g, '')).toFixed(2);
        } catch (e) {
            console.log(e);
            return message.channel.send(`Error while searching for stock ${requestSymbol}`);
        }

        // Check if price exists
        if (currentPrice == "" || isNaN(currentPrice)) return message.channel.send(`Error while searching for stock ${requestSymbol}`);

        let userShares = 0;
        let userPrice = "No data";

        // Fetch database info for user
        profileData.stocks.owned.some(e => {
            if (e.symbol == requestSymbol) {
                userShares = e.shares;
                userPrice = e.buyPrice;
                return true;
            }
        });

        return message.channel.send(`Current price for ${requestSymbol}: ${currentPrice}\nMost recent buy price: ${userPrice}\nYour shares: ${userShares}`);
    }
}