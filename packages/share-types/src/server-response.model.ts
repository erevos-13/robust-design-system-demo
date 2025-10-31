/**
 * Describes the standardized structure returned from database operations, including status,
 * optional data, and contextual messaging.
 *
 * @template T Specifies the type of the payload included when the operation succeeds; defaults to an array.
 * @property success Indicates whether the database operation completed successfully.
 * @property data Optional payload returned when `success` is `true`.
 * @property error Optional error description provided when `success` is `false`.
 * @property message Human-readable message offering additional context about the operation result.
 */
export interface IDbResult<T> {
	success: boolean
	data?: T
	error?: string
	message: string
}
