import Voucher from "~/models/VoucherModel";

class VoucherService {
  static async getAllVouchers(id_user) {
    return await Voucher.getAll(id_user);
  }

  static async getAllVoucherManagementService(){
    console.log("service voucher");
    return await Voucher.getAllVoucherManagementModel();
  }

  static async GetVouchersSaveByUserID(id_user) {
    return await Voucher.GetVouchersSaveByUserID(id_user);
  }

  static async createVoucher(voucherData) {
    return await Voucher.create(voucherData);
  }

  static async addVoucherToUser(ID_User, ID_Voucher) {
    return await Voucher.addVoucherToUser(ID_User, ID_Voucher);
  }

  static async findVoucherByUserAndVoucher(ID_User, ID_Voucher) {
    const existingVoucher = await Voucher.findVoucherByUserAndVoucher(
      ID_User,
      ID_Voucher
    );

    if (existingVoucher) {
      return { message: "Voucher has already been added to this user." };
    }
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
