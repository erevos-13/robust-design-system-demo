import type { IProduct } from '@demo/share-types'
import './App.css'
import { RootLayout } from './components'
import ListProducts from './pages/ListProducts'
import useFetch from './hooks/useFetch'
import { Product } from './features/product/Product'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { CreateProduct } from './pages/CreateProduct'
import { Button } from './components/Buttons'
import PhantomDependencyDemo from './demo-phantom-dependencies'

/**
 * Note: This project uses pnpm which prevents phantom dependencies.
 * All imported packages must be explicitly listed in package.json.
 *
 * Try importing 'history' (a transitive dependency of react-router-dom)
 * and watch it fail - this is a feature, not a bug! It ensures all
 * dependencies are explicit and tracked.
 *
 * See demo-phantom-dependencies.tsx for more details.
 */

// Product list page component
const ProductListPage = () => {
	const { data, error, loading } = useFetch<IProduct[]>('/api/products')

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
			</div>
		)
	}

	if (error) {
		return (
			<div className="p-4">
				<div className="text-red-600 dark:text-red-400">
					Error fetching products: {error.message}
				</div>
			</div>
		)
	}

	if (!data || data.length === 0) {
		return (
			<div className="p-4 text-center">
				<p className="text-gray-600 dark:text-gray-400 mb-4">No products available.</p>
				<Link to="/create">
					<Button
						title="Create First Product"
						onClick={() => {}}
						variant="primary"
						size="medium"
					/>
				</Link>
			</div>
		)
	}

	return (
		<div className="p-4 flex flex-col gap-4 w-full">
			{/* Phantom Dependencies Demo */}
			<PhantomDependencyDemo />

			{/* Header with Create button */}
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
				<Link to="/create">
					<Button
						title="+ Create Product"
						onClick={() => {}}
						variant="primary"
						size="medium"
					/>
				</Link>
			</div>

			{/* Product list */}
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
		<BrowserRouter>
			<RootLayout initialTheme="light">
				<Routes>
					<Route path="/" element={<ProductListPage />} />
					<Route path="/create" element={<CreateProduct />} />
				</Routes>
			</RootLayout>
		</BrowserRouter>
	)
}

export default App
