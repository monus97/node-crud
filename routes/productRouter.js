const express = require("express");
const router = express.Router();
const post = require("../Controller/productController");
const { verifyToken } = require("../middleWare/authMiddleWare");


router.post("/addpost",verifyToken,post.addPost);
router.get("/allpost",post.getPost);
router.get("/getpost/:id",verifyToken,post.getPostById);
router.delete("/deletepost/:id",verifyToken,post.deletePostById);
router.get("/userownpost",verifyToken,post.userOwnPosts);
router.put("/updatepost/:id",verifyToken,post.updatePostById);

module.exports = router;
