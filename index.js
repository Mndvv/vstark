import { Client, GatewayIntentBits } from 'discord.js';
const client = new Client({ intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
	]});

const bot_token = "MTIxMzA5OTExMDYwMTcyODA2MQ.GUN0BV.11U4PAdAMNpDWFG0RPajg_wzShd8F6OLYicB5s";
const bot_prefix;

client.on('ready', ()=>{
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
	if (message.content.lowerCase() == bot_prefix) {
		await message.reply('Work!');
	}
});

client.login(bot_token)