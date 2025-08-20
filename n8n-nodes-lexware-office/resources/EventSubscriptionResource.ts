import { LexwareApiClient } from '../utils/api';
import { ILexwareEventSubscription, ILexwareCredentials } from '../types';
import { LEXWARE_API_ENDPOINTS, LEXWARE_EVENT_TYPES, LEXWARE_WEBHOOK_SECURITY } from '../constants';

export class EventSubscriptionResource {
	private apiClient: LexwareApiClient;

	constructor(credentials: ILexwareCredentials) {
		this.apiClient = new LexwareApiClient(credentials);
	}

	/**
	 * Retrieve all event subscriptions with optional filtering
	 * @param params - Optional parameters for filtering and pagination
	 * @returns Promise<ILexwareEventSubscription[]> - Array of event subscriptions
	 */
	async getAll(params?: Record<string, any>): Promise<ILexwareEventSubscription[]> {
		return this.apiClient.get<ILexwareEventSubscription[]>(LEXWARE_API_ENDPOINTS.EVENT_SUBSCRIPTIONS, params);
	}

	/**
	 * Retrieve a specific event subscription by ID
	 * @param subscriptionId - The unique identifier of the subscription
	 * @returns Promise<ILexwareEventSubscription> - The event subscription
	 */
	async get(subscriptionId: string): Promise<ILexwareEventSubscription> {
		return this.apiClient.get<ILexwareEventSubscription>(`${LEXWARE_API_ENDPOINTS.EVENT_SUBSCRIPTIONS}/${subscriptionId}`);
	}

	/**
	 * Create a new event subscription
	 * @param subscriptionData - The subscription data including required fields
	 * @returns Promise<ILexwareEventSubscription> - The created subscription
	 */
	async create(subscriptionData: Partial<ILexwareEventSubscription>): Promise<ILexwareEventSubscription> {
		return this.apiClient.post<ILexwareEventSubscription>(LEXWARE_API_ENDPOINTS.EVENT_SUBSCRIPTIONS, subscriptionData);
	}

	/**
	 * Update an existing event subscription
	 * @param subscriptionId - The unique identifier of the subscription to update
	 * @param subscriptionData - Updated subscription data
	 * @returns Promise<ILexwareEventSubscription> - The updated subscription
	 */
	async update(subscriptionId: string, subscriptionData: Partial<ILexwareEventSubscription>): Promise<ILexwareEventSubscription> {
		return this.apiClient.put<ILexwareEventSubscription>(`${LEXWARE_API_ENDPOINTS.EVENT_SUBSCRIPTIONS}/${subscriptionId}`, subscriptionData);
	}

	/**
	 * Delete an event subscription
	 * @param subscriptionId - The unique identifier of the subscription to delete
	 * @returns Promise<void>
	 */
	async delete(subscriptionId: string): Promise<void> {
		return this.apiClient.delete<void>(`${LEXWARE_API_ENDPOINTS.EVENT_SUBSCRIPTIONS}/${subscriptionId}`);
	}

	/**
	 * Activate an event subscription
	 * @param subscriptionId - The unique identifier of the subscription to activate
	 * @returns Promise<ILexwareEventSubscription> - The activated subscription
	 */
	async activate(subscriptionId: string): Promise<ILexwareEventSubscription> {
		return this.apiClient.put<ILexwareEventSubscription>(`${LEXWARE_API_ENDPOINTS.EVENT_SUBSCRIPTIONS}/${subscriptionId}/activate`, {});
	}

	/**
	 * Deactivate an event subscription
	 * @param subscriptionId - The unique identifier of the subscription to deactivate
	 * @returns Promise<ILexwareEventSubscription> - The deactivated subscription
	 */
	async deactivate(subscriptionId: string): Promise<ILexwareEventSubscription> {
		return this.apiClient.put<ILexwareEventSubscription>(`${LEXWARE_API_ENDPOINTS.EVENT_SUBSCRIPTIONS}/${subscriptionId}/deactivate`, {});
	}

	/**
	 * Test an event subscription by sending a test webhook
	 * @param subscriptionId - The unique identifier of the subscription to test
	 * @returns Promise<any> - Test result
	 */
	async test(subscriptionId: string): Promise<any> {
		return this.apiClient.post<any>(`${LEXWARE_API_ENDPOINTS.EVENT_SUBSCRIPTIONS}/${subscriptionId}/test`, {});
	}

	/**
	 * Get all available event types
	 * @returns Promise<string[]> - Array of available event types
	 */
	async getEventTypes(): Promise<string[]> {
		return this.apiClient.get<string[]>(`${LEXWARE_API_ENDPOINTS.EVENT_SUBSCRIPTIONS}/event-types`);
	}

