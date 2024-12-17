import type { defaultTheme } from '@/themes/default'
import 'styled-components'

declare module 'styled-components' {
	type themeType = typeof defaultTheme

	export interface DefaultTheme extends themeType {}
}
