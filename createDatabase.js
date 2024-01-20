const mysql = require ('mysql2/promise');

async function createDatabase () {
  const connection = await mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'password',
  });

  await connection.query ('CREATE DATABASE IF NOT EXISTS testeone;');
  await connection.end ();
}

createDatabase ();
