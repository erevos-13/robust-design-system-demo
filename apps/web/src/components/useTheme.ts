import { useContext, createContext } from 'react'
import type { IThemeContext } from './layout.types'

// Theme context
export const ThemeContext = createContext<IThemeContext | undefined>(undefined)

/**
 * Custom hook to use theme context
 * Must be used within a ThemeProvider
 */
export const useTheme = (): IThemeContext => {
	const context = useContext(ThemeContext)
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider')
	}
	return context
}
