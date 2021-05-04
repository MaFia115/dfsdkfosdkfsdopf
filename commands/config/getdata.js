const { Message } = require('discord.js');
const db = require('../../models/create');

module.exports = { 
    name: "get-data",
   /**
    * @param {Message} message 
    */
    run: async(client,message,args) => {
    let data = await db.findOne({
        GuildIID: message.guild.id,
    })
    message.channel.send(`\`\`\`${data}\`\`\``).then(
        message.channel.send(`\`\`\`${data.content}\`\`\``)
    )
    }
}