import { format } from 'date-fns'
import { Platform } from 'react-native'

function formatMessage(...args: unknown[]) {
	let message = ''

	for (const arg of args) {
		if (typeof arg === 'object') {
			message += ` ${JSON.stringify(arg, null, 2)}`
		} else {
			message += ` ${arg}`
		}
	}

	return `${Platform.OS.toUpperCase()} ${format(new Date(), 'HH:mm:ss')} ${message}`
}

export function devLog(...args: unknown[]) {
	if (__DEV__) console.log(formatMessage(...args))
}

export function devError(...args: unknown[]) {
	const message = formatMessage(...args)

	if (__DEV__) console.error(message)
}

export function devWarn(...args: unknown[]) {
	const message = formatMessage(...args)

	if (__DEV__) console.warn(message)
}
