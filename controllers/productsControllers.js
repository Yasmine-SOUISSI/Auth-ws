const Product = require("../models/productSchema");

const addProduct = async (req, res) => {
  const { name } = req.body;
  try {
    const findProduct = await Product.findOne({ name });
    if (findProduct) {
      return res.status(400).json({ msg: "Product already exists" });
    }
    const newProduct = new Product({ ...req.body });
    newProduct.save((err) => {
      if (err) {
        return res.status(500).json({ msg: "Something went wrong" });
      }
      res.status(201).json({ msg: "Product created" });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    // find product by id and delete it
    const findProduct = await Product.findById(productId);

    if (!findProduct) {
      return res.status(400).json({ msg: "Product doesn't exist" });
    }

    Product.deleteOne({ _id: productId }, (err) => {
      if (err) {
        return res.status(500).json({ msg: "Something went wrong" });
      }
      res.status(200).json({ msg: "Product deleted" });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const updateProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const findProduct = await Product.findById(productId);
    if (!findProduct) {
      return res.status(400).json({ msg: "Product doesn't exist" });
    }
    Product.updateOne(
      {
        _id: productId,
      },
      { ...req.body },
      (err) => {
        if (err) {
          return res.status(500).json({ msg: "Something went wrong" });
        }
        res.status(200).json({ msg: "Product updated" });
      }
    );
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const getProductById = (req, res) => {
  const { productId } = req.params;
  try {
    Product.findById(productId, (err, product) => {
      if (err) {
        return res.status(500).json({ msg: "Something went wrong" });
      }
      res.status(200).json(product);
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const getProducts = (req, res) => {
  try {
    Product.find((err, products) => {
      if (err) {
        return res.status(500).json({ msg: "Something went wrong" });
      }
      res.status(200).json(products);
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  addProduct,
  deleteProduct,
  updateProduct,
  getProductById,
  getProducts,
};
