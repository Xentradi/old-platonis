module.exports = (client, guildMember) => {
	const member = guildMember;
	const guild = member.guild;
	client.logger.log('info', `${member} has joined ${guild}.`);
};
