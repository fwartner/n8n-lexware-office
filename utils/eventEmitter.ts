import { WebhookService, IWebhookEvent } from './webhookService';
import { ILexwareCredentials } from '../types';
import { LEXWARE_EVENT_TYPES } from '../constants';

export interface IEventEmitterOptions {
	enableEventLogging?: boolean;
	enableWebhookDelivery?: boolean;
	maxEventQueueSize?: number;
	eventRetentionDays?: number;
}

export class EventEmitter {
	private webhookService: WebhookService;
	private eventQueue: IWebhookEvent[] = [];
	private eventLog: Map<string, IWebhookEvent> = new Map();
	private options: IEventEmitterOptions;

	constructor(credentials: ILexwareCredentials, options: IEventEmitterOptions = {}) {
		this.webhookService = new WebhookService(credentials);
		this.options = {
			enableEventLogging: true,
			enableWebhookDelivery: true,
			maxEventQueueSize: 1000,
			eventRetentionDays: 30,
			...options,
		};

		// Start event processing
		this.startEventProcessing();
	}

	/**
	 * Emit a contact created event
	 */
	async emitContactCreated(contactData: any): Promise<void> {
		const event: IWebhookEvent = {
			eventType: LEXWARE_EVENT_TYPES.CONTACT_CREATED,
			eventId: this.generateEventId(),
			timestamp: new Date().toISOString(),
			data: {
				contactId: contactData.id,
				contactType: contactData.type,
				companyName: contactData.companyName,
				firstName: contactData.firstName,
				lastName: contactData.lastName,
				email: contactData.email,
				phone: contactData.phone,
				street: contactData.street,
				zipCode: contactData.zipCode,
				city: contactData.city,
				country: contactData.country,
				vatNumber: contactData.vatNumber,
				taxNumber: contactData.taxNumber,
				contactRole: contactData.contactRole,
				createdAt: contactData.createdAt,
				updatedAt: contactData.updatedAt,
			},
			metadata: {
				source: 'lexware-office',
				version: '1.0',
			},
		};

		await this.emitEvent(event);
	}

	/**
	 * Emit a contact updated event
	 */
	async emitContactUpdated(contactData: any, changes: any): Promise<void> {
		const event: IWebhookEvent = {
			eventType: LEXWARE_EVENT_TYPES.CONTACT_CHANGED,
			eventId: this.generateEventId(),
			timestamp: new Date().toISOString(),
			data: {
				contactId: contactData.id,
				contactType: contactData.type,
				companyName: contactData.companyName,
				firstName: contactData.firstName,
				lastName: contactData.lastName,
				email: contactData.email,
				phone: contactData.phone,
				street: contactData.street,
				zipCode: contactData.zipCode,
				city: contactData.city,
				country: contactData.country,
				vatNumber: contactData.vatNumber,
				taxNumber: contactData.taxNumber,
				contactRole: contactData.contactRole,
				changes,
				updatedAt: contactData.updatedAt,
			},
			metadata: {
				source: 'lexware-office',
				version: '1.0',
			},
		};

		await this.emitEvent(event);
	}

	/**
	 * Emit a contact deleted event
	 */
	async emitContactDeleted(contactId: string, contactData: any): Promise<void> {
		const event: IWebhookEvent = {
			eventType: LEXWARE_EVENT_TYPES.CONTACT_DELETED,
			eventId: this.generateEventId(),
			timestamp: new Date().toISOString(),
			data: {
				contactId,
				contactType: contactData.type,
				companyName: contactData.companyName,
				firstName: contactData.firstName,
				lastName: contactData.lastName,
				deletedAt: new Date().toISOString(),
			},
			metadata: {
				source: 'lexware-office',
				version: '1.0',
			},
		};

		await this.emitEvent(event);
	}

