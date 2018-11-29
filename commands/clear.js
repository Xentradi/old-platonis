exports.run = async (client, message) => {
	if (!client.udf.botHasPerm('MANAGE_MESSAGES', message)) {
		client.udf.commandReact(message, 0);
		return message.channel.send('I have insufficient permissions to complete that task.');
	}
	if (!client.udf.userHasPerm('MANAGE_MESSAGES', message)) {
		client.udf.commandReact(message, 0);
		return message.channel.send('You have insufficient permissions to do that!');
	}
	client.udf.commandReact(message, 1);

	let count = 0;
	let completed = false;

	while (completed === false) {
		const messages = await message.channel.fetchMessages({ limit: 100 });
		const messagesArr = messages.array();
		const messageCount = messagesArr.length;
		message.channel.bulkDelete(messageCount);
		count = count + messageCount;

		const check = await message.channel.fetchMessages({ limit: 5 });
		const checkArr = check.array();
		const checkCount = checkArr.length;
		if (checkCount == 0) {
			completed = true;
		}

	}
	const mes = await message.channel.send('Deleted ' + count + ' messages.');
	mes.delete(2000);
};
