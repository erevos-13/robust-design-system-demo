/**
 * Represents a single product and its associated metadata.
 *
 * @property id - Unique identifier of the product.
 * @property name - Human-readable product name.
 * @property category - Category or classification the product belongs to.
 * @property price - Current selling price of the product.
 * @property stock - Quantity of the product available in inventory.
 * @property rating - Average customer rating for the product.
 */
export interface IProduct {
	id: number
	name: string
	category: string
	price: number
	stock: number
	rating: number
}
