const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('The server is working!'));

app.listen(port, () =>
	console.log(`This app is listening at http://localhost:${port}`)
);

const Discord = require('discord.js');
const config = require('./config.json');
const db = require('quick.db');

const client = new Discord.Client();

const prefix = '#';

client.on('message', function(message) {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;

	const commandBody = message.content.slice(prefix.length);
	const args = commandBody.split(' ');
	const command = args.shift().toLowerCase();

	if (command === 'ping') {
		const timeTaken = Date.now() - message.createdTimestamp;
		message.channel.send(`Pong! This message had a latency of ${timeTaken}ms.`);
	} else if (command === 'sum') {
		const numArgs = args.map(x => parseFloat(x));
		const sum = numArgs.reduce((counter, x) => (counter += x));
		message.channel.send(
			`The sum of all the arguments you provided is ${sum}!`
		);
	} else if (command === 'danger') {
		message.channel.send('Danger, in each passing stranger...');
	} else if (command === 'die') {
		message.channel.send('<a:GunCry:797305913500500050>');
	}
});

client.login(config.BOT_TOKEN);
