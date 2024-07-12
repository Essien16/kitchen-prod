const customerService = require("../../services/customerService");

const Controller = {
    listVendor: async (req, res) => {
        try {
            const vendors = await customerService.listVendors();
            return res.status(200).json(vendors);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error."});
        }
    },

    listMenuItemForVendor: async (req, res) => {
        const vendorId = req.params.vendorId;
        if (!vendorId) {
            return res.status(404).json({ message: "Vendor with the given ID not found. Please enter a valid ID"})
        }
        try {
            const menuItems = await customerService.listMenuItemsForVendor(vendorId);
            if (!menuItems || menuItems.length === 0) {
                return res.status(404).json({ message: `No menu items found for vendor ID ${vendorId}.` });
            }
            return res.status(200).json(menuItems);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error."})
        }
    },

    viewVendor: async (req, res) => {
        const { name } = req.params;
        try {
            const vendor = await customerService.getVendorByName(name);
            if (!vendor) {
                return res.status(404).json({ message: "Vendor not found"});
            }
            return res.status(200).json(vendor);
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
            const item = await customerService.getMenuItemById(itemId);
            if (!item) {
                return res.status(404).json({ message: "Item not found" })
            }
            return res.status(200).json(item);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error"});
        }
    }
};

module.exports = Controller;
