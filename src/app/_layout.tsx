import { useEffect } from 'react'

// hooks
import { useFonts } from 'expo-font'

// components
import { Stack } from 'expo-router'
import { ThemeProvider } from 'styled-components/native'
import { StatusBar } from 'expo-status-bar'

// enums
import { EFont } from '@/enums/fonts'

// utils
import * as SplashScreen from 'expo-splash-screen'
import 'react-native-reanimated'
import '@/i18n/config'
import { defaultTheme } from '@/themes/default'
export { ErrorBoundary } from 'expo-router'

export const unstable_settings = {
	initialRouteName: 'index',
}

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const [loaded, error] = useFonts({
		[EFont.REGULAR]: require('../assets/fonts/SpaceMono-Regular.ttf'),
	})

	function errorHandler() {
		if (error) throw error
	}
	useEffect(errorHandler, [error])

	function hiddenSplashScreen() {
		if (loaded) SplashScreen.hideAsync()
	}
	useEffect(hiddenSplashScreen, [loaded])

	if (!loaded) return null

	return (
		<ThemeProvider theme={defaultTheme}>
			<StatusBar style="auto" />

			<Stack
				screenOptions={{
					headerShown: false,
				}}
			/>
		</ThemeProvider>
	)
}
