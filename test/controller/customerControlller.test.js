const request = require("supertest");
const app = require("../../src/index");
const mysql = require("mysql2/promise");
const jwt = require("jsonwebtoken");

let authToken;

beforeAll(async () => {
  authToken = jwt.sign({ id: 1, role: "user" }, "igotintochowdeck", { expiresIn: "1h" });
});

describe("Customer Controller", () => {
  describe("listVendor", () => {
    it("should return a list of vendors without passwords", async () => {
        const response = await request(app).get("/api/v1/customer/list-vendor").set("Authorization", `Bearer ${authToken}`);
        
        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            { id: 1, name: "Vendor1", email: "vendor1@example.com", role: "vendor" },
            { id: 2, name: "Vendor2", email: "vendor2@example.com", role: "vendor" }
        ]);
    });
  });

  describe("listMenuItemForVendor", () => {
    it("should return a list of menu items for a given vendor ID", async () => {
      const response = await request(app).get("/api/v1/customer/list-menu-item-for-vendor?vendorId=1").set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        { id: expect.any(Number), name: "MenuItem1", vendorId: 1, price: "10.00" },
        { id: expect.any(Number), name: "MenuItem2", vendorId: 1, price: "15.00" },
      ]);
    });

    it("should return 404 if vendor ID is not provided", async () => {
      const response = await request(app).get("/api/v1/customer/list-menu-item-for-vendor").set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Vendor with the given ID not found. Please enter a valid ID" });
    });

    it("should return 404 if no menu items are found for a given vendor ID", async () => {
      const response = await request(app).get("/api/v1/customer/list-menu-item-for-vendor?vendorId=999").set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "No menu items found for vendor ID 999." });
    });
  });
});
