export const requireAdmin = (req, res, next) => {
  const adminKey = process.env.ADMIN_KEY;
  const providedKey = req.header("x-admin-key");

  if (!adminKey) {
    return res.status(500).json({
      success: false,
      message: "ADMIN_KEY is not configured on server."
    });
  }

  if (!providedKey || providedKey !== adminKey) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized admin access."
    });
  }

  next();
};

