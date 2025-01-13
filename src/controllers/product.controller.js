const Product = require('../models/product.model');
const Category = require('../models/category.model');
const { generateProductCode } = require('../code');

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, discount, image, status, category } = req.body;

        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return res.status(400).json({ message: 'Invalid category' });
        }

        const productCode = generateProductCode(name);

        const product = new Product({
            name,
            description,
            price,
            discount,
            image,
            status,
            productCode,
            category
        });

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProductsByFilter = async (req, res) => {
    try {
        const { category, name } = req.query;

        const filter = {};
        if (category) filter.category = category; 
        if (name) filter.name = new RegExp(name, 'i'); 

        const products = await Product.find(filter);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.searchProducts = async (req, res) => {
    try {
        const { keyword } = req.query;

        const products = await Product.find({ name: new RegExp(keyword, 'i') });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
