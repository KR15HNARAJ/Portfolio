import { Router } from "express";
import {
  createContactMessage,
  deleteContactMessage,
  getContactMessages
} from "../controllers/contactController.js";
import { requireAdmin } from "../middleware/adminAuth.js";

const router = Router();

router.post("/", createContactMessage);
router.get("/", requireAdmin, getContactMessages);
router.delete("/:id", requireAdmin, deleteContactMessage);

export default router;
