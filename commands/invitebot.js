exports.run = async (client, message) => {
	client.udf.commandReact(message, 1);
	const userId = client.config.userid;
	const userName = client.user.username;
	const url = `You can invite ***${userName}*** to your server with this link:\r\nhttps://discordapp.com/oauth2/authorize?client_id=${userId}&scope=bot&permissions=2146958847`;
	return message.channel.send(url);
};
