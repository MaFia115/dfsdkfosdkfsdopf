const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "CommandName",
    description: "CommandDescription",
    category: "CommandCategory",
    usage: "CommandUsage",
    example: "CommandExample",
    aliases: [""],
    botPermission: [],
    authorPermission: [],
    guildOnly: true,
    cooldown: "10s",
    minArgs: 1,
    maxArgs: 1,
    testOnly: false,
    ownerOnly: false,
    run: async (client, message, args) => {

        
    }
}
