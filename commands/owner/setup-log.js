const Discord = require('discord.js');
const logdata = require('../../models/log');

module.exports  = {
    name: "setup-log",
    authorPermission: ['ADMINSTRATOR'],
    run: async(client, message, args) => {
        let embed = new Discord.MessageEmbed()
        .setDescription("What's message deleted channel log ? pls mention a channel !")
        message.channel.send(embed)

        const fillter = m => m.author.id == message.author.id
        const collector = await message.channel.createMessageCollector(fillter, {max:1,time:3000})

        collector.on('collect', async collect => {
            let deletelogchannel = message.mentions.channels.first();
            collector.stop()
        let data = await logdata.create({
            guildid: message.guild.id,
            channelid:deletelogchannel.id
        })
        message.channel.send('Setup finished!')
        })
    }
}