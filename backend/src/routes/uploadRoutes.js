import path from "path";
import { Router } from "express";
import multer from "multer";
import { uploadProjectImage } from "../controllers/uploadController.js";
import { requireAdmin } from "../middleware/adminAuth.js";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || "").toLowerCase();
    const baseName = path.basename(file.originalname || "project", ext).replace(/[^a-zA-Z0-9-_]/g, "-");
    cb(null, `${Date.now()}-${baseName}${ext}`);
  }
});

const imageFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
  if (!allowed.includes(file.mimetype)) {
    cb(new Error("Only JPG, PNG, and WEBP images are allowed."));
    return;
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

router.post("/project-image", requireAdmin, upload.single("image"), uploadProjectImage);

export default router;

