const request = require("supertest");
const server = require("../../src/index");
const Vendor = require("../../src/models/vendor");
const { response } = require("../../src/app");

jest.mock("../../src/middleware/authMiddleware", () => jest.fn((req, res, next) => {
  req.user = { id: 1 }; 
  next();
}));

describe("Customer Controller", () => {
  beforeEach(async () => {
    await Vendor.createVendor({ name: "Vendor1", email: "vendor1@gmail.com.com", password: "pass1", role: "vendor" });
    await Vendor.createVendor({ name: "Vendor2", email: "vendor2@gmail.com.com", password: "pass2", role: "vendor" });
  });

  afterEach(async () => {
    await Vendor.clearTable();
  });

  describe("GET /api/v1/customer/list-vendor", () => {
    it("should return the list of vendors in the database without showing the passwords", async () => {
      const res = await request(server).get("/api/v1/customer/list-vendor");

      expect(res.status).toBe(200);
      expect(res.body).toEqual([
        { id: expect.any(Number), email: "vendor1@gmail.com", name: "Vendor1", role: "vendor" },
        { id: expect.any(Number), email: "vendor2@gmail.com", name: "Vendor2", role: "vendor" }
      ]);
    });

    it("should handle internal server errors", async () => {
      const res = await response(server).get("/api/v1/customer/list-vendor");

      expect(res.status).toBe(500);
      expect(res.body).toEqual({
        message: "Internal server error"
      })
    });
  });

  describe("GET /api/v1/customer/list-menu-item-for-vendor", () => {
    it("should return the menu items for a vendor with valid ID", async () => {
      const vendorId = 1;

      const res = await request(server).get("/api/v1/customer/list-menu-item-for-vendor").query({ vendorId });

      expect(res.status).toBe(200);
      expect(res.body).toEqual([
        { id: 1, name: "item 1", description: "best item", price: 10.00 },
        { id: 2, name: "item 2", description: "cool item", price: 2.00 }
      ]);
    });

    it("should return 404 when a vendor with an invalid ID is passed", async () => {
      const vendorId = 999;

      const res = await request(server).get("/api/v1/customer/list-menu-item-for-vendor").query({ vendorId });

      expect(res.status).toBe(404);
      expect(res.body).toEqual({
        message: `No menu items found for vendor ID ${vendorId}.`
      });
    });
  });
});
