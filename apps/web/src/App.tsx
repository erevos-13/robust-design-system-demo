import type { IProduct } from '@demo/share-types'
import './App.css'
import { RootLayout } from './components'
import ListProducts from './components/ListProducts'
import useFetch from './hooks/useFetch'
import { Product } from './components/Product'

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
					return <Product {...item} />
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
