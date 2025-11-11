import { Router } from "express";
import DataImportController from "./controllers/DataImportController";
import HealthcheckController from "./controllers/HealthcheckController";
import uploadRoutes from "./routes/uploadRoutes";
import classRoutes from "./routes/classRoutes";
import reportRoutes from "./routes/reportRoutes";

// Extra for GET
import teacherRoutes from "./routes/teacherRoutes";

const router = Router();

// ✅ assign distinct URL prefixes
router.use("/healthcheck", HealthcheckController);
router.use("/data-import", DataImportController);

// ✅ register your feature routes (won’t get intercepted)
router.use(uploadRoutes);
router.use(classRoutes);
router.use(reportRoutes);
router.use(teacherRoutes);

export default router;

/* 
router.use((req, res, next) => {
	console.log("➡️  Passing through uploadRoutes:", req.method, req.originalUrl);
	next();
}, uploadRoutes);
*/