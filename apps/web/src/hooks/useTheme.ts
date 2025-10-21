import { useContext, createContext } from 'react'
import type { IThemeContext } from '@demo/theme-tokens'

/**
 * Theme context instance
 * Used to provide theme state throughout the application
 */
export const ThemeContext = createContext<IThemeContext | undefined>(undefined)

/**
 * Custom hook to access theme context
 * Must be used within a ThemeProvider
 *
 * @returns IThemeContext - Current theme, toggleTheme, and setTheme functions
 * @throws Error if used outside of ThemeProvider
 *
 * @example
 * ```tsx
 * const { theme, toggleTheme } = useTheme();
 * ```
 */
export const useTheme = (): IThemeContext => {
	const context = useContext(ThemeContext)
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider')
	}
	return context
}
