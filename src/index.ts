import { Client } from 'discord.js';
import { config } from './config';
import { commands } from './commands';
import { deployCommands } from './deploy-commands';
import dbConnection from './database';


const client = new Client({
	intents: [
	"Guilds",
	"GuildMessages",
	"DirectMessages"
	],
	databaseConnection: dbConnection
})

client.once("ready", ()=>{
	console.log(`${client.user.tag} Is Ready !`);
});

client.on("guildCreate", async (guild) => {
	await deployCommands({ guildId: guild.id });
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;
	if (commands[commandName as keyof typeof commands]) {
		commands[commandName as keyof typeof commands].execute(interaction);
	}
});

client.login(config.DISCORD_TOKEN);