const mysql = require('mysql2');
require("dotenv").config();

let pool;

if (process.env.NODE_ENV === "production") {
    const dbUrl = process.env.JAWSDB_URL;
    pool = mysql.createPool(dbUrl);
} else {
    pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: process.env.DB_DEV_PASS,
        database: 'kitchen',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
}

// Check connection status
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL as id', connection.threadId);
    connection.release();
});

module.exports = pool.promise();

