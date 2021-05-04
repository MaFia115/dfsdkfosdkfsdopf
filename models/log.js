const mongoose = require('mongoose');
const logSchema = new mongoose.Schema({
    guildid: String,
    channelid: String,
})

module.exports = mongoose.model('log', logSchema)