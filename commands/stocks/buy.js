const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fetch = require("cross-fetch");

module.exports = {
    name: 'buy',
    aliases: ['invest', 'sell', 'liquidate'],
    permissions: [],
    cooldown: 1,
    description: "Invest your peanuts!",
    async execute(client, message, args, Discord, profileData) {
        const [head, ...rest] = args;
        let msg = message.content.substring(1, 4);

        if (args.length != 2) return message.channel.send('Incorrect use of buy.\n;command arg1 arg2\narg1 = Stock Symbol (e.g., GOOG)\narg2 = Shares (e.g., 3))');
        
        let requestShares = args[1];

        if (requestShares >= Number.MAX_SAFE_INTEGER || requestShares <= 0 || requestShares % 1 != 0) return message.channel.send('Invalid shares argument');

        requestShares = parseInt(requestShares);
        let requestSymbol = args[0].toUpperCase();
        let currentPrice;

        try {
            const response = await fetch(`https://ca.finance.yahoo.com/quote/${requestSymbol}`);
            const text = await response.text();
            const dom = new JSDOM(text);
            const parent = dom.window.document.querySelector("#quote-header-info");
            const child = parent.querySelector('fin-streamer[data-field="regularMarketPrice"]');
            currentPrice = parseFloat(child.textContent.replace(/,/g, '')).toFixed(0);
        } catch (e) {
            console.log(e);
            return message.channel.send(`Error while searching for stock ${requestSymbol}`);
        }

        if (currentPrice == "") return message.channel.send(`Error while searching for stock ${requestSymbol}`);

        const price = currentPrice * requestShares;

        let stockProfile = {
            symbol: requestSymbol
        };

        if (!profileData.stocks.owned.some(e => {
            if (e.symbol === requestSymbol) {
                stockProfile = e;
                return true;
            }
        })) {
            profileData.stocks.owned.push(stockProfile);
            profileData.stocks.owned.some(e => {
                stockProfile = e;
            })
        }

        if (msg.includes('buy') || msg.includes('inv')) {
            if (profileData.coins < price) {
                message.channel.send(`Error, you do not have enough to purchase ${requestSymbol} shares.\nCurrent cost for ${requestShares} shares at ${currentPrice} each: ${price}`);
            } else {
                profileData.coins -= price;
                stockProfile.shares += requestShares;
                stockProfile.buyPrice = currentPrice;
                stockProfile.invested += price;
                message.channel.send(`Successfully purchased ${requestShares} ${requestSymbol} shares for ${price} peanuts!`);
            }
        } else if (msg.includes('sel') || msg.includes('liq')) {
            if (stockProfile.shares - requestShares < 0) {
                message.channel.send(`Error, you requested to sell ${requestShares} ${requestSymbol} shares but currently possess ${stockProfile.shares}`)
            } else {
                profileData.coins += price;
                stockProfile.shares -= requestShares;
                stockProfile.returned += price;
                message.channel.send(`Successfully sold ${requestShares} ${requestSymbol} shares for ${price} peanuts!`);
            }
        }
        profileData.save();
    }
}