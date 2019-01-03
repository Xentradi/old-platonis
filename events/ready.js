module.exports = client => {
	client.logger.log(
		'info',
		`Logged in as ${client.user.username}. Connected to ${
			client.guilds.size
		} servers.`
	);
	client.user.setActivity(client.config.activityText, {
		type: client.config.activityType,
	});
};
