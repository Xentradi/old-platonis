module.exports = (client, guildMember) => {
	const lotusChildren = '517875377494818826';
	const theGuild = guildMember.guild;
	if (theGuild.id !== lotusChildren) return;
	const uvRole = theGuild.roles.find(x => x.name === 'uv');
	guildMember.addRole(uvRole.id);
};
