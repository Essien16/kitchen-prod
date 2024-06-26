const db = require("../configs/database");

class User {
    static async createUser({ name, email, password, role }) {
        const sql = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
        try {
            const result = await db.execute(sql, [name, email, password, role]);
            return result[0].insertId; 
        } catch (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }

    static async findOneByEmail(email) {
        const sql = `SELECT * FROM users WHERE email = ? LIMIT 1`;
        const [rows] = await db.execute(sql, [email]);
        return rows[0];
    }

    static findUserById(id, callback) {
        const sql = `SELECT * FROM users WHERE id = ?`;
        db.query(sql, [id], (err, results) => {
            callback(err, results[0]);
        });
    }

    static findAllVendors(callback) {
        const sql = `SELECT * FROM users WHERE role = 'vendor'`;
        db.query(sql, (err, results) => {
            callback(err, results);
        });
    }
}

module.exports = User;
