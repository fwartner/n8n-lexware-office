import { 
	LEXWARE_HTTP_STATUS_CODES, 
	LEXWARE_HTTP_STATUS_MESSAGES, 
	LEXWARE_HTTP_STATUS_CATEGORIES,
	LEXWARE_HTTP_STATUS_RANGES
} from '../constants';
import { 
	ILexwareHttpStatusInfo, 
	ILexwareHttpErrorResponse 
} from '../types';

/**
 * HTTP Status Code Utility
 * Based on the official Lexware API documentation for HTTP Status Codes
 * 
 * This utility provides comprehensive handling of HTTP status codes,
 * including categorization, retry logic, and user action recommendations.
 */
export class HttpStatusCodeManager {
	
	/**
	 * Get status code information
	 * @param statusCode - The HTTP status code
	 * @returns ILexwareHttpStatusInfo - Detailed status code information
	 */
	static getStatusInfo(statusCode: number): ILexwareHttpStatusInfo {
		const message = LEXWARE_HTTP_STATUS_MESSAGES[statusCode] || 'Unknown status code';
		const category = this.getStatusCategory(statusCode);
		const description = this.getStatusDescription(statusCode);
		const retryable = this.isRetryable(statusCode);
		const userActionable = this.isUserActionable(statusCode);
		
		return {
			code: statusCode,
			message,
			category,
			description,
			retryable,
			userActionable,
		};
	}

	/**
	 * Get status code category
	 * @param statusCode - The HTTP status code
	 * @returns string - The status code category
	 */
	static getStatusCategory(statusCode: number): string {
		if (statusCode >= 200 && statusCode < 300) {
			return LEXWARE_HTTP_STATUS_CATEGORIES.SUCCESS;
		} else if (statusCode >= 300 && statusCode < 400) {
			return LEXWARE_HTTP_STATUS_CATEGORIES.REDIRECTION;
		} else if (statusCode >= 400 && statusCode < 500) {
			return LEXWARE_HTTP_STATUS_CATEGORIES.CLIENT_ERROR;
		} else if (statusCode >= 500 && statusCode < 600) {
			return LEXWARE_HTTP_STATUS_CATEGORIES.SERVER_ERROR;
		}
		return 'Unknown';
	}

	/**
	 * Get detailed status code description
	 * @param statusCode - The HTTP status code
	 * @returns string - Detailed description
	 */
	static getStatusDescription(statusCode: number): string {
		switch (statusCode) {
			// Success responses
			case LEXWARE_HTTP_STATUS_CODES.OK:
				return 'The request has succeeded. The response body contains the requested resource.';
			case LEXWARE_HTTP_STATUS_CODES.CREATED:
				return 'The request has succeeded and a new resource has been created. The response body contains the newly created resource.';
			case LEXWARE_HTTP_STATUS_CODES.ACCEPTED:
				return 'The request has been accepted for processing, but the processing has not been completed.';
			case LEXWARE_HTTP_STATUS_CODES.NO_CONTENT:
				return 'The request has succeeded, but there is no content to return in the response body.';
			
			// Redirection responses
			case LEXWARE_HTTP_STATUS_CODES.MOVED_PERMANENTLY:
				return 'The requested resource has been moved permanently to a new location.';
			case LEXWARE_HTTP_STATUS_CODES.FOUND:
				return 'The requested resource has been found at a different location.';
			case LEXWARE_HTTP_STATUS_CODES.NOT_MODIFIED:
				return 'The resource has not been modified since the last request.';
			case LEXWARE_HTTP_STATUS_CODES.TEMPORARY_REDIRECT:
				return 'The request should be repeated with another URI, but future requests should still use the original URI.';
			case LEXWARE_HTTP_STATUS_CODES.PERMANENT_REDIRECT:
				return 'The request and all future requests should be repeated using another URI.';
			
			// Client error responses
			case LEXWARE_HTTP_STATUS_CODES.BAD_REQUEST:
				return 'The request could not be understood by the server due to malformed syntax or invalid parameters.';
			case LEXWARE_HTTP_STATUS_CODES.UNAUTHORIZED:
				return 'Authentication is required and has failed or has not been provided.';
			case LEXWARE_HTTP_STATUS_CODES.FORBIDDEN:
				return 'The server understood the request but refuses to authorize it.';
			case LEXWARE_HTTP_STATUS_CODES.NOT_FOUND:
				return 'The requested resource could not be found on the server.';
			case LEXWARE_HTTP_STATUS_CODES.METHOD_NOT_ALLOWED:
				return 'The HTTP method used is not allowed for the requested resource.';
			case LEXWARE_HTTP_STATUS_CODES.NOT_ACCEPTABLE:
				return 'The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.';
			case LEXWARE_HTTP_STATUS_CODES.REQUEST_TIMEOUT:
				return 'The server timed out waiting for the request.';
			case LEXWARE_HTTP_STATUS_CODES.CONFLICT:
				return 'The request could not be completed due to a conflict with the current state of the resource (e.g., optimistic locking conflict).';
			case LEXWARE_HTTP_STATUS_CODES.GONE:
				return 'The requested resource is no longer available at the server and no forwarding address is known.';
			case LEXWARE_HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY:
				return 'The request was well-formed but was unable to be followed due to semantic errors (e.g., validation failures).';
			case LEXWARE_HTTP_STATUS_CODES.TOO_MANY_REQUESTS:
				return 'The user has sent too many requests in a given amount of time (rate limiting).';
			case LEXWARE_HTTP_STATUS_CODES.REQUEST_HEADER_FIELDS_TOO_LARGE:
				return 'The server is unwilling to process the request because its header fields are too large.';
			
			// Server error responses
			case LEXWARE_HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR:
				return 'The server encountered an unexpected condition which prevented it from fulfilling the request.';
			case LEXWARE_HTTP_STATUS_CODES.NOT_IMPLEMENTED:
				return 'The server does not support the functionality required to fulfill the request.';
			case LEXWARE_HTTP_STATUS_CODES.BAD_GATEWAY:
				return 'The server, while acting as a gateway or proxy, received an invalid response from the upstream server.';
			case LEXWARE_HTTP_STATUS_CODES.SERVICE_UNAVAILABLE:
				return 'The server is currently unable to handle the request due to temporary overloading or maintenance.';
			case LEXWARE_HTTP_STATUS_CODES.GATEWAY_TIMEOUT:
				return 'The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server.';
			case LEXWARE_HTTP_STATUS_CODES.HTTP_VERSION_NOT_SUPPORTED:
				return 'The server does not support the HTTP protocol version used in the request.';
			
			default:
				return 'Unknown HTTP status code.';
		}
	}

