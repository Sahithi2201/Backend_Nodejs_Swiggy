// const vendorController = require('../controllers/vendorController');
// const express = require('express');
// const router = express.Router();

// router.post('/register', vendorController.vendorRegister);
// router.post('/login', vendorController.vendorLogin);

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const { vendorRegister, vendorLogin } = require('../controllers/vendorController');

// router.post('/register', vendorRegister);
// router.post('/login', vendorLogin);


// router.get('/all-vendors',  vendorController.getAllVendors);

// module.exports = router;


const express = require('express');
const router = express.Router();
const { vendorRegister, vendorLogin, getAllVendors, getSingleVendor } = require('../controllers/vendorController');

router.post('/register', vendorRegister);
router.post('/login', vendorLogin);
router.get('/all-vendors', getAllVendors);
router.get('/single-vendor/:id', getSingleVendor);

module.exports = router;