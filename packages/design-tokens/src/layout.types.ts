// Theme types
export type ThemeMode = 'light' | 'dark'

export interface ITheme {
	mode: ThemeMode
	colors: {
		primary: string
		secondary: string
		background: string
		surface: string
		text: string
		textSecondary: string
		border: string
		accent: string
	}
	spacing: {
		xs: string
		sm: string
		md: string
		lg: string
		xl: string
	}
	typography: {
		fontFamily: string
		fontSize: {
			xs: string
			sm: string
			md: string
			lg: string
			xl: string
		}
	}
}

// Theme context interface
export interface IThemeContext {
	theme: ITheme
	toggleTheme: () => void
	setTheme: (mode: ThemeMode) => void
}

// Theme provider props
export interface IThemeProviderProps {
	children: React.ReactNode
	initialTheme?: ThemeMode
}

// Layout component props
export interface ILayoutProps {
	children: React.ReactNode
	header?: React.ReactNode
	footer?: React.ReactNode
	sidebar?: React.ReactNode
	className?: string
	showThemeToggle?: boolean
}

// Root layout props
export interface IRootLayoutProps extends ILayoutProps {
	initialTheme?: ThemeMode
}
