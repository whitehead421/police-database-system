import express from "express";
import {
  createRapor,
  updateRapor,
  deleteRapor,
  getRapor,
  getAllRapors,
  getRaporByType,
} from "../controllers/rapor.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
// TODO: HERKES RAPOR OLUŞTURABİLİR
router.post("/", verifyToken, createRapor);
//UPDATE
// TODO: USER SADECE KENDİ RAPORUNU GÜNCELLEYEBİLİR
router.put("/:id", verifyUser, updateRapor);
//DELETE
// TODO: USER SADECE KENDİ YAZDIĞI RAPORU SİLEBİLİR
router.delete("/:id", verifyUser, deleteRapor);
//GET
router.get("/:id", verifyToken, getRapor);
//GET ALL
router.get("/", verifyToken, getAllRapors);
//GET BY TYPE
router.get("/type/:type", getRaporByType);

export default router;
