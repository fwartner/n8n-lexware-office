import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ILexwareCredentials, ILexwareApiResponse } from '../types';
import { LEXWARE_HEADERS, LEXWARE_ERROR_MESSAGES } from '../constants';

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

	private handleApiError(error: any): Error {
		if (error.response) {
			const { status, data } = error.response;
			
			switch (status) {
				case 401:
					return new Error(LEXWARE_ERROR_MESSAGES.INVALID_CREDENTIALS);
				case 404:
					return new Error(LEXWARE_ERROR_MESSAGES.RESOURCE_NOT_FOUND);
				case 422:
					return new Error(LEXWARE_ERROR_MESSAGES.VALIDATION_ERROR);
				case 429:
					return new Error(LEXWARE_ERROR_MESSAGES.RATE_LIMIT_EXCEEDED);
				default:
					return new Error(data?.message || `HTTP ${status}: ${data?.error || 'Unknown error'}`);
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
