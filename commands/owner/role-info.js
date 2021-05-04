const { Message,MessageEmbed } = require('discord.js');
const ms = require('ms')
const dev = ['712089827301916682']
module.exports = {
    name: "role-info",
    /**
     * @param {Message} message 
     */
    run: async(client,message,args) => {
    let targetrole = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
    message.channel.send(
        new MessageEmbed()
        .addFields(
            {name: "**Role color**", value: `\`\`\`#${targetrole.color}\`\`\``},
            {name: "**Role createdAt**",value: `\`\`\`${message.createdAt.toLocaleDateString("ar-eg")}\`\`\``},
            {name: "**Role ID**", value: `\`\`\`${targetrole.id}\`\`\``},
            {name: "Role Members", value: `\`\`\`${targetrole.members.size}\`\`\``}
        )
        .setThumbnail(message.guild.iconURL() || message.guild.iconURL({dynamic: true}))
        .setColor(message.member.roles.highest.hexColor)
        .setFooter("To see role members type +inrole")
)
        
    }
}