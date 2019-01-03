exports.run = async (client, message) => {
	const usage = `Usage: ${client.config.queryPrefix}add <user mention>`;
	if (!message.mentions.members.first()) {
		client.udf.commandReact(message, 0);
		return message.channel.send(usage);
	}
	const targetUser = message.mentions.members.first();
	let data = {
		userId: targetUser.id,
		userName: targetUser.username,
		userNick: targetUser.displayName,
		promotedById: message.author.id,
		promotedByname: message.author.username,
		rank: 'Seeker',
	};
	client.db.collection('seekers').doc(targetUser.username).set({ data }, { merge: true });
};
