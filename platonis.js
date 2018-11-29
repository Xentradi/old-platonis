// 4
const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');
const Enmap = require('enmap');
const winston = require('winston');

const client = new Discord.Client({ disableEveryone: true });

// Include shortcut. Require files by: include('path/relative/to/root/file.js');
global.base_dir = __dirname;
global.abs_path = function(path) {
	return base_dir + path;
};
global.include = function(file) {
	return require(abs_path('/' + file));
};

const config = include('config.json');
const token = include('token.json').token;
const warframe = include('warframe.js');
const functions = include('functions.js');
client.warframe = warframe;
client.config = config;
client.udf = functions;

// create winston logger
const logger = winston.createLogger({
	level: 'info',
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.printf(info => {
			return `[${info.level}] ${info.timestamp}:  ${info.message}`;
		})
	),
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: 'botLog.log' }),
	],
});

client.logger = logger;

// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir('./events/', (err, files) => {
	if (err) return client.logger.log('error', err);
	files.forEach(file => {
		if (!file.endsWith('.js')) return;
		const event = require(`./events/${file}`);
		const eventName = file.split('.')[0];
		client.on(eventName, event.bind(null, client));
		delete require.cache[require.resolve(`./events/${file}`)];
	});
});

client.commands = new Enmap();
// This loop reads the commandDirs array from config.json and loops through each directory in the /commands/ folder.
fs.readdir('./commands/', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		if (!file.endsWith('.js')) return;
		// Load the command file itself
		const props = require(`./commands/${file}`);
		// Get just the command name from the file name
		const commandName = file.split('.')[0];
		client.logger.log('info', `Loading command ${commandName}`);
		// Here we simply store the whole thing in the command Enmap. We're not running it right now.
		client.commands.set(commandName, props);
	});
});


client.login(token);
