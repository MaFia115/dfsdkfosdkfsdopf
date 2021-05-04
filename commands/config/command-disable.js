const { MessageEmbed } = require('discord.js')
const schema = require('../../models/commands')

module.exports = {
    name: "command-disable",
    description: "Disable a command",
    category: "config",
    usage: "<cmd name>",
    example: "ping",
    guildOnly: true,
    botPermission: [],
    authorPermission: ["ADMINISTRATOR"],
    ownerOnly: false,
    run: async (client, message, args) => {

        const cannotdisable = [
            "command-enable",
            "command-disable",
        ]

        const cmd = args[0]

        if(cannotdisable.includes(cmd)) {
            return message.channel.send(new MessageEmbed().setDescription("That command cant be disabled").setColor("RED"))
        }

        if(!cmd) {
            return message.channel.send(new MessageEmbed().setDescription("Please specify a command to disable").setColor("RED"))
        }

        if(!client.commands.get(cmd)) {
            return message.channel.send(new MessageEmbed().setDescription("That command doesnt exist").setColor("RED"))
        }

        schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
                if(data.Cmds.includes(cmd)) return message.channel.send(new MessageEmbed().setDescription("This command is already disabled").setColor("RED"))
                data.Cmds.push(cmd)
            } else {
                data = new schema({
                    Guild: message.guild.id,
                    Cmds: cmd
                })
               
            }
             await data.save();
                return message.channel.send(new MessageEmbed().setDescription(`**${cmd}** has been disabled`).setColor("GREEN"))
        })
    }
}
