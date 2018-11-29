exports.run = async (client, message, args) => {
	const warframe = include('warframe.js');
	const Discord = require('discord.js');
	const modName = client.udf.toTitleCase(args.join(' '));
	const mod = client.warframe.mods[modName];
	if (!mod) {
		client.udf.commandReact(message, 0);
		return message.reply('I cannot find a mod by that name. Did you spell it correctly?');
	}
	const urlName = client.udf.toTitleCase(args.join('_'));
	const embed = new Discord.RichEmbed()
		.setTitle(`__**${mod.Name}**__`)
		.addField('Rarity', mod.Rarity, true)
		.addField('Polarity', mod.Polarity, true)
		.setURL('https://warframe.fandom.com/wiki/' + urlName);
	message.channel.send(embed).then(m => {
		warframe.fetchWikiImage(mod.Image).then((result) => {
			const imageEmbed = new Discord.RichEmbed()
				.setTitle(`__**${mod.Name}**__`)
				.setImage(result)
				.addField('Rarity', mod.Rarity, true)
				.addField('Polarity', mod.Polarity, true)
				.setURL('https://warframe.fandom.com/wiki/' + urlName);
			m.edit(imageEmbed);
		});


	}).catch((err) => {
		console.error(err);
	});


};