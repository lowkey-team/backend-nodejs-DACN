import Product from "~/models/ProductModel";
import cloudinary from "cloudinary";
import fs from "fs";
import path from "path";

class ProductService {
  static async getAllProducts() {
    return await Product.getAllProduct();
  }

  static async getAll() {
    return await Product.getAll();
  }
  static async createProduct(productData, files) {
    if (files && files.length > 0) {
      const imageUrls = [];

      for (const file of files) {
        try {
          const result = await cloudinary.v2.uploader.upload(file.path);
          imageUrls.push(result.secure_url);
          fs.unlinkSync(file.path);
        } catch (error) {
          console.error("Lỗi khi upload hình ảnh lên Cloudinary:", error);
        }
      }
      productData.images = imageUrls;
    }

    return await Product.create(productData);
  }

  static async updateProduct(id, productData, files) {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error("Sản phẩm không tồn tại");
    }

    if (files && files.length > 0) {
      const imageUrls = [];
      for (const file of files) {
        try {
          const result = await cloudinary.v2.uploader.upload(file.path);
          imageUrls.push(result.secure_url);
          fs.unlinkSync(file.path);
        } catch (error) {
          console.error("Lỗi khi upload hình ảnh lên Cloudinary:", error);
        }
      }
      productData.images = imageUrls;
    }

    return await Product.update(id, productData);
  }

  static async deleteProduct(id) {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error("Sản phẩm không tồn tại");
    }
    return await Product.delete(id);
  }

  static async findProductById(id) {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error("Sản phẩm không tồn tại");
    }
    return product;
  }
}

export default ProductService;
