import Voucher from "~/models/VoucherModel";

class VoucherService {
  static async getAllVouchers() {
    return await Voucher.getAll();
  }

  static async createVoucher(voucherData) {
    return await Voucher.create(voucherData);
  }

  static async updateVoucher(id, voucherData) {
    const voucher = await Voucher.findById(id);
    if (!voucher) {
      throw new Error("Voucher không tồn tại");
    }
    return await Voucher.update(id, voucherData);
  }

  static async deleteVoucher(id) {
    const voucher = await Voucher.findById(id);
    if (!voucher) {
      throw new Error("Voucher không tồn tại");
    }
    return await Voucher.delete(id);
  }

  static async findVoucherById(id) {
    const voucher = await Voucher.findById(id);
    if (!voucher) {
      throw new Error("Voucher không tồn tại");
    }
    return voucher;
  }

  static async checkVoucherCode(voucherCode) {
    const voucher = await Voucher.findByCode(voucherCode);
    if (!voucher) {
      throw new Error("Voucher không tồn tại");
    }
    return voucher;
  }
}

export default VoucherService;
