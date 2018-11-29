exports.run = (client, message, args) => {
	if (!client.udf.isOwner(message.author.id)) { return client.udf.commandReact(message, 0); }
	client.udf.commandReact(message, 1);

	if (!args || args.size < 1) return message.reply('Must provide a command name to reload.');
	const commandName = args[0];
	// Check if the command exists and is valid
	if (!client.commands.has(commandName)) {
		return message.reply('That command does not exist');
	}
	// the path is relative to the *current folder*, so just ./filename.js
	delete require.cache[require.resolve(`./${commandName}.js`)];
	// We also need to delete and reload the command from the client.commands Enmap
	client.commands.delete(commandName);
	const props = require(`./${commandName}.js`);
	client.commands.set(commandName, props);
	message.reply(`The command *${commandName}* has been reloaded`);
};