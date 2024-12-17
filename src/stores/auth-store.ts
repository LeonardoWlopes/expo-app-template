import type { IUser } from '@/interfaces/auth'
import { zustandStorage } from '@/utils/storage'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface IAuthState {
	user: IUser | null
	accessToken: string | null
}

interface IAuthActions {
	set: (state: Partial<IAuthState>) => void
	reset: () => void
}

type IAuthStore = IAuthState & IAuthActions

const DEFAULT_STATE: IAuthState = {
	user: null,
	accessToken: null,
}

export const useAuthStore = create<IAuthStore>()(
	persist(
		(set) => ({
			...DEFAULT_STATE,
			set: (state) => set(state),
			reset: () => set(DEFAULT_STATE),
		}),
		{
			name: 'auth-store',
			storage: createJSONStorage(() => zustandStorage),
		},
	),
)
