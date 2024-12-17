import DashboardModel from "~/models/DashboardModel";

class DashboardService {
  static async countProductService() {
    return await DashboardModel.countProducts();
  }

  static async getOrdersTodayService(){
    return await DashboardModel.countOrdersToday();
  }

  static async getNewCustomerService(){
    return await DashboardModel.countNewCustomer();
  }

  static async totalRevenueService(){
    return await DashboardModel.calculateTotalRevenue();
  }

  static async getMonthlyRevenueService(){
    return await DashboardModel.getMonthlyRevenue();
  }
}
export default DashboardService;
