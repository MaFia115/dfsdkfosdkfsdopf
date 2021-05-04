const ms = require('ms')
const { Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: "pr-room",
    /**
     * @param {Message} message 
     */
    run: async(client,message,args) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) return;
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let name = member.user.username;
    let argsuments = args.join(" ");
    if (!args[1]) {
        message.channel.send(argsuments[1])
        message.guild.channels.create(name, {
            type: 'text'
        }).then((channel) => {
            channel.send('I working but مكسل اكتب حاجة')
            channel.setParent('837873192172912680')
        })
    }
    message.guild.channels.create(name, {
        type: 'text',
    }).then((channel) => {
        channel.send('I working but مكسل اكتب حاجة for ' + " " + ms(ms(args[1])))
        channel.setParent('837873192172912680')
        setTimeout(function() {
            let prichannel =  message.guild.channels.cache.find(channel => channel.id === channel.id)
            prichannel.delete()
         }, ms(args[1]))
    })


    }
}