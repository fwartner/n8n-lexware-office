import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ILexwareCredentials, ILexwareApiResponse, ILexwareHttpErrorResponse, ILexwareHttpResponse, ILexwareApiErrorResponse } from '../types';
import { ErrorCodeManager } from './errorCodes';
import { HttpStatusCodeManager } from './httpStatusCodes';
import { LEXWARE_HEADERS, LEXWARE_ERROR_MESSAGES, LEXWARE_HTTP_STATUS_CODES, LEXWARE_ERROR_CODES } from '../constants';

export class LexwareApiClient {
	private credentials: ILexwareCredentials;

	constructor(credentials: ILexwareCredentials) {
		this.credentials = credentials;
	}

	private getHeaders(): Record<string, string> {
		return {
			'Authorization': `Bearer ${this.credentials.apiKey}`,
			'Accept': LEXWARE_HEADERS.ACCEPT,
			'Content-Type': LEXWARE_HEADERS.CONTENT_TYPE,
		};
	}

	private buildUrl(endpoint: string): string {
		return `${this.credentials.resourceUrl}${endpoint}`;
	}

	async makeRequest<T>(
		method: string,
		endpoint: string,
		data?: any,
		params?: Record<string, any>
	): Promise<T> {
		const config: AxiosRequestConfig = {
			method,
			url: this.buildUrl(endpoint),
			headers: this.getHeaders(),
			data,
			params,
		};

		try {
			const response: AxiosResponse<T> = await axios(config);
			return response.data;
		} catch (error: any) {
			throw this.handleApiError(error);
		}
	}

