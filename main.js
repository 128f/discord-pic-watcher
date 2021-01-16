const Discord = require('discord.js');
const config = require('./config.json');
var fs = require('fs');

const directory = config.user.directory;
const channel = new Discord.WebhookClient(config.discord.webhookID, config.discord.webhookToken);

// send just an image on the channel
const sendImage = (filename) => {
	const embed = new Discord.MessageAttachment(filename)
	channel.send(embed);
}

// send an image with the users name and color
const sendMessage = (dir, filename) => {
	const embed = new Discord.MessageEmbed()
		// .setTitle(config.user.displayName)
		.setColor(config.user.color)
		.attachFiles([dir + filename])
		.setImage(`attachment://${filename}`);
	channel.send(`**${config.user.displayName}** uploaded a screenshot`, embed);
}

fs.watch(directory, { recursive: false }, function(evt, name) {
	if(evt === "change") { sendMessage(directory, name); }
});
