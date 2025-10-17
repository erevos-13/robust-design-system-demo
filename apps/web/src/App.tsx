import './App.css'
import { RootLayout } from './components'
import ListProducts from './components/ListProducts'
import useFetch from './hooks/useFetch'

// Main content component
const MainContent = () => {
	const { data, error, loading } = useFetch<any[]>('/api/products')

	return (
		<div>
			<ListProducts items={data} />
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
