const product = require("../models/productModel");

const addProduct = async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log(req.body)
    const newProduct = new product({
      title,
      description,
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const getProduct = async (req, res) => {
  try {
    const AllProducts = await product.find({});
    res.status(201).json(AllProducts);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const AllProducts = await product.findById({ _id: id });
    if(AllProducts){
 res.status(201).json(AllProducts);
    }else{
        res.status(400).json({
            message: "Product not found"
        })
    }
   
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const AllProducts = await product.findByIdAndDelete({ _id: id });
    if (AllProducts) {
      res.status(201).json({ message: "Product Deleted Successfully" });
    } else {
      res.status(201).json({
        message: "product not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const updateProductById = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;
    const AllProducts = await product.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (AllProducts) {
      const Product = await AllProducts.save();
      res.status(201).json({
        updatedProduct : Product,
        message: "Product update Successfully" });
    } else {
      res.status(201).json({
        message: "product not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  addProduct,
  getProduct,
  getProductById,
  deleteProductById,
  updateProductById,
};
