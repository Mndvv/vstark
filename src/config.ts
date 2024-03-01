import dotenv from 'dotenv';

dotenv.config();

const {DISCORD_TOKEN, DISCORD_CLIENT_ID} = process.env;

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID){
	throw new Error('Missing Environment variables');
}

export const config = {
	DISCORD_TOKEN,
	DISCORD_CLIENT_ID,
};

export const dbConfig = {
	host: '127.0.0.1',
	user: 'root',
	password: '',
	database: 'tsbot'
};