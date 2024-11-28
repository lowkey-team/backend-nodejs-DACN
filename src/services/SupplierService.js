import Supplier from "~/models/SupplierModel";

class SupplierService {
  static async getAllSuppliers() {
    return await Supplier.getAll();
  }

  static async getSupplierById(id) {
    return await Supplier.findById(id);
  }

  static async createSupplier(supplierData) {
    return await Supplier.create(supplierData);
  }

  static async updateSupplier(id, supplierData) {
    return await Supplier.update(id, supplierData);
  }

  static async deleteSupplier(id) {
    return await Supplier.delete(id);
  }
}

export default SupplierService;