	async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
		return this.makeRequest<T>('GET', endpoint, undefined, params);
	}

	async post<T>(endpoint: string, data?: any, params?: Record<string, any>): Promise<T> {
		return this.makeRequest<T>('POST', endpoint, data, params);
	}

	async put<T>(endpoint: string, data?: any, params?: Record<string, any>): Promise<T> {
		return this.makeRequest<T>('PUT', endpoint, data, params);
	}

	async delete<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
		return this.makeRequest<T>('DELETE', endpoint, undefined, params);
	}

	/**
	 * Get comprehensive response information including headers and status
	 * @param endpoint - The API endpoint
	 * @param params - Query parameters
	 * @returns Promise<ILexwareHttpResponse<T>> - Full response information
	 */
	async getWithResponseInfo<T>(endpoint: string, params?: Record<string, any>): Promise<ILexwareHttpResponse<T>> {
		const config: AxiosRequestConfig = {
			method: 'GET',
			url: this.buildUrl(endpoint),
			headers: this.getHeaders(),
			params,
		};

		try {
			const response: AxiosResponse<T> = await axios(config);
			
			return {
				data: response.data,
				status: response.status,
				statusText: response.statusText,
				headers: response.headers as Record<string, string>,
				timestamp: new Date().toISOString(),
				requestId: response.headers['x-request-id'],
			};
		} catch (error: any) {
			throw this.handleApiError(error);
		}
	}

	/**
	 * Check if a response indicates success
	 * @param status - HTTP status code
	 * @returns boolean - Whether the response indicates success
	 */
	isSuccessResponse(status: number): boolean {
		return HttpStatusCodeManager.isSuccess(status);
	}

	/**
	 * Get rate limit information from response headers
	 * @param headers - Response headers
	 * @returns object - Rate limit information
	 */
	getRateLimitInfo(headers: Record<string, string>): {
		remaining: number;
		reset: number;
		limit: number;
	} {
		return HttpStatusCodeManager.getRateLimitInfo(headers);
	}

	/**
	 * Get comprehensive error information for debugging
	 * @param error - The error object
	 * @returns ILexwareApiErrorResponse - Detailed error information
	 */
	getErrorInfo(error: any): ILexwareApiErrorResponse {
		return ErrorCodeManager.parseErrorResponse(error);
	}

	/**
	 * Check if error is retryable
	 * @param error - The error object
	 * @returns boolean - Whether the error is retryable
	 */
	isErrorRetryable(error: any): boolean {
		const errorInfo = ErrorCodeManager.parseErrorResponse(error);
		return ErrorCodeManager.isRetryable(errorInfo.code);
	}

	/**
	 * Get retry delay recommendation for error
	 * @param error - The error object
	 * @param attempt - Current retry attempt
	 * @returns number - Recommended delay in milliseconds
	 */
	getRetryDelay(error: any, attempt: number = 1): number {
		const errorInfo = ErrorCodeManager.parseErrorResponse(error);
		const status = error.response?.status || 0;
		return HttpStatusCodeManager.getRetryDelay(status, attempt);
	}

	private handleApiError(error: any): Error {
		if (error.response) {
			const { status, data, headers } = error.response;
			
			// Use comprehensive error code handling
			const apiErrorResponse = ErrorCodeManager.parseErrorResponse(error);
			const errorCodeInfo = ErrorCodeManager.getErrorCodeInfo(apiErrorResponse.code);
			
			// Check for rate limiting
			if (HttpStatusCodeManager.isRateLimited(status, headers)) {
				const rateLimitInfo = HttpStatusCodeManager.getRateLimitInfo(headers);
				const retryAfter = apiErrorResponse.retryAfter || HttpStatusCodeManager.getRetryDelay(status, 1);
				
				return new Error(
					`Rate limit exceeded. Remaining: ${rateLimitInfo.remaining}/${rateLimitInfo.limit}. ` +
					`Reset at: ${new Date(rateLimitInfo.reset * 1000).toISOString()}. ` +
					`Retry after: ${retryAfter}ms. ${apiErrorResponse.userMessage}`
				);
			}
			
			// Handle specific error codes with detailed information
			switch (apiErrorResponse.code) {
				case LEXWARE_ERROR_CODES.AUTHENTICATION_FAILED:
				case LEXWARE_ERROR_CODES.INVALID_API_KEY:
				case LEXWARE_ERROR_CODES.API_KEY_EXPIRED:
					return new Error(`${LEXWARE_ERROR_MESSAGES.INVALID_CREDENTIALS}: ${apiErrorResponse.userMessage}`);
				
				case LEXWARE_ERROR_CODES.INSUFFICIENT_PERMISSIONS:
					return new Error(`Access forbidden: ${apiErrorResponse.userMessage}`);
				
				case LEXWARE_ERROR_CODES.RESOURCE_NOT_FOUND:
					return new Error(`${LEXWARE_ERROR_MESSAGES.RESOURCE_NOT_FOUND}: ${apiErrorResponse.userMessage}`);
				
				case LEXWARE_ERROR_CODES.RESOURCE_CONFLICT:
				case LEXWARE_ERROR_CODES.VERSION_CONFLICT:
				case LEXWARE_ERROR_CODES.CONCURRENT_MODIFICATION:
					return new Error(`Conflict detected: ${apiErrorResponse.userMessage}`);
				
				case LEXWARE_ERROR_CODES.VALIDATION_FAILED:
				case LEXWARE_ERROR_CODES.REQUIRED_FIELD_MISSING:
				case LEXWARE_ERROR_CODES.INVALID_FIELD_VALUE:
					return new Error(`${LEXWARE_ERROR_MESSAGES.VALIDATION_ERROR}: ${apiErrorResponse.userMessage}`);
				
				case LEXWARE_ERROR_CODES.RATE_LIMIT_EXCEEDED:
				case LEXWARE_ERROR_CODES.THROTTLE_LIMIT_EXCEEDED:
				case LEXWARE_ERROR_CODES.QUOTA_EXCEEDED:
					return new Error(`${LEXWARE_ERROR_MESSAGES.RATE_LIMIT_EXCEEDED}: ${apiErrorResponse.userMessage}`);
				
				case LEXWARE_ERROR_CODES.INTERNAL_SERVER_ERROR:
				case LEXWARE_ERROR_CODES.DATABASE_ERROR:
				case LEXWARE_ERROR_CODES.EXTERNAL_SERVICE_ERROR:
					return new Error(`Server error: ${apiErrorResponse.developerMessage}`);
				
				case LEXWARE_ERROR_CODES.SERVICE_UNAVAILABLE:
				case LEXWARE_ERROR_CODES.MAINTENANCE_MODE:
				case LEXWARE_ERROR_CODES.SYSTEM_OVERLOAD:
					return new Error(`Service temporarily unavailable: ${apiErrorResponse.developerMessage}`);
				
				case LEXWARE_ERROR_CODES.BUSINESS_RULE_VIOLATION:
				case LEXWARE_ERROR_CODES.INVALID_TRANSITION:
				case LEXWARE_ERROR_CODES.WORKFLOW_CONSTRAINT:
					return new Error(`Business rule violation: ${apiErrorResponse.userMessage}`);
				
				case LEXWARE_ERROR_CODES.FILE_TOO_LARGE:
				case LEXWARE_ERROR_CODES.INVALID_FILE_TYPE:
				case LEXWARE_ERROR_CODES.FILE_CORRUPTED:
				case LEXWARE_ERROR_CODES.UPLOAD_FAILED:
				case LEXWARE_ERROR_CODES.DOWNLOAD_FAILED:
					return new Error(`File operation failed: ${apiErrorResponse.userMessage}`);
				
				case LEXWARE_ERROR_CODES.XRECHNUNG_VALIDATION_FAILED:
				case LEXWARE_ERROR_CODES.EINVOICE_FORMAT_ERROR:
				case LEXWARE_ERROR_CODES.COMPANY_DATA_INVALID:
				case LEXWARE_ERROR_CODES.PRINT_SETTINGS_INVALID:
					return new Error(`E-Invoice validation failed: ${apiErrorResponse.userMessage}`);
				
				default:
					// Use comprehensive error information
					const errorMessage = data?.message || data?.error || apiErrorResponse.message;
					const userAction = apiErrorResponse.userMessage;
					const severity = errorCodeInfo.severity;
					const category = errorCodeInfo.category;
					
					return new Error(
						`[${severity.toUpperCase()}] ${category}: ${errorMessage}${userAction ? ` - ${userAction}` : ''} ` +
						`(Code: ${apiErrorResponse.code}, Status: ${status})`
					);
			}
		} else if (error.request) {
			return new Error(LEXWARE_ERROR_MESSAGES.NETWORK_ERROR);
		} else {
			return new Error(LEXWARE_ERROR_MESSAGES.UNKNOWN_ERROR);
		}
	}
}

export function createApiClient(credentials: ILexwareCredentials): LexwareApiClient {
	return new LexwareApiClient(credentials);
}

export function buildPaginationParams(
	returnAll: boolean,
	limit: number = 50
): Record<string, any> {
	if (returnAll) {
		return {};
	}
	
	return {
		size: Math.min(limit, 250),
		page: 0,
	};
}

export function formatDate(date: Date): string {
	return date.toISOString().split('T')[0];
}

export function getCurrentDate(): string {
	return formatDate(new Date());
}
