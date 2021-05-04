const { MessageEmbed } = require('discord.js')
const schema = require('../../models/custom-command')

module.exports = {
    name: "cc-add",
    description: "Create a custom command for your guild",
    category: "config",
    usage: "<command name> <command responce>",
    example: "hello hi",
    guildOnly: true,
    botPermission: [],
    authorPermission: ["ADMINISTRATOR"],
    ownerOnly: false,
    run: async (client, message, args) => {
        
        const name = args[0]
        const response = args.slice(1).join(" ")

        if(!name) {
            return message.channel.send(new MessageEmbed().setDescription("Please specify a command name").setColor("RED"))
        }

        if(!response) {
            return message.channel.send(new MessageEmbed().setDescription("Please specify a command response").setColor("RED"))
        }

        const data = await schema.findOne({
            Guild: message.guild.id,
            Command: name
        })

        if(data) {
            return message.channel.send(new MessageEmbed().setDescription("This custom command already exists").setColor("RED"))
        }

        const newData = new schema({
            Guild: message.guild.id,
            Command: name,
            Response: response
        })
        await newData.save();
        message.channel.send(new MessageEmbed().setDescription(`Saved **${name}** as a custom command for this guild`).setColor("GREEN"))
    }
}
