const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const logger = require("morgan")
const port = import.meta.env.VITE_PORT || 5000;


// routes
const categoryRoute = require("./router/categories.js");
const productRoute = require("./router/products.js");
const billRoute = require("./router/bills.js");
const authRoute = require("./router/auth.js");
const userRoute = require("./router/users.js");

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongoDB");
  } catch (error) {
    throw error;
  }
};

// middlewares
app.use(logger("dev"))
app.use(express.json());
app.use(cors());

app.use("/api/categories", categoryRoute);
app.use("/api/products", productRoute);
app.use("/api/bills", billRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.listen(port, () => {
  connect();
  console.log(`Example app listening on port ${port}`);
});
