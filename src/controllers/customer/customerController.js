const Vendor = require("../../models/vendor");
const MenuItem = require("../../models/menu")

const Controller = {
    listVendor: async (req, res) => {
        try {
            const vendors = await Vendor.findAllVendors();
            return res.status(200).json(vendors);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error."});
        }
    },

    listMenuItemForVendor: async (req, res) => {
        const vendorId = req.query;
        if (!vendorId) {
            return res.status(404).json({ message: "Vendor with the given ID not found. Please enter a valid ID"})
        }
        try {
            const menuItem = await MenuItem.findMenuItemsByVendorId(vendorId);
            if (!menuItem || menuItem.length === 0) {
                return res.status(404).json({ message: `No menu items found for vendor ID ${vendorId}.` });
            }
            return res.status(200).json(menuItem);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error."})
        }
    }
};

module.exports = Controller;