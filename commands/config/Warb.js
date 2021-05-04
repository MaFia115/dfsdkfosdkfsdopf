const db = require('../../models/WarnSchema');
const { Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: "warn",
    /**
     * 
     * @param {Message} message
     */
    run: async(client,message,args) => {
        if (!message.member.hasPermission('ADMINISTRATOR')) return;
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!member) return;
        let reson = args.slice(1).join(" ")
        db.findOne({ guildid: message.guild.id , user: member.user.id}, (err, data) => {
            if (err) throw err;
            if (!data) {
                data = new db({
                    guildid: message.guild.id,
                    user: member.user.id,
                    content: [
                        {
                            moderator: message.author.id,
                            reason : reson
                        }
                    ]

                })
            } else {
                const obj = {
                    moderator: message.author.id,
                    reason: reson
                }
                data.content.push(obj)
            }
            data.save();
        });
        member.send(
            new MessageEmbed()
            .setTitle('New Warn!')
            .setDescription(`**Reason : (${reson})** \n **By :**${message.author}`)
            .setColor('RONDON')
        )
        message.channel.send(
            new MessageEmbed()
            .setDescription(`${member.user.username} has been gived a warn!`)
        )

    }
}