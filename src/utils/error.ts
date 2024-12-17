import type { AxiosError } from 'axios'
import { devError } from './log'
import type { IError } from '@/interfaces/error'

export function responseErroHandler(err: AxiosError<IError>) {
	const error = err.response?.data

	if (err.code === 'ECONNABORTED') {
		console.error('Timeout')
		throw new Error('Timeout')
	}

	if (err.response?.status === 401) {
		// TODO: handle unauthorized errors
	}

	const firstError = error?.errors?.[0]

	const message = firstError || error?.message || err.message

	const logInfos = [err?.response?.status, err?.config?.url, message]
		.filter(Boolean)
		.join(' - ')

	devError(logInfos)

	throw Error(logInfos, { cause: message })
}
