const express = require("express");
const app = express();
const connectDB = require("./config/connectDB");
require("dotenv").config();
connectDB();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/auth", require("./routes/authRoutes"));
app.use("/products", require("./routes/products"));

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
