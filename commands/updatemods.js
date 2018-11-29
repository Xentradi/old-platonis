exports.run = async (client, message, args) => {
	const request = require('request');
	request('https://wf.snekw.com/mods-wiki', { json: true }, (err, res, body) => {
		if (err) { return console.log(err); }
		client.warframe = include('warframe.js');
		client.warframe.mods = body.data.Mods;
		message.reply('Mods have been updated.');
	});


};