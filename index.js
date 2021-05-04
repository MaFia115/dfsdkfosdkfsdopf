const { Collection, Intents, Client, MessageEmbed } = require("discord.js");
const { token, mongoURL } = require('./config.json')
const mongoose = require('mongoose');
//const prefix = require("./models/prefix");
const prefix = '$';
const Discord = require('discord.js')
const db = require('./models/WarnSchema');
let database = require('./models/create')

const client = new Client({
	partials: ["MESSAGE", "GUILD_MEMBER", "CHANNEL", "USER", "REACTION"],
	ws: {
		intents: Intents.ALL
	}
})

//mongo


mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

mongoose.connection.on('connected', () => {
    console.log('Connected to mongodb')
})

mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from mongodb')
})

mongoose.connection.on('err', (err) => {
    console.log(`There was a error when connecting to mongodb\nError: ${err}`)
})



//command and events



client.commands = new Collection();
client.aliases = new Collection();
client.Timeout = new Collection();
client.events = new Collection();
["command", "events"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});
//



client.on('messageDelete', async message => {
    let data = await db.findOne({ guildid: message.guild.id })
	// ignore direct messages
    let log = message.guild.channels.cache.find(channel => channel.id === data.channel);
	if (!message.guild) return;
	const fetchedLogs = await message.guild.fetchAuditLogs({
		limit: 1,
		type: 'MESSAGE_DELETE',
	});
	const deletionLog = fetchedLogs.entries.first();

	if (!deletionLog) return console.log(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`);


	const { executor, target } = deletionLog;


	
	if (target.id == message.author.id) {
    
		//console.log(`A message by ${message.author.tag} was deleted by ${executor.tag}.` + message.content);
        let embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}) || message.author.avatarURL())
            .setThumbnail(message.author.avatarURL({dynamic:true}))
            .setDescription(`**Message sent by: ${message.author}** \n **Deleted by: **<@${executor.id}> - (${executor.id}) \n\n **Content : (\`${message.content}\`)**`)
            .setFooter(message.guild.name)
            log.send(embed)
        
	} else {
		//console.log(`A message by ${message.author.tag} was deleted, but we don't know by who.`);
        let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}) || message.author.avatarURL())
        .setThumbnail(message.author.avatarURL({dynamic:true}))
        .setDescription(`**Message sent by: ${message.author}**\n **Content : (\`${message.content}\`)**`)
        .setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
        log.send(embed);

	}
});

client.on('guildBanAdd', async(guild,member) => {
    let data = await db.findOne({ guildid: guild.id })
    // ignore direct messages
    let log = guild.channels.cache.find(channel => channel.id === data.channel);
    if (!guild) return;
    const fetchedLogs = await guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_BAN_ADD',
    });
    const deletionLog = fetchedLogs.entries.first();
  
    if (!deletionLog) return console.log(`A member  ${member.tag} was left, but no relevant audit logs were found.`);
  
  
    const { executor, target } = deletionLog;
  
  
    
    if (target.id == member.id) {
    
        //console.log(`A message by ${message.author.tag} was deleted by ${executor.tag}.` + message.content);
        let embed = new Discord.MessageEmbed()
            .setAuthor(member.tag, member.avatarURL({dynamic:true}) || member.avatarURL())
            .setThumbnail(member.avatarURL({dynamic:true}))
            .addFields(
              {
                name: "Author :",
                value: executor
              },
              {
                name: "Banned Member : ",
                value: target,
                inline: false
              }
            )
            .setFooter(guild.name)
            log.send(embed)
        
    } 
  
  });


  client.on('messageReactionAdd', async(MessageReaction,user) => {
      let data = await db.findOne({ guildid: MessageReaction.message.guild.id })
      let log = client.channels.cache.find(channel => channel.id === data.channel)
    log.send(
        new Discord.MessageEmbed()
        .setTitle('Now reaction add!')
        .setThumbnail(user.avatarURL({ dynamic: true }))
        .addFields(
            {
                name: "Message Reaction URL",
                value: MessageReaction.message.url
            },
            {
                name: "Reaction add by",
                value: user,
                inline: false,
            }
        )
    )
  });

client.on('', async(guild,member) => {
    let data = await db.findOne({ guildid: guild.id })
    let log = client.channels.cache.find(channel => channel.id === data.channel)
    const fetchlogs = await guild.fetchAuditLogs({
        limit:1,
        type: 'BOT_ADD',
    })

    const deletionLog = fetchlogs.entries.first()

    const {target, executor} = deletionLog;

    if (target.id === member.id) {
        //console.log();
        log.send()
    }
})



client.on('guildBanRemove', async(guild,member) => {
    let data = await db.findOne({ guildid: guild.id })
	// ignore direct messages
    let log = guild.channels.cache.find(channel => channel.id === data.channel);
	if (!guild) return;
	const fetchedLogs = await guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_BAN_REMOVE',
	});
	const deletionLog = fetchedLogs.entries.first();

	const { executor, target } = deletionLog;


	
	if (target.id == member.id) {
    
		//console.log(`A message by ${message.author.tag} was deleted by ${executor.tag}.` + message.content);
        let embed = new Discord.MessageEmbed()
            .setAuthor(member.tag, member.avatarURL({dynamic:true}) || member.avatarURL())
            .setThumbnail(member.avatarURL({dynamic:true}))
            .setColor('RANDOM')
            .addFields(
                {
                    name: "Author :",
                    value: executor
                },
                {
                    name: "Member unban :",
                    value: member,
                    inline: false
                }
            )
            .setFooter(guild.name)
            log.send(embed)
        
	} 
});

const dev = ['500367748724031492','712089827301916682']
client.on('message', message => {
    if (message.content.startsWith("?leave")) {
    let args = message.content.slice(1).split(" ");
   let target =  client.guilds.cache.find(g => g.id === args[0])
    target.leave().catch(erorr => console.log(erorr))
    }
});

client.on('guildMemberAdd', async(guild,member) => {
    let data = await db.findOne({ guildid: guild.id })
    let log = client.channels.cache.find(channel => channel.id === data.channel)
const fetchlogs = guild.fetchAuditLogs({
    limit:1,
    type: 'BOT_ADD'
})
let deletionLog = await fetchlogs.entries.first()

let { target, executor } = deletionLog;

if (target.id === member.id) {
log.send(`${member} joined by <@${executor.id}>`)
}
})


client.on('message', message => {
    if (message.content.startsWith(prefix + "s")) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return;
        let allstatus =  message.guild.members.cache.filter(m => m.presence.status !== 'offline')
        message.channel.send(`**${message.guild.memberCount} Members <:M18:838478950602637342>  ${allstatus.size} Online <a:M2:813870452871004171> ${message.guild.premiumSubscriptionCount} Boosts <a:M10:814081625985122334> **`)
    }
});



client.login(token).catch((e) => {
    console.log("[ERROR] There was a error when logging in. Maybe the token is is invalid?")
})
 