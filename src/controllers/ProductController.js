import ProductService from "~/services/ProductService";

class ProductController {
  static async getAllProducts(req, res) {
    try {
      const products = await ProductService.getAllProducts();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getAll(req, res) {
    try {
      const products = await ProductService.getAll(req.query);
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async updateStock(req, res) {
    const { ID_Variation, newStock, orderID } = req.body;

    if (!ID_Variation || typeof newStock !== "number" || newStock < 0) {
      return res.status(400).json({
        message:
          "ID_Variation và newStock là bắt buộc, và newStock phải là số dương.",
      });
    }

    try {
      const result = await ProductService.updateStock(
        ID_Variation,
        newStock,
        orderID
      );

      if (result.success) {
        res.status(200).json({ message: result.message });
      } else {
        res.status(400).json({ message: result.message });
      }
    } catch (err) {
      res.status(500).json({ message: "Lỗi server: " + err.message });
    }
  }

  static async getProductAllPage(req, res) {
    try {
      const products = await ProductService.getProductAllPage(req.query);
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getTop10NewestProducts(req, res, next) {
    try {
      const products = await ProductService.getTop10NewestProducts(req.query);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getAllProductsSortedByCategory(req, res, next) {
    try {
      const products = await ProductService.getAllProductsSortedByCategory(
        req.query
      );
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  static async createProduct(req, res) {
    console.log("Inside Controller");
    console.log("Body in Controller:", req.body);
    console.log("Files in Controller:", req.files);
    try {
      const newProduct = await ProductService.createProduct(
        req.body,
        req.files
      );
      console.log("upload oke controller ");
      res.status(201).json(newProduct);
    } catch (err) {
      console.log("upload failed controller error: " + err);
      res.status(500).json({ message: err.message });
    }
  }

  static async createProductExcel(req, res) {
    console.log("Body in Controller:", JSON.stringify(req.body, null, 2));

    try {
      const newProduct = await ProductService.createProductExcel(req.body);
      res.status(201).json(newProduct);
    } catch (err) {
      console.log("upload failed controller error: " + err);
      res.status(500).json({ message: err.message });
    }
  }
  static async updateProduct(req, res) {
    const { id } = req.params;
    console.log("Request ID:", id);
    console.log("Request body:", req.body);

    try {
      const updatedProduct = await ProductService.updateProduct(id, req.body);
      console.log("Updated product result:", updatedProduct);
      res.status(200).json(updatedProduct);
    } catch (err) {
      console.error("Error updating product:", err.message);
      res.status(500).json({ message: err.message });
    }
  }

  static async deleteProduct(req, res) {
    const { id } = req.params;
    try {
      const result = await ProductService.deleteProduct(id);
      if (result) {
        res.status(200).json({ message: "Sản phẩm đã bị xóa" });
      } else {
        res.status(404).json({ message: "Sản phẩm không tồn tại" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async findProductById(req, res) {
    const { id } = req.params;
    try {
      const product = await ProductService.findProductById(id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async GetProductsBySupCategory(req, res) {
    const { id } = req.params;
    try {
      const product = await ProductService.GetProductsBySupCategory(id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async GetProductsBySupCategory_Admin(req, res) {
    const { id } = req.params;
    try {
      const product = await ProductService.GetProductsBySupCategory_Admin(id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async suggestProductsByProductId(req, res) {
    try {
      const { productId } = req.params;
      const { minSupport } = req.query;

      if (isNaN(minSupport) || minSupport <= 0 || minSupport > 1) {
        return res.status(400).json({
          message: "minSupport phải là một số trong khoảng từ 0 đến 1.",
        });
      }

      const result = await ProductService.suggestProductsByProductId(
        productId,
        parseFloat(minSupport)
      );

      res.status(200).json(result);
    } catch (error) {
      console.error("Lỗi khi gợi ý sản phẩm:", error);
      res.status(500).json({
        message: `Lỗi khi gợi ý sản phẩm: ${error.message}`,
      });
    }
  }

  static async getProductsWithoutDiscount(req, res) {
    try {
        const products = await ProductService.getProductsWithNoDiscount();
        res.status(200).json(products);
    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm chưa có giảm giá:", error);
        res.status(500).json({ message: "Lỗi khi lấy sản phẩm chưa có giảm giá" });
    }
}

}

export default ProductController;
