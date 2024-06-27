const express = require("express");
const auth = require("../../middleware/authMiddleware");
const customerAuthController = require("../../controllers/customer/authController");
const customerController = require("../../controllers/customer/customerController");

const router = express.Router();;

router.post("/signup", customerAuthController.signup);
router.post("/login", customerAuthController.login);
router.get("/list-vendor", auth, customerController.listVendor);
router.get("/list-menu-item-for-vendor", auth, customerController.listMenuItemForVendor);
router.post("/vendor-info", auth, customerController.viewVendor);
router.get("/menu-item-details", auth, customerController.viewMenuItemDetail);


module.exports = {
    baseUrl: "/customer",
    router,
}