import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.resolve(__dirname, "../../uploads");

export const ensureUploadDir = () => {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
};

export const uploadProjectImage = (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400);
      throw new Error("No image uploaded.");
    }

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(201).json({
      success: true,
      data: {
        filename: req.file.filename,
        url: fileUrl
      }
    });
  } catch (error) {
    next(error);
  }
};

