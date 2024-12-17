import { EQueryKeys } from '@/enums/query'
import type { IUser } from '@/interfaces/auth'
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import axios, { type AxiosError } from 'axios'

export function useUser(): UseQueryResult<IUser, AxiosError<unknown>> {
	return useQuery({
		queryKey: [EQueryKeys.USER],
		queryFn: async () => {
			const { data } = await axios.get<IUser>(
				'https://api.github.com/users/leonardowlopes',
			)

			return data
		},
	})
}
