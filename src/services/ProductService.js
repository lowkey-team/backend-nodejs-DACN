import Product from "~/models/ProductModel";

class ProductService {
    static async getAllProducts() {
        return await Product.getAllProduct();
    }

    static async getAll(){
        return await Product.getAll();
    }

    static async createProduct(productData) {
        return await Product.create(productData);
    }

    static async updateProduct(id, productData) {
        const product = await Product.findById(id);
        if (!product) {
            throw new Error('Sản phẩm không tồn tại');
        }
        return await Product.update(id, productData);
    }

    static async deleteProduct(id) {
        const product = await Product.findById(id);
        if (!product) {
            throw new Error('Sản phẩm không tồn tại');
        }
        return await Product.delete(id);
    }

    static async findProductById(id) {
        const product = await Product.findById(id);
        if (!product) {
            throw new Error('Sản phẩm không tồn tại');
        }
        return product;
    }

}

export default ProductService;
