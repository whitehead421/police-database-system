import express from "express";
import {
  updateOfficer,
  deleteOfficer,
  getOfficer,
  getAllOfficers,
  getStatistics,
} from "../controllers/officer.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//UPDATE
router.put("/:id", verifyAdmin, updateOfficer);
//DELETE
router.delete("/:id", verifyAdmin, deleteOfficer);
//GET
router.get("/:id", verifyUser, getOfficer);
//GET ALL
router.get("/", getAllOfficers);
//STATISTICS
router.get("/statistics/:id", getStatistics);

export default router;
