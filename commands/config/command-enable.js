const { MessageEmbed } = require('discord.js')
const schema = require('../../models/commands')

module.exports = {
    name: "command-enable",
    description: "Enable a disabled command",
    category: "config",
    usage: "<cmd name>",
    example: "ping",
    botPermission: [],
    guildOnly: true,
    authorPermission: ["ADMINISTRATOR"],
    ownerOnly: false,
    run: async (client, message, args) => {

        const cmd = args[0];

        if(!cmd) return message.channel.send(new MessageEmbed().setDescription("Please specify a command").setColor("RED"))
            if(!!client.commands.get(cmd) === false) return message.channel.send(new MessageEmbed().setDescription("That command doesnt exist").setColor("RED"));
        try {

            schema.findOne({ Guild: message.guild.id }, async(err, data) => {
                if(err) throw err;
                if(data) {
                    if(data.Cmds.includes(cmd)) {
                        let commandNumber;
      
                        for (let i = 0; i < data.Cmds.length; i++) {
                            if(data.Cmds[i] === cmd) data.Cmds.splice(i, 1)
                        }

                        await data.save()
                        message.channel.send(new MessageEmbed().setDescription(`Enabled **${cmd}**`).setColor("GREEN"));
                        
                      }  else return message.channel.send(new MessageEmbed().setDescription("That command isnt disabled").setColor("RED"));
                  }
              })
        }
        catch(e) {
            console.log(e)
        }
    }
}
