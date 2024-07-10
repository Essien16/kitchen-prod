const Vendor = require("../models/vendor");
const MenuItem = require("../models/menu");

const vendorService = {
    listVendors: async () => {
        const vendors = await Vendor.findAllVendors();
        return vendors.map(({ password, ...listvendors }) => listvendors);
    },

    listMenuItemsForVendor: async (vendorId) => {
        const menuItem = await MenuItem.findMenuItemsByVendorId(vendorId);
        return menuItem;
    },

    getVendorByName: async (name) => {
        const vendor = await Vendor.findOneByName(name);
        if (vendor) {
            const { password, ...viewVendor } = vendor;
            return viewVendor;
        }
        return null;
    },

    getMenuItemById: async (itemId) => {
        const item = await MenuItem.findMenuItemById(itemId);
        return item;
    }
};

module.exports = vendorService;
