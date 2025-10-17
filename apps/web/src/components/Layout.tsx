import React from 'react'
import { useTheme } from './useTheme.js'
import { ThemeProvider } from './ThemeProvider.js'

interface ISimpleLayoutProps {
	children: React.ReactNode
	initialTheme?: 'light' | 'dark'
}

/**
 * Simple layout component that only provides theme management with a toggle button
 */
export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { theme, toggleTheme } = useTheme()

	const layoutStyles = {
		backgroundColor: theme.colors.background,
		color: theme.colors.text,
		fontFamily: theme.typography.fontFamily,
		minHeight: '100vh',
		transition: 'background-color 0.2s ease, color 0.2s ease',
		padding: theme.spacing.lg,
	}

	const themeToggleStyles = {
		position: 'fixed' as const,
		top: theme.spacing.md,
		right: theme.spacing.md,
		backgroundColor: theme.colors.primary,
		color: theme.colors.background,
		border: 'none',
		borderRadius: '50%',
		width: '48px',
		height: '48px',
		cursor: 'pointer',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: '1.25rem',
		transition: 'background-color 0.2s ease',
		zIndex: 1000,
		boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
	}

	return (
		<div style={layoutStyles}>
			{/* Theme Toggle Button with Icon */}
			<button
				style={themeToggleStyles}
				onClick={toggleTheme}
				aria-label={`Switch to ${theme.mode === 'light' ? 'dark' : 'light'} theme`}
				title={`Switch to ${theme.mode === 'light' ? 'dark' : 'light'} theme`}
			>
				{theme.mode === 'light' ? '🌙' : '☀️'}
			</button>

			{/* Main Content */}
			{children}
		</div>
	)
}

/**
 * Root layout component that combines ThemeProvider and Layout
 * This is the main component you should use to wrap your entire application
 */
export const RootLayout: React.FC<ISimpleLayoutProps> = ({
	children,
	initialTheme = 'light',
}) => {
	return (
		<ThemeProvider initialTheme={initialTheme}>
			<Layout>{children}</Layout>
		</ThemeProvider>
	)
}