	/**
	 * Emit an invoice created event
	 */
	async emitInvoiceCreated(invoiceData: any): Promise<void> {
		const event: IWebhookEvent = {
			eventType: LEXWARE_EVENT_TYPES.INVOICE_CREATED,
			eventId: this.generateEventId(),
			timestamp: new Date().toISOString(),
			data: {
				invoiceId: invoiceData.id,
				invoiceNumber: invoiceData.invoiceNumber,
				contactId: invoiceData.contactId,
				contactName: invoiceData.contactName,
				invoiceDate: invoiceData.invoiceDate,
				dueDate: invoiceData.dueDate,
				amount: invoiceData.amount,
				totalAmount: invoiceData.totalAmount,
				currency: invoiceData.currency,
				status: invoiceData.status,
				language: invoiceData.language,
				taxType: invoiceData.taxType,
				isXRechnung: invoiceData.isXRechnung,
				isRecurring: invoiceData.isRecurring,
				isClosingInvoice: invoiceData.isClosingInvoice,
				createdAt: invoiceData.createdAt,
				updatedAt: invoiceData.updatedAt,
			},
			metadata: {
				source: 'lexware-office',
				version: '1.0',
			},
		};

		await this.emitEvent(event);
	}

	/**
	 * Emit an invoice updated event
	 */
	async emitInvoiceUpdated(invoiceData: any, changes: any): Promise<void> {
		const event: IWebhookEvent = {
			eventType: LEXWARE_EVENT_TYPES.INVOICE_CHANGED,
			eventId: this.generateEventId(),
			timestamp: new Date().toISOString(),
			data: {
				invoiceId: invoiceData.id,
				invoiceNumber: invoiceData.invoiceNumber,
				contactId: invoiceData.contactId,
				contactName: invoiceData.contactName,
				invoiceDate: invoiceData.invoiceDate,
				dueDate: invoiceData.dueDate,
				amount: invoiceData.amount,
				totalAmount: invoiceData.totalAmount,
				currency: invoiceData.currency,
				status: invoiceData.status,
				language: invoiceData.language,
				taxType: invoiceData.taxType,
				isXRechnung: invoiceData.isXRechnung,
				isRecurring: invoiceData.isRecurring,
				isClosingInvoice: invoiceData.isClosingInvoice,
				changes,
				updatedAt: invoiceData.updatedAt,
			},
			metadata: {
				source: 'lexware-office',
				version: '1.0',
			},
		};

		await this.emitEvent(event);
	}

	/**
	 * Emit an invoice status changed event
	 */
	async emitInvoiceStatusChanged(invoiceData: any, oldStatus: string, newStatus: string): Promise<void> {
		const event: IWebhookEvent = {
			eventType: LEXWARE_EVENT_TYPES.INVOICE_STATUS_CHANGED,
			eventId: this.generateEventId(),
			timestamp: new Date().toISOString(),
			data: {
				invoiceId: invoiceData.id,
				invoiceNumber: invoiceData.invoiceNumber,
				contactId: invoiceData.contactId,
				contactName: invoiceData.contactName,
				oldStatus,
				newStatus,
				statusChangedAt: new Date().toISOString(),
				amount: invoiceData.amount,
				totalAmount: invoiceData.totalAmount,
				currency: invoiceData.currency,
				dueDate: invoiceData.dueDate,
			},
			metadata: {
				source: 'lexware-office',
				version: '1.0',
			},
		};

		await this.emitEvent(event);
	}

	/**
	 * Emit an invoice paid event
	 */
	async emitInvoicePaid(invoiceData: any, paymentData: any): Promise<void> {
		const event: IWebhookEvent = {
			eventType: LEXWARE_EVENT_TYPES.INVOICE_PAID,
			eventId: this.generateEventId(),
			timestamp: new Date().toISOString(),
			data: {
				invoiceId: invoiceData.id,
				invoiceNumber: invoiceData.invoiceNumber,
				contactId: invoiceData.contactId,
				contactName: invoiceData.contactName,
				amount: invoiceData.amount,
				totalAmount: invoiceData.totalAmount,
				currency: invoiceData.currency,
				status: 'paid',
				paidAt: new Date().toISOString(),
				paymentMethod: paymentData.method,
				paymentReference: paymentData.reference,
				paymentTransactionId: paymentData.transactionId,
			},
			metadata: {
				source: 'lexware-office',
				version: '1.0',
			},
		};

		await this.emitEvent(event);
	}

