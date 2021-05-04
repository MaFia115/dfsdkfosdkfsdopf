const mongoose = require('mongoose');

let WarnsSchema = new mongoose.Schema({
    guildid: String,
    channel: String
})

module.exports = mongoose.model('Warns', WarnsSchema)