const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/product.routes');
const categoryRoutes = require('./routes/category.routes');
//require('dotenv').config();

const app = express();
app.use(bodyParser.json());

//console.log('MongoDB URI:', process.env.MONGO_URI); // Debugging line

app.use('/api', productRoutes);
app.use('/api', categoryRoutes);

mongoose.connect("mongodb://localhost:27017/product_management")
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

module.exports = app;
