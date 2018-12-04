module.exports = (client, message) => {
	// Ignore all bots
	if (message.author.bot) return;

	// Ignore messages not starting with the prefix (in config.json)
	if (
		message.content.toLowerCase() === 'trigger' ||
		message.content.toLowerCase() === 'prefix'
	) {
		return message.reply(`My trigger is ${client.config.prefix}`);
	}

	const matches = message.content.match(/\[(.*?)\]/);
	if (matches) {
		console.log('link item');
		const submatch = matches[1];
		const args = submatch.trim().split(/ +/g);
		const command = 'link';
		const cmd = client.commands.get(command);
		return cmd.run(client, message, args);
	}
	{
		if (message.content.indexOf(client.config.prefix) !== 0) return;
	}

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
