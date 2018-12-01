exports.run = async (client, message, args) => {
	const warframe = include('warframe.js');
	const Discord = require('discord.js');
	const name = client.udf.toTitleCase(args.join(' '));
	const data = client.warframe.abilities[name];
	if (!data) {
		client.udf.commandReact(message, 0);
		return message.reply('I cannot find a warframe by that name. Did you spell it correctly?');
	}

	return console.log(data);

};