	/**
	 * Check if status code is retryable
	 * @param statusCode - The HTTP status code
	 * @returns boolean - Whether the request should be retried
	 */
	static isRetryable(statusCode: number): boolean {
		// Retryable status codes
		const retryableCodes = [
			LEXWARE_HTTP_STATUS_CODES.REQUEST_TIMEOUT,           // 408
			LEXWARE_HTTP_STATUS_CODES.TOO_MANY_REQUESTS,        // 429
			LEXWARE_HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,    // 500
			LEXWARE_HTTP_STATUS_CODES.BAD_GATEWAY,              // 502
			LEXWARE_HTTP_STATUS_CODES.SERVICE_UNAVAILABLE,      // 503
			LEXWARE_HTTP_STATUS_CODES.GATEWAY_TIMEOUT,          // 504
		];
		
		return retryableCodes.includes(statusCode as any);
	}

	/**
	 * Check if status code requires user action
	 * @param statusCode - The HTTP status code
	 * @returns boolean - Whether the user needs to take action
	 */
	static isUserActionable(statusCode: number): boolean {
		// User actionable status codes
		const userActionableCodes = [
			LEXWARE_HTTP_STATUS_CODES.UNAUTHORIZED,             // 401
			LEXWARE_HTTP_STATUS_CODES.FORBIDDEN,               // 403
			LEXWARE_HTTP_STATUS_CODES.NOT_FOUND,               // 404
			LEXWARE_HTTP_STATUS_CODES.METHOD_NOT_ALLOWED,      // 405
			LEXWARE_HTTP_STATUS_CODES.CONFLICT,                // 409
			LEXWARE_HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY,    // 422
		];
		
		return userActionableCodes.includes(statusCode as any);
	}

	/**
	 * Check if status code indicates success
	 * @param statusCode - The HTTP status code
	 * @returns boolean - Whether the status code indicates success
	 */
	static isSuccess(statusCode: number): boolean {
		return statusCode >= 200 && statusCode < 300;
	}

	/**
	 * Check if status code indicates redirection
	 * @param statusCode - The HTTP status code
	 * @returns boolean - Whether the status code indicates redirection
	 */
	static isRedirection(statusCode: number): boolean {
		return statusCode >= 300 && statusCode < 400;
	}

	/**
	 * Check if status code indicates client error
	 * @param statusCode - The HTTP status code
	 * @returns boolean - Whether the status code indicates client error
	 */
	static isClientError(statusCode: number): boolean {
		return statusCode >= 400 && statusCode < 500;
	}

