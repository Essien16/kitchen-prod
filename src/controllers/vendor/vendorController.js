const Vendor = require("../../models/vendor");
const MenuItem = require("../../models/menu");

const Controller = {
    viewVendorController: async (req, res) => {
        const { name } = req.body;
        // const { name } = req.query;
        try {
            const vendor = await Vendor.findOneByName(name);
            if (!vendor) {
                return res.status(404).json({ message: "Vendor not found"});
            } 
            return res.status(200).json(vendor)
        } catch (error) {
            return res.status(500).json({ message: "Internal server error"})
        }
    },

    addMenuItem: async (req, res) => {
        const { vendorId, name, description, price } = req.body;
        if (!vendorId || !name || !description || !price) {
            return res.status(400).json({message: "Kindly input all fields."})
        }

        try {
            const menuItem = await MenuItem.createMenuItem(vendorId, name, description, price);
            return res.status(200).json({ message: "Item added successfully.", menuItem})
        } catch (error) {
            return res.status(500).json({ message: "Internal server error."})
        }
    },

    listMenuItems: async (req, res) => {
        const { vendorId } = req.query; //I'd have typically gotten the vendore ID from the header but for the sake of the task, I'm using this implementation.

        if(!vendorId) {
            return res.status(400).json({ message: "Vendor ID is required."})
        }

        try {
            const menuItem = await MenuItem.findMenuItemsByVendorId(vendorId);
            return res.status(200).json(menuItem);
        } catch (error) {
            return res.status(500).json({ message: "Internal server error."})
        }
    },

    updateMenuItem: async (req, res) => {
        const { id, name, description, price } = req.body;

        if (!id || !name || !description || !price) {
            return res.status(400).json({ message: "All fields required to update Menu"})
        }

        try {
            const affectedRows = await MenuItem.updateMenuItem(id, name, description, price);
            if (affectedRows === 0) {
                return res.status(400).json({ message: "Menu item not found"});
            }
            return res.status(200).json({ message: "Menu Item updated successfully."})
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error."})
        }
    },

    deleteMenuItem: async (req, res) => {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "Menu item with the given Id does not exist."})
        }
        try {
            const affectedRows = await MenuItem.deleteMenuItem(id);
            if (affectedRows === 0) {
                return res.status(404).json({ message: "Menu item does not exist."})
            }
            return res.status(200).json({ message: "Menu Item deleted successfully."})
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Internal server error."})
        }
    }
};

module.exports = Controller;