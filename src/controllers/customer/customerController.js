const Vendor = require("../../models/vendor");
const MenuItem = require("../../models/menu")

const Controller = {
    listVendor: async (req, res) => {
        try {
            const vendors = await Vendor.findAllVendors();

            const listvendors = vendors.map(({ password, ...listvendors }) => listvendors);
            return res.status(200).json(listvendors);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error."});
        }
    },

    listMenuItemForVendor: async (req, res) => {
        const vendorId = req.query.vendorId;
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
    },

    viewVendor: async (req, res) => {
        const { name } = req.query;
        try {
            const vendor = await Vendor.findOneByName(name);
            if (!vendor) {
                return res.status(404).json({ message: "Vendor not found"});
            }
            const { password, ...viewVendor } = vendor; 
            return res.status(200).json(viewVendor)
        } catch (error) {
            return res.status(500).json({ message: "Internal server error"})
        }
    },

    viewMenuItemDetail: async (req, res) => {
        const { itemId } = req.query;

        if (!itemId) {
            return res.status(400).json({ message: "Item ID is required."})
        }
        try {
            const item = await MenuItem.findMenuItemById(itemId);
            if (!item) {
                return res.status(404).json({ message: "Item not found" })
            }
            return res.status(200).json(item)
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error"});
        }
    }
};

module.exports = Controller;