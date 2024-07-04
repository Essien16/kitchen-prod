const mysql = require("mysql2/promise");
require("dotenv").config({ path: ".env.test" });

const { DB_TEST_HOST, DB_TEST_USER, DB_TEST_PASS, DB_TEST_NAME } = process.env;

const createTestDatabase = async () => {
  const connection = await mysql.createConnection({ host: DB_TEST_HOST, user: DB_TEST_USER, password: DB_TEST_PASS });
  await connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_TEST_NAME}`);
  await connection.query(`USE ${DB_TEST_NAME}`);
  await connection.query(`
    CREATE TABLE IF NOT EXISTS vendors (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    )
  `);
  await connection.end();
};

const dropTestDatabase = async () => {
  const connection = await mysql.createConnection({ host: DB_TEST_HOST, user: DB_TEST_USER, password: DB_TEST_PASS });
  await connection.query(`DROP DATABASE IF EXISTS ${DB_TEST_NAME}`);
  await connection.end();
};

beforeAll(async () => {
  await createTestDatabase();
});

afterAll(async () => {
  await dropTestDatabase();
});
