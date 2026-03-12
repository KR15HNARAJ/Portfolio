export const ensureUploadDir = () => {
  // Cloudinary handles storage now, no need for local upload directory
};

export const uploadProjectImage = (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400);
      throw new Error("No image uploaded.");
    }

    // req.file.path is provided by multer-storage-cloudinary and contains the secure URL
    res.status(201).json({
      success: true,
      data: {
        filename: req.file.filename,
        url: req.file.path
      }
    });
  } catch (error) {
    next(error);
  }
};

