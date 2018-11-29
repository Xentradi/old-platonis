exports.run = async (client, message) => {
	client.udf.commandReact(message, 1);
	const m = await message.channel.send('Ping?');
	m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
};
