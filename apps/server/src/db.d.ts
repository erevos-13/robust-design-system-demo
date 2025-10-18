import type { IDbResult, IProduct } from '@demo/share-types';
declare class JsonDatabase {
    private dataPath;
    private dataDir;
    constructor();
    /**
     * Ensure data directory exists
     */
    private ensureDataDirectory;
    /**
     * Initialize database with sample data if it doesn't exist
     */
    private initializeDatabase;
    /**
     * Read all products from JSON file
     */
    readProducts(): Promise<IDbResult<IProduct[]>>;
    /**
     * Write products to JSON file
     */
    private writeProducts;
    /**
     * Get product by ID
     */
    getProductById(id: number): Promise<IDbResult<IProduct>>;
    /**
     * Create new product
     */
    createProduct(productData: Omit<IProduct, 'id'>): Promise<IDbResult<IProduct>>;
    /**
     * Update existing product
     */
    updateProduct(id: number, updateData: Partial<Omit<IProduct, 'id'>>): Promise<IDbResult<IProduct>>;
    /**
     * Delete product by ID
     */
    deleteProduct(id: number): Promise<IDbResult<void>>;
    /**
     * Get products by category
     */
    getProductsByCategory(category: string): Promise<IDbResult<IProduct[]>>;
    /**
     * Search products by name
     */
    searchProducts(query: string): Promise<IDbResult<IProduct[]>>;
    /**
     * Connect to database (for compatibility with server initialization)
     */
    connectDB(): Promise<IDbResult<void>>;
}
declare const db: JsonDatabase;
export default db;
//# sourceMappingURL=db.d.ts.map