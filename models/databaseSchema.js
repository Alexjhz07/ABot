const mongoose = require('mongoose');

const databaseSchema = new mongoose.Schema({
    totalusers: { type: Number, default: 0, require: true },
    userids: { type: [String], default: [], require: true },
});

const model = mongoose.model('DatabaseModel', databaseSchema);

module.exports = model;