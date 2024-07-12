const MenuItem = require("../models/menu");

const createMenuItem = async (vendorId, name, description, price) => {
    return await MenuItem.createMenuItem(vendorId, name, description, price);
};

const findMenuItemsByVendorId = async (vendorId) => {
    return await MenuItem.findMenuItemsByVendorId(vendorId);
};

const findMenuItemById = async (itemId) => {
    return await MenuItem.findMenuItemById(itemId);
};

const updateMenuItem = async (id, name, description, price) => {
    return await MenuItem.updateMenuItem(id, name, description, price);
};

const deleteMenuItem = async (id) => {
    return await MenuItem.deleteMenuItem(id);
};

module.exports = {
    createMenuItem,
    findMenuItemsByVendorId,
    findMenuItemById,
    updateMenuItem,
    deleteMenuItem
};
