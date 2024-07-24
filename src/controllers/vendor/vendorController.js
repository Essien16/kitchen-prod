const vendorService = require("../../services/vendorService");

const vendorController = {
    viewVendorProfile: async (req, res) => {
        const { vendorId } = req.params; 
        try {
            const vendor = await vendorService.getVendorById(vendorId); 
            if (!vendor) {
                return res.status(404).json({ message: "Vendor not found" });
            }
            return res.status(200).json(vendor);
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    addMenuItem: async (req, res) => {
        const { vendorId, name, description, price } = req.body;
        if (!vendorId || !name || !description || !price) {
            return res.status(400).json({ message: "Kindly input all fields." });
        }

        try {
            const menuItem = await vendorService.createMenuItem(vendorId, name, description, price);
            return res.status(201).json({ message: "Item added successfully.", menuItem });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error." });
        }
    },

    listMenuItemsForVendor: async (req, res) => {
        const { vendorId } = req.params; 

        if (!vendorId) {
            return res.status(400).json({ message: "Vendor ID is required." });
        }

        try {
            const menuItems = await vendorService.getMenuItemsByVendorId(vendorId);
            return res.status(200).json(menuItems);
        } catch (error) {
            return res.status(500).json({ message: "Internal server error." });
        }
    },

    updateMenuItem: async (req, res) => {
        const { id } = req.params; 
        const { name, description, price } = req.body;

        if (!id || !name || !description || !price) {
            return res.status(400).json({ message: "All fields required to update Menu" });
        }

        try {
            const affectedRows = await vendorService.updateMenuItem(id, name, description, price);
            if (affectedRows === 0) {
                return res.status(404).json({ message: "Menu item not found" });
            }
            return res.status(200).json({ message: "Menu Item updated successfully." });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    deleteMenuItem: async (req, res) => {
        const { id } = req.params; 

        if (!id) {
            return res.status(400).json({ message: "Menu item with the given Id does not exist." });
        }
        try {
            const affectedRows = await vendorService.deleteMenuItem(id);
            if (affectedRows === 0) {
                return res.status(404).json({ message: "Menu item does not exist." });
            }
            return res.status(200).json({ message: "Menu Item deleted successfully." });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error." });
        }
    }
};

module.exports = vendorController;
