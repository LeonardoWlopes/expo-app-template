import { zustandStorage } from '@/utils/storage'
import { create, type StateCreator } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// biome-ignore lint/suspicious/noEmptyInterface: this is a placeholder
interface IDisposableState {}

interface IDisposableActions {
	setDisposable: (state: Partial<IDisposableState & IPersistentState>) => void
}

type IDisposableSlice = IDisposableState & IDisposableActions

// biome-ignore lint/suspicious/noEmptyInterface: this is a placeholder
interface IPersistentState {}

interface IPersistentActions {
	setPersist: (state: Partial<IDisposableState & IPersistentState>) => void
}

type IPersistentSlice = IPersistentState & IPersistentActions

interface ISharedSlice {
	set: (
		state: Partial<IDisposableState & IPersistentState & ISharedSlice>,
	) => void
}

const DISPOSABLE_DEFAULT_STATE: IDisposableState = {}

const PERSISTENT_DEFAULT_STATE: IPersistentState = {}

const createDisposableSlice: StateCreator<
	IDisposableSlice,
	[],
	[],
	IDisposableSlice
> = (set) => ({
	...DISPOSABLE_DEFAULT_STATE,
	setDisposable: (state) => set(state),
})

const createPersistentSlice: StateCreator<
	IPersistentSlice,
	[],
	[],
	IPersistentSlice
> = (set) => ({
	...PERSISTENT_DEFAULT_STATE,
	setPersist: (state) => set(state),
})

const createSharedSlice: StateCreator<
	ISharedSlice & IDisposableSlice & IPersistentSlice,
	[],
	[],
	ISharedSlice
> = (_, get, __) => ({
	set: (state) => {
		get().setPersist(state)
		get().setDisposable(state)
	},
})

function partialize(state: IPersistentState) {
	const keysToPersist = Object.keys(PERSISTENT_DEFAULT_STATE) as Array<
		keyof IPersistentState
	>

	return keysToPersist.reduce(
		(acc: Partial<Record<keyof IPersistentState, unknown>>, key) => {
			if (key in state) {
				acc[key] = state[key]
			}
			return acc
		},
		{} as Partial<IPersistentState>,
	)
}

export const useAppStore = create<
	IDisposableSlice & IPersistentSlice & ISharedSlice
>()((...a) => ({
	...createDisposableSlice(...a),
	...persist(createPersistentSlice, {
		name: 'app-store',
		storage: createJSONStorage(() => zustandStorage),
		partialize,
	})(...a),
	...createSharedSlice(...a),
}))
