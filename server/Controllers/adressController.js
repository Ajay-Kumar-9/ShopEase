import { addressDetailModel } from "../Models/CheckoutDetailsModel.js";

export const addressDetails = async (req, res) => {
  try {
    const { firstName, streetAddress, town_city, phone, email } = req.body;

    if (!firstName || !streetAddress || !town_city || !phone || !email) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const newUserDetail = new addressDetailModel({
      firstName,
      streetAddress,
      town_city,
      phone,
      email,
    });

    res
      .status(201)
      .json({ message: "Checkout Details stored in DB", success: true });
  } catch (error) {
    console.log("Error while storing checkout details", error.message);
    return res
      .status(500)
      .json({ message: "Internal server Error", success: false });
  }
};
