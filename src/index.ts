import { Client, ActivityType } from 'discord.js';
import { config } from './config';
import { commands } from './commands';
import { deployCommands } from './bin/deploy-commands';
import dbConnection from './bin/database';


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
	client.user.setPresence({
		activities: [{
			name: 'Komunitas',
			type: ActivityType.Watching
		}],
		status: 'idle'
	})
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