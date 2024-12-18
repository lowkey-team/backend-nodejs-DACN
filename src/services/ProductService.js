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

  static async updateStock(ID_Variation, newStock, orderID) {
    try {
      const result = await Product.updateStock(ID_Variation, newStock, orderID);

      if (result.success) {
        return {
          success: true,
          message: result.message,
        };
      } else {
        return {
          success: false,
          message: result.message,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
  static async getProductAllPage() {
    return await Product.getProductAllPage();
  }

  static async getTop10NewestProducts() {
    return await Product.getTop10NewestProducts();
  }

  static async getAllProductsSortedByCategory() {
    return await Product.getAllProductsSortedByCategory();
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

  static async updateProduct(id, productData) {
    console.log("data service product", id, productData);
    return await Product.update(id, productData);
  }

  static async deleteProduct(id) {
    return await Product.delete(id);
  }

  static async findProductById(id) {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error("Sản phẩm không tồn tại");
    }
    return product;
  }

  static async createMultiple(variations) {
    const db = GET_DB();
    const values = variations.map((variation) => [
      variation.ID_Product,
      variation.size,
      variation.Price,
      variation.stock,
      variation.ID_discount,
      variation.isDelete,
      variation.createdAt,
      variation.updatedAt,
    ]);

    const [result] = await db.query(
      `
        INSERT INTO productVariation (ID_Product, size, Price, stock, ID_discount, isDelete, createdAt, updatedAt)
        VALUES ?
    `,
      [values]
    );

    return result;
  }

  static async GetProductsBySupCategory(id) {
    const product = await Product.GetProductsBySupCategory(id);
    if (!product) {
      throw new Error("Sản phẩm không tồn tại");
    }
    return product;
  }

  static async GetProductsBySupCategory_Admin(id) {
    const product = await Product.GetProductsBySupCategory_Admin(id);
    if (!product) {
      throw new Error("Sản phẩm không tồn tại");
    }
    return product;
  }

  static async createProductExcel(productData) {
    return await Product.createProductExcel(productData);
  }

  // Hàm tính toán hỗ trợ (support) của một tập sản phẩm
  static calculateSupport(itemset, transactions) {
    const itemsetCount = transactions.filter((transaction) =>
      itemset.every((item) => transaction.includes(item))
    ).length;
    return itemsetCount / transactions.length;
  }

  // Hàm gợi ý sản phẩm
  static async suggestProductsByProductId(productId, minSupport) {
    try {
      const invoices = await Product.getInvoiceProductIdsForApriori();
      console.log("data input gợi ý sản phẩm", invoices);

      // Tạo danh sách giao dịch, bỏ qua các giao dịch chỉ có 1 sản phẩm
      const transactions = invoices
        .map((invoice) => {
          let productIds = invoice.productIds;
          if (typeof productIds === "string") {
            try {
              productIds = JSON.parse(productIds);
            } catch (err) {
              console.error("Lỗi khi parse productIds:", err);
              return [];
            }
          }
          return Array.isArray(productIds) && productIds.length > 1
            ? productIds
            : null; // Giữ lại giao dịch có nhiều hơn 1 sản phẩm
        })
        .filter((transaction) => transaction !== null); // Lọc bỏ giao dịch chỉ có 1 sản phẩm

      console.log("data input gợi ý sản phẩm đã xử lý", transactions);

      // Bước 1: Tạo danh sách tất cả các sản phẩm từ các giao dịch
      const allProducts = new Set();
      transactions.forEach((transaction) => {
        transaction.forEach((productId) => allProducts.add(productId));
      });

      // Bước 2: Tạo các cặp sản phẩm (itemsets size 2)
      const candidateItemsets = [];
      allProducts.forEach((product1) => {
        allProducts.forEach((product2) => {
          if (product1 !== product2) {
            candidateItemsets.push([product1, product2]);
          }
        });
      });

      // Bước 3: Tính toán tỉ lệ hỗ trợ của từng itemset và lọc ra những itemset có hỗ trợ lớn hơn minSupport
      const frequentItemsets = candidateItemsets.filter((itemset) => {
        const support = this.calculateSupport(itemset, transactions);
        return support >= minSupport;
      });

      console.log("Các itemsets thường xuyên", frequentItemsets);

      // Bước 4: Lọc các itemsets chứa sản phẩm đầu vào và gợi ý các sản phẩm còn lại
      const productSets = frequentItemsets.filter((itemset) =>
        itemset.includes(productId)
      );

      // Tạo một Set để đảm bảo các sản phẩm gợi ý không trùng lặp
      const suggestedProductSet = new Set();

      productSets.forEach((itemset) => {
        itemset.forEach((item) => {
          if (item !== productId) {
            suggestedProductSet.add(item); // Thêm vào Set để loại bỏ trùng lặp
          }
        });
      });

      const suggestedProductIds = Array.from(suggestedProductSet);

      console.log("Suggested product IDs:", suggestedProductIds);

      if (suggestedProductIds.length === 0) {
        console.log("No products to suggest.");
        return [];
      }

      const suggestedProductIdsString = suggestedProductIds.join(",");

      const suggestedProducts = await Product.GetProductsByIds(
        suggestedProductIdsString
      );

      return suggestedProducts;
    } catch (error) {
      console.error("Lỗi khi gợi ý sản phẩm:", error);
      throw error;
    }
  }
}

export default ProductService;
