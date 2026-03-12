import ContactMessage from "../models/ContactMessage.js";
import { sendContactNotification } from "../services/emailService.js";

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const createContactMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      res.status(400);
      throw new Error("Name, email, and message are required.");
    }

    if (!isValidEmail(email)) {
      res.status(400);
      throw new Error("Please provide a valid email address.");
    }

    const savedMessage = await ContactMessage.create({
      name,
      email,
      message
    });

    await sendContactNotification({ name, email, message });

    res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      data: {
        id: savedMessage._id,
        createdAt: savedMessage.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getContactMessages = async (req, res, next) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 }).limit(100);
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    next(error);
  }
};

export const deleteContactMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await ContactMessage.findByIdAndDelete(id);
    if (!deleted) {
      res.status(404);
      throw new Error("Contact message not found.");
    }
    res.status(200).json({ success: true, message: "Contact message deleted." });
  } catch (error) {
    next(error);
  }
};
