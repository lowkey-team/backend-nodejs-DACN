import express from "express";
import InvoiceController from "~/controllers/InvoiceController";

const router = express.Router();

router.post("/create", InvoiceController.createInvoice);
router.put("/update", InvoiceController.updateInvoice);
router.get(
  "/invoices/:id_user/:orderStatus",
  InvoiceController.getInvoiceByIdUser
);

router.get("/invoicesAll", InvoiceController.getInvoiceAll);
router.get(
  "/detail/:ID_Invoice",
  InvoiceController.getInvoiceDetailFindByID_Invoice
);
router.get(
  "/detailInvoiceList/:ID_Invoice",
  InvoiceController.getInvoiceDetailListFindByID
);

export const InvoiceRoute = router;
