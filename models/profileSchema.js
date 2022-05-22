const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    symbol: { type: String, require: true },
    shares: { type: Number, default: 0 },
    buyPrice: { type: Number, default: 0 },
    invested: { type: Number, default: 0 },
    returned: { type: Number, default: 0 }
});

const profileSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true },
    serverID: { type: String, require: true },
    coins: { type: Number, default: 0 },
    bank: { type: Number, default: 0 },
    stats: {
        exp: { type: Number, default: 0 },
        expNext: { type: Number, default: 0 },
        dailyNext: { type: Number, default: 0 },
        weeklyNext: { type: Number, default: 0 },
        monthlyNext: { type: Number, default: 0 },
        stonksUsed: { type: Number, default: 0 },
        stonksReceived: { type: Number, default: 0 },
        flipsWon: { type: Number, default: 0 },
        flipsLost: { type: Number, default: 0 },
        flipsPeanutsWon: { type: Number, default: 0 },
        flipsPeanutsLost: { type: Number, default: 0 },
        pokeSucceed: { type: Number, default: 0 },
        pokeFail: { type: Number, default: 0 },
        beenPoked: { type: Number, default: 0 },
        worfAsked: { type: Number, default: 0 }
    },
    permissions: {
        worfAccess: { type: Boolean, default: false}
    },
    stocks: {
        owned: { type: [stockSchema], default: [] },
        investedTotal: { type: Number, default: 0 },
        returnedTotal: { type: Number, default: 0 }
    }
});

const model = mongoose.model('ProfileModels', profileSchema);

module.exports = model;