const express = require("express");
const vendorController = require("../../controllers/vendor/vendorController");

const router = express.Router();

router.get("/profile/:vendorId", vendorController.viewVendorProfile); 
router.post("/menu-items/add", vendorController.addMenuItem); 
router.get("/menu-items/vendor/:vendorId", vendorController.listMenuItemsForVendor); 
router.patch("update/menu-item/:itemId", vendorController.updateMenuItem); 
router.delete("/menu-item/:itemId", vendorController.deleteMenuItem); 

module.exports = {
    baseUrl: "/vendor",
    router
};
