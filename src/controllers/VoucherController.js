import VoucherService from "~/services/VoucherService";

class VoucherController {
  static async getAllVouchers(req, res) {
    const id_user = req.params.id;
    console.log("data id user controller: ", id_user);
    try {
      const vouchers = await VoucherService.getAllVouchers(id_user);
      res.status(200).json(vouchers);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getAllVoucherAdminController(req, res) {
    console.log("controller voucher");
    try {
      const voucher = await VoucherService.getAllVoucherManagementService();
      res.status(200).json(voucher);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }


  static async GetVouchersSaveByUserID(req, res) {
    const id_user = req.params.id;
    console.log("data id user controller: ", id_user);
    try {
      const vouchers = await VoucherService.GetVouchersSaveByUserID(id_user);
      res.status(200).json(vouchers);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async createVoucher(req, res) {
    try {
      const newVoucher = await VoucherService.createVoucher(req.body);
      res.status(201).json(newVoucher);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async addVoucherToUser(req, res) {
    const { ID_User, ID_Voucher } = req.body;

    try {
      const existingVoucher = await VoucherService.findVoucherByUserAndVoucher(
        ID_User,
        ID_Voucher
      );

      if (existingVoucher) {
        return res.status(400).json({ message: "Voucher đã được thêm rồi." });
      }

      const newVoucher = await VoucherService.addVoucherToUser(
        ID_User,
        ID_Voucher
      );
      res.status(201).json(newVoucher);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async updateVoucher(req, res) {
    const { id } = req.params;
    try {
      const updatedVoucher = await VoucherService.updateVoucher(id, req.body);
      res.status(200).json(updatedVoucher);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async deleteVoucher(req, res) {
    const { id } = req.params;
    try {
      const result = await VoucherService.deleteVoucher(id);
      if (result) {
        res.status(200).json({ message: "Voucher đã bị xóa" });
      } else {
        res.status(404).json({ message: "Voucher không tồn tạ ddddi" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async findVoucherById(req, res) {
    const { id } = req.params;
    try {
      const voucher = await VoucherService.findVoucherById(id);
      res.status(200).json(voucher);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async checkVoucherCode(req, res) {
    const { voucherCode } = req.params;
    try {
      const voucher = await VoucherService.checkVoucherCode(voucherCode);
      res.status(200).json(voucher);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default VoucherController;
