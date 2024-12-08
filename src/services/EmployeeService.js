import Employee from "~/models/EmployeesModel";

class EmployeeService {
  static async createEmployee(data) {
    const { fullName, phone, password, address, roleIds } = data;
    const id = await Employee.createEmployee(
      fullName,
      phone,
      password,
      address,
      roleIds
    );
    return { id, message: "Employee created successfully" };
  }

  static async getAllEmployees() {
    const employees = await Employee.getAllEmployees();
    return employees;
  }

  static async getEmployeeById(id) {
    const employee = await Employee.getEmployeeById(id);
    if (!employee) {
      throw new Error("Employee not found");
    }
    return employee;
  }

  static async updateEmployee(id, data) {
    const { fullName, phone, address } = data;
    const result = await Employee.updateEmployee(id, fullName, phone, address);
    if (result === 0) {
      throw new Error("Employee not found or already deleted");
    }
    return { message: "Employee updated successfully" };
  }

  static async deleteEmployee(id) {
    const result = await Employee.deleteEmployee(id);
    if (result === 0) {
      throw new Error("Employee not found or already deleted");
    }
    return { message: "Employee deleted successfully" };
  }
}

export default EmployeeService;
