import { 
	LEXWARE_OPTIMISTIC_LOCKING, 
	LEXWARE_OPTIMISTIC_LOCKING_MESSAGES 
} from '../constants';
import { 
	ILexwareOptimisticLocking, 
	ILexwareOptimisticLockingError,
	ILexwareOptimisticLockingUpdateRequest 
} from '../types';

/**
 * Optimistic Locking Utility
 * Based on the official Lexware API documentation for optimistic locking
 * 
 * Optimistic locking prevents data corruption when multiple users or processes
 * try to update the same resource simultaneously. Each resource has a version
 * field that is incremented on each update.
 */
export class OptimisticLockingManager {
	
	/**
	 * Validate version number for optimistic locking
	 * @param version - The version number to validate
	 * @returns boolean - Whether the version is valid
	 */
	static isValidVersion(version: number): boolean {
		return typeof version === 'number' && 
			   version >= LEXWARE_OPTIMISTIC_LOCKING.MIN_VERSION && 
			   version <= LEXWARE_OPTIMISTIC_LOCKING.MAX_VERSION;
	}

	/**
	 * Increment version number for next update
	 * @param currentVersion - The current version number
	 * @returns number - The incremented version number
	 */
	static incrementVersion(currentVersion: number): number {
		if (!this.isValidVersion(currentVersion)) {
			throw new Error(LEXWARE_OPTIMISTIC_LOCKING_MESSAGES.VERSION_OUT_OF_RANGE);
		}
		return currentVersion + LEXWARE_OPTIMISTIC_LOCKING.VERSION_INCREMENT;
	}

	/**
	 * Prepare update data with optimistic locking
	 * @param data - The data to update
	 * @param currentVersion - The current version of the resource
	 * @returns ILexwareOptimisticLockingUpdateRequest - The prepared update request
	 */
	static prepareUpdate<T>(
		data: T, 
		currentVersion: number
	): ILexwareOptimisticLockingUpdateRequest<T> {
		if (!this.isValidVersion(currentVersion)) {
			throw new Error(LEXWARE_OPTIMISTIC_LOCKING_MESSAGES.VERSION_OUT_OF_RANGE);
		}

		return {
			data,
			version: currentVersion,
			forceUpdate: false,
			skipVersionCheck: false,
		};
	}

	/**
	 * Validate update request for optimistic locking
	 * @param updateRequest - The update request to validate
	 * @returns string[] - Array of validation errors
	 */
	static validateUpdateRequest<T>(
		updateRequest: ILexwareOptimisticLockingUpdateRequest<T>
	): string[] {
		const errors: string[] = [];

		if (!this.isValidVersion(updateRequest.version)) {
			errors.push(LEXWARE_OPTIMISTIC_LOCKING_MESSAGES.VERSION_OUT_OF_RANGE);
		}

		if (!updateRequest.data) {
			errors.push('Update data is required');
		}

		return errors;
	}

	/**
	 * Handle optimistic locking error response
	 * @param error - The error response from the API
	 * @returns ILexwareOptimisticLockingError - Parsed optimistic locking error
	 */
	static handleErrorResponse(error: any): ILexwareOptimisticLockingError {
		// Check if this is an optimistic locking error
		if (error.response?.status === 409 || error.response?.status === 422) {
			const errorData = error.response.data;
			
			return {
				error: errorData.error || 'Optimistic locking error',
				code: errorData.code || LEXWARE_OPTIMISTIC_LOCKING.VERSION_CONFLICT_ERROR,
				message: errorData.message || LEXWARE_OPTIMISTIC_LOCKING_MESSAGES.VERSION_MISMATCH,
				currentVersion: errorData.currentVersion,
				requestedVersion: errorData.requestedVersion,
				timestamp: new Date().toISOString(),
				resourceId: errorData.resourceId,
				resourceType: errorData.resourceType,
			};
		}

		// Return generic error
		return {
			error: 'Unknown error',
			code: 'UNKNOWN_ERROR',
			message: error.message || 'An unexpected error occurred',
			timestamp: new Date().toISOString(),
		};
	}

	/**
	 * Check if error is an optimistic locking conflict
	 * @param error - The error to check
	 * @returns boolean - Whether this is an optimistic locking conflict
	 */
	static isOptimisticLockingError(error: any): boolean {
		return error.response?.status === 409 || 
			   error.response?.status === 422 ||
			   error.code === LEXWARE_OPTIMISTIC_LOCKING.VERSION_CONFLICT_ERROR ||
			   error.code === LEXWARE_OPTIMISTIC_LOCKING.VERSION_MISMATCH_ERROR ||
			   error.code === LEXWARE_OPTIMISTIC_LOCKING.CONCURRENT_UPDATE_ERROR;
	}

	/**
	 * Extract version from resource data
	 * @param resource - The resource data
	 * @returns number - The version number, or 0 if not found
	 */
	static extractVersion(resource: any): number {
		if (resource && typeof resource.version === 'number') {
			return resource.version;
		}
		return 0;
	}

	/**
	 * Merge optimistic locking data into resource
	 * @param resource - The resource to merge into
	 * @param optimisticData - The optimistic locking data
	 * @returns any - The merged resource
	 */
	static mergeOptimisticData(resource: any, optimisticData: ILexwareOptimisticLocking): any {
		return {
			...resource,
			version: optimisticData.version,
			lastModified: optimisticData.lastModified,
			lastModifiedBy: optimisticData.lastModifiedBy,
		};
	}

	/**
	 * Create optimistic locking headers for API requests
	 * @param version - The current version number
	 * @returns Record<string, string> - Headers for the API request
	 */
	static createHeaders(version: number): Record<string, string> {
		return {
			'If-Match': `"${version}"`,
			'X-Version': version.toString(),
		};
	}

	/**
	 * Retry strategy for optimistic locking conflicts
	 * @param currentAttempt - Current retry attempt
	 * @param maxAttempts - Maximum number of retry attempts
	 * @param baseDelay - Base delay in milliseconds
	 * @returns number - Delay before next retry
	 */
	static calculateRetryDelay(
		currentAttempt: number, 
		maxAttempts: number = 3, 
		baseDelay: number = 1000
	): number {
		if (currentAttempt >= maxAttempts) {
			throw new Error('Maximum retry attempts exceeded');
		}

		// Exponential backoff with jitter
		const delay = baseDelay * Math.pow(2, currentAttempt - 1);
		const jitter = Math.random() * 0.1 * delay; // 10% jitter
		
		return delay + jitter;
	}

	/**
	 * Should retry optimistic locking error
	 * @param error - The error to check
	 * @param currentAttempt - Current retry attempt
	 * @param maxAttempts - Maximum number of retry attempts
	 * @returns boolean - Whether to retry
	 */
	static shouldRetry(
		error: any, 
		currentAttempt: number, 
		maxAttempts: number = 3
	): boolean {
		return currentAttempt < maxAttempts && 
			   this.isOptimisticLockingError(error) &&
			   !error.retryAfter; // Don't retry if server specifies retry-after
	}
}
