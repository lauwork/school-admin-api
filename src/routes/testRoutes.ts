import { Router } from "express";
import { getTeachers } from "../controllers/testController";

const router = Router();

// GET /api/teachers
router.get("/teachers", getTeachers);

export default router;
