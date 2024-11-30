import CustomerService from "~/services/CustomerService";

class CustomerController {
  static async getAllCustomers(req, res) {
    try {
      const customers = await CustomerService.getAllCustomer();
      res.status(200).json(customers);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getCustomerById(req, res) {
    const { id } = req.params;
    try {
      const customers = await CustomerService.getCustomerById(id);
      if (!customers) {
        return res.status(404).json({ message: "Customer not found" });
      }
      res.status(200).json(customers);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getTotalOderByCustomerId(req, res){
    const { id } = req.params;
    try {
      const totalOrder = await CustomerService.getToTalOrderByCustomer(id);
      if (!totalOrder) {
        return res.status(404).json({ message: "Customer not found" });
      }
      res.status(200).json({ totalOrder });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getAllOderByCustomerId(req, res){
    const { id } = req.params;
    try {
      const allOrder = await CustomerService.getAllOrderByCustomer(id);
      if (!allOrder) {
        return res.status(404).json({ message: "Customer not found" });
      }
      res.status(200).json(allOrder);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

}

export default CustomerController;