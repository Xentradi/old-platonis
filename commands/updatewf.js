exports.run = (client, message, args) => {
	const request = require('request');
	request(
		'https://wf.snekw.com/mods-wiki',
		{ json: true },
		(err, res, body) => {
			if (err) {
				return console.log(err);
			}
			client.warframe.mods = body.data.Mods;
			client.logger.log('info', 'warframe.mods updated');
		}
	);
	request(
		'https://wf.snekw.com/warframes-wiki',
		{ json: true },
		(err, res, body) => {
			if (err) {
				return console.log(err);
			}
			client.warframe.warframes = body.data.Warframes;
			client.logger.log('info', 'warframe.warframes updated');
		}
	);
	request(
		'https://wf.snekw.com/weapons-wiki',
		{ json: true },
		(err, res, body) => {
			if (err) {
				return console.log(err);
			}
			client.warframe.weapons = body.data.Weapons;
			client.logger.log('info', 'warframe.weapons updated');
		}
	);
	request(
		'https://wf.snekw.com/ability-wiki',
		{ json: true },
		(err, res, body) => {
			if (err) {
				return console.log(err);
			}
			client.warframe.abilities = body.data.Warframe;
			client.logger.log('info', 'warframe.abilities updated');
		}
	);
	return message.channel.send('Warframe data updated.');
};
