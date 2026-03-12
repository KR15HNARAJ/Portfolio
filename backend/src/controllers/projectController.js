import Project from "../models/Project.js";

const normalizeArrayField = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

export const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const { title, category, description, image, githubUrl, liveUrl } = req.body;

    if (!title || !category || !description) {
      res.status(400);
      throw new Error("Title, category, and description are required.");
    }

    const project = await Project.create({
      title,
      category,
      description,
      image,
      githubUrl,
      liveUrl,
      techStack: normalizeArrayField(req.body.techStack),
      features: normalizeArrayField(req.body.features)
    });

    res.status(201).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, category, description, image, githubUrl, liveUrl } = req.body;

    const project = await Project.findById(id);
    if (!project) {
      res.status(404);
      throw new Error("Project not found.");
    }

    if (title !== undefined) project.title = title;
    if (category !== undefined) project.category = category;
    if (description !== undefined) project.description = description;
    if (image !== undefined) project.image = image;
    if (githubUrl !== undefined) project.githubUrl = githubUrl;
    if (liveUrl !== undefined) project.liveUrl = liveUrl;
    if (req.body.techStack !== undefined) project.techStack = normalizeArrayField(req.body.techStack);
    if (req.body.features !== undefined) project.features = normalizeArrayField(req.body.features);

    const updated = await project.save();
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      res.status(404);
      throw new Error("Project not found.");
    }
    res.status(200).json({ success: true, message: "Project deleted." });
  } catch (error) {
    next(error);
  }
};

