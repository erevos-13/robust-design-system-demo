import { useCallback, useEffect, useState } from 'react'

/**
 * HTTP methods supported by useFetch.
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

/**
 * Options for the useFetch hook.
 */
export interface IUseFetchOptions {
	/**
	 * Request init used by fetch. Headers, mode, credentials etc. can be provided here.
	 */
	init?: RequestInit
	/**
	 * If true, the hook will not automatically call fetch on mount.
	 * Call refetch() to trigger the request.
	 */
	manual?: boolean
	/**
	 * HTTP method (GET by default)
	 */
	method?: HttpMethod
}

/**
 * Result returned by useFetch.
 */
export interface IUseFetchResult<T> {
	data: T | null
	error: Error | null
	loading: boolean
	/**
	 * Trigger the request manually.
	 */
	refetch: () => Promise<void>
}

/**
 * useFetch - a simple hook for making fetch API calls.
 *
 * Example:
 * const { data, error, loading, refetch } = useFetch<MyResponse>(`/api/items`);
 *
 * @param url - resource url to fetch
 * @param options - configuration for the request
 */
export function useFetch<T>(
	url: string,
	options: IUseFetchOptions = {},
): IUseFetchResult<T> {
	const { init, manual = false, method = 'GET' } = options

	const [data, setData] = useState<T | null>(null)
	const [error, setError] = useState<Error | null>(null)
	const [loading, setLoading] = useState<boolean>(false)

	const fetchData = useCallback(async () => {
		if (!url) return

		setLoading(true)
		setError(null)

		try {
			const response = await fetch(`http://localhost:3000${url}`, {
				method,
				...init,
			})

			if (!response.ok) {
				throw new Error(`Request failed with status ${response.status}`)
			}
			const { data } = await response.json()
			setData(data)
		} catch (err) {
			setError(err as Error)
			setData(null)
		} finally {
			setLoading(false)
		}
	}, [url, init, method])

	useEffect(() => {
		if (!manual) {
			void fetchData()
		}
	}, [fetchData, manual])

	const refetch = useCallback(async () => {
		await fetchData()
	}, [fetchData])

	return {
		data,
		error,
		loading,
		refetch,
	}
}

export default useFetch
