import express from "express";
import {
  createLicense,
  updateLicense,
  deleteLicense,
  getLicense,
  getAllLicenses,
} from "../controllers/license.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createLicense);
//UPDATE
router.put("/:id", verifyAdmin, updateLicense);
//DELETE
router.delete("/:id", verifyAdmin, deleteLicense);
//GET
router.get("/:id", verifyToken, getLicense);
//GET ALL
router.get("/", verifyToken, getAllLicenses);

export default router;
