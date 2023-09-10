const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "only auth" });
  }
  const token = await authorization.replace("Bearer ", "");

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      if (err.message == "jwt expired") {
        return res.status(401).json({ error: "jwt token expired" });
      }
      return res.status(401).json({ error: err });
    } else {
      const { id } = payload;

      const aauth = User.findById(id).then((userdata) => {
        req.user = userdata;

        next();
      });
    }
  });
};


module.exports = {
  verifyToken,
};
