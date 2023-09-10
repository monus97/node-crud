const express = require("express");
const router = express.Router();
const user = require("../Controller/userController");
const { verifyToken } = require('../middleWare/authMiddleWare');


router.post("/register",user.userRegister);
router.post("/login",user.loginUser);
 router.put("/update",verifyToken,user.userUpdateHisProfile);
 router.get("/userDetails",verifyToken,user.getUserById);
// router.delete("/deleteproduct/:id",product.deleteProductById);
// router.put("/updateproduct/:id",product.updateProductById);

module.exports = router;
