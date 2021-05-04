const mongoose = require('mongoose');

const welcomeSchema = new mongoose.Schema({
    Guildid: String,
    channel: String,
})

module.exports = mongoose.model('welcome', welcomeSchema)