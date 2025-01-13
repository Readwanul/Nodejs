const express = require('express');
const Products = require('../controllers/product.controller');
const router = express.Router();

router.post('/products',Products.createProduct);
router.get('/showproducts',Products.getAllProducts);
router.post('/filterbycategory',Products.getProductsByFilter);
router.post('/searchbyname',Products.searchProducts);

module.exports = router;

