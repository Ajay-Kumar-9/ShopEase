import { contactModel } from "../Models/ContactModel.js";

export const createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Basic validation
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Create new contact entry
    const newContact = new contactModel({ name, email, phone, message });
    await newContact.save();

    res.status(201).json({ message: "Contact message sent successfully." });
  } catch (error) {
    console.error("Contact form submission error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
