import express from "express";
import multer from "multer";
import returnDetailController from "~/controllers/returnDetailController";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/return-details", returnDetailController.getAll);

router.post(
  "/return-details",
  upload.single("image"),
  returnDetailController.create
);

router.put("/return-details/:id", returnDetailController.update);

export const returnDetailRoutes = router;
