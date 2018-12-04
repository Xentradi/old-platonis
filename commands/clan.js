exports.run = async (client, message, args) => {
	if (message.guild.id !== '517875377494818826') return;
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
	if (
		command !== 'join' &&
		command !== 'leave' &&
		command !== 'add' &&
		command !== 'remove'
	) {
		client.udf.commandReact(message, 0);
		return message.reply(usage);
	}

	if (command === 'join') {
		const targetRole =
			message.guild.roles.find(x => x.name === clanName) || false;
		const uvRole = message.guild.roles.find(x => x.name === 'uv');
		if (!roles.has(targetRole.id)) {
			client.udf.commandReact(message, 0);
			console.log(message.guild.roles.has(targetRole));
			const mes = await message.reply(
				'That is not a valid clan. Has your clan been added to the server yet?'
			);
			message.delete(8000);
			mes.delete(10000);
			return;
		}
		message.delete();
		client.udf.commandReact(message, 1);
		message.member.removeRole(uvRole.id);
		message.member.addRole(targetRole.id);
		const currentName = message.member.displayName;
		message.member.setNickname(`${currentName} [${clanName}]`).catch(err => {
			console.error(err);
		});
		return;
	}

	if (command === 'leave') {
		const targetRole = message.guild.roles.find(x => x.name === clanName);

		if (!roles.has(targetRole.id)) {
			client.udf.commandReact(message, 0);
			console.log(roles.has(targetRole));
			return message.reply(
				'That is not a valid clan. Has your clan been added to the server yet?'
			);
		}
		client.udf.commandReact(message, 1);

		message.member.removeRole(targetRole.id);
		message.member.setNickname().catch(err => {
			message.reply(
				'There was a problem changing your nickname, but you\'ve been removed from the clans role.'
			);
			console.error(err);
		});
		return;
	}

	if (command === 'add') {
		const admin = message.guild.roles.find(x => x.name === 'Administrator');
		if (!message.member.roles.has(admin.id)) {
			client.udf.commandReact(message, 0);
			return message.reply('Only an Administrator can add a new clan.');
		}
		// add stuff
		client.udf.commandReact(message, 1);
		message.guild
			.createRole({ name: clanName }, `Added by ${message.author}`)
			.then(role => {
				message.reply(`Added clan *${role.name}*`);
			})
			.catch(console.error);
		return;
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
		targetRole
			.delete(`Removed by: ${message.author}`)
			.then(message.reply('Clan removed.'))
			.catch(console.error);
		return;
	}
};
