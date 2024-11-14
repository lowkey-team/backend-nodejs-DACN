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
      res.status(500).json({ message: err.message });
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

  static async updateProduct(req, res) {
    const { id } = req.params;
    try {
      const updatedProduct = await ProductService.updateProduct(id, req.body);
      res.status(200).json(updatedProduct);
    } catch (err) {
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
}

export default ProductController;
