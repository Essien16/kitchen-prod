const Vendor = require("../models/vendor");
const MenuItem = require("../models/menu");

const vendorService = {
    getVendorByName: async (name) => {
        const vendor = await Vendor.findOneByName(name);
        return vendor;
    },

    createMenuItem: async (vendorId, name, description, price) => {
        const menuItem = await MenuItem.createMenuItem(vendorId, name, description, price);
        return menuItem;
    },

    getMenuItemsByVendorId: async (vendorId) => {
        const menuItems = await MenuItem.findMenuItemsByVendorId(vendorId);
        return menuItems;
    },

    updateMenuItem: async (id, name, description, price) => {
        const affectedRows = await MenuItem.updateMenuItem(id, name, description, price);
        return affectedRows;
    },

    deleteMenuItem: async (id) => {
        const affectedRows = await MenuItem.deleteMenuItem(id);
        return affectedRows;
    }
};

module.exports = vendorService;
