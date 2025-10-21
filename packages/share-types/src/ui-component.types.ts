/**
 * Shared UI Component Types
 *
 * This file contains all shared type definitions for UI components
 * to ensure consistency across the design system.
 *
 * Note: This project uses React 19+ patterns where ref is passed as a regular prop.
 */

import type React from 'react'

/**
 * Button variant types defining the visual style
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline'

/**
 * Button size types defining the dimensions
 */
export type ButtonSize = 'small' | 'medium' | 'large'

/**
 * Props interface for Button component
 *
 * @property title - The text to display on the button
 * @property onClick - Callback function executed when the button is clicked
 * @property variant - The visual style variant of the button
 * @property size - The size of the button
 * @property disabled - Whether the button is disabled and cannot be interacted with
 * @property className - Additional CSS classes to apply to the button for custom styling
 * @property ref - Optional ref to the button element (React 19+)
 */
export interface IButtonProps {
	title: string
	onClick: () => void
	variant?: ButtonVariant
	size?: ButtonSize
	disabled?: boolean
	className?: string
	ref?: React.Ref<HTMLButtonElement>
}
