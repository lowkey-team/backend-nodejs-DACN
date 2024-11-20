import express from "express";
import FeedbackController from "~/controllers/FeedbackController";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/create",
  upload.single("image"),
  FeedbackController.createFeedback
);
router.get(
  "/feedback/product/:productId",
  FeedbackController.getFeedbackByProductId
);

export const feedbackRouter = router;
