const db = require("../configs/database");

class Menu {
    static async createMenuItem(vendorId, name, description, price) {
        const sql = `INSERT INTO menu (vendor_id, name, description, price) VALUES (?, ?, ?, ?)`;
        try {   
            const result = await db.execute(sql, [vendorId, name, description, price]);
            return result[0].insertId;
        } catch (error) {
            throw new Error(`Error while creating menu item: ${error.message}`);
        }
    }

    static async updateMenuItem(id, name, description, price) {
        const sql = `UPDATE menu SET name = ?, description = ?, price = ? WHERE id = ?`;
        try {
            const result = await db.execute(sql, [name, description, price, id]);
            return result[0].affectedRows;
        } catch (error) {
            throw new Error(`Error updating menu item: ${error.message}`);
        }
    }

    static async deleteMenuItem(id) {
        const sql = `DELETE FROM menu WHERE id = ?`;
        try {
            const result = await db.execute(sql, [id]);
            return result[0].affectedRows;
        } catch (error) {
            throw new Error(`Error deleting menu item: ${error.message}`);
        }
    }

    static async findMenuItemById(id) {
        const sql = `SELECT * FROM menu WHERE id = ?`;
        try {
            const [rows] = await db.execute(sql, [id]);
            return rows[0]; 
        } catch(error) {
            throw new Error(`Error finding menu item with ID ${id}: ${error.message}`);
        }
    }

    static async findMenuItemsByVendorId(vendorId) {
        const sql = `SELECT * FROM menu WHERE vendor_id = ?`;
        try {
            const [rows] = await db.execute(sql, [vendorId]);
            return rows;
        } catch (error) {
            throw new Error(`Error finding menu items for vendor ID ${vendorId}: ${error.message}`);
        }
    }
}

module.exports = Menu;
