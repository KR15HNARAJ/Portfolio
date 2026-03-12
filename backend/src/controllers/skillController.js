import Skill from "../models/Skill.js";

export const getSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find().sort({ createdAt: 1, _id: 1 });
    res.status(200).json({ success: true, data: skills });
  } catch (error) {
    next(error);
  }
};

export const createSkill = async (req, res, next) => {
  try {
    const { category, name } = req.body;

    if (!category || !name) {
      res.status(400);
      throw new Error("Category and skill name are required.");
    }

    const skill = await Skill.create({ category, name });
    res.status(201).json({ success: true, data: skill });
  } catch (error) {
    next(error);
  }
};

export const updateSkill = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { category, name } = req.body;

    const skill = await Skill.findById(id);
    if (!skill) {
      res.status(404);
      throw new Error("Skill not found.");
    }

    if (category !== undefined) skill.category = category;
    if (name !== undefined) skill.name = name;
    const updated = await skill.save();

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteSkill = async (req, res, next) => {
  try {
    const { id } = req.params;
    const skill = await Skill.findByIdAndDelete(id);
    if (!skill) {
      res.status(404);
      throw new Error("Skill not found.");
    }
    res.status(200).json({ success: true, message: "Skill deleted." });
  } catch (error) {
    next(error);
  }
};
