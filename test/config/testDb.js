const mysql = require("mysql2/promise");

async function setupTestDatabase() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_TEST_PASS,
  });

  await connection.query("DROP DATABASE IF EXISTS kitchenTestDb");
  await connection.query("CREATE DATABASE kitchenTestDb");
  await connection.query("USE kitchenTestDb");

  await connection.query(`
    CREATE TABLE vendors (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(255) NOT NULL
    )
  `);

  await connection.query(`
    CREATE TABLE menuItems (
      id INT AUTO_INCREMENT PRIMARY KEY,
      vendorId INT NOT NULL,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      description VARCHAR(255) NOT NULL,
      FOREIGN KEY (vendorId) REFERENCES vendors(id)
    )
  `);

  await connection.query("INSERT INTO vendors (name, email, password, role) VALUES ('Vendor1', 'vendor1@example.com', 'password1', 'vendor')");
  await connection.query("INSERT INTO vendors (name, email, password, role) VALUES ('Vendor2', 'vendor2@example.com', 'password2', 'vendor')");
  await connection.query("INSERT INTO menuItems (id, vendorId, name, price, description) VALUES (1, 1, 'MenuItem1', 10.00, 'Menu item 1 for vendorId 1')");
  await connection.query("INSERT INTO menuItems (id, vendorId, name, price, description) VALUES (2, 1, 'MenuItem2', 15.00, 'Menu item 2 for vendorId 1')");

  await connection.end();
}

setupTestDatabase();