	/**
	 * Get subscriptions by event type
	 * @param eventType - The event type to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareEventSubscription[]> - Filtered subscriptions
	 */
	async getByEventType(eventType: string, params?: Record<string, any>): Promise<ILexwareEventSubscription[]> {
		const filterParams = {
			...params,
			eventType,
		};
		return this.apiClient.get<ILexwareEventSubscription[]>(LEXWARE_API_ENDPOINTS.EVENT_SUBSCRIPTIONS, filterParams);
	}

	/**
	 * Get active subscriptions only
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareEventSubscription[]> - Active subscriptions
	 */
	async getActive(params?: Record<string, any>): Promise<ILexwareEventSubscription[]> {
		const activeParams = {
			...params,
			active: true,
		};
		return this.apiClient.get<ILexwareEventSubscription[]>(LEXWARE_API_ENDPOINTS.EVENT_SUBSCRIPTIONS, activeParams);
	}

	/**
	 * Get inactive subscriptions only
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareEventSubscription[]> - Inactive subscriptions
	 */
	async getInactive(params?: Record<string, any>): Promise<ILexwareEventSubscription[]> {
		const inactiveParams = {
			...params,
			active: false,
		};
		return this.apiClient.get<ILexwareEventSubscription[]>(LEXWARE_API_ENDPOINTS.EVENT_SUBSCRIPTIONS, inactiveParams);
	}

	/**
	 * Get subscriptions by contact ID
	 * @param contactId - The contact ID to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareEventSubscription[]> - Filtered subscriptions
	 */
	async getByContact(contactId: string, params?: Record<string, any>): Promise<ILexwareEventSubscription[]> {
		const contactParams = {
			...params,
			contactId,
		};
		return this.apiClient.get<ILexwareEventSubscription[]>(LEXWARE_API_ENDPOINTS.EVENT_SUBSCRIPTIONS, contactParams);
	}

	/**
	 * Get subscriptions by voucher type
	 * @param voucherType - The voucher type to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareEventSubscription[]> - Filtered subscriptions
	 */
	async getByVoucherType(voucherType: string, params?: Record<string, any>): Promise<ILexwareEventSubscription[]> {
		const voucherParams = {
			...params,
			voucherType,
		};
		return this.apiClient.get<ILexwareEventSubscription[]>(LEXWARE_API_ENDPOINTS.EVENT_SUBSCRIPTIONS, voucherParams);
	}

	/**
	 * Get subscriptions by status
	 * @param status - The status to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareEventSubscription[]> - Filtered subscriptions
	 */
	async getByStatus(status: string, params?: Record<string, any>): Promise<ILexwareEventSubscription[]> {
		const statusParams = {
			...params,
			status,
		};
		return this.apiClient.get<ILexwareEventSubscription[]>(LEXWARE_API_ENDPOINTS.EVENT_SUBSCRIPTIONS, statusParams);
	}

