// const express = require('express');
// const mongoose = require('mongoose');
// require('dotenv').config();

// const vendorRoutes = require('./routes/vendorRoutes');
// const firmRoutes = require('./routes/firmRoutes');
// const productRoutes = require('./routes/productRoutes');

// const app = express();
// const PORT = process.env.PORT || 4000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use('/uploads', express.static('uploads'));

// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.url}`);
//     next();
// });

// app.use('/vendor', vendorRoutes);
// app.use('/firm', firmRoutes);
// app.use('/product', productRoutes);

// app.get('/home', (req, res) => {
//     res.send("Welcome to the home page");
// });

// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log("Connected to MongoDB"))
//     .catch((err) => console.error("Error connecting to MongoDB:", err));

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


// const express = require('express');
// const mongoose = require('mongoose');
// require('dotenv').config();

// const vendorRoutes = require('./routes/vendorRoutes');
// const firmRoutes = require('./routes/firmRoutes');
// const productRoutes = require('./routes/productRoutes');
// const path = require('path');

// const app = express();
// const PORT = process.env.PORT || 4000;

// const PORT = process.env.PORT || 4000;

// app.listen(PORT, '0.0.0.0', () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// // Middlewares
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use('/uploads', express.static('uploads'));

// // Logger
// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.url}`);
//     next();
// });

// // Routes
// app.use('/vendor', vendorRoutes);
// app.use('/firm', firmRoutes);
// app.use('/product', productRoutes);
// app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // ✅ Serve uploads folder

// // Test route
// app.get('/home', (req, res) => {
//     res.send("Welcome to the home page");
// });

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log("Connected to MongoDB"))
//     .catch((err) => console.error("Error connecting to MongoDB:", err));

// // Start Server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });



const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const vendorRoutes = require('./routes/vendorRoutes');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/vendor', vendorRoutes);
app.use('/firm', firmRoutes);
app.use('/product', productRoutes);

// Test route
app.get('/home', (req, res) => {
    res.send("Welcome to the home page");
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

// Start Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});