import type { IButtonProps } from '@demo/share-types'

// /**
//  * Props for the Button component
//  *
//  * @property {string} title - The text to display on the button
//  * @property {() => void} onClick - Callback function executed when the button is clicked
//  * @property {'primary' | 'secondary' | 'outline'} [variant='primary'] - The visual style variant of the button
//  * @property {'small' | 'medium' | 'large'} [size='medium'] - The size of the button
//  * @property {boolean} [disabled=false] - Whether the button is disabled and cannot be interacted with
//  * @property {string} [className=''] - Additional CSS classes to apply to the button for custom styling
//  */
// type IButtonProps = React.ComponentPropsWithRef<'button'> & {
// 	title: string
// 	onClick: () => void
// 	variant?: 'primary' | 'secondary' | 'outline'
// 	size?: 'small' | 'medium' | 'large'
// 	disabled?: boolean
// 	className?: string
// 	type?: 'button' | 'submit' | 'reset'
// }

/**
 * Button component that displays a title and handles click actions
 *
 * @param title - The text to display on the button
 * @param onClick - Function to execute when button is clicked
 * @param variant - Visual style variant of the button
 * @param size - Size of the button
 * @param disabled - Whether the button is disabled
 * @param className - Additional CSS classes
 */
export const Button = ({
	ref,
	title,
	onClick,
	variant = 'primary',
	size = 'medium',
	disabled = false,
	className = '',
	type = 'button',
}: Readonly<IButtonProps>) => {
	const baseStyles =
		'font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'

	const variantStyles = {
		primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
		secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
		outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
	}

	const sizeStyles = {
		small: 'px-3 py-1.5 text-sm',
		medium: 'px-4 py-2 text-base',
		large: 'px-6 py-3 text-lg',
	}

	const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'

	const buttonClasses =
		`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`.trim()

	return (
		<button
			ref={ref}
			type={type}
			className={buttonClasses}
			onClick={onClick}
			disabled={disabled}
			aria-label={title}
		>
			{title}
		</button>
	)
}
