import express from "express";
import {
  createWanted,
  updateWanted,
  deleteWanted,
  getWanted,
  getAllWanteds,
  getWantedByType,
} from "../controllers/wanted.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/", verifyToken, createWanted);
//UPDATE
router.put("/:id", verifyToken, updateWanted);
//DELETE
router.delete("/:id", verifyToken, deleteWanted);
//GET
router.get("/:id", verifyToken, getWanted);
//GET ALL
router.get("/", verifyToken, getAllWanteds);
//GET BY TYPE
router.get("/type/:type", verifyToken, getWantedByType);

export default router;
