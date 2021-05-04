const { Message, MessageEmbed } = require('discord.js');
let db = require('../../models/create');
module.exports = {
    name: "create",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message  
     */
    run: async(client,message,args) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) return;
    if (db) db.findOneAndDelete({ GuildIID: message.guild.id }).then(message.channel.send('Rest member mention re setup!'))
    let xchannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
    if (args[1] === '[user]') {
    let data = await db.create({
        GuildIID: message.guild.id,
        content: args[2],
        channel:xchannel.id,
    })
    console.log(data.channel)

    data.save();
    message.channel.send('Create members mentions!')
}
    }
}