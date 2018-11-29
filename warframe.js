module.exports = {
	fetchMods,
	fetchModImage,
};

function fetchMods(vModName) {
	const request = require('request');
	return new Promise(function(resolve, reject) {
		request('https://wf.snekw.com/mods-wiki', { json: true }, (err, res, body) => {
			if (err) { return reject(err); }
			return resolve(body.data.Mods[vModName]);
		});
	});
}

function fetchModImage(vFilename) {
	const url = 'https://warframe.fandom.com/wiki/File:' + vFilename;
	console.log(url);
	const rp = require('request-promise');
	const cheerio = require('cheerio');
	const options = {
		uri: 'https://warframe.fandom.com/wiki/File:' + vFilename,
		transform: function(body) {
			return cheerio.load(body);
		},
	};
	return new Promise(function(resolve, reject) {
		rp(options)
			.then((imgs) => {
				const theImages = imgs('img');
				console.log(theImages[1].attribs['data-src']);
				return resolve(theImages[1].attribs['data-src']);
			})
			.catch((err) => {
				return reject(err);
			});
	});

}