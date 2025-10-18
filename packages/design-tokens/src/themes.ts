import type { ITheme } from './layout.types.js'

// Default light theme
export const lightTheme: ITheme = {
	mode: 'light',
	colors: {
		primary: '#3b82f6',
		secondary: '#6b7280',
		background: '#ffffff',
		surface: '#f9fafb',
		text: '#111827',
		textSecondary: '#6b7280',
		border: '#e5e7eb',
		accent: '#8b5cf6',
	},
	spacing: {
		xs: '0.25rem',
		sm: '0.5rem',
		md: '1rem',
		lg: '1.5rem',
		xl: '2rem',
	},
	typography: {
		fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
		fontSize: {
			xs: '0.75rem',
			sm: '0.875rem',
			md: '1rem',
			lg: '1.125rem',
			xl: '1.25rem',
		},
	},
}

// Default dark theme
export const darkTheme: ITheme = {
	mode: 'dark',
	colors: {
		primary: '#60a5fa',
		secondary: '#9ca3af',
		background: '#111827',
		surface: '#1f2937',
		text: '#f9fafb',
		textSecondary: '#d1d5db',
		border: '#374151',
		accent: '#a78bfa',
	},
	spacing: {
		xs: '0.25rem',
		sm: '0.5rem',
		md: '1rem',
		lg: '1.5rem',
		xl: '2rem',
	},
	typography: {
		fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
		fontSize: {
			xs: '0.75rem',
			sm: '0.875rem',
			md: '1rem',
			lg: '1.125rem',
			xl: '1.25rem',
		},
	},
}
