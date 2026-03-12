import { Router } from "express";
import { requireAdmin } from "../middleware/adminAuth.js";

const router = Router();

router.get("/verify", requireAdmin, (req, res) => {
  res.status(200).json({ success: true, message: "Admin verified." });
});

export default router;

