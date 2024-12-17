import * as haptics from 'expo-haptics'

export class Feedback {
	static haptic = {
		light() {
			haptics.impactAsync(haptics.ImpactFeedbackStyle.Light)
		},
		medium() {
			haptics.impactAsync(haptics.ImpactFeedbackStyle.Medium)
		},
		heavy() {
			haptics.impactAsync(haptics.ImpactFeedbackStyle.Heavy)
		},
		selection() {
			haptics.selectionAsync()
		},
		error() {
			haptics.notificationAsync(haptics.NotificationFeedbackType.Error)
		},
		success() {
			haptics.notificationAsync(haptics.NotificationFeedbackType.Success)
		},
		warning() {
			haptics.notificationAsync(haptics.NotificationFeedbackType.Warning)
		},
	}
}
