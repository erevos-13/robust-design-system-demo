/**
 * CreateProduct Page
 *
 * Page component that wraps the CreateProductForm and demonstrates
 * how to integrate Zod-validated forms into the application layout.
 */

import { CreateProductForm } from '../features/product/CreateProductForm'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Buttons'

/**
 * Page component for creating new products
 *
 * Provides navigation and layout for the product creation form
 */
export function CreateProduct() {
	const navigate = useNavigate()

	const handleSuccess = () => {
		// Navigate back to product list after successful creation
		setTimeout(() => {
			navigate('/')
		}, 2000)
	}

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
			<div className="max-w-3xl mx-auto py-8 px-4">
				{/* Back button */}
				<div className="mb-6">
					<Button
						title="← Back to Products"
						onClick={() => navigate('/')}
						variant="outline"
						size="small"
					/>
				</div>

				{/* Form container */}
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
					<CreateProductForm onSuccess={handleSuccess} />
				</div>

				{/* Information box */}
				<div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
					<h3 className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">
						💡 Type Safety Demo
					</h3>
					<ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1 list-disc list-inside">
						<li>
							The form uses
							<code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">Zod</code>{' '}
							schemas shared with the backend
						</li>
						<li>Client-side validation happens before API call (better UX)</li>
						<li>Server-side validation provides defense in depth (security)</li>
						<li>
							TypeScript types are inferred from Zod schemas (single source of truth)
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default CreateProduct
