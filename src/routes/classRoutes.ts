import { Router } from "express";
import { getStudentsByClass, updateClassName } from "../controllers/classController";

const router = Router();

// ✅ GET: List students in class
router.get("/class/:classCode/students", getStudentsByClass);

// ✅ PUT: Update class name
router.put("/class/:classCode", updateClassName);

export default router;
