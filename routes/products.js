const express = require("express");
const {
  addProduct,
  deleteProduct,
  updateProduct,
  getProductById,
  getProducts,
} = require("../controllers/productsControllers");
const isAuth = require("../middlewares/isAuth");
const router = express.Router();

router.post("/addProduct", isAuth, addProduct);

router.delete("/deleteProduct/:productId", isAuth, deleteProduct);

router.put("/updateProduct/:productId", isAuth, updateProduct);

router.get("/getProductById/:productId", isAuth, getProductById);

router.get("/", getProducts);

module.exports = router;
