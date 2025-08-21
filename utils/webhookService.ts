import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ILexwareCredentials } from '../types';
import { LEXWARE_EVENT_TYPES, LEXWARE_WEBHOOK_SECURITY } from '../constants';

export interface IWebhookConfig {
	eventType: string;
	webhookUrl: string;
	webhookSecret?: string;
	filters?: {
		contactId?: string;
		voucherType?: string;
		status?: string;
		amountFilter?: {
			minAmount?: number;
			maxAmount?: number;
			currency?: string;
		};
		dateFilter?: {
			startDate?: string;
			endDate?: string;
		};
		additionalFilters?: {
			includeMetadata?: boolean;
			includeRelatedData?: boolean;
			retryOnFailure?: boolean;
			maxRetries?: number;
			retryDelay?: number;
		};
	};
}

export interface IWebhookEvent {
	eventType: string;
	eventId: string;
	timestamp: string;
	data: any;
	metadata?: {
		source: string;
		version: string;
		deliveryId?: string;
		retryCount?: number;
	};
}

export interface IWebhookDeliveryResult {
	success: boolean;
	statusCode?: number;
	response?: any;
	error?: string;
	retryCount: number;
	deliveryId: string;
}

export class WebhookService {
	private apiClient: AxiosInstance;
	private webhooks: Map<string, IWebhookConfig> = new Map();
	private deliveryQueue: Map<string, IWebhookDeliveryResult[]> = new Map();

