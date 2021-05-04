const mongoose = require('mongoose');
const { Message } = require('discord.js');
const db = require('../../models/WarnSchema');

module.exports = {
    name: "rest-data",
   /**
    * 
    * @param {*} client 
    * @param {Message} message 
    * @param {*} args 
    */
    run: async(client,message,args) => {
        if (!message.member.hasPermission('ADMINISTRATOR')) return;
    if (db) return db.findOneAndDelete({ guildid: message.guild.id }).then(
        message.channel.send('Rest-done!')
    )
    }
}