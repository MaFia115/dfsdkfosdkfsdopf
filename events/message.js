const {
	default_prefix, owners, TestServers
} = require('../config.json');
const {
	MessageEmbed,
  Collection
} = require('discord.js')
const prefixSchema = require('../models/prefix');
const schema = require('../models/custom-command')
const blacklist = require('../models/blacklist')
const db = require('../models/commands')
const ms = require('ms');
const Timeout = new Collection();


module.exports.run = async(client, message) => {



	if(message.author.bot) return;
	if(!message.guild) return;



	const data = await prefixSchema.findOne({
		GuildID: message.guild.id
	});

	let prefix = default_prefix

	if(data) {
		prefix = data.Prefix
	}



	if(!message.content.startsWith(prefix)) return;
	blacklist.findOne({
		id: message.author.id
	}, async(err, data) => {
		if(err) throw err;
		if(!data) {
			if(!message.member) message.member = await message.guild.members.fetch(message);
			const args = message.content.slice(prefix.length).trim().split(/ +/g);
			const cmd = args.shift().toLowerCase();
			const cc = await schema.findOne({
				Guild: message.guild.id,
				Command: cmd
			})



			if(cc) {
				message.channel.send(cc.Response)
			}



			if(cmd.length === 0) return;
			let command = client.commands.get(cmd);
			if(!command) command = client.commands.get(client.aliases.get(cmd));
			if(!command) return;



			if(command.botPermission) {
				let neededPerms = [];
				command.botPermission.forEach(p => {
					if(!message.guild.me.hasPermission(p)) neededPerms.push('`' + p + '`');
				});
				const botpermsembed = new MessageEmbed().setDescription(`I need ${neededPerms.join(', ')} permission(s) to run this command!`).setColor('RED')
				if(neededPerms.length) return message.channel.send(botpermsembed);
			}



			if(command.authorPermission) {
				let neededPerms = [];
				command.authorPermission.forEach(p => {
					if(!message.member.hasPermission(p)) neededPerms.push('`' + p + '`');
				});
				const userpermsembed = new MessageEmbed().setDescription(`You need ${neededPerms.join(', ')} permission(s) to run this command!`).setColor('RED')
				if(neededPerms.length) return message.channel.send(userpermsembed);
			}



			if(command.guildOnly) {
				if(message.channel.type === "dm") {
					return message.author.send(new MessageEmbed().setDescription("Sorry but this command can only be executed is servers").setColor("RED"))
					.catch((e) => {})
					
				}
			}

			if(command.testOnly) {
				if(!TestServers.includes(message.guild?.id)) {
					return message.channel.send(new MessageEmbed().setDescription("Sorry but this command can only be ran in the test servers").setColor("RED"))
				}
			}



			if(command.ownerOnly) {
				const owneronlyembed = new MessageEmbed().setDescription('This command can only be used by the bot owner').setDescription('RED')
				if(!owners.includes(message.author.id)) return message.channel.send(owneronlyembed);
			}



			if(command.cooldown) {
				let timeout = ms(command.cooldown)
				if(Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(new MessageEmbed().setDescription(`You are on a \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long: true})}\` cooldown`).setColor("RED"))
				Timeout.set(`${command.name}${message.author.id}`, Date.now() + timeout)
				setTimeout(() => {
					Timeout.delete(`${command.name}${message.author.id}`)
				}, timeout)
			}


			if(args.length < command.minArgs || (
				command.maxArgs !== null && args.length > command.maxArgs
			)) {
				if(command.usage) {
					return message.channel.send(new MessageEmbed().setDescription(`Incorrect syntax! Use ${prefix}${command.name} ${command.usage}`).setColor("RED"))
				} else {
					return message.channel.send(new MessageEmbed().setDescription(`Incorrect syntax! Use ${prefix}${command.name}`).setColor("RED"))
				}
			}



			if(command) {
				const check = await db.findOne({
					Guild: message.guild.id
				})
				if(check) {
					if(check.Cmds.includes(command.name)) return message.channel.send(new MessageEmbed().setDescription(`This command is disabled`).setColor("RED"))
					command.run(client, message, args)
				} else {
					command.run(client, message, args);
				}
			}
			} else {
				return message.channel.send(new MessageEmbed().setDescription("You are blacklisted from using this bot").setColor("RED"))
			}
			})
}