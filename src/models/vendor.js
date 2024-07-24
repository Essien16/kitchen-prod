const db = require("../configs/database");

class Vendor {
    static async createVendor({ name, email, password, role}) {
        const sql = `INSERT INTO vendors (name, email, password, role) VALUES (?, ?, ?, ?)`;
        try {
            const result = await db.execute(sql, [name, email, password, role]);
            return result[0].insertId;
        } catch (error) {
            throw new Error(`Error creating vendor: ${error.message}`)
        }
    }
    static async findOneByName(name) {
        const sql = `SELECT * FROM vendors WHERE name = ? LIMIT 1`;
        try {
            const [rows] = await db.execute(sql, [name]);
            return rows[0]
        } catch (error) {
            throw new Error(`Error finding vendor by name: ${error.message}`);
        }
    }

    static async findUserById(id) {
        const sql = `SELECT * FROM vendors WHERE id = ?`;
        try {
            const [rows] = await db.execute(sql, [id]);
            return rows[0];
        } catch (error) {
            throw new Error(`Error finding vendor by ID: ${error.message}`);
        }
    }

    static async findAllVendors() {
        const sql = `SELECT * FROM vendors`;
        try {
            const [rows] = await db.execute(sql);
            return rows;
        } catch(error) {
            throw new Error(`Error fetching vendors: ${error.message}`)
        }
    }
};

module.exports = Vendor;