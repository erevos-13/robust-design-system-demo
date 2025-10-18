import React, { useState } from 'react'
import { ThemeContext } from '../hooks'
import {
	darkTheme,
	lightTheme,
	type IThemeProviderProps,
	type ThemeMode,
} from '@demo/theme-tokens'

/**
 * Theme provider component that manages theme state
 * Provides theme context to all child components
 */
export const ThemeProvider: React.FC<IThemeProviderProps> = ({
	children,
	initialTheme = 'light',
}) => {
	const [currentTheme, setCurrentTheme] = useState<ThemeMode>(initialTheme)

	const theme = currentTheme === 'light' ? lightTheme : darkTheme

	const toggleTheme = () => {
		setCurrentTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
	}

	const setTheme = (mode: ThemeMode) => {
		setCurrentTheme(mode)
	}

	const value = {
		theme,
		toggleTheme,
		setTheme,
	}

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
