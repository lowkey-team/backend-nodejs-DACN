import { sendEmailController } from "~/controllers/emailController";

const express = require("express");

const router = express.Router();

router.post("/send", sendEmailController);

export const emailRouter = router;
