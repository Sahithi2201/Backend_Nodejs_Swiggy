// const express = require('express');
// const firmController = require('../controllers/firmController');
// const verifyToken = require('../middlewares/verifyToken');

// const router = express.Router();

// router.post('/add-firm', verifyToken, firmController.addFirm);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { upload, addFirm } = require('../controllers/firmController');
const verifyToken = require('../middlewares/verifyToken');

// ✅ FIX: Correct order — verifyToken → upload → addFirm
router.post('/add-firm', verifyToken, upload.single('image'), addFirm);

module.exports = router;