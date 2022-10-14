const mongoose = require('mongoose');

const serverSchema = new mongoose.Schema({
    id: { type: Number, require: true },
    prefix: { type: String, default: ";"}
});