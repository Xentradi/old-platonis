module.exports = client => {
	client.logger.log(
		'info',
		`Logged in as ${client.user.username}. Connected to ${
			client.guilds.size
		} servers.`
	);
	client.user.setActivity(client.config.activityText, {
		type: client.config.activityType,
	});

	const request = require('request');
	request('https://wf.snekw.com/mods-wiki', { json: true }, (err, res, body) => {
		if (err) { return console.log(err); }
		client.warframe.mods = body.data.Mods;
		client.logger.log('info', 'warframe.mods updated');
	});
};
