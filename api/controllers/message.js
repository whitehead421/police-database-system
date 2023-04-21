import Message from "../models/Message.js";
import { createError } from "../utils/error.js";

export const createMessage = async (req, res, next) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(200).json(newMessage);
  } catch (err) {
    next(err);
  }
};

export const getAllMessages = async (req, res, next) => {
  try {
    // fetch last 15 minutes messages
    const messages = await Message.find({
      createdAt: {
        $gte: new Date(new Date().getTime() - 15 * 60 * 1000),
      },
    });
    res.status(200).json(messages);
  } catch (err) {
    next(err);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.status(200).json("Mesaj silindi.");
  } catch (err) {
    next(err);
  }
};
