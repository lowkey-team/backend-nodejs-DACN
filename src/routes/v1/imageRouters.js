import express from "express";
import multer from "multer";
import ImageController from "~/controllers/ImageController";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.delete("/images", ImageController.delete);
router.post(
  "/images",
  (req, res, next) => {
    console.log(req.files);
    next();
  },
  upload.array("images", 10),
  ImageController.createImage
);
export const imageRoutes = router;
