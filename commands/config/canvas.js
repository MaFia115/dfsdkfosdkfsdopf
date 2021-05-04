const { client,Message,MessageAttachment } = require('discord.js');
const Canvas = require("discord-canvas"),
  Discord = require("discord.js");

module.exports = {
    name: "canvas",
   /**
    * @param {client} client 
    * @param {Message} message 
    * @param {String[]} args 
    */
    run: async(client,message,args) => {
    const image = await new Canvas.Welcome()
  .setUsername("xixi52")
  .setDiscriminator("0001")
  .setMemberCount(message.guild.memberCount)
  .setGuildName(message.guild.name)
  .setAvatar(message.author.displayAvatarURL({format: 'png'}))
  .setColor("border", "#8015EA")
  .setColor("username-box", "#8015EA")
  .setColor("discriminator-box", "#8015EA")
  .setColor("message-box", "#8015EA")
  .setColor("title", "#8015EA")
  .setColor("avatar", "#8015EA")
  .setBackground("https://th.bing.com/th/id/OIP.eePbwo_ydfkzpdwD6qLrSAHaFj?pid=ImgDet&rs=1")
  .toAttachment();
 
const attachment = new Discord.MessageAttachment(
    (await image).toBuffer(),
     "goodbye-image.png"
    );
 
message.channel.send(attachment);
    }
}