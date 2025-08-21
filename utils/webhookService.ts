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
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${credentials.apiKey}`,
			},
		});
	}

	async registerWebhook(config: IWebhookConfig): Promise<string> {
		const webhookId = this.generateWebhookId();
		
		// Store webhook configuration
		this.webhooks.set(webhookId, config);
		
		// Simulate registration with Lexware Office
		const result = await this.simulateWebhookRegistration(webhookId, config);
		if (!result.success) {
			this.webhooks.delete(webhookId);
			throw new Error(result.error || 'Failed to register webhook');
		}
		
		console.log(`[WebhookService] Webhook registered successfully: ${webhookId}`);
		return webhookId;
	}

	async unregisterWebhook(webhookId: string): Promise<boolean> {
		const config = this.webhooks.get(webhookId);
		if (!config) {
			return false;
		}
		
		// Simulate unregistration with Lexware Office
		const result = await this.simulateWebhookUnregistration(webhookId);
		if (result.success) {
			this.webhooks.delete(webhookId);
			this.deliveryQueue.delete(webhookId);
			console.log(`[WebhookService] Webhook unregistered successfully: ${webhookId}`);
			return true;
		}
		
		return false;
	}

	async listWebhooks(): Promise<IWebhookConfig[]> {
		// Simulate listing webhooks from Lexware Office
		const result = await this.simulateWebhookListing();
		if (result.success && result.webhooks) {
			return result.webhooks;
		}
		
		// Return local webhooks if API call fails
		return Array.from(this.webhooks.values());
	}

	async updateWebhook(webhookId: string, config: Partial<IWebhookConfig>): Promise<boolean> {
		const existingConfig = this.webhooks.get(webhookId);
		if (!existingConfig) {
			return false;
		}
		
		const updatedConfig = { ...existingConfig, ...config };
		
		// Simulate update with Lexware Office
		const result = await this.simulateWebhookUpdate(webhookId, updatedConfig);
		if (result.success) {
			this.webhooks.set(webhookId, updatedConfig);
			console.log(`[WebhookService] Webhook updated successfully: ${webhookId}`);
			return true;
		}
		
		return false;
	}

	async sendWebhookEvent(event: IWebhookEvent): Promise<IWebhookDeliveryResult[]> {
		// Find matching webhooks
		const matchingWebhooks = this.findMatchingWebhooks(event);
		
		console.log(`[WebhookService] Sending event ${event.eventType} to ${matchingWebhooks.size} webhooks`);
		
		const results: IWebhookDeliveryResult[] = [];
		
		// Send to each matching webhook
		for (const [webhookId, config] of matchingWebhooks) {
			try {
				const result = await this.deliverWebhook(webhookId, config, event);
				results.push(result);
				
				// Store delivery result
				if (!this.deliveryQueue.has(webhookId)) {
					this.deliveryQueue.set(webhookId, []);
				}
				this.deliveryQueue.get(webhookId)!.push(result);
				
			} catch (error) {
				const errorResult: IWebhookDeliveryResult = {
					success: false,
					error: error instanceof Error ? error.message : 'Unknown error',
					retryCount: 0,
					deliveryId: this.generateDeliveryId(),
				};
				results.push(errorResult);
			}
		}
		
		return results;
	}

	async retryFailedDeliveries(webhookId?: string): Promise<IWebhookDeliveryResult[]> {
		const results: IWebhookDeliveryResult[] = [];
		
		if (webhookId) {
			// Retry specific webhook
			const config = this.webhooks.get(webhookId);
			const deliveries = this.deliveryQueue.get(webhookId) || [];
			
			for (const delivery of deliveries) {
				if (!delivery.success && delivery.retryCount < (config?.filters?.additionalFilters?.maxRetries || 3)) {
					try {
						const result = await this.deliverWebhook(webhookId, config!, delivery as any, delivery.retryCount + 1);
						results.push(result);
					} catch (error) {
						const errorResult: IWebhookDeliveryResult = {
							success: false,
							error: error instanceof Error ? error.message : 'Unknown error',
							retryCount: delivery.retryCount + 1,
							deliveryId: this.generateDeliveryId(),
						};
						results.push(errorResult);
					}
				}
			}
		} else {
			// Retry all failed deliveries
			for (const [id, config] of this.webhooks) {
				const webhookResults = await this.retryFailedDeliveries(id);
				results.push(...webhookResults);
			}
		}
		
		return results;
	}

	getDeliveryStatistics(webhookId?: string): {
		total: number;
		successful: number;
		failed: number;
		retryCount: number;
	} {
		let total = 0;
		let successful = 0;
		let failed = 0;
		let retryCount = 0;
		
		if (webhookId) {
			const deliveries = this.deliveryQueue.get(webhookId) || [];
			total = deliveries.length;
			successful = deliveries.filter(d => d.success).length;
			failed = deliveries.filter(d => !d.success).length;
			retryCount = deliveries.reduce((sum, d) => sum + d.retryCount, 0);
		} else {
			for (const deliveries of this.deliveryQueue.values()) {
				total += deliveries.length;
				successful += deliveries.filter(d => d.success).length;
				failed += deliveries.filter(d => !d.success).length;
				retryCount += deliveries.reduce((sum, d) => sum + d.retryCount, 0);
			}
		}
		
		return { total, successful, failed, retryCount };
	}

	private findMatchingWebhooks(event: IWebhookEvent): Map<string, IWebhookConfig> {
		const matchingWebhooks = new Map<string, IWebhookConfig>();
		
		for (const [webhookId, config] of this.webhooks) {
			if (this.webhookMatchesEvent(config, event)) {
				matchingWebhooks.set(webhookId, config);
			}
		}
		
		return matchingWebhooks;
	}

	private webhookMatchesEvent(config: IWebhookConfig, event: IWebhookEvent): boolean {
		// Check event type
		if (config.eventType !== 'all' && config.eventType !== event.eventType) {
			return false;
		}
		
		// Apply filters if configured
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

	private async deliverWebhook(webhookId: string, config: IWebhookConfig, event: IWebhookEvent, retryCount: number = 0): Promise<IWebhookDeliveryResult> {
		const deliveryId = this.generateDeliveryId();
		
		try {
			// Prepare payload
			const payload = this.prepareWebhookPayload(event, config);
			
			// Add signature if secret is provided
			if (config.webhookSecret) {
				const signature = this.generateWebhookSignature(payload, config.webhookSecret);
				payload.headers = payload.headers || {};
				payload.headers['x-lexware-signature'] = signature;
			}
			
			// Send webhook
			const response = await axios.post(config.webhookUrl, payload.data, {
				headers: payload.headers,
				timeout: 30000, // 30 second timeout
			});
			
			const result: IWebhookDeliveryResult = {
				success: response.status >= 200 && response.status < 300,
				statusCode: response.status,
				response: response.data,
				retryCount,
				deliveryId,
			};
			
			console.log(`[WebhookService] Webhook delivered successfully: ${webhookId} (${response.status})`);
			return result;
			
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Unknown error';
			console.error(`[WebhookService] Webhook delivery failed: ${webhookId} - ${errorMessage}`);
			
			const result: IWebhookDeliveryResult = {
				success: false,
				error: errorMessage,
				retryCount,
				deliveryId,
			};
			
			// Check if retry is needed
			if (config.filters?.additionalFilters?.retryOnFailure && retryCount < (config.filters.additionalFilters.maxRetries || 3)) {
				const delay = (config.filters.additionalFilters.retryDelay || 60) * 1000; // Convert to milliseconds
				setTimeout(() => {
					this.deliverWebhook(webhookId, config, event, retryCount + 1);
				}, delay);
			}
			
			return result;
		}
	}

	private prepareWebhookPayload(event: IWebhookEvent, config: IWebhookConfig): { data: any; headers: any } {
		const payload: any = {
			eventType: event.eventType,
			eventId: event.eventId,
			timestamp: event.timestamp,
			data: event.data,
		};
		
		// Add metadata if enabled
		if (config.filters?.additionalFilters?.includeMetadata !== false) {
			payload.metadata = {
				...event.metadata,
				webhookId: this.findWebhookId(config),
				deliveryTimestamp: new Date().toISOString(),
			};
		}
		
		// Add related data if enabled
		if (config.filters?.additionalFilters?.includeRelatedData) {
			payload.relatedData = this.getRelatedData(event);
		}
		
		return {
			data: payload,
			headers: {
				'Content-Type': 'application/json',
				'User-Agent': 'LexwareOffice-WebhookService/1.0',
			},
		};
	}

	private generateWebhookSignature(payload: any, secret: string): string {
		const dataString = JSON.stringify(payload);
		const crypto = require('crypto');
		return crypto.createHmac('sha256', secret).update(dataString).digest('hex');
	}

	private getRelatedData(event: IWebhookEvent): any {
		// This would fetch related data from Lexware Office API
		// For now, return basic structure
		return {
			contact: event.data?.contact || null,
			relatedVouchers: event.data?.relatedVouchers || [],
			attachments: event.data?.attachments || [],
		};
	}

	private findWebhookId(config: IWebhookConfig): string | undefined {
		for (const [webhookId, webhookConfig] of this.webhooks) {
			if (webhookConfig === config) {
				return webhookId;
			}
		}
		return undefined;
	}

	private generateWebhookId(): string {
		return `webhook_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
	}

	private generateDeliveryId(): string {
		return `delivery_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
	}

	// Simulation methods for development/testing
	private async simulateWebhookRegistration(webhookId: string, config: IWebhookConfig): Promise<{ success: boolean; error?: string }> {
		// Simulate API call delay
		await new Promise(resolve => setTimeout(resolve, 100));
		
		// Simulate success (90% success rate for testing)
		if (Math.random() > 0.1) {
			return { success: true };
		} else {
			return { success: false, error: 'Simulated registration failure' };
		}
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
