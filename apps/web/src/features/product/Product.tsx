import type { IProduct } from '@demo/share-types'

export const Product = ({ name, category, price, stock, rating, imageUrl }: IProduct) => {
	return (
		<div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
			<img src={imageUrl} alt={name} className="w-full h-48 object-cover" />
			<div className="p-4">
				<h2 className="text-xl font-bold text-gray-800 mb-2">{name}</h2>
				<p className="text-sm text-gray-600 mb-2">Category: {category}</p>
				<p className="text-lg font-semibold text-green-600 mb-2">
					Euro:{price.toFixed(2)}
				</p>
				<p className="text-sm text-gray-700 mb-1">Stock: {stock}</p>
				<p className="text-sm text-yellow-600 font-medium">Rating: {rating} stars</p>
			</div>
		</div>
	)
}
