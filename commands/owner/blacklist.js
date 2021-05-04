const { MessageEmbed } = require('discord.js')
const blacklist = require('../../models/blacklist')

module.exports = {
    name: "blacklist",
    description: "Blacklist a member from using the bot",
    category: "owner",
    usage: "<someones id>",
    example: "789838427192295444",
    botPermission: [],
    authorPermission: [],
    ownerOnly: true,
    run: async (client, message, args) => {
        
        const User = message.mentions.members.first() || message.members.cache.get(args[0])

        if(!User) {
            return message.channel.send(new MessageEmbed().setDescription("Please specify a member for me to blacklist").setColor("RED"))
        }

        blacklist.findOne({ id: User.user.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
                return message.channel.send(new MessageEmbed().setDescription(`**${User.displayName}** is already blacklisted`).setColor("RED"))
            } else {
                data = new blacklist({ id: User.user.id })
            }
            data.save();
            return message.channel.send(new MessageEmbed().setDescription(`**${User.displayName}** has been blacklisted \n By : ${message.author}`).setColor("GREEN"))
        })
    }
}
