/**
 * CreateProductForm Component
 *
 * Demonstrates client-side validation using Zod schemas shared with the backend.
 * This form validates user input before submitting to the API, providing immediate
 * feedback and preventing invalid requests.
 */

import { useState, type FormEvent } from 'react'
import { ProductCreateSchema, type ProductCreateInput } from '@demo/share-types'
import { Button } from '../../components/Buttons'
import type { ZodFormattedError } from 'zod'

/**
 * Props interface for CreateProductForm component
 */
interface ICreateProductFormProps {
	onSuccess?: () => void
	className?: string
}

/**
 * Form component for creating new products with Zod validation
 *
 * Features:
 * - Client-side validation using shared Zod schema
 * - Inline error display for each field
 * - Server-side validation as fallback
 * - Type-safe form data handling
 */
export function CreateProductForm({
	onSuccess,
	className = '',
}: ICreateProductFormProps) {
	const [formData, setFormData] = useState<Partial<ProductCreateInput>>({
		name: '',
		category: '',
		price: 0,
		stock: 0,
		rating: 0,
		imageUrl: '',
	})

	const [errors, setErrors] = useState<ZodFormattedError<ProductCreateInput> | null>(null)
	const [submitError, setSubmitError] = useState<string | null>(null)
	const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

	/**
	 * Handle form field changes with type safety
	 */
	const handleChange = (field: keyof ProductCreateInput, value: string | number) => {
		setFormData((prev: Partial<ProductCreateInput>) => ({ ...prev, [field]: value }))
		// Clear errors when user starts typing
		setErrors(null)
		setSubmitError(null)
		setSubmitSuccess(false)
	}

	/**
	 * Handle form submission with client-side and server-side validation
	 */
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)
		setSubmitError(null)
		setSubmitSuccess(false)

		// Client-side validation using Zod
		const validation = ProductCreateSchema.safeParse(formData)

		if (!validation.success) {
			setErrors(validation.error.format())
			setIsSubmitting(false)
			return
		}

		try {
			// Submit validated data to API
			const response = await fetch('http://localhost:3000/api/products', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(validation.data),
			})

			const result = await response.json()

			if (!response.ok) {
				// Server validation failed (defense in depth)
				setSubmitError(result.error || 'Failed to create product')
				if (result.details) {
					console.error('Server validation errors:', result.details)
				}
			} else {
				// Success!
				setSubmitSuccess(true)
				// Reset form
				setFormData({
					name: '',
					category: '',
					price: 0,
					stock: 0,
					rating: 0,
					imageUrl: '',
				})
				setErrors(null)

				if (onSuccess) {
					onSuccess()
				}
			}
		} catch (error) {
			setSubmitError('Network error: Could not connect to server')
			console.error('Submit error:', error)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
			{/* Form header */}
			<div>
				<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
					Create New Product
				</h2>
				<p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
					All fields are validated using Zod schemas shared between frontend and backend
				</p>
			</div>

			{/* Success message */}
			{submitSuccess && (
				<div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
					<p className="text-green-800 dark:text-green-200 font-medium">
						✓ Product created successfully!
					</p>
				</div>
			)}

			{/* Global error message */}
			{submitError && (
				<div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
					<p className="text-red-800 dark:text-red-200 font-medium">✗ {submitError}</p>
				</div>
			)}

			{/* Product Name */}
			<div>
				<label
					htmlFor="name"
					className="block text-sm font-medium text-gray-700 dark:text-gray-300"
				>
					Product Name *
				</label>
				<input
					type="text"
					id="name"
					value={formData.name}
					onChange={(e) => handleChange('name', e.target.value)}
					className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
					placeholder="e.g., Wireless Mouse"
				/>
				{errors?.name && (
					<p className="mt-1 text-sm text-red-600 dark:text-red-400">
						{errors.name._errors[0]}
					</p>
				)}
			</div>

			{/* Category */}
			<div>
				<label
					htmlFor="category"
					className="block text-sm font-medium text-gray-700 dark:text-gray-300"
				>
					Category *
				</label>
				<input
					type="text"
					id="category"
					value={formData.category}
					onChange={(e) => handleChange('category', e.target.value)}
					className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
					placeholder="e.g., Electronics"
				/>
				{errors?.category && (
					<p className="mt-1 text-sm text-red-600 dark:text-red-400">
						{errors.category._errors[0]}
					</p>
				)}
			</div>

			{/* Price */}
			<div>
				<label
					htmlFor="price"
					className="block text-sm font-medium text-gray-700 dark:text-gray-300"
				>
					Price ($) *
				</label>
				<input
					type="number"
					id="price"
					step="0.01"
					value={formData.price}
					onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
					className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
					placeholder="0.00"
				/>
				{errors?.price && (
					<p className="mt-1 text-sm text-red-600 dark:text-red-400">
						{errors.price._errors[0]}
					</p>
				)}
			</div>

			{/* Stock */}
			<div>
				<label
					htmlFor="stock"
					className="block text-sm font-medium text-gray-700 dark:text-gray-300"
				>
					Stock Quantity *
				</label>
				<input
					type="number"
					id="stock"
					value={formData.stock}
					onChange={(e) => handleChange('stock', parseInt(e.target.value, 10) || 0)}
					className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
					placeholder="0"
				/>
				{errors?.stock && (
					<p className="mt-1 text-sm text-red-600 dark:text-red-400">
						{errors.stock._errors[0]}
					</p>
				)}
			</div>

			{/* Rating */}
			<div>
				<label
					htmlFor="rating"
					className="block text-sm font-medium text-gray-700 dark:text-gray-300"
				>
					Rating (0-5) *
				</label>
				<input
					type="number"
					id="rating"
					step="0.1"
					min="0"
					max="5"
					value={formData.rating}
					onChange={(e) => handleChange('rating', parseFloat(e.target.value) || 0)}
					className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
					placeholder="0.0"
				/>
				{errors?.rating && (
					<p className="mt-1 text-sm text-red-600 dark:text-red-400">
						{errors.rating._errors[0]}
					</p>
				)}
			</div>

			{/* Image URL */}
			<div>
				<label
					htmlFor="imageUrl"
					className="block text-sm font-medium text-gray-700 dark:text-gray-300"
				>
					Image URL (optional)
				</label>
				<input
					type="text"
					id="imageUrl"
					value={formData.imageUrl}
					onChange={(e) => handleChange('imageUrl', e.target.value)}
					className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
					placeholder="https://example.com/image.jpg"
				/>
				{errors?.imageUrl && (
					<p className="mt-1 text-sm text-red-600 dark:text-red-400">
						{errors.imageUrl._errors[0]}
					</p>
				)}
			</div>

			{/* Submit Button */}
			<div className="flex gap-4">
				<Button
					title={isSubmitting ? 'Creating...' : 'Create Product'}
					onClick={() => {}}
					variant="primary"
					size="large"
					disabled={isSubmitting}
					type="submit"
				/>
			</div>
		</form>
	)
}

export default CreateProductForm
