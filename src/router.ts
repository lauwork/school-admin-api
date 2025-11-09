import { Router } from "express";
import DataImportController from "./controllers/DataImportController";
import HealthcheckController from "./controllers/HealthcheckController";
import uploadRoutes from "./routes/uploadRoutes";

const router = Router();

// NOTE: Simple code without log 
// router.use("/healthcheck", HealthcheckController); 
// router.use("/data-import", DataImportController); 
// router.use(uploadRoutes);


router.use("/healthcheck", (req, res, next) => {
	console.log("➡️  Passing through HealthcheckController:", req.method, req.originalUrl);
	next();
}, HealthcheckController);

router.use("/data-import", (req, res, next) => {
	console.log("➡️  Passing through DataImportController:", req.method, req.originalUrl);
	next();
}, DataImportController);

router.use((req, res, next) => {
	console.log("➡️  Passing through uploadRoutes:", req.method, req.originalUrl);
	next();
}, uploadRoutes);

export default router;




// NOTE: enable this for router.ts and uploadRoutes.ts to work together
// NOTE: npx ts-node src/server.ts

// import { Router } from "express";
// import uploadRoutes from "./routes/uploadRoutes";

// const router = Router();
// router.use(uploadRoutes);

// export default router;



// NOTE: to test simple api call
// NOTE: http://localhost:3000/api/teachers can be used in postman after starting server


// import { Router } from "express";
// import uploadRoutes from "./routes/uploadRoutes";
// import testRoutes from "./routes/testRoutes"; // 👈 make sure this is imported

// const router = Router();

// router.use(uploadRoutes);
// router.use(testRoutes); // 👈 this line is important

// export default router;
