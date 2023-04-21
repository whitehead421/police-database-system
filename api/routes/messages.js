import express from "express";
import {
  createMessage,
  deleteMessage,
  getAllMessages,
} from "../controllers/message.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/", verifyToken, createMessage);
//DELETE
router.delete("/:id", verifyToken, deleteMessage);
//GET ALL
router.get("/", verifyToken, getAllMessages);

export default router;
