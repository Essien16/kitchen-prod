const express = require("express");
const auth = require("../../middleware/authMiddleware");
const customerAuthController = require("../../controllers/customer/authController");
const customerController = require("../../controllers/customer/customerController");

const router = express.Router();

router.post("/signup", customerAuthController.signup);
router.post("/login", customerAuthController.login);
router.get("/vendors", auth, customerController.listVendor);
router.get("/vendors/:vendorId", auth, customerController.viewVendor); 
router.get("/vendors/:vendorId/menu-items", auth, customerController.listMenuItemForVendor);
router.get("/menu-items/:menuItemId", auth, customerController.viewMenuItemDetail); 

module.exports = {
    baseUrl: "/customer",
    router,
};