	constructor(credentials: ILexwareCredentials) {
		this.apiClient = axios.create({
			baseURL: credentials.resourceUrl,
			headers: {
				'Authorization': `Bearer ${credentials.apiKey}`,
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
			timeout: 30000, // 30 seconds timeout
		});

		// Add request interceptor for logging
		this.apiClient.interceptors.request.use(
			(config) => {
				console.log(`[WebhookService] Making request to: ${config.method?.toUpperCase()} ${config.url}`);
				return config;
			},
			(error) => {
				console.error('[WebhookService] Request error:', error);
				return Promise.reject(error);
			}
		);

		// Add response interceptor for logging
		this.apiClient.interceptors.response.use(
			(response) => {
				console.log(`[WebhookService] Response received: ${response.status} ${response.statusText}`);
				return response;
			},
			(error) => {
				console.error('[WebhookService] Response error:', error.response?.status, error.response?.statusText);
				return Promise.reject(error);
			}
		);
	}

	/**
	 * Register a new webhook with Lexware Office
	 */
	async registerWebhook(config: IWebhookConfig): Promise<string> {
		try {
			const webhookId = this.generateWebhookId();
			
			// Store webhook configuration locally
			this.webhooks.set(webhookId, config);

			// In a real implementation, this would register the webhook with Lexware Office API
			// For now, we'll simulate the registration
			console.log(`[WebhookService] Registering webhook: ${webhookId}`, config);

			// Simulate API call to register webhook
			const response = await this.simulateWebhookRegistration(webhookId, config);
			
			if (response.success) {
				console.log(`[WebhookService] Webhook registered successfully: ${webhookId}`);
				return webhookId;
			} else {
				throw new Error(`Failed to register webhook: ${response.error}`);
			}
		} catch (error) {
			console.error('[WebhookService] Error registering webhook:', error);
			throw error;
		}
	}

	/**
	 * Unregister a webhook
	 */
	async unregisterWebhook(webhookId: string): Promise<boolean> {
		try {
			const config = this.webhooks.get(webhookId);
			if (!config) {
				throw new Error(`Webhook not found: ${webhookId}`);
			}

			// In a real implementation, this would unregister the webhook with Lexware Office API
			console.log(`[WebhookService] Unregistering webhook: ${webhookId}`);

			// Simulate API call to unregister webhook
			const response = await this.simulateWebhookUnregistration(webhookId);
			
			if (response.success) {
				// Remove from local storage
				this.webhooks.delete(webhookId);
				console.log(`[WebhookService] Webhook unregistered successfully: ${webhookId}`);
				return true;
			} else {
				throw new Error(`Failed to unregister webhook: ${response.error}`);
			}
		} catch (error) {
			console.error('[WebhookService] Error unregistering webhook:', error);
			throw error;
		}
	}

	/**
	 * List all registered webhooks
	 */
	async listWebhooks(): Promise<IWebhookConfig[]> {
		try {
			// In a real implementation, this would fetch webhooks from Lexware Office API
			console.log('[WebhookService] Listing webhooks');

			// Simulate API call to list webhooks
			const response = await this.simulateWebhookListing();
			
			if (response.success) {
				return response.webhooks || Array.from(this.webhooks.values());
			} else {
				throw new Error(`Failed to list webhooks: ${response.error}`);
			}
		} catch (error) {
			console.error('[WebhookService] Error listing webhooks:', error);
			throw error;
		}
	}

	/**
	 * Update webhook configuration
	 */
	async updateWebhook(webhookId: string, config: Partial<IWebhookConfig>): Promise<boolean> {
		try {
			const existingConfig = this.webhooks.get(webhookId);
			if (!existingConfig) {
				throw new Error(`Webhook not found: ${webhookId}`);
			}

			// Merge configurations
			const updatedConfig = { ...existingConfig, ...config };
			
			// In a real implementation, this would update the webhook with Lexware Office API
			console.log(`[WebhookService] Updating webhook: ${webhookId}`, updatedConfig);

			// Simulate API call to update webhook
			const response = await this.simulateWebhookUpdate(webhookId, updatedConfig);
			
			if (response.success) {
				// Update local storage
				this.webhooks.set(webhookId, updatedConfig);
				console.log(`[WebhookService] Webhook updated successfully: ${webhookId}`);
				return true;
			} else {
				throw new Error(`Failed to update webhook: ${response.error}`);
			}
		} catch (error) {
			console.error('[WebhookService] Error updating webhook:', error);
			throw error;
		}
	}

	/**
	 * Send webhook event to registered webhooks
	 */
	async sendWebhookEvent(event: IWebhookEvent): Promise<IWebhookDeliveryResult[]> {
		const results: IWebhookDeliveryResult[] = [];

		try {
			// Find webhooks that match the event type
			const matchingWebhooks = this.findMatchingWebhooks(event);

			console.log(`[WebhookService] Sending event ${event.eventType} to ${matchingWebhooks.length} webhooks`);

			// Send to each matching webhook
			for (const [webhookId, config] of matchingWebhooks) {
				const result = await this.deliverWebhook(webhookId, config, event);
				results.push(result);

				// Store delivery result for tracking
				if (!this.deliveryQueue.has(webhookId)) {
					this.deliveryQueue.set(webhookId, []);
				}
				this.deliveryQueue.get(webhookId)!.push(result);
			}

			return results;
		} catch (error) {
			console.error('[WebhookService] Error sending webhook event:', error);
			throw error;
		}
	}

	/**
	 * Retry failed webhook deliveries
	 */
	async retryFailedDeliveries(webhookId?: string): Promise<IWebhookDeliveryResult[]> {
		const results: IWebhookDeliveryResult[] = [];

		try {
			const webhooksToRetry = webhookId ? [webhookId] : Array.from(this.deliveryQueue.keys());

			for (const id of webhooksToRetry) {
				const failedDeliveries = this.deliveryQueue.get(id)?.filter(r => !r.success) || [];
				const config = this.webhooks.get(id);

				if (config && failedDeliveries.length > 0) {
					console.log(`[WebhookService] Retrying ${failedDeliveries.length} failed deliveries for webhook: ${id}`);

					for (const delivery of failedDeliveries) {
						if (delivery.retryCount < (config.additionalFilters?.maxRetries || 3)) {
							// Recreate event from delivery result (in real implementation, you'd store the original event)
							const event: IWebhookEvent = {
								eventType: 'retry',
								eventId: delivery.deliveryId,
								timestamp: new Date().toISOString(),
								data: { retryFor: delivery.deliveryId },
							};

							const retryResult = await this.deliverWebhook(id, config, event, delivery.retryCount + 1);
							results.push(retryResult);

							// Update delivery result
							const index = this.deliveryQueue.get(id)!.findIndex(r => r.deliveryId === delivery.deliveryId);
							if (index !== -1) {
								this.deliveryQueue.get(id)![index] = retryResult;
							}
						}
					}
				}
			}

			return results;
		} catch (error) {
			console.error('[WebhookService] Error retrying failed deliveries:', error);
			throw error;
		}
	}

	/**
	 * Get webhook delivery statistics
	 */
	getDeliveryStatistics(webhookId?: string): {
		total: number;
		successful: number;
		failed: number;
		retryCount: number;
	} {
		const stats = { total: 0, successful: 0, failed: 0, retryCount: 0 };

		try {
			const webhooksToCheck = webhookId ? [webhookId] : Array.from(this.deliveryQueue.keys());

			for (const id of webhooksToCheck) {
				const deliveries = this.deliveryQueue.get(id) || [];
				
				stats.total += deliveries.length;
				stats.successful += deliveries.filter(d => d.success).length;
				stats.failed += deliveries.filter(d => !d.success).length;
				stats.retryCount += deliveries.reduce((sum, d) => sum + d.retryCount, 0);
			}

			return stats;
		} catch (error) {
			console.error('[WebhookService] Error getting delivery statistics:', error);
			return stats;
		}
	}

	/**
	 * Find webhooks that match the given event
	 */
	private findMatchingWebhooks(event: IWebhookEvent): Map<string, IWebhookConfig> {
		const matchingWebhooks = new Map<string, IWebhookConfig>();

		for (const [webhookId, config] of this.webhooks) {
			if (this.webhookMatchesEvent(config, event)) {
				matchingWebhooks.set(webhookId, config);
			}
		}

		return matchingWebhooks;
	}

	/**
	 * Check if a webhook configuration matches an event
	 */
	private webhookMatchesEvent(config: IWebhookConfig, event: IWebhookEvent): boolean {
		// Check event type
		if (config.eventType !== 'all' && config.eventType !== event.eventType) {
			return false;
		}

		// Apply filters
		if (config.filters) {
			const { contactId, voucherType, status, amountFilter, dateFilter } = config.filters;

			// Contact ID filter
			if (contactId && event.data?.contactId !== contactId && event.data?.contact?.id !== contactId) {
				return false;
			}

			// Voucher type filter
			if (voucherType && event.data?.voucherType !== voucherType && event.data?.type !== voucherType) {
				return false;
			}

			// Status filter
			if (status && event.data?.status !== status) {
				return false;
			}

			// Amount filter
			if (amountFilter?.minAmount || amountFilter?.maxAmount) {
				const amount = event.data?.amount || event.data?.totalAmount || 0;
				
				if (amountFilter.minAmount && amount < amountFilter.minAmount) {
					return false;
				}
				if (amountFilter.maxAmount && amount > amountFilter.maxAmount) {
					return false;
				}
			}

			// Date filter
			if (dateFilter?.startDate || dateFilter?.endDate) {
				const eventDate = new Date(event.timestamp);
				
				if (dateFilter.startDate && eventDate < new Date(dateFilter.startDate)) {
					return false;
				}
				if (dateFilter.endDate && eventDate > new Date(dateFilter.endDate)) {
					return false;
				}
			}
		}

		return true;
	}

	/**
	 * Deliver webhook to a specific endpoint
	 */
	private async deliverWebhook(
		webhookId: string, 
		config: IWebhookConfig, 
		event: IWebhookEvent, 
		retryCount: number = 0
	): Promise<IWebhookDeliveryResult> {
		const deliveryId = this.generateDeliveryId();
		const result: IWebhookDeliveryResult = {
			success: false,
			retryCount,
			deliveryId,
		};

		try {
			// Prepare webhook payload
			const payload = this.prepareWebhookPayload(event, config);

			// Add security headers
			const headers: Record<string, string> = {
				'Content-Type': 'application/json',
				'User-Agent': 'Lexware-Office-Webhook/1.0',
			};

			if (config.webhookSecret) {
				const signature = this.generateWebhookSignature(payload, config.webhookSecret);
				headers[LEXWARE_WEBHOOK_SECURITY.VERIFICATION_HEADER] = signature;
			}

			// Add retry headers
			headers[LEXWARE_WEBHOOK_SECURITY.RETRY_HEADERS.RETRY_COUNT] = retryCount.toString();
			headers[LEXWARE_WEBHOOK_SECURITY.RETRY_HEADERS.DELIVERY_ID] = deliveryId;

			// Send webhook
			const response: AxiosResponse = await axios.post(config.webhookUrl, payload, {
				headers,
				timeout: 30000,
			});

			result.success = response.status >= 200 && response.status < 300;
			result.statusCode = response.status;
			result.response = response.data;

			console.log(`[WebhookService] Webhook delivered successfully: ${webhookId} -> ${response.status}`);

		} catch (error: any) {
			result.error = error.message || 'Unknown error';
			result.statusCode = error.response?.status;

			console.error(`[WebhookService] Webhook delivery failed: ${webhookId}`, error.message);

			// Schedule retry if configured
			if (config.additionalFilters?.retryOnFailure && retryCount < (config.additionalFilters.maxRetries || 3)) {
				const delay = (config.additionalFilters.retryDelay || 60) * 1000; // Convert to milliseconds
				setTimeout(() => {
					this.deliverWebhook(webhookId, config, event, retryCount + 1);
				}, delay);
			}
		}

		return result;
	}

	/**
	 * Prepare webhook payload based on configuration
	 */
	private prepareWebhookPayload(event: IWebhookEvent, config: IWebhookConfig): any {
		let payload: any = {
			event_type: event.eventType,
			event_id: event.eventId,
			timestamp: event.timestamp,
			data: event.data,
		};

		// Add metadata if configured
		if (config.additionalFilters?.includeMetadata !== false) {
			payload.metadata = {
				...event.metadata,
				webhook_id: this.findWebhookId(config),
				delivery_timestamp: new Date().toISOString(),
			};
		}

		// Add related data if configured
		if (config.additionalFilters?.includeRelatedData) {
			payload.related_data = this.getRelatedData(event);
		}

		return payload;
	}

	/**
	 * Generate webhook signature for security
	 */
	private generateWebhookSignature(payload: any, secret: string): string {
		const dataString = JSON.stringify(payload);
		const crypto = require('crypto');
		const hmac = crypto.createHmac(LEXWARE_WEBHOOK_SECURITY.VERIFICATION_ALGORITHM, secret);
		hmac.update(dataString);
		return `${LEXWARE_WEBHOOK_SECURITY.VERIFICATION_ALGORITHM}=${hmac.digest('hex')}`;
	}

	/**
	 * Get related data for an event
	 */
	private getRelatedData(event: IWebhookEvent): any {
		// In a real implementation, this would fetch related data from the database
		// For now, we'll return a placeholder
		return {
			note: 'Related data would be fetched based on event type and data',
			event_type: event.eventType,
		};
	}

	/**
	 * Find webhook ID for a configuration
	 */
	private findWebhookId(config: IWebhookConfig): string | undefined {
		for (const [id, webhookConfig] of this.webhooks) {
			if (webhookConfig === config) {
				return id;
			}
		}
		return undefined;
	}

	/**
	 * Generate unique webhook ID
	 */
	private generateWebhookId(): string {
		return `wh_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
	}

	/**
	 * Generate unique delivery ID
	 */
	private generateDeliveryId(): string {
		return `del_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
	}

	// Simulation methods for development/testing
	private async simulateWebhookRegistration(webhookId: string, config: IWebhookConfig): Promise<{ success: boolean; error?: string }> {
		// Simulate API delay
		await new Promise(resolve => setTimeout(resolve, 100));
		
		// Simulate success
		return { success: true };
	}

	private async simulateWebhookUnregistration(webhookId: string): Promise<{ success: boolean; error?: string }> {
		await new Promise(resolve => setTimeout(resolve, 100));
		return { success: true };
	}

	private async simulateWebhookListing(): Promise<{ success: boolean; webhooks?: IWebhookConfig[]; error?: string }> {
		await new Promise(resolve => setTimeout(resolve, 100));
		return { success: true, webhooks: Array.from(this.webhooks.values()) };
	}

	private async simulateWebhookUpdate(webhookId: string, config: IWebhookConfig): Promise<{ success: boolean; error?: string }> {
		await new Promise(resolve => setTimeout(resolve, 100));
		return { success: true };
	}
}
