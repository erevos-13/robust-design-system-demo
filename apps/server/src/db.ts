import { IDbResult, IProduct } from '@demo/share-types'
import * as path from 'path'
import * as fs from 'fs/promises'
import * as fsSync from 'fs'

class JsonDatabase {
	private dataPath: string
	private dataDir: string

	constructor() {
		this.dataDir = path.join(process.cwd(), 'data')
		this.dataPath = path.join(this.dataDir, 'products.json')
		this.ensureDataDirectory()
		this.initializeDatabase()
			.then(() => {
				console.log('✅ Database initialized')
			})
			.catch((error: unknown) => {
				console.error('❌ Database initialization failed:', error)
			})
	}

	/**
	 * Ensure data directory exists
	 */
	private ensureDataDirectory(): void {
		if (!fsSync.existsSync(this.dataDir)) {
			fsSync.mkdirSync(this.dataDir, { recursive: true })
			console.log('📁 Created data directory')
		}
	}

	/**
	 * Initialize database with sample data if it doesn't exist
	 */
	private async initializeDatabase(): Promise<void> {
		try {
			if (!fsSync.existsSync(this.dataPath)) {
				// Copy initial data from src/data/products.json
				const srcDataPath = path.join(process.cwd(), 'src', 'data', 'products.json')
				if (fsSync.existsSync(srcDataPath)) {
					const initialData = await fs.readFile(srcDataPath, 'utf-8')
					await fs.writeFile(this.dataPath, initialData)
					console.log('📊 Initialized database with sample data')
				} else {
					// Create empty database
					await fs.writeFile(this.dataPath, JSON.stringify([], null, 2))
					console.log('📊 Created empty database')
				}
			}
		} catch (error) {
			console.error('❌ Database initialization failed:', error)
		}
	}