	/**
	 * Emit an invoice overdue event
	 */
	async emitInvoiceOverdue(invoiceData: any): Promise<void> {
		const event: IWebhookEvent = {
			eventType: LEXWARE_EVENT_TYPES.INVOICE_OVERDUE,
			eventId: this.generateEventId(),
			timestamp: new Date().toISOString(),
			data: {
				invoiceId: invoiceData.id,
				invoiceNumber: invoiceData.invoiceNumber,
				contactId: invoiceData.contactId,
				contactName: invoiceData.contactName,
				amount: invoiceData.amount,
				totalAmount: invoiceData.totalAmount,
				currency: invoiceData.currency,
				status: 'overdue',
				invoiceDate: invoiceData.invoiceDate,
				dueDate: invoiceData.dueDate,
				overdueDays: this.calculateOverdueDays(invoiceData.dueDate),
				overdueAt: new Date().toISOString(),
			},
			metadata: {
				source: 'lexware-office',
				version: '1.0',
			},
		};

		await this.emitEvent(event);
	}

	/**
	 * Emit a quotation created event
	 */
	async emitQuotationCreated(quotationData: any): Promise<void> {
		const event: IWebhookEvent = {
			eventType: LEXWARE_EVENT_TYPES.QUOTATION_CREATED,
			eventId: this.generateEventId(),
			timestamp: new Date().toISOString(),
			data: {
				quotationId: quotationData.id,
				quotationNumber: quotationData.quotationNumber,
				contactId: quotationData.contactId,
				contactName: quotationData.contactName,
				quotationDate: quotationData.quotationDate,
				validUntil: quotationData.validUntil,
				amount: quotationData.amount,
				totalAmount: quotationData.totalAmount,
				currency: quotationData.currency,
				status: quotationData.status,
				quotationType: quotationData.quotationType,
				priority: quotationData.priority,
				probability: quotationData.probability,
				expectedOrderValue: quotationData.expectedOrderValue,
				expectedOrderDate: quotationData.expectedOrderDate,
				createdAt: quotationData.createdAt,
				updatedAt: quotationData.updatedAt,
			},
			metadata: {
				source: 'lexware-office',
				version: '1.0',
			},
		};

		await this.emitEvent(event);
	}

	/**
	 * Emit a quotation status changed event
	 */
	async emitQuotationStatusChanged(quotationData: any, oldStatus: string, newStatus: string): Promise<void> {
		const event: IWebhookEvent = {
			eventType: LEXWARE_EVENT_TYPES.QUOTATION_STATUS_CHANGED,
			eventId: this.generateEventId(),
			timestamp: new Date().toISOString(),
			data: {
				quotationId: quotationData.id,
				quotationNumber: quotationData.quotationNumber,
				contactId: quotationData.contactId,
				contactName: quotationData.contactName,
				oldStatus,
				newStatus,
				statusChangedAt: new Date().toISOString(),
				amount: quotationData.amount,
				totalAmount: quotationData.totalAmount,
				currency: quotationData.currency,
				quotationDate: quotationData.quotationDate,
				validUntil: quotationData.validUntil,
			},
			metadata: {
				source: 'lexware-office',
				version: '1.0',
			},
		};

		await this.emitEvent(event);
	}

	/**
	 * Emit a quotation accepted event
	 */
	async emitQuotationAccepted(quotationData: any, acceptanceData: any): Promise<void> {
		const event: IWebhookEvent = {
			eventType: LEXWARE_EVENT_TYPES.QUOTATION_ACCEPTED,
			eventId: this.generateEventId(),
			timestamp: new Date().toISOString(),
			data: {
				quotationId: quotationData.id,
				quotationNumber: quotationData.quotationNumber,
				contactId: quotationData.contactId,
				contactName: quotationData.contactName,
				amount: quotationData.amount,
				totalAmount: quotationData.totalAmount,
				currency: quotationData.currency,
				status: 'accepted',
				acceptedAt: new Date().toISOString(),
				acceptedBy: acceptanceData.acceptedBy,
				acceptanceNotes: acceptanceData.notes,
				expectedOrderDate: quotationData.expectedOrderDate,
			},
			metadata: {
				source: 'lexware-office',
				version: '1.0',
			},
		};

		await this.emitEvent(event);
	}

	/**
	 * Emit a quotation rejected event
	 */
	async emitQuotationRejected(quotationData: any, rejectionData: any): Promise<void> {
		const event: IWebhookEvent = {
			eventType: LEXWARE_EVENT_TYPES.QUOTATION_REJECTED,
			eventId: this.generateEventId(),
			timestamp: new Date().toISOString(),
			data: {
				quotationId: quotationData.id,
				quotationNumber: quotationData.quotationNumber,
				contactId: quotationData.contactId,
				contactName: quotationData.contactName,
				amount: quotationData.amount,
				totalAmount: quotationData.totalAmount,
				currency: quotationData.currency,
				status: 'rejected',
				rejectedAt: new Date().toISOString(),
				rejectedBy: rejectionData.rejectedBy,
				rejectionReason: rejectionData.reason,
				rejectionNotes: rejectionData.notes,
			},
			metadata: {
				source: 'lexware-office',
				version: '1.0',
			},
		};

		await this.emitEvent(event);
	}

