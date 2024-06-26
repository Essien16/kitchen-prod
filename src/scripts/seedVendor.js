const mysql = require("mysql2");
const db = require("../configs/database");


const createTableQuery = `
    CREATE TABLE IF NOT EXISTS vendors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('vendor') NOT NULL
    )
`;

async function createVendorsTable() {
    try {
        await db.execute(createTableQuery);
        console.log('Vendors table created successfully');
    } catch (err) {
        console.error('Error creating vendors table:', err);
    }
}

async function seedVendors() {
    const bcrypt = require('bcryptjs');
    const vendors = [
        { name: "koredespag", email: "korede@gmail.com", password: "password1", role: "vendor" },
        { name: "kingglab", email: "glab@gmail.com", password: "password2", role: "vendor" },
        { name: "justadakitchen", email: "just@gmail.com", password: "password3", role: "vendor" },
    ];

    try {
        await createVendorsTable();

        for (const vendor of vendors) {
            const hashedPassword = await bcrypt.hash(vendor.password, 8);
            const insertQuery = `
                INSERT INTO vendors (name, email, password, role) 
                VALUES (?, ?, ?, ?)
            `;
            await db.execute(insertQuery, [vendor.name, vendor.email, hashedPassword, vendor.role]);
            console.log(`Inserted vendor: ${vendor.name}`);
        }

        console.log("Data seeding completed.");
    } catch (err) {
        console.error("Error seeding vendors:", err);
    } finally {
        //db.close();
    }
}

seedVendors();
