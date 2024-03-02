import { commandInteraction, SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import connection from '../bin/database'

export const data = new SlashCommandBuilder()
	.setName("register")
	.setDescription('Register yourself in our database!');

export async function execute(interaction: CommandInteraction) {
	const username = interaction.user.username; // Fetch the sender's username
  const userId = interaction.user.id;

  // Check if the user is already registered
  const checkSql = 'SELECT * FROM accounts WHERE username = ?';

  try {
      const existingUser = await new Promise((resolve, reject) => {
          connection.query(checkSql, [username], (error, results) => {
              if (error) reject(error);
              resolve(results[0]); // Return the first result if any
          });
      }); 

      if (existingUser) {
          return interaction.reply('You are already registered.');
      }

      // If the user is not registered, proceed with registration
      const sql = 'INSERT INTO accounts (username, userId) VALUES (?, ?)';

      const result = await new Promise((resolve, reject) => {
          connection.query(sql, [username, userId], (error, result) => {
              if (error) reject(error);
              resolve(result);
          });
      }); 

      interaction.reply('You have been registered successfully!');

  } catch (error) {
      console.error('Error during registration:', error);
      interaction.reply('An error occurred during registration. Please try again later.');
  }
}