	/**
	 * Emit an article created event
	 */
	async emitArticleCreated(articleData: any): Promise<void> {
		const event: IWebhookEvent = {
			eventType: LEXWARE_EVENT_TYPES.ARTICLE_CREATED,
			eventId: this.generateEventId(),
			timestamp: new Date().toISOString(),
			data: {
				articleId: articleData.id,
				articleName: articleData.name,
				articleDescription: articleData.description,
				articleType: articleData.type,
				unitPrice: articleData.unitPrice,
				currency: articleData.currency,
				taxRate: articleData.taxRate,
				unitName: articleData.unitName,
				categoryId: articleData.categoryId,
				categoryName: articleData.categoryName,
				isArchived: articleData.isArchived,
				createdAt: articleData.createdAt,
				updatedAt: articleData.updatedAt,
			},
			metadata: {
				source: 'lexware-office',
				version: '1.0',
			},
		};

		await this.emitEvent(event);
	}

	/**
	 * Emit a payment received event
	 */
	async emitPaymentReceived(paymentData: any): Promise<void> {
		const event: IWebhookEvent = {
			eventType: LEXWARE_EVENT_TYPES.PAYMENT_RECEIVED,
			eventId: this.generateEventId(),
			timestamp: new Date().toISOString(),
			data: {
				paymentId: paymentData.id,
				contactId: paymentData.contactId,
				contactName: paymentData.contactName,
				amount: paymentData.amount,
				currency: paymentData.currency,
				paymentMethod: paymentData.method,
				paymentReference: paymentData.reference,
				transactionId: paymentData.transactionId,
				paymentDate: paymentData.paymentDate,
				clearingDate: paymentData.clearingDate,
				status: paymentData.status,
				relatedVouchers: paymentData.relatedVouchers,
				notes: paymentData.notes,
				createdAt: paymentData.createdAt,
				updatedAt: paymentData.updatedAt,
			},
			metadata: {
				source: 'lexware-office',
				version: '1.0',
			},
		};

		await this.emitEvent(event);
	}

	/**
	 * Emit a file uploaded event
	 */
	async emitFileUploaded(fileData: any): Promise<void> {
		const event: IWebhookEvent = {
			eventType: LEXWARE_EVENT_TYPES.FILE_UPLOADED,
			eventId: this.generateEventId(),
			timestamp: new Date().toISOString(),
			data: {
				fileId: fileData.id,
				fileName: fileData.name,
				fileSize: fileData.size,
				contentType: fileData.contentType,
				fileType: fileData.fileType,
				category: fileData.category,
				accessLevel: fileData.accessLevel,
				processingStatus: fileData.processingStatus,
				relatedResourceType: fileData.relatedResourceType,
				relatedResourceId: fileData.relatedResourceId,
				uploadedBy: fileData.uploadedBy,
				uploadedAt: new Date().toISOString(),
				checksum: fileData.checksum,
				checksumAlgorithm: fileData.checksumAlgorithm,
			},
			metadata: {
				source: 'lexware-office',
				version: '1.0',
			},
		};

		await this.emitEvent(event);
	}

	/**
	 * Emit a dunning created event
	 */
	async emitDunningCreated(dunningData: any): Promise<void> {
		const event: IWebhookEvent = {
			eventType: LEXWARE_EVENT_TYPES.DUNNING_CREATED,
			eventId: this.generateEventId(),
			timestamp: new Date().toISOString(),
			data: {
				dunningId: dunningData.id,
				dunningNumber: dunningData.dunningNumber,
				contactId: dunningData.contactId,
				contactName: dunningData.contactName,
				relatedInvoiceId: dunningData.relatedInvoiceId,
				relatedInvoiceNumber: dunningData.relatedInvoiceNumber,
				amount: dunningData.amount,
				totalAmount: dunningData.totalAmount,
				currency: dunningData.currency,
				status: dunningData.status,
				dunningLevel: dunningData.dunningLevel,
				dunningDate: dunningData.dunningDate,
				dueDate: dunningData.dueDate,
				createdAt: dunningData.createdAt,
				updatedAt: dunningData.updatedAt,
			},
			metadata: {
				source: 'lexware-office',
				version: '1.0',
			},
		};

		await this.emitEvent(event);
	}

