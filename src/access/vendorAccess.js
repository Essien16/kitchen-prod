const Vendor = require("../models/vendor");

const findAllVendors = async () => {
    return await Vendor.findAllVendors();
};

const findVendorByName = async (name) => {
    const vendor = await Vendor.findOneByName(name);
    if (vendor) {
        const { password, ...veiwVendorDetails} = vendor;
        return veiwVendorDetails;
    };
    return null;
};

const findVendorById = async (name) => {
    return await Vendor.findOneByName(name);
};

module.exports = {
    findAllVendors,
    findVendorByName,
    findVendorById
};
