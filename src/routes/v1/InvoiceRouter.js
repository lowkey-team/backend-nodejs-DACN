import express from "express";
import InvoiceController from "~/controllers/InvoiceController";

const router = express.Router();

router.post("/create", InvoiceController.createInvoice);

export const InvoiceRoute = router;
