const vendorAccess = require("../access/vendorAccess");
const menuItemAccess = require("../access/menuItemAccess");

const listVendors = async () => {
    try {
        const vendors = await vendorAccess.findAllVendors();
        return vendors.map(({ password, ...listVendors}) => listVendors);
    } catch (error) {
        console.error('Error listing vendors:', error);
        throw new Error('Could not list vendors');
    }
};

const listMenuItemsForVendor = async (vendorId) => {
    try {
        return await menuItemAccess.findMenuItemsByVendorId(vendorId);
    } catch (error) {
        console.error(`Error listing menu items for vendor ${vendorId}:`, error);
        throw new Error('Could not list menu items for vendor');
    }
};

const getVendorByName = async (name) => {
    try {
        return await vendorAccess.findVendorByName(name);
    } catch (error) {
        console.error(`Error getting vendor by name ${name}:`, error);
        throw new Error('Could not get vendor by name');
    }
};

const getMenuItemById = async (itemId) => {
    try {
        return await menuItemAccess.findMenuItemById(itemId);
    } catch (error) {
        console.error(`Error getting menu item by id ${itemId}:`, error);
        throw new Error('Could not get menu item by id');
    }
};

module.exports = {
    listVendors,
    listMenuItemsForVendor,
    getVendorByName,
    getMenuItemById
};
