import type { IProduct } from '@demo/share-types'
import React from 'react'

/**
 * Props interface for ListProducts component
 *
 * @property items - Array of products to render
 * @property renderItem - Function that renders each product item
 * @property className - Optional CSS classes for custom styling
 */
interface IListProductsProps {
	items: IProduct[]
	renderItem: (item: IProduct, index: number) => React.ReactNode
	className?: string
}

/**
 * ListProducts component that renders a list of products
 * Uses product ID as key for optimal React rendering performance
 *
 * @param items - Array of products to display
 * @param renderItem - Custom render function for each product
 * @param className - Additional CSS classes
 */
export default function ListProducts({
	items,
	renderItem,
	className = '',
}: IListProductsProps) {
	return (
		<div className={`space-y-2 ${className}`}>
			{items.map((item, index) => (
				<div
					key={item.id}
					className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
				>
					{renderItem(item, index)}
				</div>
			))}
		</div>
	)
}
