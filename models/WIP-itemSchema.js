const mongoose = require('mongoose');

const serverSchema = new mongoose.Schema({
    id: { type: Number, require: true },
    name: { type: String, require: true },
    type: { type: String, require: true },
    rarity: { type: String, require: true }, 
    description: { type: String, require: true },
    buy: { type: Number, require: true },
    sell: { type: Number, require: true },
    img: { type: String, default: "https://i.imgur.com/AfFp7pu.png" },
    effect: { type: Boolean, default: false }
});