	/**
	 * Verify webhook authenticity using signature verification
	 * @param payload - The webhook payload
	 * @param signature - The signature header
	 * @param secret - The webhook secret
	 * @returns boolean - True if signature is valid
	 */
	verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
		try {
			// This is a placeholder for signature verification
			// In a real implementation, you would use crypto to verify the HMAC signature
			const expectedSignature = this.generateSignature(payload, secret);
			return signature === expectedSignature;
		} catch (error) {
			return false;
		}
	}

	/**
	 * Generate webhook signature for verification
	 * @param payload - The webhook payload
	 * @param secret - The webhook secret
	 * @returns string - The generated signature
	 */
	private generateSignature(payload: string, secret: string): string {
		// This is a placeholder for signature generation
		// In a real implementation, you would use crypto to generate HMAC signature
		return `sha256=${Buffer.from(payload + secret).toString('hex')}`;
	}

	/**
	 * Get subscription delivery history
	 * @param subscriptionId - The subscription ID
	 * @returns Promise<any> - Delivery history
	 */
	async getDeliveryHistory(subscriptionId: string): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.EVENT_SUBSCRIPTIONS}/${subscriptionId}/delivery-history`);
	}

	/**
	 * Retry failed delivery for a subscription
	 * @param subscriptionId - The subscription ID
	 * @param deliveryId - The delivery ID to retry
	 * @returns Promise<any> - Retry result
	 */
	async retryDelivery(subscriptionId: string, deliveryId: string): Promise<any> {
		return this.apiClient.post<any>(`${LEXWARE_API_ENDPOINTS.EVENT_SUBSCRIPTIONS}/${subscriptionId}/delivery-history/${deliveryId}/retry`, {});
	}

	/**
	 * Get subscription statistics
	 * @param subscriptionId - The subscription ID
	 * @returns Promise<any> - Subscription statistics
	 */
	async getStatistics(subscriptionId: string): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.EVENT_SUBSCRIPTIONS}/${subscriptionId}/statistics`);
	}

	/**
	 * Bulk activate multiple subscriptions
	 * @param subscriptionIds - Array of subscription IDs to activate
	 * @returns Promise<any[]> - Array of activation results
	 */
	async bulkActivate(subscriptionIds: string[]): Promise<any[]> {
		const activationPromises = subscriptionIds.map(id => this.activate(id));
		return Promise.all(activationPromises);
	}

	/**
	 * Bulk deactivate multiple subscriptions
	 * @param subscriptionIds - Array of subscription IDs to deactivate
	 * @returns Promise<any[]> - Array of deactivation results
	 */
	async bulkDeactivate(subscriptionIds: string[]): Promise<any[]> {
		const deactivationPromises = subscriptionIds.map(id => this.deactivate(id));
		return Promise.all(deactivationPromises);
	}

	/**
	 * Search subscriptions by description or tags
	 * @param searchTerm - The search term
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareEventSubscription[]> - Search results
	 */
	async search(searchTerm: string, params?: Record<string, any>): Promise<ILexwareEventSubscription[]> {
		const searchParams = {
			...params,
			q: searchTerm,
		};
		return this.apiClient.get<ILexwareEventSubscription[]>(LEXWARE_API_ENDPOINTS.EVENT_SUBSCRIPTIONS, searchParams);
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
		
		// Validate event type
		if (subscriptionData.eventType && !Object.values(LEXWARE_EVENT_TYPES).includes(subscriptionData.eventType)) {
			missingFields.push('valid event type');
		}
		
		// Validate priority if provided
		if (subscriptionData.priority && !['low', 'normal', 'high'].includes(subscriptionData.priority)) {
			missingFields.push('valid priority (low, normal, high)');
		}
		
		// Validate retry settings if provided
		if (subscriptionData.maxRetries && (subscriptionData.maxRetries < 0 || subscriptionData.maxRetries > 10)) {
			missingFields.push('valid max retries (0-10)');
		}
		
		if (subscriptionData.retryDelay && (subscriptionData.retryDelay < 0 || subscriptionData.retryDelay > 3600)) {
			missingFields.push('valid retry delay (0-3600 seconds)');
		}
		
		return missingFields;
	}

	/**
	 * Validate subscription update data
	 * @param subscriptionData - The subscription data to validate
	 * @returns string[] - Array of validation error messages
	 */
	validateUpdateData(subscriptionData: Record<string, any>): string[] {
		const errors: string[] = [];
		
		// Validate event type if provided
		if (subscriptionData.eventType && !Object.values(LEXWARE_EVENT_TYPES).includes(subscriptionData.eventType)) {
			errors.push(`Invalid event type. Must be one of: ${Object.values(LEXWARE_EVENT_TYPES).join(', ')}`);
		}
		
		// Validate URL format if provided
		if (subscriptionData.url && !this.isValidUrl(subscriptionData.url)) {
			errors.push('Invalid URL format');
		}
		
		// Validate priority if provided
		if (subscriptionData.priority && !['low', 'normal', 'high'].includes(subscriptionData.priority)) {
			errors.push('Priority must be one of: low, normal, high');
		}
		
		// Validate retry settings if provided
		if (subscriptionData.maxRetries !== undefined) {
			if (subscriptionData.maxRetries < 0 || subscriptionData.maxRetries > 10) {
				errors.push('Max retries must be between 0 and 10');
			}
		}
		
		if (subscriptionData.retryDelay !== undefined) {
			if (subscriptionData.retryDelay < 0 || subscriptionData.retryDelay > 3600) {
				errors.push('Retry delay must be between 0 and 3600 seconds');
			}
		}
		
		// Validate date formats if provided
		if (subscriptionData.expiresAt && !this.isValidDate(subscriptionData.expiresAt)) {
			errors.push('Invalid expiration date format');
		}
		
		return errors;
	}

	/**
	 * Validate date format
	 * @param dateString - The date string to validate
	 * @returns boolean - True if date is valid
	 */
	private isValidDate(dateString: string): boolean {
		const date = new Date(dateString);
		return date instanceof Date && !isNaN(date.getTime());
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
