const Category = require('../models/category.model');

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        const category = new Category({ name });
        await category.save();

        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};