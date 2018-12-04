module.exports = (client, guildMember) => {
	const lotusChildren = '517875377494818826';
	const theGuild = guildMember.guild;
	if (theGuild.id !== lotusChildren) return;
	const uvRole = theGuild.roles.find(x => x.name === 'uv');
	/*
	const welcomeMessage = `
    Heya ${guildMember}! Welcome to the *Children of the Lotus.* We're glad you could join us.
    Before you can jump into things and start socializing with the rest of the alliance we're going to need to know which clan you're a member of.

    All **you** need to do is type:
    \`/clan join <clan name>\`
    Replace \`<clan name>\` with the name of the clan you're in.


    If there is a problem you can contact @Xentradi#7749
    `;
    guildMember.guild.channels.get('518314647699324948').send(welcomeMessage);
    */
	guildMember.addRole(uvRole.id);
};
