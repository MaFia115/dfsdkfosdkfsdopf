const mongoose = require('mongoose');

const createSchema = new mongoose.Schema({
    GuildIID: String,
    content: String,
    channel:String,
});

module.exports = mongoose.model('create', createSchema);