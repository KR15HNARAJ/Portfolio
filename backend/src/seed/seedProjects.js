import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import Project from "../models/Project.js";

dotenv.config();

const projects = [
  {
    title: "Travel Management System",
    category: "Full Stack",
    description: "A role-based travel platform with separate user and admin experiences.",
    image: "https://placehold.co/900x500/1e293b/a5b4fc?text=Travel+Management+System",
    techStack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    features: [
      "Separate user and admin panels",
      "Booking, cancellation, and booking update flows",
      "Authentication and protected routes",
      "Responsive dashboard-style interface"
    ],
    githubUrl: "https://github.com/",
    liveUrl: "#"
  },
  {
    title: "Construction Company Website",
    category: "Frontend",
    description: "A modern business website with a visual-first service and projects showcase.",
    image: "https://placehold.co/900x500/0f172a/60a5fa?text=Construction+Company+Website",
    techStack: ["React", "CSS", "Node.js API"],
    features: [
      "Professional business presentation layout",
      "Visual project gallery for completed works",
      "Client inquiry and contact functionality",
      "Mobile-first responsive pages"
    ],
    githubUrl: "https://github.com/",
    liveUrl: "#"
  }
];

const seedProjects = async () => {
  try {
    await connectDB();
    await Project.deleteMany({});
    await Project.insertMany(projects);
    console.log("Projects seeded successfully.");
  } catch (error) {
    console.error("Failed to seed projects:", error.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

seedProjects();

