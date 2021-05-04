const { Message , MessageEmbed } = require('discord.js');

module.exports = {
    name: "s",
    /**
     * @param {Message} message
     */
    run: async(client,message,args) => {
        let role = message.guild.roles.cache.get('828618894351794268')
        let memberst =  message.guild.members.cache.filter(m => m.presence.status !== 'offline')
        message.channel.send(`**${message.guild.memberCount} member ${message.guild.premiumSubscriptionCount} Boosts! ${memberst.size} member online **`)
    }
}