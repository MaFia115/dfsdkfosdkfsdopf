const { Message,MessageEmbed } = require('discord.js');

module.exports = {
    name: "user",
    /**
     * @param {Message} message 
     */      
    run: async(client,message,args) => {
        let date = new Date(2000,1,1)

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
    let embed = new  MessageEmbed()
    .setDescription(`**Data join Discord :** \n \`${user.createdTimestamp(date)}\`\n **user equals : ****${user.equals(user)}** `)
    .setThumbnail(user.avatarURL())
    message.channel.send(embed)
    }
}