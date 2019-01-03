module.exports = (client, message) => {
	// Ignore all bots
	if (message.author.bot) return;


	// if message is trigger or prefix respond with the prefix
	if (
		message.content.toLowerCase() === 'trigger' ||
		message.content.toLowerCase() === 'prefix'
	) {
		return message.reply(`My trigger is ${client.config.prefix}`);
	}

	// if message contains text between square brackets link the wf item
	const matches = message.content.match(/\[(.*?)\]/);
	if (matches) {
		const submatch = matches[1];
		const args = submatch.trim().split(/ +/g);
		const command = 'link';
		const cmd = client.commands.get(command);
		return cmd.run(client, message, args);
	}


	if (message.content.startsWith(client.config.queryPrefix)) {
		console.log('query');
		const args = message.content
			.slice(client.config.queryPrefix.length)
			.trim()
			.split(/ +/g);
		const command = args.shift().toLowerCase();
		const query = client.query.get(command);
		if (query) {
			query.run(client, message, args);
		}
		else if (!query) {
			// stuff for not matching a query command

		}

		// const args = submatch.trim().split(/ +/g);
		// const command = 'link';
		// const cmd = client.commands.get(command);
		// return cmd.run(client, message, args);
	}


	if (message.content.indexOf(client.config.prefix) !== 0) return;

	// Our standard argument/command name definition.
	const args = message.content
		.slice(client.config.prefix.length)
		.trim()
		.split(/ +/g);
	const command = args.shift().toLowerCase();

	// Grab the command data from the client.commands Enmap
	const cmd = client.commands.get(command);

	// If that command doesn't exist, silently exit and do nothing
	if (!cmd) return;

	// Run the command
	cmd.run(client, message, args);
};
