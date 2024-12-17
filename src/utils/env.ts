import { t } from '@/i18n/config'
import { z } from 'zod'

const envSchema = z.object({
	BASE_URL: z.string().url(),
})

const _env = envSchema.safeParse({
	BASE_URL: process.env.EXPO_PUBLIC_BASE_URL,
})

if (!_env.success) {
	const errorTable = Object.entries(_env.error.flatten().fieldErrors).reduce(
		(acc, [key, value]) => {
			acc[key] = value.join(', ')
			return acc
		},
		{} as Record<string, string>,
	)

	throw new Error(
		`${t('ERROS.ENVIRONMENT_VARIABLES')} \n${JSON.stringify(errorTable, null, 2)}`,
	)
}

export const env = _env.data
