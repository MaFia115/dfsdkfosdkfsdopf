const { Message , MessageEmbed } = require('discord.js');
const db = require('../../models/WarnSchema');
module.exports = {
    name: "ban",
    Permission: "BAN_MEMBERS",
   /**
    * 
    * @param {Message} message 
    */
    run: async(client,message,args) => {
    let target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let memberrole = message.member.roles.highest;
    if (memberrole.position === target.roles.highest.position) {
    message.channel.send("I can't ban this member , pls check my role position!")
    }   if (memberrole.position > target.roles.highest.position) {
        let datalog = await db.findOne({ guildid: message.guild.id })
        let log = message.guild.channels.cache.find(channel => channel.id === datalog.channel)
        target.ban({ reason: args[1] }).catch(message.channel.send("I can't ban " + target.user.username))
        message.channel.send(`${target.user.username} was banned!`);
        log.send(
            new MessageEmbed()
            .setColor('RANDOM')
            .addFields(
                {
                  name: "Author :",
                  value: message.author
                },
                {
                  name: "Banned Member : ",
                  value: target,
                  inline: false
                }
              )
              .setFooter(message.guild.name, message.guild.iconURL() || message.guild.iconURL({ dynamic: true }))
        )
    
    } else {
        message.channel.send(`**You can't ban \`${target.user.username}\`**`)
    }

    }
}