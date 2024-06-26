const express = require("express");
const vendorController = require("../../controllers/vendor/vendorController");

const router = express.Router();

router.post("/view-vendor", vendorController.viewVendorController);
router.post("/add-menu-item", vendorController.addMenuItem);
router.post("/list-menu-item", vendorController.listMenuItems);
router.patch("/update-menu-item", vendorController.updateMenuItem);
router.delete("/delete-menu-item", vendorController.deleteMenuItem);


module.exports = {
    baseUrl: "/vendor",
    router
};