	/**
	 * Check if status code indicates server error
	 * @param statusCode - The HTTP status code
	 * @returns boolean - Whether the status code indicates server error
	 */
	static isServerError(statusCode: number): boolean {
		return statusCode >= 500 && statusCode < 600;
	}

	/**
	 * Get retry delay recommendation for retryable status codes
	 * @param statusCode - The HTTP status code
	 * @param attempt - Current retry attempt
	 * @returns number - Recommended delay in milliseconds
	 */
	static getRetryDelay(statusCode: number, attempt: number = 1): number {
		if (!this.isRetryable(statusCode)) {
			return 0;
		}

		const baseDelay = 1000; // 1 second base delay
		const maxDelay = 30000; // 30 seconds maximum delay
		
		// Exponential backoff with jitter
		let delay = baseDelay * Math.pow(2, attempt - 1);
		
		// Add jitter (±20%)
		const jitter = delay * 0.2 * (Math.random() - 0.5);
		delay += jitter;
		
		// Cap at maximum delay
		return Math.min(delay, maxDelay);
	}

	/**
	 * Get user action recommendation for actionable status codes
	 * @param statusCode - The HTTP status code
	 * @returns string - Recommended user action
	 */
	static getUserActionRecommendation(statusCode: number): string {
		switch (statusCode) {
			case LEXWARE_HTTP_STATUS_CODES.UNAUTHORIZED:
				return 'Check your API credentials and ensure they are valid and not expired.';
			case LEXWARE_HTTP_STATUS_CODES.FORBIDDEN:
				return 'Verify that your API key has the necessary permissions for this operation.';
			case LEXWARE_HTTP_STATUS_CODES.NOT_FOUND:
				return 'Verify the resource ID or endpoint URL is correct.';
			case LEXWARE_HTTP_STATUS_CODES.METHOD_NOT_ALLOWED:
				return 'Check the API documentation for the correct HTTP method for this endpoint.';
			case LEXWARE_HTTP_STATUS_CODES.CONFLICT:
				return 'The resource has been modified by another process. Refresh and try again.';
			case LEXWARE_HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY:
				return 'Review the request data and ensure all required fields are provided and valid.';
			case LEXWARE_HTTP_STATUS_CODES.TOO_MANY_REQUESTS:
				return 'Wait before making additional requests. Consider implementing rate limiting.';
			default:
				return 'Review the error details and try again.';
		}
	}

	/**
	 * Parse error response and extract useful information
	 * @param error - The error object from axios
	 * @returns ILexwareHttpErrorResponse - Parsed error response
	 */
	static parseErrorResponse(error: any): ILexwareHttpErrorResponse {
		const status = error.response?.status || 0;
		const statusText = error.response?.statusText || 'Unknown Error';
		const message = error.response?.data?.message || error.message || 'An error occurred';
		
		return {
			status,
			statusText,
			message,
			code: error.response?.data?.code,
			details: error.response?.data?.details,
			timestamp: new Date().toISOString(),
			requestId: error.response?.headers?.['x-request-id'],
			path: error.config?.url,
			method: error.config?.method?.toUpperCase(),
			userMessage: this.getUserActionRecommendation(status),
			developerMessage: this.getStatusDescription(status),
			retryAfter: error.response?.headers?.['retry-after'] ? 
				parseInt(error.response.headers['retry-after']) : undefined,
			rateLimitRemaining: error.response?.headers?.['x-ratelimit-remaining'] ? 
				parseInt(error.response.headers['x-ratelimit-remaining']) : undefined,
			rateLimitReset: error.response?.headers?.['x-ratelimit-reset'] ? 
				parseInt(error.response.headers['x-ratelimit-reset']) : undefined,
		};
	}

	/**
	 * Check if response indicates rate limiting
	 * @param statusCode - The HTTP status code
	 * @param headers - Response headers
	 * @returns boolean - Whether the response indicates rate limiting
	 */
	static isRateLimited(statusCode: number, headers?: Record<string, string>): boolean {
		return statusCode === LEXWARE_HTTP_STATUS_CODES.TOO_MANY_REQUESTS ||
			   headers?.['x-ratelimit-remaining'] === '0';
	}

	/**
	 * Get rate limit information from headers
	 * @param headers - Response headers
	 * @returns object - Rate limit information
	 */
	static getRateLimitInfo(headers?: Record<string, string>): {
		remaining: number;
		reset: number;
		limit: number;
	} {
		return {
			remaining: parseInt(headers?.['x-ratelimit-remaining'] || '0'),
			reset: parseInt(headers?.['x-ratelimit-reset'] || '0'),
			limit: parseInt(headers?.['x-ratelimit-limit'] || '0'),
		};
	}
}
