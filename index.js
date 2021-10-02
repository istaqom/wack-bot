const fs = require('fs');
const Discord = require('discord.js');
// const { token, prefix } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.once('ready', () => {
	console.log(`Logged in as @${client.user.tag}`);
    client.user.setActivity('Listening to w!', { type: 'LISTENING' });
});

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('message', async message => {
    if (message.content.toLowerCase().includes("istaqom") && !message.author.bot) {
        await message.react('793517709543211028');
    }

	if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

	const args = message.content.slice(process.env.PREFIX.length).trim().split(' ');
	const command = args.shift().toLowerCase();
	
    if (!client.commands.has(command)) return;

	try {
		await client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		await message.reply('there was an error trying to execute that command!');
	}
});

client.login(process.env.TOKEN);