
const Product = require('../models/Product');
const multer = require('multer');
const Firm = require('../models/Firm');
const path = require('path');
const fs = require('fs');

const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const addProduct = async (req, res) => {
    upload.single('image')(req, res, async function (err) {
        if (err) {
            return res.status(400).json({ message: "File upload error", error: err.message });
        }
        try {
            const { productName, price, category, bestseller, description } = req.body;
            const image = req.file ? req.file.path : undefined;
            const firmId = req.params.firmId;

            const firm = await Firm.findById(firmId);
            if (!firm) {
                return res.status(404).json({ message: "Firm not found" });
            }

            const product = new Product({
                productName,
                price,
                category: Array.isArray(category) ? category : [category],
                image,
                bestseller,
                description,
                firm: [firm._id]
            });

            const savedProduct = await product.save();
            firm.products.push(savedProduct._id);
            await firm.save();

            return res.status(201).json({ message: "Product added successfully", product: savedProduct });
        } catch (error) {
            console.error("Error adding product:", error);
            return res.status(500).json({ message: error.message }); // ← show real error
        }
    });
};

// ✅ Only ONE getProductByFirm
const getProductByFirm = async (req, res) => {
    try {
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId).populate('products');
        if (!firm) {
            return res.status(404).json({ message: "Firm not found" });
        }
        const products = await Product.find({ firm: firmId });
        res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message }); // ← show real error
    }
};

// ✅ Clean export
module.exports = { addProduct, getProductByFirm };

















// const Product = require('../models/Product');
// const multer = require('multer');
// const Firm = require('../models/Firm');
// const path = require('path');
// const fs = require('fs');
// const mongoose = require('mongoose');

// const uploadDir = 'uploads/';
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir);
// }

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, uploadDir);
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage: storage });

// const addProduct = async (req, res) => {
//     upload.single('image')(req, res, async function (err) {
//         if (err) {
//             console.error("Multer error:", err);
//             return res.status(400).json({ message: "File upload error", error: err.message });
//         }

//         try {
//             console.log("req.body:", req.body);
//             console.log("req.file:", req.file);

//             const { productName, price, category, bestseller, description } = req.body;
//             const image = req.file ? req.file.path : undefined;
//             const firmId = req.params.firmId;

//             const firm = await Firm.findById(firmId);
//             if (!firm) {
//                 return res.status(404).json({ message: "Firm not found" });
//             }

//             const product = new Product({
//                 productName,
//                 price,
//                 category: Array.isArray(category) ? category : [category],
//                 image,
//                 bestseller,
//                 description,
//                 firm: [firm._id]
//             });

//             const savedProduct = await product.save();
//             firm.products.push(savedProduct._id);
//             await firm.save();

//             return res.status(201).json({
//                 message: "Product added successfully",
//                 product: savedProduct
//             });
//         } catch (error) {
//             console.error("Error adding product:", error);
//             return res.status(500).json({ message: "Internal server error" });
//         }
//     });
// };


//  const getProductByFirm = async (req, res) => {
//     try {
//         const firmId = req.params.firmId;
//         const firm = await Firm.findById(firmId).populate('products');
//         if (!firm) {
//             return res.status(404).json({ message: "Firm not found" });
//         }
//         // res.status(200).json({ products: firm.products });
//         const products = await Product.find({ firm: firmId });
//         res.status(200).json({ products });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// // module.exports = { addProduct, getProductByFirm };
// module.exports = {addProduct:[upload.single('image'),addProduct], getProductByFirm };