	/**
	 * Emit a custom event
	 */
	async emitCustomEvent(eventType: string, data: any, metadata?: any): Promise<void> {
		const event: IWebhookEvent = {
			eventType,
			eventId: this.generateEventId(),
			timestamp: new Date().toISOString(),
			data,
			metadata: {
				source: 'lexware-office',
				version: '1.0',
				...metadata,
			},
		};

		await this.emitEvent(event);
	}

	/**
	 * Get webhook service instance
	 */
	getWebhookService(): WebhookService {
		return this.webhookService;
	}

	/**
	 * Get event statistics
	 */
	getEventStatistics(): {
		totalEvents: number;
		eventsByType: Record<string, number>;
		webhookDeliveryStats: any;
	} {
		const stats = {
			totalEvents: this.eventLog.size,
			eventsByType: {} as Record<string, number>,
			webhookDeliveryStats: this.webhookService.getDeliveryStatistics(),
		};

		// Count events by type
		for (const event of this.eventLog.values()) {
			stats.eventsByType[event.eventType] = (stats.eventsByType[event.eventType] || 0) + 1;
		}

		return stats;
	}

	/**
	 * Clear old events
	 */
	clearOldEvents(): void {
		const cutoffDate = new Date();
		cutoffDate.setDate(cutoffDate.getDate() - (this.options.eventRetentionDays || 30));

		for (const [eventId, event] of this.eventLog.entries()) {
			if (new Date(event.timestamp) < cutoffDate) {
				this.eventLog.delete(eventId);
			}
		}

		console.log(`[EventEmitter] Cleared events older than ${this.options.eventRetentionDays} days`);
	}

	/**
	 * Emit an event and process it
	 */
	private async emitEvent(event: IWebhookEvent): Promise<void> {
		try {
			// Add to event queue
			this.eventQueue.push(event);

			// Limit queue size
			if (this.eventQueue.length > (this.options.maxEventQueueSize || 1000)) {
				this.eventQueue.shift();
			}

			// Log event if enabled
			if (this.options.enableEventLogging) {
				this.eventLog.set(event.eventId, event);
			}

			console.log(`[EventEmitter] Event emitted: ${event.eventType} (${event.eventId})`);

			// Deliver webhook if enabled
			if (this.options.enableWebhookDelivery) {
				await this.webhookService.sendWebhookEvent(event);
			}

		} catch (error) {
			console.error('[EventEmitter] Error emitting event:', error);
		}
	}

	/**
	 * Start event processing
	 */
	private startEventProcessing(): void {
		// Process events every 5 seconds
		setInterval(() => {
			this.processEventQueue();
		}, 5000);

		// Clear old events every hour
		setInterval(() => {
			this.clearOldEvents();
		}, 60 * 60 * 1000);

		console.log('[EventEmitter] Event processing started');
	}

	/**
	 * Process event queue
	 */
	private async processEventQueue(): Promise<void> {
		if (this.eventQueue.length === 0) {
			return;
		}

		const events = this.eventQueue.splice(0, this.eventQueue.length);
		console.log(`[EventEmitter] Processing ${events.length} events`);

		for (const event of events) {
			try {
				// Process event (in a real implementation, this might involve database operations, etc.)
				await this.processEvent(event);
			} catch (error) {
				console.error(`[EventEmitter] Error processing event ${event.eventId}:`, error);
			}
		}
	}

	/**
	 * Process a single event
	 */
	private async processEvent(event: IWebhookEvent): Promise<void> {
		// In a real implementation, this would handle event-specific processing
		// For now, we'll just log the event
		console.log(`[EventEmitter] Processing event: ${event.eventType} (${event.eventId})`);
	}

	/**
	 * Generate unique event ID
	 */
	private generateEventId(): string {
		return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
	}

	/**
	 * Calculate overdue days
	 */
	private calculateOverdueDays(dueDate: string): number {
		const due = new Date(dueDate);
		const now = new Date();
		const diffTime = now.getTime() - due.getTime();
		return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	}
}
