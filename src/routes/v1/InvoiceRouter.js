import express from "express";
import InvoiceController from "~/controllers/InvoiceController";

const router = express.Router();

router.post("/create", InvoiceController.createInvoice);
router.put("/update", InvoiceController.updateInvoice);

export const InvoiceRoute = router;
