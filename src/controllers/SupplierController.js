import SupplierService from "~/services/SupplierService";

class SupplierController {
  static async getAllSuppliers(req, res) {
    try {
      const suppliers = await SupplierService.getAllSuppliers();
      res.status(200).json(suppliers);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getSupplierById(req, res) {
    const { id } = req.params;
    try {
      const supplier = await SupplierService.getSupplierById(id);
      if (!supplier) {
        return res.status(404).json({ message: "Supplier not found" });
      }
      res.status(200).json(supplier);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async createSupplier(req, res) {
    try {
      const newSupplier = await SupplierService.createSupplier(req.body);
      res.status(201).json(newSupplier);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async updateSupplier(req, res) {
    const { id } = req.params;
    try {
      const updatedSupplier = await SupplierService.updateSupplier(
        id,
        req.body
      );
      res.status(200).json(updatedSupplier);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async deleteSupplier(req, res) {
    const { id } = req.params;
    try {
      const result = await SupplierService.deleteSupplier(id);
      if (result) {
        res.status(200).json({ message: "Supplier deleted successfully" });
      } else {
        res.status(404).json({ message: "Supplier not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default SupplierController;
