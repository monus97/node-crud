require("dotenv").config();
const express = require("express");
const app = express();
const productRouter = require("./routes/productRouter");
const cors = require("cors");

require("./models/config");

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.get("/cors", (req, res) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  res.send({ msg: "This has CORS enabled 🎈" });
});
app.use("/", productRouter);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port : ${process.env.PORT}`);
});
