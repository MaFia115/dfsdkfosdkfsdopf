const { client,Message } = require('discord.js');

const db = require('../../models/welcome');
module.exports = {
    name: "setwelcom-channel",
  /**
   * 
   * @param {client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
    run: async(client,message,args) => {
    let channel = message.mentions.channels.first();
    const argcontent = args.slice(args[0])
    let data = await db.create({
        Guildid: message.guild.id,
        channel: channel.id
    })
    data.save()
    message.channel.send('Setwelcome channel!')
    }
}