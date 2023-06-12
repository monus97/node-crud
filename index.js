require("dotenv").config();
const express = require("express");
const app = express();
const productRouter = require("./routes/productRouter");
const cors = require("cors");

require("./models/config");
app.use(cors());
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", productRouter);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port : ${process.env.PORT}`);
});
