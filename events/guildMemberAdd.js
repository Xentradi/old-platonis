module.exports = (client, guildMember) => {
	const lotusChildren = '517875377494818826';
	const guild = guildMember.guild;
	if (guild.id !== lotusChildren) return;
	console.log('new member in lotusChildren');
};
