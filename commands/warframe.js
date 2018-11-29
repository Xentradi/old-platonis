exports.run = async (client, message, args) => {
	const warframe = include('warframe.js');
	const Discord = require('discord.js');
	const name = client.udf.toTitleCase(args.join(' '));
	const data = client.warframe.warframes[name];
	if (!data) {
		client.udf.commandReact(message, 0);
		return message.reply('I cannot find a warframe by that name. Did you spell it correctly?');
	}
	let vaulted = '';
	if (!data.Vaulted) {
		vaulted = 'N/A';
	}
	vaulted = data.Vaulted;
	const urlName = client.udf.toTitleCase(args.join('_'));
	const embed = new Discord.RichEmbed()
		.setTitle(`__**${data.Name}**__`)
		.addField('__Vaulted__', vaulted, false)
		.addField('__Health__', data.Health, true)
		.addField('__Energy__', data.Energy, true)
		.addField('__Armor__', data.Armor, true)
		.addField('__Sprint Speed__', data.Sprint, true)
		.addField('__Aura Polarity__', data.AuraPolarity, true)
		.addField('__Polarities__', data.Polarities, true)
		.setURL('https://warframe.fandom.com/wiki/' + urlName);
	message.channel.send(embed).then(m => {
		warframe.fetchWikiImage(data.Image).then((result) => {
			const imageEmbed = new Discord.RichEmbed()
				.setTitle(`__**${data.Name}**__`)
				.addField('__Vaulted__', data.Vaulted, false)
				.addField('__Health__', data.Health, true)
				.addField('__Energy__', data.Energy, true)
				.addField('__Armor__', data.Armor, true)
				.addField('__Sprint Speed__', data.Sprint, true)
				.addField('__Aura Polarity__', data.AuraPolarity, true)
				.addField('__Polarities__', data.Polarities, true)
				.setURL('https://warframe.fandom.com/wiki/' + urlName)
				.setImage(result);
			m.edit(imageEmbed);
		});


	}).catch((err) => {
		console.error(err);
	});


};