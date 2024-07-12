const vendorAccess = require("../access/vendorAccess");
const menuItemAccess = require("../access/menuItemAccess");

const getVendorById = async (vendorId) => {
    try {
        return await vendorAccess.findVendorById(vendorId);
    } catch (error) {
        // console.error(`Error getting vendor by ID ${vendorId}:`, error);
        throw new Error('Could not get vendor by ID');
    }
};

const createMenuItem = async (vendorId, name, description, price) => {
    try {
        return await menuItemAccess.createMenuItem(vendorId, name, description, price);
    } catch (error) {
        // console.error(`Error creating menu item for vendor ${vendorId}:`, error);
        throw new Error('Could not create menu item');
    }
};

const getMenuItemsByVendorId = async (vendorId) => {
    try {
        return await menuItemAccess.findMenuItemsByVendorId(vendorId);
    } catch (error) {
        // console.error(`Error getting menu items for vendor ${vendorId}:`, error);
        throw new Error('Could not get menu items for vendor');
    }
};

const updateMenuItem = async (id, name, description, price) => {
    try {
        return await menuItemAccess.updateMenuItem(id, name, description, price);
    } catch (error) {
        // console.error(`Error updating menu item ${itemId}:`, error);
        throw new Error('Could not update menu item');
    }
};

const deleteMenuItem = async (id) => {
    try {
        return await menuItemAccess.deleteMenuItem(id);
    } catch (error) {
        // console.error(`Error deleting menu item ${id}:`, error);
        throw new Error('Could not delete menu item');
    }
};

module.exports = {
    getVendorById,
    createMenuItem,
    getMenuItemsByVendorId,
    updateMenuItem,
    deleteMenuItem
};
