import type { IProduct } from '@demo/share-types'
import './App.css'
import { RootLayout } from './components'
import ListProducts from './features/product/ListProducts'
import useFetch from './hooks/useFetch'
import { Product } from './features/product/Product'

// Main content component
const MainContent = () => {
	const { data, error, loading } = useFetch<IProduct[]>('/api/products')

	if (!data || data.length === 0) {
		return <div>No products available.</div>
	}

	if (error) {
		return <div>Error fetching products: {error.message}</div>
	}

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
			</div>
		)
	}

	return (
		<div className="p-4 flex flex-col gap-4 w-full">
			<ListProducts
				items={data}
				renderItem={(item) => {
					return (
						//We may want to use {...item} but in that case may we pass data that is not need to the Product component.
						<Product
							imageUrl={item.imageUrl}
							category={item.category}
							id={item.id}
							name={item.name}
							price={item.price}
							stock={item.stock}
							rating={item.rating}
						/>
					)
				}}
			/>
		</div>
	)
}

function App() {
	return (
		<RootLayout initialTheme="light">
			<MainContent />
		</RootLayout>
	)
}

export default App
