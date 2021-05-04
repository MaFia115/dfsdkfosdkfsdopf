const { MessageEmbed } = require('discord.js')
const prefixModel = require('../../models/prefix')
const { default_prefix } = require('../../config.json')

module.exports = {
    name: "setprefix",
    description: "Set the guilds prefix",
    category: "config",
    botPermission: [],
    usage: "<new prefix>",
    example: "?",
    guildOnly: true,
    authorPermission: ["ADMINISTRATOR"],
    ownerOnly: false,
    run: async (client, message, args) => {
        
        const data = await prefixModel.findOne({
            GuildID: message.guild.id
        });

        let prefix = default_prefix

        if(data) {
            prefix = data.Prefix
        }
    
        if (!args[0]) {

                const noargsembed = new MessageEmbed()
                .setDescription(`My current prefix is **${prefix}**`)
                .setColor('GREEN')
                return message.channel.send(noargsembed)
            
        }
    
        if (args[0].length > 5) {

            const overfiveembed = new MessageEmbed()
            .setDescription('The prefix must be under 5 chatacters')
            .setColor('RED')
            return message.channel.send(overfiveembed)
        }

        if(args[0] === "!") {

            await prefixModel.findOneAndDelete({
                GuildID: message.guild.id
            })

            const defaultembed = new MessageEmbed()
            .setDescription(`Reset prefix to the default one. **${default_prefix}**`)
            .setColor('GREEN')

            return message.channel.send(defaultembed)
        }

        if(args[0] === "reset") {

            await prefixModel.findOneAndDelete({
                GuildID: message.guild.id
            })

            const yesdefaultembed = new MessageEmbed()
            .setDescription(`Reset the prefix to **${default_prefix}**`)
            .setColor('GREEN')

            return message.channel.send(yesdefaultembed)
        }
    
        if (data) {
            await prefixModel.findOneAndUpdate({
                GuildID: message.guild.id,
                Prefix: args[0]
            }).then((data) => {
                data.save().catch((e) => {
                    return message.channel.send(new MessageEmbed()
                    .setDescription(`There was a error when saving to the database. Please contact Kyron#0031 or join the support server`)
                    .setColor('RED')
                    )
                })
            })

            const yesembed = new MessageEmbed()
            .setDescription(`Updated the prefix to **${args[0]}**`)
            .setColor('GREEN')
            
            message.channel.send(yesembed);
    
        } else if (!data) {

            const secondyesembed = new MessageEmbed()
            .setDescription(`Updated prefix to **${args[0]}**`)
            .setColor('GREEN')

            message.channel.send(secondyesembed);
    
            let newData = new prefixModel({
                Prefix: args[0],
                GuildID: message.guild.id
            })
            newData.save().catch((e) => {
                const errorembed = new MessageEmbed()
                .setDescription(`There was a error when saving to the database\n\nError: ${e}`)
                .setColor('RED')
                return message.channel.send(errorembed)
            })
        }
    }
}
