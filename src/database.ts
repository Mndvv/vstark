import { dbConfig } from './config';

import mysql from 'mysql';

const connection = mysql.createConnection(dbConfig);

connection.connect((error)=>{
	if (error) {
		throw new Error(`Error connecting to database : ${error}`);
	} else {
		console.log(`Connected into ${dbConfig.host} as a host database of ${dbConfig.database}`);
	}
});

export default connection;