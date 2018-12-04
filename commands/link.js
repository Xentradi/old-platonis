exports.run = async (client, message, args) => {
	const Discord = require('discord.js');
	const name = client.udf.toTitleCase(args.join(' '));
	const urlName = client.udf.toTitleCase(args.join('_'));
	const data =
		client.warframe.warframes[name] ||
		client.warframe.mods[name] ||
		client.warframe.abilities[name] ||
		client.warframe.weapons[name];
	if (!data) {
		client.udf.commandReact(message, 0);
		return message.reply(
			'That\'s not a linkable item, did you spell it correctly?'
		);
	}
	if (data.Health) {
		client.logger.log('info', 'Warframe linked');
		client.warframe.embedWarframe(client, message, data, urlName);
	}
	if (data.Rarity) {
		client.logger.log('info', 'Mod linked');
		client.warframe.embedMod(client, message, data, urlName);
	}
	if (data.Key) {
		client.logger.log('info', 'Ability linked');
		client.warframe.embedAbility(client, message, data, name, urlName);
	}
	if (data.Class) {
		client.logger.log('info', 'Weapon linked');
		// sort weapon types
		if (data.type === 'Primary') {
			//
		}
		if (data.type === 'Secondary') {
			//
		}
		if (data.type === 'Melee') {
			client.warframe.embedWeaponMelee(client, message, data, urlName);
		}
		console.log(data);
	}
};
