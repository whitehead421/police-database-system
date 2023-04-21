import express from "express";
import {
  getAnnouncement,
  getAllAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  getAnnouncementCount,
} from "../controllers/announcement.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createAnnouncement);
//UPDATE
router.put("/:id", verifyAdmin, updateAnnouncement);
//DELETE
router.delete("/:id", verifyAdmin, deleteAnnouncement);
//GET
router.get("/:id", verifyToken, getAnnouncement);
//GET ALL
router.get("/", verifyToken, getAllAnnouncements);
//GET COUNT
router.get("/get/count", verifyToken, getAnnouncementCount);

export default router;
