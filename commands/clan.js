exports.run = async (client, message, args) => {
	const prefix = client.config.prefix;
	const usage = `*${prefix}clan <join|leave|add|remove> <clan name>*`;

	// we're expecting a minimum of 2 arguments. if there arent 2 reject the request
	if (!args[1]) {
		client.udf.commandReact(message, 0);
		return message.reply(usage);
	}


	const command = args.shift().toLowerCase();
	const clanName = args.join(' ').toLowerCase();
	const roles = message.guild.roles;
	// console.log(rolesArray);
	if (command !== 'join' && command !== 'leave' && command !== 'add' && command !== 'remove') {
		client.udf.commandReact(message, 0);
		return message.reply(usage);
	}
	// check if role exists


	if (command === 'join') {
		const targetRole = message.guild.roles.find(x => x.name === clanName);
		if (!roles.has(targetRole.id)) {
			client.udf.commandReact(message, 0);
			console.log(message.guild.roles.has(targetRole));
			return message.reply('That is not a valid clan. Has your clan been added to the server yet?');
		}
		client.udf.commandReact(message, 1);

		message.member.addRole(targetRole.id);
		const currentName = message.member.displayName;
		return message.member.setNickname(`${currentName} [${clanName}]`).catch(message.reply('There was a problem changing your nickname, but you\'ve been added to the clans role.'));
	}

	if (command === 'leave') {
		const targetRole = message.guild.roles.find(x => x.name === clanName);

		if (!roles.has(targetRole.id)) {
			client.udf.commandReact(message, 0);
			console.log(roles.has(targetRole));
			return message.reply('That is not a valid clan. Has your clan been added to the server yet?');
		}
		client.udf.commandReact(message, 1);

		message.member.removeRole(targetRole);
		return message.member.setNickname().catch(message.reply('There was a problem changing your nickname, but you\'ve been removed from the clans role.'));
	}

	if (command === 'add') {
		const admin = message.guild.roles.find(x => x.name === 'Administrator');
		if (!message.member.roles.has(admin.id)) {
			client.udf.commandReact(message, 0);
			return message.reply('Only an Administrator can add a new clan.');
		}
		// add stuff
		client.udf.commandReact(message, 1);
		message.guild.createRole({ name: clanName }, `Added by ${message.author}`)
			.then(role => { return message.reply(`Added clan *${role.name}*`); })
			.catch(console.error);
	}

	if (command === 'remove') {
		const admin = message.guild.roles.find(x => x.name === 'Administrator');
		if (!message.member.roles.has(admin.id)) {
			client.udf.commandReact(message, 0);
			return message.reply('Only an Administrator can remove a clan.');
		}
		const targetRole = message.guild.roles.find(x => x.name === clanName);
		// remove stuff
		client.udf.commandReact(message, 1);
		targetRole.delete(`Removed by: ${message.author}`).then(message.reply('Clan removed.')).catch(console.error);

	}
};
