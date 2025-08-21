import { Product } from "../Models/ProductModel.js";

export const handler = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
};

export const specificProduct = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id); // Pass id directly
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", details: error.message });
  }
};

export const searchProduct = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(404).json({ mesaage: "Missing term not found" });
    }

    const result = await Product.find({
      title: { $regex: query, $options: "i" },
    });

    if (!result || result.length === 0) {
      return res
        .status(200)
        .json({ message: "No items found", success: false });
    }

    res.status(200).json({ message: "Items found", result, success: true });
  } catch (error) {
    console.log("Error while searching inputData in DB", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
