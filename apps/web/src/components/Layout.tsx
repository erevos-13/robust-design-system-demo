import React from 'react'
import { ThemeProvider } from './ThemeProvider'
import { useTheme } from '../hooks'

interface ISimpleLayoutProps {
	children: React.ReactNode
	initialTheme?: 'light' | 'dark'
}

/**
 * Simple layout component that provides theme management with a toggle button
 * and centers content in the viewport using Tailwind CSS
 */
export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { theme, toggleTheme } = useTheme()

	const customStyles = {
		backgroundColor: theme.colors.background,
		color: theme.colors.text,
		fontFamily: theme.typography.fontFamily,
	}

	return (
		<div
			className="min-h-screen w-full flex flex-col items-center justify-center p-8 transition-colors duration-200 "
			style={customStyles}
		>
			{/* Theme Toggle Button with Tailwind Classes */}
			<button
				className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 hover:bg-blue-700 text-white border-none rounded-full w-12 h-12 cursor-pointer flex items-center justify-center text-xl transition-colors duration-200 z-50 shadow-lg hover:shadow-xl"
				onClick={toggleTheme}
				aria-label={`Switch to ${theme.mode === 'light' ? 'dark' : 'light'} theme`}
				title={`Switch to ${theme.mode === 'light' ? 'dark' : 'light'} theme`}
			>
				{theme.mode === 'light' ? '🌙' : '☀️'}
			</button>

			{/* Main Content - Centered */}
			<main className="max-w-3xl w-full text-center">{children}</main>
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
