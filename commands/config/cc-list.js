const { MessageEmbed } = require('discord.js')
const schema = require('../../models/custom-command')

module.exports = {
    name: "cc-list",
    description: "Shows the list of custom commands for this server",
    category: "config",
    usage: "",
    example: "",
    guildOnly: true,
    botPermission: [],
    authorPermission: [],
    ownerOnly: false,
    run: async (client, message, args) => {

        const data  = await schema.find({ Guild: message.guild.id });
        
        if(!data || data === null) {
            return message.channel.send(new MessageEmbed().setDescription("There are no custom commands for this guild").setColor("RED"));
        }

        message.channel.send(
            new MessageEmbed()
                .setColor('BLUE')
                .setDescription(
                    data.map((cmd, i) => 
                        `${i + 1}: ${cmd.Command}`
                    ).join('\n')
                )
        )
    }
}
