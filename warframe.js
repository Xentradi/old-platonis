module.exports = {
	fetchMods,
	fetchWikiImage,
	embedWarframe,
	embedMod,
	embedAbility,
	embedWeapon,
};

function fetchMods(vModName) {
	const request = require('request');
	return new Promise(function(resolve, reject) {
		request(
			'https://wf.snekw.com/mods-wiki',
			{ json: true },
			(err, res, body) => {
				if (err) {
					return reject(err);
				}
				return resolve(body.data.Mods[vModName]);
			}
		);
	});
}

function fetchWikiImage(client, vFilename) {
	const url = 'https://warframe.fandom.com/wiki/File:' + vFilename;
	client.logger.log('info', url);
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
			.then(imgs => {
				const theImages = imgs('img');
				// console.log(theImages[1].attribs['data-src']);
				return resolve(theImages[1].attribs['data-src']);
			})
			.catch(err => {
				return reject(err);
			});
	});
}

function embedWarframe(client, message, vData, vUrlName) {
	const Discord = require('discord.js');
	let vaulted = '';
	if (!vData.Vaulted) {
		vaulted = 'N/A';
	}
	else {
		vaulted = vData.Vaulted;
	}
	const embed = new Discord.RichEmbed()
		.setTitle(`__**${vData.Name}**__`)
		.addField('__Vaulted__', vaulted, false)
		.addField('__Health__', vData.Health, true)
		.addField('__Energy__', vData.Energy, true)
		.addField('__Armor__', vData.Armor, true)
		.addField('__Sprint Speed__', vData.Sprint, true)
		.addField('__Aura Polarity__', vData.AuraPolarity, true)
		.addField('__Polarities__', vData.Polarities, true)
		.setURL('https://warframe.fandom.com/wiki/' + vUrlName)
		.setThumbnail(client.user.displayAvatarURL);
	message.channel
		.send(embed)
		.then(m => {
			client.warframe.fetchWikiImage(client, vData.Image).then(result => {
				const imageEmbed = new Discord.RichEmbed()
					.setTitle(`__**${vData.Name}**__`)
					.addField('__Vaulted__', vaulted, false)
					.addField('__Health__', vData.Health, true)
					.addField('__Energy__', vData.Energy, true)
					.addField('__Armor__', vData.Armor, true)
					.addField('__Sprint Speed__', vData.Sprint, true)
					.addField('__Aura Polarity__', vData.AuraPolarity, true)
					.addField('__Polarities__', vData.Polarities, true)
					.setURL('https://warframe.fandom.com/wiki/' + vUrlName)
					.setThumbnail(client.user.displayAvatarURL)
					.setImage(result);
				m.edit(imageEmbed);
			});
		})
		.catch(err => {
			console.error(err);
		});
}

function embedMod(client, message, vData, vUrlName) {
	const Discord = require('discord.js');
	const embed = new Discord.RichEmbed()
		.setTitle(`__**${vData.Name}**__`)
		.addField('Rarity', vData.Rarity, true)
		.addField('Polarity', vData.Polarity, true)
		.setURL('https://warframe.fandom.com/wiki/' + vUrlName)
		.setThumbnail(client.user.displayAvatarURL);
	message.channel
		.send(embed)
		.then(m => {
			client.warframe.fetchWikiImage(client, vData.Image).then(result => {
				const imageEmbed = new Discord.RichEmbed()
					.setTitle(`__**${vData.Name}**__`)
					.setImage(result)
					.addField('Rarity', vData.Rarity, true)
					.addField('Polarity', vData.Polarity, true)
					.setThumbnail(client.user.displayAvatarURL)
					.setURL('https://warframe.fandom.com/wiki/' + vUrlName);
				m.edit(imageEmbed);
			});
		})
		.catch(err => {
			console.error(err);
		});
}

function embedAbility(client, message, vData, vName, vUrlName) {
	const Discord = require('discord.js');
	const embed = new Discord.RichEmbed()
		.setTitle(`__**${vName}**__`)
		.addField('Description', vData.Description, false)
		.addField('Warframe', vData.Warframe, true)
		.addField('Key', vData.Key, true);
	message.channel
		.send(embed)
		.then(m => {
			client.warframe.fetchWikiImage(client, vData.WhiteIcon).then(result => {
				const imageEmbed = new Discord.RichEmbed()
					.setTitle(`__**${vName}**__`)
					.addField('Description', vData.Description, false)
					.addField('Warframe', vData.Warframe, true)
					.addField('Key', vData.Key, true)
					.setThumbnail(result)
					.setURL('https://warframe.fandom.com/wiki/' + vUrlName);
				m.edit(imageEmbed);
			});
		})
		.catch(err => {
			console.error(err);
		});
}

function embedWeaponMelee(client, message, vData, vUrlName) {
	const Discord = require('discord.js');
	let vaulted = '';
	if (!vData.Traits.includes('Vaulted')) {
		vaulted = 'False';
	}
	else {
		vaulted = 'True';
	}
	const embed = new Discord.RichEmbed()
		.setTitle(`__**${vData.Name}**__`)
		.addField('__Vaulted__', vaulted, false)
		.addField('__Mastery__', vData.Mastery, true)
		.addField('__Slot__', vData.Type, true)
		.addField('__Type__', vData.Class, true)
		.setURL('https://warframe.fandom.com/wiki/' + vUrlName)
		.setThumbnail(client.user.displayAvatarURL);
	message.channel.send(embed).catch(err => {
		console.error(err);
	});
}
