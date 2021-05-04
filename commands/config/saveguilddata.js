const { MessageEmbed , Message } = require('discord.js');
const db = require('../../models/WarnSchema');
module.exports = { 
    name: "set-logs",
    /**
     * @param {Message} message 
     */
    run: async(client,message,args) => {
     let logchannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) 
    let data = await db.create({
        guildid: message.guild.id,
        channel : logchannel.id,
    })
    data.save();
    message.channel.send(
    new MessageEmbed()
    .setTitle("Setup Channel logs Done!✅")
    .setDescription(`**Set** (${logchannel}) **a logs channel** \n By: ${message.author} `)
    .setColor('GREEN')
        )
    }
}