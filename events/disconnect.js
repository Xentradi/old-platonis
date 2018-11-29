module.exports = (client, event) => {
	client.logger.log('error', 'Web socket closed \r\n' + event);
};
