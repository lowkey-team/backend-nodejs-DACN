import EmployeeService from "~/services/EmployeeService";

class EmployeeController {
  static async createEmployee(req, res) {
    try {
      const data = req.body;
      const result = await EmployeeService.createEmployee(data);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getAllEmployees(req, res) {
    try {
      const employees = await EmployeeService.getAllEmployees();
      return res.status(200).json(employees);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getEmployeeById(req, res) {
    try {
      const { id } = req.params;
      const employee = await EmployeeService.getEmployeeById(id);
      return res.status(200).json(employee);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

  static async updateEmployee(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await EmployeeService.updateEmployee(id, data);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

  static async deleteEmployee(req, res) {
    try {
      const { id } = req.params;
      const result = await EmployeeService.deleteEmployee(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }
}

export default EmployeeController;
