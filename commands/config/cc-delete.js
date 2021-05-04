const { MessageEmbed } = require('discord.js')
const schema = require('../../models/custom-command')

module.exports = {
    name: "cc-delete",
    description: "Delete a custom command for your guild",
    category: "config",
    usage: "<command name>",
    example: "hello",
    botPermission: [],
    guildOnly: true,
    authorPermission: ["ADMINISTRATOR"],
    ownerOnly: false,
    run: async (client, message, args) => {
        
        const name = args[0]

        if(!name) {
            return message.channel.send(new MessageEmbed().setDescription("Please specify a command name").setColor("RED"))
        }

        const data = await schema.findOne({
            Guild: message.guild.id,
            Command: name
        })

        if(!data) {
            return message.channel.send(new MessageEmbed().setDescription("That custom command doesnt exist").setColor("RED"))
        }

        await schema.findOneAndDelete({
            Guild: message.guild.id,
            Command: name
        })

        return message.channel.send(new MessageEmbed().setDescription(`Removed **${name}** as a custom command for this guild`).setColor("RED"))
    }
}
