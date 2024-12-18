import DashboardService from "~/services/DashboardService";

class DashboardController {
  static async countProductController(req, res) {
    try {
      const productCount = await DashboardService.countProductService();
      res.status(200).json({ productCount });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getOrderTodayController(req, res){
    try {
      const totalOrders = await DashboardService.getOrdersTodayService();
      res.status(200).json({ totalOrders });
    }catch(err){
        res.status(500).json({message: err.message})
    }
  }

  static async countNewCustomerController(req, res){
    try{
        const countNewCus = await DashboardService.getNewCustomerService();
        res.status(200).json({countNewCus});
    }catch(err){
      res.status(500).json({message: err.message})
    }
  }

  static async totalRevenueController(req, res){
    try{
        const totalRevenue = await DashboardService.totalRevenueService();
        res.status(200).json({totalRevenue});
    }catch(err){
      res.status(500).json({message: err.message})
    }
  }

  static async getMonthlyRevenueController(req, res) {
    try {
      const monthlyRevenue = await DashboardService.getMonthlyRevenueService();
      res.status(200).json({ monthlyRevenue });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getRevenueByProductVariationController(req, res) {
    try {
      const revenueData = await DashboardService.getRevenueByProductVariationService();
      res.status(200).json({ revenueData });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  
}

export default DashboardController;
