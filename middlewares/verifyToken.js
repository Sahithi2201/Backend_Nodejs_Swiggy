
// const Vendor = require('../models/vendor');
// const jwt = require('jsonwebtoken');
// const dotEnv = require('dotenv');
// dotEnv.config();    
// const WhatIsYourName = process.env.WhatIsYourName;


// const verifyToken = async (req, res, next) => {
// const token = req.headers.token;


//     if (!token) {   
//         return res.status(401).json({ error: "Token is required" });
//     }
//     try{
//         const decoded = jwt.verify(token, process.env.WhatIsYourName);
//         const vendor=await Vendor.findById(decoded.vendorId);

//         if (!vendor) {
//             return res.status(404).json({ error: "vendor not found" });
//         }
//         req.vendorId=vendor._id;
//         next();
//     }
//     catch(error){
//         console.error(error);
//        return  res.status(500).json({ error: "Invalid token" });
//     }
// }
// module.exports=verifyToken;



const Vendor = require('../models/Vendor');  
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = async (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({ error: "Token is required" });
    }
    try {
        const decoded = jwt.verify(token, process.env.WhatIsYourName);
        const vendor = await Vendor.findById(decoded.vendorId);

        if (!vendor) {
            return res.status(404).json({ error: "Vendor not found" });
        }
        req.vendorId = vendor._id;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: "Invalid token" });
    }
};

module.exports = verifyToken;



// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZW5kb3JJZCI6IjY5ZTVlZTNkOTlkNzAyNzcyYTA0ODFlZSIsImlhdCI6MTc3NjY3NjQ2NywiZXhwIjoxNzc2NjgwMDY3fQ.4hDYppLiqtGMM68pcZam-bzxAzhmz8v0zPu_n9zOt2c