import VoucherService from "~/services/VoucherService";

class VoucherController {
  static async getAllVouchers(req, res) {
    try {
      const vouchers = await VoucherService.getAllVouchers();
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
        res.status(404).json({ message: "Voucher không tồn tại" });
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
