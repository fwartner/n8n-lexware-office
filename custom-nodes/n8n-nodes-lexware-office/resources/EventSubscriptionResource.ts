import { LexwareApiClient } from '../utils/api';
import { ILexwareEventSubscription, ILexwareCredentials } from '../types';
import { LEXWARE_API_ENDPOINTS } from '../constants';

export class EventSubscriptionResource {
	private apiClient: LexwareApiClient;

	constructor(credentials: ILexwareCredentials) {
		this.apiClient = new LexwareApiClient(credentials);
	}

	async getAll(params?: Record<string, any>): Promise<ILexwareEventSubscription[]> {
		return this.apiClient.get<ILexwareEventSubscription[]>(LEXWARE_API_ENDPOINTS.EVENT_SUBSCRIPTIONS, params);
	}

	async get(subscriptionId: string): Promise<ILexwareEventSubscription> {
		return this.apiClient.get<ILexwareEventSubscription>(`${LEXWARE_API_ENDPOINTS.EVENT_SUBSCRIPTIONS}/${subscriptionId}`);
	}

	async create(subscriptionData: Partial<ILexwareEventSubscription>): Promise<ILexwareEventSubscription> {
		return this.apiClient.post<ILexwareEventSubscription>(LEXWARE_API_ENDPOINTS.EVENT_SUBSCRIPTIONS, subscriptionData);
	}

	async update(subscriptionId: string, subscriptionData: Partial<ILexwareEventSubscription>): Promise<ILexwareEventSubscription> {
		return this.apiClient.put<ILexwareEventSubscription>(`${LEXWARE_API_ENDPOINTS.EVENT_SUBSCRIPTIONS}/${subscriptionId}`, subscriptionData);
	}

	async delete(subscriptionId: string): Promise<void> {
		return this.apiClient.delete<void>(`${LEXWARE_API_ENDPOINTS.EVENT_SUBSCRIPTIONS}/${subscriptionId}`);
	}

	async activate(subscriptionId: string): Promise<ILexwareEventSubscription> {
		return this.apiClient.put<ILexwareEventSubscription>(`${LEXWARE_API_ENDPOINTS.EVENT_SUBSCRIPTIONS}/${subscriptionId}/activate`, {});
	}

	async deactivate(subscriptionId: string): Promise<ILexwareEventSubscription> {
		return this.apiClient.put<ILexwareEventSubscription>(`${LEXWARE_API_ENDPOINTS.EVENT_SUBSCRIPTIONS}/${subscriptionId}/deactivate`, {});
	}

	async test(subscriptionId: string): Promise<any> {
		return this.apiClient.post<any>(`${LEXWARE_API_ENDPOINTS.EVENT_SUBSCRIPTIONS}/${subscriptionId}/test`, {});
	}

	async getEventTypes(): Promise<string[]> {
		return this.apiClient.get<string[]>(`${LEXWARE_API_ENDPOINTS.EVENT_SUBSCRIPTIONS}/event-types`);
	}

	validateCreateData(subscriptionData: Record<string, any>): string[] {
		const requiredFields = ['eventType', 'url'];
		const missingFields: string[] = [];
		
		for (const field of requiredFields) {
			if (!subscriptionData[field] || (typeof subscriptionData[field] === 'string' && subscriptionData[field].trim() === '')) {
				missingFields.push(field);
			}
		}
		
		// Validate URL format
		if (subscriptionData.url && !this.isValidUrl(subscriptionData.url)) {
			missingFields.push('valid URL format');
		}
		
		return missingFields;
	}

	private isValidUrl(url: string): boolean {
		try {
			new URL(url);
			return url.startsWith('http://') || url.startsWith('https://');
		} catch {
			return false;
		}
	}
}
