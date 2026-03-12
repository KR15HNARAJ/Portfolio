import { Router } from "express";
import {
  createSkill,
  deleteSkill,
  getSkills,
  updateSkill
} from "../controllers/skillController.js";
import { requireAdmin } from "../middleware/adminAuth.js";

const router = Router();

router.get("/", getSkills);
router.post("/", requireAdmin, createSkill);
router.put("/:id", requireAdmin, updateSkill);
router.delete("/:id", requireAdmin, deleteSkill);

export default router;

