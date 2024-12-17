import returnDetailService from "~/services/returnDetailService";

class returnDetailController {
  static async getAll(req, res) {
    try {
      const data = await returnDetailService.getAllReturnDetails();
      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async create(req, res) {
    const returnDetailData = req.body;

    // Kiểm tra xem file có được nhận không
    if (req.file) {
      console.log("File image received in controller:", req.file);
    } else {
      console.log("No file received");
    }

    try {
      const createdReturnDetail = await returnDetailService.createReturnDetail(
        returnDetailData,
        req.file
      );
      res.status(201).json({
        success: true,
        data: createdReturnDetail,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const returnDetailData = req.body;
    try {
      const updatedReturnDetail = await returnDetailService.updateReturnDetail(
        id,
        returnDetailData
      );
      if (updatedReturnDetail) {
        res.status(200).json({
          success: true,
          data: updatedReturnDetail,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Không tìm thấy return_detail với ID này.",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default returnDetailController;
