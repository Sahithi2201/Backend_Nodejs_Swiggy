// const Firm = require('../models/Firm');
// const Vendor = require('../models/vendor'); 
// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// const upload = multer({ storage: storage });

// const addFirm = async (req, res) => {
//     try {
//         const { firmName, area, category, region, offer } = req.body;
//         const image = req.file ? req.file.path : undefined;

//         const vendor = await Vendor.findById(req.vendorId);

//         if (!vendor) {
//             return res.status(404).json({ message: "Vendor not found" });
//         } // ✅ FIXED: closed if block

//         const firm = new Firm({
//             firmName,
//             area,
//             category,
//             region,
//             offer,
//             image,
//             vendor: vendor._id
//         });

//         await firm.save();

//         return res.status(201).json({
//             message: "Firm added successfully",
//             firm
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };

// module.exports = {
//     addFirm: [upload.single('image'), addFirm]
// };

const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ✅ Auto-create uploads folder if it doesn't exist
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

const addFirm = async (req, res) => {
    try {
        const { firmName, area, category, region, offer } = req.body;
        const image = req.file ? req.file.path : undefined;

        const vendor = await Vendor.findById(req.vendorId);

        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        const firm = new Firm({
            firmName,
            area,
            category: Array.isArray(category) ? category : [category],
            region: Array.isArray(region) ? region : [region],
            offer,
            image,
            vendor: [vendor._id]
        });

        const savedFirm = await firm.save();

        vendor.firm.push(savedFirm._id);
        await vendor.save();

        return res.status(201).json({
            message: "Firm added successfully",
            firm: savedFirm
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { upload, addFirm };