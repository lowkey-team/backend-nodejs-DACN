import { calculateShippingFee, createOrder } from "~/controllers/ghnController";

const express = require("express");
const router = express.Router();

router.post("/calculate-fee", calculateShippingFee);
router.post("/create-order", createOrder);

export const ghnRouter = router;
