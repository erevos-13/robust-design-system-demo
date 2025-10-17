import React from 'react'

interface IListProductsProps<T> {
	items: T[]
	renderItem: (item: T, index: number) => React.ReactNode
	className?: string
}

export function ListProducts<T>({
	items,
	renderItem,
	className = '',
}: IListProductsProps<T>) {
	return (
		<div className={`space-y-2 ${className}`}>
			{items.map((item, index) => (
				<div
					key={index}
					className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
				>
					{renderItem(item, index)}
				</div>
			))}
		</div>
	)
}

export default ListProducts
