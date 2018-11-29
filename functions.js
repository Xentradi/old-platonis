module.exports = {
	loadCmdDir,
	isOwner,
	botHasPerm,
	userHasPerm,
	bothHasPerm,
	commandReact,
	gitReport,
	toTitleCase,
};

function loadCmdDir(cDir, client, fs) {
	fs.readdir(__dirname + `/commands/${cDir}/`, (err, files) => {
		if (err) return console.error(err);
		files.forEach(file => {
			if (!file.endsWith('.js')) return;
			// Load the command file itself
			const props = require(__dirname + `/commands/${cDir}/${file}`);
			// Get just the command name from the file name
			const commandName = file.split('.')[0];
			client.logger.log(
				'info',
				`Attempting to load command ${commandName}`
			);
			// Here we simply store the whole thing in the command Enmap. We're not running it right now.
			client.commands.set(commandName, props);
		});
	});
}

function isOwner(uID) {
	const botSettings = include('config.json');
	if (botSettings.owner !== uID) {
		return false;
	}
	return true;
}

function botHasPerm(sPerm, msg) {
	return msg.guild.me.hasPermission(sPerm.toUpperCase());
}

function userHasPerm(sPerm, msg) {
	return msg.member.hasPermission(sPerm.toUpperCase());
}

function bothHasPerm(sPerm, msg) {
	if (
		msg.guild.me.hasPermission(sPerm.toUpperCase()) &&
		msg.member.hasPermission(sPerm.toUpperCase())
	) {
		return true;
	}
}


function commandReact(message, status = 1) {
	let reaction;
	if (status === 1) reaction = '✅';
	if (status === 0) reaction = '❌';
	message.react(reaction);
}

function gitReport(client, vUserName, vDisplayName, vRepo, vCommitMessage, vRepoLink, vCommitLink) {
	const Discord = require('discord.js');
	const embed = new Discord.RichEmbed()
		.setTitle(`New commit on ${vRepo}`)
		.setDescription(`${vCommitMessage}`)
		.addField('By:', vUserName)
		.addField('Details:', `[Click here](${vCommitLink})`, true)
		.setColor(0x4169E1)
		.setFooter(client.user.username + ' by Xentradi.', client.user.avatarURL)
		.setThumbnail('https://assets-cdn.github.com/images/modules/logos_page/Octocat.png')
		.setTimestamp()
		.setURL(vRepoLink);

	client.guilds.get('511715677891985410').channels.get('517187925029552149').send({ embed });
}

function toTitleCase(str) {
	return str.replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}