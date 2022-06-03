const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fetch = require("cross-fetch");

module.exports = {
    name: 'buy',
    aliases: ['invest', 'sell', 'liquidate'],
    permissions: [],
    cooldown: 1,
    description: "Invest your peanuts! Arguments { stock_symbol, shares_amount }",
    async execute(client, message, args, Discord, profileData) {
        const [head, ...rest] = args;
        let msg = message.content.substring(1, 4);

        if (args.length != 2) return message.channel.send('Incorrect use of buy.\n;command arg1 arg2\narg1 = Stock Symbol (e.g., GOOG)\narg2 = Shares (e.g., 3))');
        
        let requestShares = args[1];

        if (requestShares >= Number.MAX_SAFE_INTEGER || requestShares <= 0 || requestShares % 1 != 0) return message.channel.send('Invalid shares argument');

        requestShares = parseInt(requestShares);
        let requestSymbol = args[0].toUpperCase();
        let currentPrice;

        try { // Scrape Yahoo Finance with the given symbol
            const response = await fetch(`https://ca.finance.yahoo.com/quote/${requestSymbol}`);
            const text = await response.text();
            const dom = new JSDOM(text);
            const parent = dom.window.document.querySelector("#quote-header-info");
            const child = parent.querySelector('fin-streamer[data-field="regularMarketPrice"]');
            currentPrice = Math.round(parseFloat(child.textContent.replace(/,/g, '')) * 1e2) / 1e2;
        } catch (e) {
            console.log(e);
            return message.channel.send(`Error while searching for stock ${requestSymbol}`);
        }

        // No current price
        if (currentPrice == "" || isNaN(currentPrice)) return message.channel.send(`Error while searching for stock ${requestSymbol}`);
        // Price is 0
        if (currentPrice <= 0) return message.channel.send(`${requestSymbol} is currently worth 0 (Rounded), please try again later.`);
        
        const price = Math.round(currentPrice * requestShares * 1e2) / 1e2;

        let stockProfile = { // Create dummy stock profile to match schema
            symbol: requestSymbol
        };

        if (!profileData.stocks.owned.some(e => { // Check if user already has the stock profile
            if (e.symbol === requestSymbol) {
                stockProfile = e;
                return true;
            }
        })) { // Push dummy stock profile to database if it does not exist
            profileData.stocks.owned.push(stockProfile);
            profileData.stocks.owned.some(e => {
                stockProfile = e;
            })
        }

        if (msg.includes('buy') || msg.includes('inv')) { // Puchase stock command
            if (profileData.coins < price) {
                message.channel.send(`Error, you do not have enough to purchase ${requestSymbol} shares.\nCurrent cost for ${requestShares} shares at ${currentPrice} each: ${price.toFixed(2)}`);
            } else {
                profileData.coins -= price;
                stockProfile.shares += requestShares;
                stockProfile.buyPrice = currentPrice;
                stockProfile.invested += price;
                message.channel.send(`Successfully purchased ${requestShares} ${requestSymbol} shares for ${price.toFixed(2)} peanuts! (${currentPrice.toFixed(2)} per share)`);
            }
        } else if (msg.includes('sel') || msg.includes('liq')) { // Sell stock command
            if (stockProfile.shares - requestShares < 0) {
                message.channel.send(`Error, you requested to sell ${requestShares} ${requestSymbol} shares but currently possess ${stockProfile.shares}`)
            } else {
                profileData.coins += price;
                stockProfile.shares -= requestShares;
                stockProfile.returned += price;
                message.channel.send(`Successfully sold ${requestShares} ${requestSymbol} shares for ${price.toFixed(2)} peanuts! (${currentPrice.toFixed(2)} per share)`);
            }
        }

        profileData.save();
    }
}