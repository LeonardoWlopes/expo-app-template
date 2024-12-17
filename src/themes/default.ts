import { EFont } from '@/enums/fonts'

export const defaultTheme = {
	COLORS: {},
	FONTS: EFont,
}

export type IColors = keyof typeof defaultTheme.COLORS
