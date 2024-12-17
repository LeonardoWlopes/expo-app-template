import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// types
import type { ReactNode } from 'react'

export const queryClient = new QueryClient()

export function QueryProvider({ children }: { children: ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	)
}
