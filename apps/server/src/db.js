import * as path from 'path';
import * as fs from 'fs/promises';
import * as fsSync from 'fs';
class JsonDatabase {
    dataPath;
    dataDir;
    constructor() {
        this.dataDir = path.join(process.cwd(), 'data');
        this.dataPath = path.join(this.dataDir, 'products.json');
        this.ensureDataDirectory();
        this.initializeDatabase();
    }
    /**
     * Ensure data directory exists
     */
    ensureDataDirectory() {
        if (!fsSync.existsSync(this.dataDir)) {
            fsSync.mkdirSync(this.dataDir, { recursive: true });
            console.log('📁 Created data directory');
        }
    }
    /**
     * Initialize database with sample data if it doesn't exist
     */
    async initializeDatabase() {
        try {
            if (!fsSync.existsSync(this.dataPath)) {
                // Copy initial data from src/data/products.json
                const srcDataPath = path.join(process.cwd(), 'src', 'data', 'products.json');
                if (fsSync.existsSync(srcDataPath)) {
                    const initialData = await fs.readFile(srcDataPath, 'utf-8');
                    await fs.writeFile(this.dataPath, initialData);
                    console.log('📊 Initialized database with sample data');
                }
                else {
                    // Create empty database
                    await fs.writeFile(this.dataPath, JSON.stringify([], null, 2));
                    console.log('📊 Created empty database');
                }
            }
        }
        catch (error) {
            console.error('❌ Database initialization failed:', error);
        }
    }
    /**
     * Read all products from JSON file
     */
    async readProducts() {
        try {
            const data = await fs.readFile(this.dataPath, 'utf-8');
            const products = JSON.parse(data);
            return {
                success: true,
                data: products,
                message: 'Products retrieved successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
                message: 'Failed to read products',
            };
        }
    }
    /**
     * Write products to JSON file
     */
    async writeProducts(products) {
        try {
            await fs.writeFile(this.dataPath, JSON.stringify(products, null, 2));
            return {
                success: true,
                message: 'Products saved successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
                message: 'Failed to save products',
            };
        }
    }
    /**
     * Get product by ID
     */
    async getProductById(id) {
        const { data, success, error } = await this.readProducts();
        if (!success || !data) {
            return {
                success: false,
                error: error || 'Unknown error',
                message: 'Failed to retrieve product',
            };
        }
        const product = data.find((p) => p.id === id);
        if (!product) {
            return {
                success: false,
                error: 'Not found',
                message: `Product with ID ${id} not found`,
            };
        }
        return {
            success: true,
            data: product,
            message: 'Product retrieved successfully',
        };
    }
    /**
     * Create new product
     */
    async createProduct(productData) {
        const result = await this.readProducts();
        if (!result.success || !result.data) {
            return {
                success: false,
                error: result.error || 'Unknown error',
                message: 'Failed to create product',
            };
        }
        const products = result.data;
        const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
        const newProduct = { id: newId, ...productData };
        products.push(newProduct);
        const writeResult = await this.writeProducts(products);
        if (!writeResult.success) {
            return {
                success: false,
                error: writeResult.error,
                message: 'Failed to save new product',
            };
        }
        return {
            success: true,
            data: newProduct,
            message: 'Product created successfully',
        };
    }
    /**
     * Update existing product
     */
    async updateProduct(id, updateData) {
        const result = await this.readProducts();
        if (!result.success || !result.data) {
            return {
                success: false,
                error: result.error || 'Unknown error',
                message: 'Failed to update product',
            };
        }
        const products = result.data;
        const productIndex = products.findIndex((p) => p.id === id);
        if (productIndex === -1) {
            return {
                success: false,
                error: 'Not found',
                message: `Product with ID ${id} not found`,
            };
        }
        const existingProduct = products[productIndex];
        const updatedProduct = {
            id: existingProduct.id,
            name: updateData.name ?? existingProduct.name,
            category: updateData.category ?? existingProduct.category,
            price: updateData.price ?? existingProduct.price,
            stock: updateData.stock ?? existingProduct.stock,
            rating: updateData.rating ?? existingProduct.rating,
        };
        products[productIndex] = updatedProduct;
        const writeResult = await this.writeProducts(products);
        if (!writeResult.success) {
            return {
                success: false,
                error: writeResult.error || 'Unknown error',
                message: 'Failed to save updated product',
            };
        }
        return {
            success: true,
            data: updatedProduct,
            message: 'Product updated successfully',
        };
    }
    /**
     * Delete product by ID
     */
    async deleteProduct(id) {
        const result = await this.readProducts();
        if (!result.success || !result.data) {
            return {
                success: false,
                error: result.error || 'Unknown error',
                message: 'Failed to delete product',
            };
        }
        const products = result.data;
        const productIndex = products.findIndex((p) => p.id === id);
        if (productIndex === -1) {
            return {
                success: false,
                error: 'Not found',
                message: `Product with ID ${id} not found`,
            };
        }
        products.splice(productIndex, 1);
        const writeResult = await this.writeProducts(products);
        if (!writeResult.success) {
            return {
                success: false,
                error: writeResult.error || 'Unknown error',
                message: 'Failed to save after deletion',
            };
        }
        return {
            success: true,
            message: 'Product deleted successfully',
        };
    }
    /**
     * Get products by category
     */
    async getProductsByCategory(category) {
        const result = await this.readProducts();
        if (!result.success || !result.data) {
            return {
                success: false,
                error: result.error || 'Unknown error',
                message: 'Failed to retrieve products by category',
            };
        }
        const filteredProducts = result.data.filter((p) => p.category.toLowerCase() === category.toLowerCase());
        return {
            success: true,
            data: filteredProducts,
            message: `Found ${filteredProducts.length} products in category: ${category}`,
        };
    }
    /**
     * Search products by name
     */
    async searchProducts(query) {
        const result = await this.readProducts();
        if (!result.success || !result.data) {
            return {
                success: false,
                error: result.error || 'Unknown error',
                message: 'Failed to search products',
            };
        }
        const searchResults = result.data.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
        return {
            success: true,
            data: searchResults,
            message: `Found ${searchResults.length} products matching: ${query}`,
        };
    }
    /**
     * Connect to database (for compatibility with server initialization)
     */
    async connectDB() {
        try {
            await this.initializeDatabase();
            console.log('✅ JSON Database connected successfully');
            return {
                success: true,
                message: 'Database connected',
            };
        }
        catch (error) {
            console.error('❌ Database connection failed:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
                message: 'Database connection failed',
            };
        }
    }
}
// Export singleton instance
const db = new JsonDatabase();
export default db;
//# sourceMappingURL=db.js.map