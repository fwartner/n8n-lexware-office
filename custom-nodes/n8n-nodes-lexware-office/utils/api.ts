import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ILexwareCredentials, ILexwareApiResponse, ILexwareHttpErrorResponse, ILexwareHttpResponse } from '../types';
import { HttpStatusCodeManager } from './httpStatusCodes';
import { LEXWARE_HEADERS, LEXWARE_ERROR_MESSAGES, LEXWARE_HTTP_STATUS_CODES } from '../constants';

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

	private handleApiError(error: any): Error {
		if (error.response) {
			const { status, data, headers } = error.response;
			
			// Use comprehensive HTTP status code handling
			const statusInfo = HttpStatusCodeManager.getStatusInfo(status);
			const errorResponse = HttpStatusCodeManager.parseErrorResponse(error);
			
			// Check for rate limiting
			if (HttpStatusCodeManager.isRateLimited(status, headers)) {
				const rateLimitInfo = HttpStatusCodeManager.getRateLimitInfo(headers);
				const retryAfter = errorResponse.retryAfter || HttpStatusCodeManager.getRetryDelay(status, 1);
				
				return new Error(
					`Rate limit exceeded. Remaining: ${rateLimitInfo.remaining}/${rateLimitInfo.limit}. ` +
					`Reset at: ${new Date(rateLimitInfo.reset * 1000).toISOString()}. ` +
					`Retry after: ${retryAfter}ms. ${errorResponse.userMessage}`
				);
			}
			
			// Handle specific status codes with detailed information
			switch (status) {
				case LEXWARE_HTTP_STATUS_CODES.UNAUTHORIZED:
					return new Error(`${LEXWARE_ERROR_MESSAGES.INVALID_CREDENTIALS}: ${errorResponse.userMessage}`);
				case LEXWARE_HTTP_STATUS_CODES.FORBIDDEN:
					return new Error(`Access forbidden: ${errorResponse.userMessage}`);
				case LEXWARE_HTTP_STATUS_CODES.NOT_FOUND:
					return new Error(`${LEXWARE_ERROR_MESSAGES.RESOURCE_NOT_FOUND}: ${errorResponse.userMessage}`);
				case LEXWARE_HTTP_STATUS_CODES.CONFLICT:
					return new Error(`Conflict detected: ${errorResponse.userMessage}`);
				case LEXWARE_HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY:
					return new Error(`${LEXWARE_ERROR_MESSAGES.VALIDATION_ERROR}: ${errorResponse.userMessage}`);
				case LEXWARE_HTTP_STATUS_CODES.TOO_MANY_REQUESTS:
					return new Error(`${LEXWARE_ERROR_MESSAGES.RATE_LIMIT_EXCEEDED}: ${errorResponse.userMessage}`);
				case LEXWARE_HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR:
					return new Error(`Server error: ${errorResponse.developerMessage}`);
				case LEXWARE_HTTP_STATUS_CODES.SERVICE_UNAVAILABLE:
					return new Error(`Service temporarily unavailable: ${errorResponse.developerMessage}`);
				default:
					// Use comprehensive error information
					const errorMessage = data?.message || data?.error || statusInfo.message;
					const userAction = errorResponse.userMessage;
					
					return new Error(
						`HTTP ${status} (${statusInfo.category}): ${errorMessage}${userAction ? ` - ${userAction}` : ''}`
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
