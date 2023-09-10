const express = require("express");
const router = express.Router();
const user = require("../Controller/userController");


router.post("/register",user.userRegister);
router.post("/login",user.loginUser);
// router.get("/getproduct/:id",product.getProductById);
// router.delete("/deleteproduct/:id",product.deleteProductById);
// router.put("/updateproduct/:id",product.updateProductById);

module.exports = router;
