import { Router } from "express";
import multer from "multer";
import { uploadCSV } from "../controllers/uploadController";

const router = Router();
const upload = multer({ dest: "uploads/" }); // temporary folder

// POST /api/upload
router.post("/upload", upload.single("file"), uploadCSV);

export default router;





// NOTE: enable this for router.ts and uploadRoutes.ts to work together
// NOTE: npx ts-node src/server.ts

// import { Router } from "express";

// const router = Router();

// router.post("/upload", (req, res) => {
//   res.json({
//     message: "✅ Upload route working!",
//     receivedBody: req.body,
//   });
// });

// export default router;
