import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

// services
import { useUser } from '@/services/auth'

// components
import { Image } from 'expo-image'

export default function () {
	const { data, isLoading } = useUser()

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Hello {data?.login || 'Build'}!</Text>

			<Image
				style={styles.avatar}
				source={{
					uri:
						data?.avatar_url ||
						'https://media.licdn.com/dms/image/v2/C4E0BAQHw3-RgYXsq_g/company-logo_200_200/company-logo_200_200/0/1630632834846/buildbox_it_solutions_logo?e=2147483647&v=beta&t=-tVj5R8h64akOnoC8Qad9cUaE-23aRH6mmXjZC8j7GI',
				}}
			/>

			{isLoading && <ActivityIndicator />}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		gap: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 50,
	},
})
