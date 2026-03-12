import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import Skill from "../models/Skill.js";

dotenv.config();

const skills = [
  { category: "Frontend", name: "HTML" },
  { category: "Frontend", name: "CSS" },
  { category: "Frontend", name: "JavaScript" },
  { category: "Frontend", name: "React" },
  { category: "Backend", name: "Node.js" },
  { category: "Backend", name: "Express" },
  { category: "Backend", name: "Spring (Basic)" },
  { category: "Databases", name: "MongoDB" },
  { category: "Databases", name: "PostgreSQL" },
  { category: "Tools", name: "GitHub" },
  { category: "Tools", name: "VS Code" },
  { category: "Tools", name: "Spring Tool Suite" }
];

const seedSkills = async () => {
  try {
    await connectDB();
    await Skill.deleteMany({});
    await Skill.insertMany(skills);
    console.log("Skills seeded successfully.");
  } catch (error) {
    console.error("Failed to seed skills:", error.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

seedSkills();

