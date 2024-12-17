import axios, {
	type AxiosInstance,
	type AxiosResponse,
	type InternalAxiosRequestConfig,
} from 'axios'
import { devLog } from '@/utils/log'
import { env } from '@/utils/env'
import { formatBytes } from '@/utils/data'
import { responseErroHandler } from '@/utils/error'
import { useAuthStore } from '@/stores/auth-store'

export const api: AxiosInstance = axios.create({
	baseURL: env.BASE_URL,
	timeout: 10000,
})

function request<T>(request: InternalAxiosRequestConfig<T>) {
	const accessToken = useAuthStore.getState().accessToken

	if (accessToken && request.headers) {
		request.headers.Authorization = `Bearer ${accessToken}`
	}

	return request
}

function response<T, D>(response: AxiosResponse<T, D>) {
	const totalBytes = JSON.stringify(response.data).length

	const logInfos = [
		response.status.toString(),
		response.config.url,
		formatBytes(totalBytes > 2 ? totalBytes : 0),
	]
		.filter(Boolean)
		.join(' - ')

	devLog(logInfos)

	return response
}

api.interceptors.request.use(request)
api.interceptors.response.use(response, responseErroHandler)
