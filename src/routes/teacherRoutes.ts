import { Router } from "express";
import { getTeachers } from "../controllers/teacherController";

const router = Router();

router.get("/teachers", getTeachers);

export default router;
