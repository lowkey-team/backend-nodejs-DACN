import { GET_DB } from "~/config/mysql";

class DashboardModel {
  static async countProducts() {
    const db = GET_DB();
    try {
      const [rows] = await db.query("SELECT COUNT(*) AS total FROM product");
      return rows[0].total;
    } catch (error) {
      console.error("Error counting products:", error);
      throw error;
    }
  }

  static async countOrdersToday(){
    const db = GET_DB();
    try{
      const currentDate = new Date();
      currentDate.setHours(currentDate.getHours() + 7);
      const formattedDate = currentDate.toISOString().split('T')[0];
      console.log("Current Date adjusted for UTC+7:", formattedDate);
      const [rows] = await db.query("SELECT COUNT(*) AS totalOrders FROM invoice WHERE DATE(createdAt) = ?", [formattedDate]);
      return rows[0].totalOrders;
    }catch(error){
      console.log('error fetching orders for today: ', error);
      throw error;
    }
  }

  static async countNewCustomer(){
    const db = GET_DB();
    try{
      const [rows] = await db.query(
        "SELECT COUNT(*) AS totalNewCustomers FROM users WHERE createdAt >= CURDATE() - INTERVAL 7 DAY"
      );
      return rows[0].totalNewCustomers;
    }catch(error){
      console.log('error fetching new customer: ', error);
      throw error;
    }
  }

  static async calculateTotalRevenue(){
    const db = GET_DB();
    try{
      const [rows] = await db.query(
        "SELECT SUM(finalAmount) AS totalRevenue FROM invoice WHERE paymentStatus = 'Đã thanh toán'"
      );
      return rows[0].totalRevenue;
    }catch(error){
      console.log('error fetching revenue: ', error);
      throw error;
    }
  }

  static async getMonthlyRevenue() {
    const db = GET_DB();
    try {
      const [rows] = await db.query(
       `SELECT 
            YEAR(createdAt) AS year,
            MONTH(createdAt) AS month,
            SUM(finalAmount) AS totalRevenue
        FROM 
            invoice
        WHERE 
            YEAR(createdAt) = YEAR(CURDATE()) 
            AND orderStatus = 'Được giao'     
        GROUP BY 
            YEAR(createdAt), MONTH(createdAt)
        ORDER BY 
            month`
      );

      return rows;
    } catch (error) {
      console.log("Error fetching monthly revenue:", error);
      throw error;
    }
  }
}

export default DashboardModel;
