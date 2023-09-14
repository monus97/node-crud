const post = require("../models/productModel");

const addPost = async (req, res) => {
  try {
    const id = req.user._id;
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const Product = await post.findOne({ title: req.body.title });
    if (Product) {
      return res.status(400).json({ message: "title is already exits " });
    }
    const newProduct = new post({
      title: title,
      description: description,
      creator: id,
    });
    const savedProduct = await newProduct.save();
    res.status(201).json({
      message: "New Post Added Successfully",
      savedProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getPost = async (req, res) => {
  try {
    const findAllPosts = await post.find({}).populate("creator", { name: 1 });
    if (findAllPosts.length === 0) {
      return res.status(400).json({
        message: "no posts",
      });
    }
    res.status(201).json({
      status: "success",
      details: findAllPosts,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const getPost = await post
      .findOne({ _id: id })
      .populate("creator", { name: 1 });

    if (getPost === null) {
      return res.status(400).json({
        message: "no posts",
      });
    }
    res.status(200).json({
      status: "success",
      details: getPost,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const deletePostById = async (req, res) => {
  try {
    const { id } = req.params;
    const AllProducts = await post.findByIdAndDelete({ _id: id });
    if (!AllProducts) {
      return res.status(400).json({ message: "Post not found" });
    } else {
      res.status(201).json({
        message: "post  successfully deleted",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const userOwnPosts = async (req, res) => {
  try {
    const author = req.user._id;
    const getPost = await post
      .find({ creator: author })
      .populate("creator", { name: 1 });
    console.log(getPost);
    if (getPost.length === 0) {
      return res.status(400).json({
        message: "you have not any posts ",
      });
    }
    res.status(200).json({
      status: "success",
      details: getPost,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const updatePostById = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const findUser = await post.findById(id);
    if (!findUser) {
      return res.status(400).json({
        message: "Post not found",
      });
    }
    if (userId.toString() !== findUser.creator.toString()) {
      return res.status(400).json({
        message: "you are not authorized for editing this post ",
      });
    }
    const { title, description } = req.body;
    const payload = {
      title,
      description,
    };
    const AllProducts = await post.findByIdAndUpdate({ _id: id }, payload, {
      new: true,
    });
    if (!AllProducts) {
      return res.status(400).json({
        message: "Post not found",
      });
    } else {
      const Product = await AllProducts.save();
      res.status(201).json({
        updatedProduct: Product,
        message: "Post update Successfully",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  addPost,
  getPost,
  getPostById,
  deletePostById,
  userOwnPosts,
  updatePostById,
};
