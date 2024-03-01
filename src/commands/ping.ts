import { commandInteraction, SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName("ping")
	.setDescription('Replies with Pong!');

export async function execute(interaction: CommandInteraction) {
	const sentMessage = await interaction.reply({ content: 'Pinging...', fetchReply: true });

    const pingEmbed = new EmbedBuilder()
      .setTitle('Pong!')
      .addFields({
        name: 'Bot Latency',
        value: `${sentMessage.createdTimestamp - interaction.createdTimestamp}ms`,
      })
      .addFields({
         name: 'API Latency',
         value: `${Math.round(interaction.client.ws.ping)}ms`,
      })
      .setColor('Blurple');

    await interaction.editReply({ content: ' ', embeds: [pingEmbed] });
}