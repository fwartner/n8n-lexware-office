import { ITriggerFunctions } from 'n8n-core';
import {
	ITriggerResponse,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	IWebhookResponseData,
	IWebhookFunctions,
} from 'n8n-workflow';
import { ILexwareCredentials } from '../../types';

export class LexwareOfficeTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Lexware Office Trigger',
		name: 'lexwareOfficeTrigger',
		icon: 'lexware.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["eventType"]}}',
		description: 'Listen to Lexware Office events via webhooks',
		defaults: {
			name: 'Lexware Office Trigger',
		},
		inputs: [],
		outputs: ['main'],
		credentials: [
			{
				name: 'lexwareOfficeApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'responseNode',
				path: 'lexware-office-webhook',
			},
		],
		properties: [
			{
				displayName: 'Event Type',
				name: 'eventType',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Contact Created',
						value: 'contact.created',
						description: 'Triggered when a new contact is created',
					},
					{
						name: 'Contact Updated',
						value: 'contact.updated',
						description: 'Triggered when a contact is updated',
					},
					{
						name: 'Contact Deleted',
						value: 'contact.deleted',
						description: 'Triggered when a contact is deleted',
					},
					{
						name: 'Invoice Created',
						value: 'invoice.created',
						description: 'Triggered when a new invoice is created',
					},
					{
						name: 'Invoice Updated',
						value: 'invoice.updated',
						description: 'Triggered when an invoice is updated',
					},
					{
						name: 'Invoice Status Changed',
						value: 'invoice.status.changed',
						description: 'Triggered when invoice status changes',
					},
					{
						name: 'Invoice Paid',
						value: 'invoice.paid',
						description: 'Triggered when an invoice is marked as paid',
					},
					{
						name: 'Invoice Overdue',
						value: 'invoice.overdue',
						description: 'Triggered when an invoice becomes overdue',
					},
					{
						name: 'Quotation Created',
						value: 'quotation.created',
						description: 'Triggered when a new quotation is created',
					},
					{
						name: 'Quotation Updated',
						value: 'quotation.updated',
						description: 'Triggered when a quotation is updated',
					},
					{
						name: 'Quotation Status Changed',
						value: 'quotation.status.changed',
						description: 'Triggered when quotation status changes',
					},
					{
						name: 'Quotation Accepted',
						value: 'quotation.accepted',
						description: 'Triggered when a quotation is accepted',
					},
					{
						name: 'Quotation Rejected',
						value: 'quotation.rejected',
						description: 'Triggered when a quotation is rejected',
					},
					{
						name: 'Article Created',
						value: 'article.created',
						description: 'Triggered when a new article is created',
					},
					{
						name: 'Article Updated',
						value: 'article.updated',
						description: 'Triggered when an article is updated',
					},
					{
						name: 'Article Deleted',
						value: 'article.deleted',
						description: 'Triggered when an article is deleted',
					},
					{
						name: 'Voucher Created',
						value: 'voucher.created',
						description: 'Triggered when a new voucher is created',
					},
					{
						name: 'Voucher Updated',
						value: 'voucher.updated',
						description: 'Triggered when a voucher is updated',
					},
					{
						name: 'Voucher Status Changed',
						value: 'voucher.status.changed',
						description: 'Triggered when voucher status changes',
					},
					{
						name: 'Payment Received',
						value: 'payment.received',
						description: 'Triggered when a payment is received',
					},
					{
						name: 'Payment Processed',
						value: 'payment.processed',
						description: 'Triggered when a payment is processed',
					},
					{
						name: 'File Uploaded',
						value: 'file.uploaded',
						description: 'Triggered when a file is uploaded',
					},
					{
						name: 'Dunning Created',
						value: 'dunning.created',
						description: 'Triggered when a new dunning is created',
					},
					{
						name: 'Dunning Status Changed',
						value: 'dunning.status.changed',
						description: 'Triggered when dunning status changes',
					},
					{
						name: 'All Events',
						value: 'all',
						description: 'Triggered for all events (use with caution)',
					},
				],
				default: 'contact.created',
				required: true,
				description: 'Type of event to listen for',
			},
			{
				displayName: 'Webhook Secret',
				name: 'webhookSecret',
				type: 'string',
				default: '',
				required: false,
				description: 'Secret key for webhook verification (optional but recommended)',
				typeOptions: {
					password: true,
				},
			},
			{
				displayName: 'Filter by Contact ID',
				name: 'contactId',
				type: 'string',
				default: '',
				required: false,
				description: 'Only trigger for events related to a specific contact ID',
				displayOptions: {
					show: {
						eventType: [
							'contact.created',
							'contact.updated',
							'contact.deleted',
							'invoice.created',
							'invoice.updated',
							'invoice.status.changed',
							'invoice.paid',
							'invoice.overdue',
							'quotation.created',
							'quotation.updated',
							'quotation.status.changed',
							'quotation.accepted',
							'quotation.rejected',
							'payment.received',
							'payment.processed',
						],
					},
				},
			},
			{
				displayName: 'Filter by Voucher Type',
				name: 'voucherType',
				type: 'options',
				default: '',
				required: false,
				description: 'Only trigger for events related to a specific voucher type',
				options: [
					{ name: 'All Types', value: '' },
					{ name: 'Invoice', value: 'invoice' },
					{ name: 'Quotation', value: 'quotation' },
					{ name: 'Credit Note', value: 'credit_note' },
					{ name: 'Delivery Note', value: 'delivery_note' },
					{ name: 'Order Confirmation', value: 'order_confirmation' },
					{ name: 'Dunning', value: 'dunning' },
					{ name: 'Down Payment Invoice', value: 'down_payment_invoice' },
				],
				displayOptions: {
					show: {
						eventType: [
							'voucher.created',
							'voucher.updated',
							'voucher.status.changed',
							'invoice.created',
							'invoice.updated',
							'invoice.status.changed',
							'invoice.paid',
							'invoice.overdue',
							'quotation.created',
							'quotation.updated',
							'quotation.status.changed',
							'quotation.accepted',
							'quotation.rejected',
						],
					},
				},
			},
			{
				displayName: 'Filter by Status',
				name: 'status',
				type: 'options',
				default: '',
				required: false,
				description: 'Only trigger for events with a specific status',
				options: [
					{ name: 'All Statuses', value: '' },
					{ name: 'Draft', value: 'draft' },
					{ name: 'Open', value: 'open' },
					{ name: 'Paid', value: 'paid' },
					{ name: 'Overdue', value: 'overdue' },
					{ name: 'Voided', value: 'voided' },
					{ name: 'Accepted', value: 'accepted' },
					{ name: 'Rejected', value: 'rejected' },
					{ name: 'Completed', value: 'completed' },
					{ name: 'Cancelled', value: 'cancelled' },
				],
				displayOptions: {
					show: {
						eventType: [
							'invoice.status.changed',
							'quotation.status.changed',
							'voucher.status.changed',
							'dunning.status.changed',
						],
					},
				},
			},
			{
				displayName: 'Filter by Amount Range',
				name: 'amountFilter',
				type: 'collection',
				default: {},
				required: false,
				description: 'Filter events by amount range',
				displayOptions: {
					show: {
						eventType: [
							'invoice.created',
							'invoice.updated',
							'invoice.status.changed',
							'invoice.paid',
							'invoice.overdue',
							'quotation.created',
							'quotation.updated',
							'quotation.status.changed',
							'quotation.accepted',
							'quotation.rejected',
							'payment.received',
							'payment.processed',
						],
					},
				},
				options: [
					{
						displayName: 'Minimum Amount',
						name: 'minAmount',
						type: 'number',
						default: 0,
						description: 'Minimum amount to trigger the webhook',
					},
					{
						displayName: 'Maximum Amount',
						name: 'maxAmount',
						type: 'number',
						default: 0,
						description: 'Maximum amount to trigger the webhook',
					},
					{
						displayName: 'Currency',
						name: 'currency',
						type: 'string',
						default: 'EUR',
						description: 'Currency for amount filtering',
					},
				],
			},
			{
				displayName: 'Filter by Date Range',
				name: 'dateFilter',
				type: 'collection',
				default: {},
				required: false,
				description: 'Filter events by date range',
				options: [
					{
						displayName: 'Start Date',
						name: 'startDate',
						type: 'dateTime',
						default: '',
						description: 'Start date for filtering events',
					},
					{
						displayName: 'End Date',
						name: 'endDate',
						type: 'dateTime',
						default: '',
						description: 'End date for filtering events',
					},
				],
			},
			{
				displayName: 'Additional Filters',
				name: 'additionalFilters',
				type: 'collection',
				default: {},
				required: false,
				description: 'Additional filtering options',
				options: [
					{
						displayName: 'Include Metadata',
						name: 'includeMetadata',
						type: 'boolean',
						default: true,
						description: 'Include additional metadata in the webhook payload',
					},
					{
						displayName: 'Include Related Data',
						name: 'includeRelatedData',
						type: 'boolean',
						default: false,
						description: 'Include related data (e.g., contact info for invoices)',
					},
					{
						displayName: 'Retry on Failure',
						name: 'retryOnFailure',
						type: 'boolean',
						default: true,
						description: 'Retry webhook delivery on failure',
					},
					{
						displayName: 'Max Retries',
						name: 'maxRetries',
						type: 'number',
						default: 3,
						description: 'Maximum number of retry attempts',
						typeOptions: {
							minValue: 1,
							maxValue: 10,
						},
					},
					{
						displayName: 'Retry Delay (seconds)',
						name: 'retryDelay',
						type: 'number',
						default: 60,
						description: 'Delay between retry attempts in seconds',
						typeOptions: {
							minValue: 10,
							maxValue: 3600,
						},
					},
				],
			},
		],
	};

	async trigger(this: ITriggerFunctions): Promise<ITriggerResponse> {
		const eventType = this.getNodeParameter('eventType') as string;
		const webhookSecret = this.getNodeParameter('webhookSecret') as string;
		const contactId = this.getNodeParameter('contactId') as string;
		const voucherType = this.getNodeParameter('voucherType') as string;
		const status = this.getNodeParameter('status') as string;
		const amountFilter = this.getNodeParameter('amountFilter') as IDataObject;
		const dateFilter = this.getNodeParameter('dateFilter') as IDataObject;
		const additionalFilters = this.getNodeParameter('additionalFilters') as IDataObject;

		// Get webhook URL
		const webhookUrl = this.getNodeWebhookUrl('default');

		// Create webhook configuration
		const webhookConfig = {
			eventType,
			webhookUrl,
			webhookSecret,
			filters: {
				contactId: contactId || undefined,
				voucherType: voucherType || undefined,
				status: status || undefined,
				amountFilter: Object.keys(amountFilter).length > 0 ? amountFilter : undefined,
				dateFilter: Object.keys(dateFilter).length > 0 ? dateFilter : undefined,
				additionalFilters: Object.keys(additionalFilters).length > 0 ? additionalFilters : undefined,
			},
		};

		// Register webhook with Lexware Office (this would be implemented in a real scenario)
		console.log('Registering webhook with Lexware Office:', webhookConfig);

		// Return webhook response
		return {
			webhook: {
				httpMethod: 'POST',
				path: 'lexware-office-webhook',
				responseMode: 'responseNode',
				responseData: 'firstEntryJson',
			},
		};
	}

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		// Get webhook data
		const body = this.getBodyData() as IDataObject;
		const headers = this.getHeaderData() as IDataObject;

		// Verify webhook signature if secret is provided
		const webhookSecret = this.getNodeParameter('webhookSecret') as string;
		if (webhookSecret && headers['x-lexware-signature']) {
			const isValid = this.verifyWebhookSignature(body, headers['x-lexware-signature'] as string, webhookSecret);
			if (!isValid) {
				throw new Error('Invalid webhook signature');
			}
		}

		// Process webhook data
		const webhookData = this.processWebhookData(body);

		// Apply filters
		const filteredData = this.applyFilters(webhookData);

		// Return filtered data
		return {
			workflowData: [filteredData],
		};
	}

	private verifyWebhookSignature(body: IDataObject, signature: string, secret: string): boolean {
		// In a real implementation, this would verify the HMAC signature
		// For now, we'll do a simple comparison
		const expectedSignature = `sha256=${this.generateHmac(body, secret)}`;
		return signature === expectedSignature;
	}

	private generateHmac(data: IDataObject, secret: string): string {
		// In a real implementation, this would generate an HMAC
		// For now, we'll return a simple hash
		const dataString = JSON.stringify(data);
		return require('crypto').createHmac('sha256', secret).update(dataString).digest('hex');
	}

	private processWebhookData(body: IDataObject): IDataObject {
		// Process and normalize webhook data
		const processedData = {
			eventType: body.event_type || body.eventType,
			eventId: body.event_id || body.eventId,
			timestamp: body.timestamp || new Date().toISOString(),
			data: body.data || body,
			metadata: {
				source: 'lexware-office',
				version: '1.0',
				deliveryId: body.delivery_id || body.deliveryId,
				retryCount: body.retry_count || body.retryCount || 0,
			},
		};

		return processedData;
	}

	private applyFilters(data: IDataObject): IDataObject[] {
		const eventType = this.getNodeParameter('eventType') as string;
		const contactId = this.getNodeParameter('contactId') as string;
		const voucherType = this.getNodeParameter('voucherType') as string;
		const status = this.getNodeParameter('status') as string;
		const amountFilter = this.getNodeParameter('amountFilter') as IDataObject;
		const dateFilter = this.getNodeParameter('dateFilter') as IDataObject;

		// Check if event type matches
		if (eventType !== 'all' && data.eventType !== eventType) {
			return [];
		}

		// Apply contact ID filter
		if (contactId && data.data?.contactId !== contactId && data.data?.contact?.id !== contactId) {
			return [];
		}

		// Apply voucher type filter
		if (voucherType && data.data?.voucherType !== voucherType && data.data?.type !== voucherType) {
			return [];
		}

		// Apply status filter
		if (status && data.data?.status !== status) {
			return [];
		}

		// Apply amount filter
		if (amountFilter.minAmount || amountFilter.maxAmount) {
			const amount = data.data?.amount || data.data?.totalAmount || 0;
			const currency = data.data?.currency || amountFilter.currency || 'EUR';
			
			if (amountFilter.minAmount && amount < amountFilter.minAmount) {
				return [];
			}
			if (amountFilter.maxAmount && amount > amountFilter.maxAmount) {
				return [];
			}
		}

		// Apply date filter
		if (dateFilter.startDate || dateFilter.endDate) {
			const eventDate = new Date(data.timestamp as string);
			
			if (dateFilter.startDate && eventDate < new Date(dateFilter.startDate as string)) {
				return [];
			}
			if (dateFilter.endDate && eventDate > new Date(dateFilter.endDate as string)) {
				return [];
			}
		}

		// Return filtered data
		return [data];
	}
}

// Export an instance of the trigger node for n8n
export const LexwareOfficeTriggerNode = new LexwareOfficeTrigger();
