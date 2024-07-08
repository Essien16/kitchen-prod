const request = require("supertest");
const server = require("../../src/index");

describe("Vendor Controller", () => {
    describe("viewVendorController", () => {
        it("should return the details of the vendor", async () => {
            const response = await request(server).get("/api/v1/vendor/view-vendor-profile?name=vendor1");

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                name: "Vendor1",
                id: 1,
                email: "vendor1@example.com",
                password: "password1",
                role: "vendor"
            });
        });

        it("should return 404 if vendor Id is invalid or not found", async () => {
            const response = await request(server).get("/api/v1/vendor/view-vendor-profile?name=null");

            expect(response.status).toBe(404);
            expect(response.body).toEqual({
                message: "Vendor not found"
            });
        });
    });

    describe("Add menu items", () => {
        it("should add a menu item for a vendor with valid id", async () => {
            const newMenuItem = {
                vendorId: 1,
                name: "MenuItem1",
                price: "10.00",
                description: "Menu item 1 for vendorId 1"
            };
            const response = await request(server).post("/api/v1/vendor/add-menu-item").send(newMenuItem);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Item added successfully.");
        });

        it("should return 400 if all inputs are not filled", async () => {
            const newMenuItem = {
                vendorId: 1,
                name: "MenuItem1",
                description: "Menu item 1 for vendorId 1"
            };
            const response = await request(server).post("/api/v1/vendor/add-menu-item").send(newMenuItem);
            
            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                message: "Kindly input all fields."
            });
        });
    });

    describe("list menu Items for vendors", () => {
        it("should return the list of menu items for a vendor with valid ID", async () => {
            const vendorId = 1;

            const response = await request(server).post("/api/v1/vendor/list-menu-item").send({vendorId: vendorId});

            expect(response.status).toBe(200);
            expect(response.body.length).toBeGreaterThanOrEqual(2);
        });
        
        it("should return 400 if an invalid vendor ID is passed or no vendor Id is passed", async () => {
            const vendorId = 999;

            const response = await request(server).post(`/api/v1/vendor/list-menu-item?vendorId=${vendorId}`)

            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                message: "Vendor ID is required."
            });
        });
    });

    describe("Update Menu Item", () => {
        it("should update a menu item with valid data", async () => {
            const menuItemToUpdate = {
                id: 1,
                name: "Updated MenuItem",
                description: "Updated menu item description",
                price: "20.00"
            };
    
            const response = await request(server).patch("/api/v1/vendor/update-menu-item").send(menuItemToUpdate);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                message: "Menu Item updated successfully."
            });
        });

        it("should return 400 if any field is missing in the request", async () => {
            const invalidUpdate = {
                id: 1,
                description: "Updated menu item description"
            };
            const response = await request(server).patch("/api/v1/vendor/update-menu-item").send(invalidUpdate);

            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                message: "All fields required to update Menu"
            });
        });

        it("should return 404 if invalid menu item is passed", async () => {
            const wrongItemId = {
                id: 999,
                name: "Updated MenuItem",
                description: "Updated menu item description",
                price: "20.00"
            };
            const response = await request(server).patch("/api/v1/vendor/update-menu-item").send(wrongItemId);

            expect(response.status).toBe(404);
            expect(response.body).toEqual({
                message: "Menu item not found"
            });
        });
    });

    describe("Delete Menu Item", () => {
        it("should delete menu item with valid ID", async () => {
            const menuItemId = 1;

            const response = await request(server).delete("/api/v1/vendor/delete-menu-item").send({ id: menuItemId });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                message: "Menu Item deleted successfully."
            });
        });

        it("should return 404 if menu item does not exist", async () => {
            const menuItemId = 999;
    
            const response = await request(server).delete("/api/v1/vendor/delete-menu-item").send({ id: menuItemId });
    
            expect(response.status).toBe(404);
            expect(response.body).toEqual({
                message: "Menu item does not exist."
            });
        });

        it("should return 400 if no ID is provided", async () => {
            const response = await request(server).delete("/api/v1/vendor/delete-menu-item").send({});
    
            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                message: "Menu item with the given Id does not exist."
            });
        });
    });
});