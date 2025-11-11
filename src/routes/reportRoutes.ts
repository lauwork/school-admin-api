import { Router } from "express";
import { getTeacherReport } from "../controllers/reportController";

const router = Router();

// GET /api/report
router.get("/report", getTeacherReport);

export default router;