	/**
	 * Read all products from JSON file
	 */
	async readProducts(): Promise<IDbResult<IProduct[]>> {
		try {
			const data = await fs.readFile(this.dataPath, 'utf-8')
			const products = JSON.parse(data) as IProduct[]
			return {
				success: true,
				data: products,
				message: 'Products retrieved successfully',
			}
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error.message : 'Unknown error',
				message: 'Failed to read products',
			}
		}
	}

	/**
	 * Write products to JSON file
	 */
	private async writeProducts(products: IProduct[]): Promise<IDbResult<void>> {
		try {
			await fs.writeFile(this.dataPath, JSON.stringify(products, null, 2))
			return {
				success: true,
				message: 'Products saved successfully',
			}
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error.message : 'Unknown error',
				message: 'Failed to save products',
			}
		}
	}

	/**
	 * Get product by ID
	 */
	async getProductById(id: number): Promise<IDbResult<IProduct>> {
		try {
			const { data, success, error } = await this.readProducts()
			if (!success || !data) {
				return {
					success: false,
					error: error || 'Unknown error',
					message: 'Failed to retrieve product',
				}
			}

			const product = data.find((p) => p.id === id)
			if (!product) {
				return {
					success: false,
					error: 'Not found',
					message: `Product with ID ${id} not found`,
				}
			}

			return {
				success: true,
				data: product,
				message: 'Product retrieved successfully',
			}
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error.message : 'Unknown error',
				message: 'Failed to retrieve product',
			}
		}
	}

	/**
	 * Create new product
	 */
	async createProduct(productData: Omit<IProduct, 'id'>): Promise<IDbResult<IProduct>> {
		try {
			const result = await this.readProducts()
			if (!result.success || !result.data) {
				return {
					success: false,
					error: result.error || 'Unknown error',
					message: 'Failed to create product',
				}
			}

			const products = result.data
			const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1
			const newProduct: IProduct = { id: newId, ...productData }

			products.push(newProduct)
			const writeResult = await this.writeProducts(products)

			if (!writeResult.success) {
				return {
					success: false,
					error: writeResult.error,
					message: 'Failed to save new product',
				} as IDbResult<IProduct>
			}

			return {
				success: true,
				data: newProduct,
				message: 'Product created successfully',
			}
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error.message : 'Unknown error',
				message: 'Failed to create product',
			}
		}
	}

	/**
	 * Update existing product
	 */
	async updateProduct(
		id: number,
		updateData: Partial<Omit<IProduct, 'id'>>,
	): Promise<IDbResult<IProduct>> {
		try {
			const result = await this.readProducts()
			if (!result.success || !result.data) {
				return {
					success: false,
					error: result.error || 'Unknown error',
					message: 'Failed to update product',
				}
			}

			const products = result.data
			const productIndex = products.findIndex((p) => p.id === id)

			if (productIndex === -1) {
				return {
					success: false,
					error: 'Not found',
					message: `Product with ID ${id} not found`,
				}
			}

			const existingProduct = products[productIndex]
			const updatedProduct: IProduct = {
				id: existingProduct.id,
				name: updateData.name ?? existingProduct.name,
				category: updateData.category ?? existingProduct.category,
				price: updateData.price ?? existingProduct.price,
				stock: updateData.stock ?? existingProduct.stock,
				rating: updateData.rating ?? existingProduct.rating,
				imageUrl: updateData.imageUrl ?? existingProduct.imageUrl,
			}
			products[productIndex] = updatedProduct

			const writeResult = await this.writeProducts(products)
			if (!writeResult.success) {
				return {
					success: false,
					error: writeResult.error || 'Unknown error',
					message: 'Failed to save updated product',
				}
			}

			return {
				success: true,
				data: updatedProduct,
				message: 'Product updated successfully',
			}
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error.message : 'Unknown error',
				message: 'Failed to update product',
			}
		}
	}

	/**
	 * Delete product by ID
	 */
	async deleteProduct(id: number): Promise<IDbResult<void>> {
		try {
			const result = await this.readProducts()
			if (!result.success || !result.data) {
				return {
					success: false,
					error: result.error || 'Unknown error',
					message: 'Failed to delete product',
				}
			}

			const products: IProduct[] = result.data
			const productIndex = products.findIndex((p) => p.id === id)

			if (productIndex === -1) {
				return {
					success: false,
					error: 'Not found',
					message: `Product with ID ${id} not found`,
				}
			}

			products.splice(productIndex, 1)
			const writeResult = await this.writeProducts(products)

			if (!writeResult.success) {
				return {
					success: false,
					error: writeResult.error || 'Unknown error',
					message: 'Failed to save after deletion',
				}
			}

			return {
				success: true,
				message: 'Product deleted successfully',
			}
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error.message : 'Unknown error',
				message: 'Failed to delete product',
			}
		}
	}

	/**
	 * Get products by category
	 */
	async getProductsByCategory(category: string): Promise<IDbResult<IProduct[]>> {
		try {
			const result = await this.readProducts()
			if (!result.success || !result.data) {
				return {
					success: false,
					error: result.error || 'Unknown error',
					message: 'Failed to retrieve products by category',
				}
			}

			const filteredProducts = result.data.filter(
				(p) => p.category.toLowerCase() === category.toLowerCase(),
			)

			return {
				success: true,
				data: filteredProducts,
				message: `Found ${filteredProducts.length} products in category: ${category}`,
			}
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error.message : 'Unknown error',
				message: 'Failed to retrieve products by category',
			}
		}
	}

	/**
	 * Search products by name
	 */
	async searchProducts(query: string): Promise<IDbResult<IProduct[]>> {
		try {
			const result = await this.readProducts()
			if (!result.success || !result.data) {
				return {
					success: false,
					error: result.error || 'Unknown error',
					message: 'Failed to search products',
				}
			}

			const searchResults = result.data.filter((p) =>
				p.name.toLowerCase().includes(query.toLowerCase()),
			)

			return {
				success: true,
				data: searchResults,
				message: `Found ${searchResults.length} products matching: ${query}`,
			}
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error.message : 'Unknown error',
				message: 'Failed to search products',
			}
		}
	}

	/**
	 * Connect to database (for compatibility with server initialization)
	 */
	async connectDB(): Promise<IDbResult<void>> {
		try {
			await this.initializeDatabase()
			console.log('✅ JSON Database connected successfully')
			return {
				success: true,
				message: 'Database connected',
			}
		} catch (error) {
			console.error('❌ Database connection failed:', error)
			return {
				success: false,
				error: error instanceof Error ? error.message : 'Unknown error',
				message: 'Database connection failed',
			}
		}
	}
}

// Export singleton instance
const db = new JsonDatabase()
export default db
