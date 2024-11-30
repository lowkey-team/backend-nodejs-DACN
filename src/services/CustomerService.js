import CustomerModal from "~/models/CustomerModal";

class CustomerService {
  static async getAllCustomer() {
    return await CustomerModal.getAll();
  }

  static async getCustomerById(id) {
    return await CustomerModal.findById(id);
  }

  static async getToTalOrderByCustomer(id) {
    return await CustomerModal.findTotalOrdersByUserId(id);
  }

  static async getAllOrderByCustomer(id) {
    return await CustomerModal.getAllOrder(id);
  }
}
export default CustomerService;
