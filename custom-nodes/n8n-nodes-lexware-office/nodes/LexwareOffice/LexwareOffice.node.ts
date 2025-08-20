import { IExecuteFunctions } from 'n8n-core';
import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
} from 'n8n-workflow';
import { ResourceFactory } from '../../resources';
import { 
	LEXWARE_RESOURCE_TYPES, 
	LEXWARE_OPERATIONS, 
	LEXWARE_VOUCHER_TYPES,
	LEXWARE_CONTACT_TYPES,
	LEXWARE_ARTICLE_TYPES,
	LEXWARE_DEFAULT_VALUES
} from '../../constants';
import { ILexwareCredentials, ICredentialDataDecryptedObject } from '../../types';

export class LexwareOffice implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Lexware Office',
		name: 'lexwareOffice',
		icon: './lexware.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Lexware Office API',
		defaults: {
			name: 'Lexware Office',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'lexwareOfficeApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials?.lexwareOfficeApi?.resourceUrl}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Contact',
						value: LEXWARE_RESOURCE_TYPES.CONTACT,
					},
					{
						name: 'Article',
						value: LEXWARE_RESOURCE_TYPES.ARTICLE,
					},
					{
						name: 'Voucher',
						value: LEXWARE_RESOURCE_TYPES.VOUCHER,
					},
					{
						name: 'Invoice',
						value: LEXWARE_RESOURCE_TYPES.INVOICE,
					},
					{
						name: 'Quotation',
						value: LEXWARE_RESOURCE_TYPES.QUOTATION,
					},
					{
						name: 'Credit Note',
						value: LEXWARE_RESOURCE_TYPES.CREDIT_NOTE,
					},
					{
						name: 'Delivery Note',
						value: LEXWARE_RESOURCE_TYPES.DELIVERY_NOTE,
					},
					{
						name: 'Dunning',
						value: LEXWARE_RESOURCE_TYPES.DUNNING,
					},
					{
						name: 'File',
						value: LEXWARE_RESOURCE_TYPES.FILE,
					},
					{
						name: 'Profile',
						value: LEXWARE_RESOURCE_TYPES.PROFILE,
					},
					{
						name: 'Country',
						value: LEXWARE_RESOURCE_TYPES.COUNTRY,
					},
					{
						name: 'Payment Condition',
						value: LEXWARE_RESOURCE_TYPES.PAYMENT_CONDITION,
					},
					{
						name: 'Event Subscription',
						value: LEXWARE_RESOURCE_TYPES.EVENT_SUBSCRIPTION,
					},
				],
				default: LEXWARE_RESOURCE_TYPES.CONTACT,
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							LEXWARE_RESOURCE_TYPES.CONTACT,
							LEXWARE_RESOURCE_TYPES.ARTICLE,
							LEXWARE_RESOURCE_TYPES.VOUCHER,
							LEXWARE_RESOURCE_TYPES.INVOICE,
							LEXWARE_RESOURCE_TYPES.QUOTATION,
							LEXWARE_RESOURCE_TYPES.CREDIT_NOTE,
							LEXWARE_RESOURCE_TYPES.DELIVERY_NOTE,
							LEXWARE_RESOURCE_TYPES.DUNNING,
							LEXWARE_RESOURCE_TYPES.FILE,
						],
					},
				},
				options: [
					{
						name: 'Create',
						value: LEXWARE_OPERATIONS.CREATE,
						description: 'Create a new resource',
						action: 'Create a new resource',
					},
					{
						name: 'Get',
						value: LEXWARE_OPERATIONS.GET,
						description: 'Get a resource by ID',
						action: 'Get a resource by ID',
					},
					{
						name: 'Get All',
						value: LEXWARE_OPERATIONS.GET_ALL,
						description: 'Get all resources',
						action: 'Get all resources',
					},
					{
						name: 'Update',
						value: LEXWARE_OPERATIONS.UPDATE,
						description: 'Update a resource',
						action: 'Update a resource',
					},
					{
						name: 'Finalize',
						value: LEXWARE_OPERATIONS.FINALIZE,
						description: 'Finalize a dunning (change status from draft to open)',
						action: 'Finalize a dunning',
						displayOptions: {
							show: {
								resource: [LEXWARE_RESOURCE_TYPES.DUNNING],
							},
						},
					},
					{
						name: 'Document',
						value: LEXWARE_OPERATIONS.DOCUMENT,
						description: 'Render a dunning document as PDF',
						action: 'Render a dunning document',
						displayOptions: {
							show: {
								resource: [LEXWARE_RESOURCE_TYPES.DUNNING],
							},
						},
					},
					{
						name: 'Download File',
						value: LEXWARE_OPERATIONS.DOWNLOAD_FILE,
						description: 'Download a dunning file',
						action: 'Download a dunning file',
						displayOptions: {
							show: {
								resource: [LEXWARE_RESOURCE_TYPES.DUNNING],
							},
						},
					},
				],
				default: LEXWARE_OPERATIONS.GET,
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							LEXWARE_RESOURCE_TYPES.PROFILE,
							LEXWARE_RESOURCE_TYPES.COUNTRY,
							LEXWARE_RESOURCE_TYPES.PAYMENT_CONDITION,
							LEXWARE_RESOURCE_TYPES.EVENT_SUBSCRIPTION,
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: LEXWARE_OPERATIONS.GET,
						description: 'Get resource data',
						action: 'Get resource data',
					},
					{
						name: 'Get All',
						value: LEXWARE_OPERATIONS.GET_ALL,
						description: 'Get all resources',
						action: 'Get all resources',
					},
				],
				default: LEXWARE_OPERATIONS.GET,
			},
			// Contact specific fields
			{
				displayName: 'Contact ID',
				name: 'contactId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.CONTACT],
						operation: [LEXWARE_OPERATIONS.GET, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'The ID of the contact',
			},
			{
				displayName: 'Contact Type',
				name: 'contactType',
				type: 'options',
				options: [
					{
						name: 'Company',
						value: LEXWARE_CONTACT_TYPES.COMPANY,
					},
					{
						name: 'Person',
						value: LEXWARE_CONTACT_TYPES.PERSON,
					},
				],
				default: LEXWARE_CONTACT_TYPES.COMPANY,
				required: true,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.CONTACT],
						operation: [LEXWARE_OPERATIONS.CREATE],
					},
				},
				description: 'Type of contact to create',
			},
			// Article specific fields
			{
				displayName: 'Article ID',
				name: 'articleId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.ARTICLE],
						operation: [LEXWARE_OPERATIONS.GET, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'The ID of the article',
			},
			{
				displayName: 'Search Term',
				name: 'searchTerm',
				type: 'string',
				default: '',
				required: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.ARTICLE],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Search articles by name or description',
			},
			{
				displayName: 'Category ID',
				name: 'categoryId',
				type: 'string',
				default: '',
				required: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.ARTICLE],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter articles by category ID',
			},
			{
				displayName: 'Article Type',
				name: 'articleType',
				type: 'options',
				options: [
					{ name: 'Service', value: 'service' },
					{ name: 'Material', value: 'material' },
					{ name: 'Custom', value: 'custom' },
				],
				default: 'service',
				required: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.ARTICLE],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter articles by type',
			},
			{
				displayName: 'Archived Status',
				name: 'archived',
				type: 'options',
				options: [
					{ name: 'Active Only', value: false },
					{ name: 'Archived Only', value: true },
					{ name: 'All Articles', value: undefined },
				],
				default: undefined,
				required: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.ARTICLE],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter articles by archived status',
			},
			// Voucher specific fields
			{
				displayName: 'Voucher ID',
				name: 'voucherId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.VOUCHER],
						operation: [LEXWARE_OPERATIONS.GET, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'The ID of the voucher',
			},
			{
				displayName: 'Voucher Type',
				name: 'voucherType',
				type: 'options',
				options: [
					{
						name: 'Sales Invoice',
						value: LEXWARE_VOUCHER_TYPES.SALES_INVOICE,
					},
					{
						name: 'Sales Credit Note',
						value: LEXWARE_VOUCHER_TYPES.SALES_CREDIT_NOTE,
					},
					{
						name: 'Purchase Invoice',
						value: LEXWARE_VOUCHER_TYPES.PURCHASE_INVOICE,
					},
					{
						name: 'Purchase Credit Note',
						value: LEXWARE_VOUCHER_TYPES.PURCHASE_CREDIT_NOTE,
					},
					{
						name: 'Invoice',
						value: LEXWARE_VOUCHER_TYPES.INVOICE,
					},
					{
						name: 'Down Payment Invoice',
						value: LEXWARE_VOUCHER_TYPES.DOWN_PAYMENT_INVOICE,
					},
					{
						name: 'Credit Note',
						value: LEXWARE_VOUCHER_TYPES.CREDIT_NOTE,
					},
					{
						name: 'Order Confirmation',
						value: LEXWARE_VOUCHER_TYPES.ORDER_CONFIRMATION,
					},
					{
						name: 'Quotation',
						value: LEXWARE_VOUCHER_TYPES.QUOTATION,
					},
					{
						name: 'Delivery Note',
						value: LEXWARE_VOUCHER_TYPES.DELIVERY_NOTE,
					},
				],
				default: LEXWARE_VOUCHER_TYPES.INVOICE,
				required: true,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.VOUCHER],
						operation: [LEXWARE_OPERATIONS.CREATE],
					},
				},
				description: 'Type of voucher to create',
			},
			// Invoice specific fields
			{
				displayName: 'Invoice ID',
				name: 'invoiceId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.INVOICE],
						operation: [LEXWARE_OPERATIONS.GET, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'The ID of the invoice',
			},
			// Quotation specific fields
			{
				displayName: 'Quotation ID',
				name: 'quotationId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.QUOTATION],
						operation: [LEXWARE_OPERATIONS.GET, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'The ID of the quotation',
			},
			// Credit Note specific fields
			{
				displayName: 'Credit Note ID',
				name: 'creditNoteId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.CREDIT_NOTE],
						operation: [LEXWARE_OPERATIONS.GET, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'The ID of the credit note',
			},
			// Delivery Note specific fields
			{
				displayName: 'Delivery Note ID',
				name: 'deliveryNoteId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.DELIVERY_NOTE],
						operation: [LEXWARE_OPERATIONS.GET, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'The ID of the delivery note',
			},
			// Dunning specific fields
			{
				displayName: 'Dunning ID',
				name: 'dunningId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.DUNNING],
						operation: [
							LEXWARE_OPERATIONS.GET, 
							LEXWARE_OPERATIONS.UPDATE, 
							LEXWARE_OPERATIONS.FINALIZE, 
							LEXWARE_OPERATIONS.DOCUMENT,
							LEXWARE_OPERATIONS.DOWNLOAD_FILE
						],
					},
				},
				description: 'The ID of the dunning',
			},
			{
				displayName: 'File ID',
				name: 'fileId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.DUNNING],
						operation: [LEXWARE_OPERATIONS.DOWNLOAD_FILE],
					},
				},
				description: 'The ID of the file to download',
			},
			// File specific fields
			{
				displayName: 'File ID',
				name: 'fileId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.FILE],
						operation: [LEXWARE_OPERATIONS.GET],
					},
				},
				description: 'The ID of the file',
			},
			// Country specific fields
			{
				displayName: 'Country Code',
				name: 'countryCode',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.COUNTRY],
						operation: [LEXWARE_OPERATIONS.GET],
					},
				},
				description: 'The ISO 2-letter country code (e.g., DE, US, FR)',
			},
			{
				displayName: 'Country Filter',
				name: 'countryFilter',
				type: 'options',
				default: 'all',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.COUNTRY],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				options: [
					{
						name: 'All Countries',
						value: 'all',
						description: 'Get all countries',
					},
					{
						name: 'EU Countries Only',
						value: 'eu',
						description: 'Get only EU member countries',
					},
					{
						name: 'Non-EU Countries',
						value: 'non-eu',
						description: 'Get only non-EU countries',
					},
					{
						name: 'XRechnung Support',
						value: 'xrechnung',
						description: 'Get countries supporting XRechnung',
					},
					{
						name: 'Distance Sales Support',
						value: 'distanceSales',
						description: 'Get countries supporting distance sales',
					},
					{
						name: 'Valid Tax Rates',
						value: 'validTaxRates',
						description: 'Get countries with valid tax rates',
					},
				],
				description: 'Filter countries by specific criteria',
			},
			{
				displayName: 'Tax Type Filter',
				name: 'taxTypeFilter',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.COUNTRY],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
						countryFilter: ['validTaxRates'],
					},
				},
				description: 'Filter by specific tax type (e.g., vatfree, intraCommunitySupply)',
			},
			{
				displayName: 'Date Filter',
				name: 'dateFilter',
				type: 'dateTime',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.COUNTRY],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
						countryFilter: ['validTaxRates'],
					},
				},
				description: 'Date to check for valid tax rates (ISO format)',
			},
			// Payment Condition specific fields
			{
				displayName: 'Payment Condition ID',
				name: 'paymentConditionId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PAYMENT_CONDITION],
						operation: [LEXWARE_OPERATIONS.GET, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'The ID of the payment condition',
			},
			// Event Subscription specific fields
			{
				displayName: 'Event Subscription ID',
				name: 'eventSubscriptionId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.EVENT_SUBSCRIPTION],
						operation: [LEXWARE_OPERATIONS.GET, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'The ID of the event subscription',
			},
			// Common fields for creation
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						operation: [LEXWARE_OPERATIONS.CREATE, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				options: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Name of the resource',
					},
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						default: '',
						description: 'Description of the resource',
					},
					// Delivery Note specific fields
					{
						displayName: 'Voucher Date',
						name: 'voucherDate',
						type: 'dateTime',
						default: '',
						displayOptions: {
							show: {
								resource: [LEXWARE_RESOURCE_TYPES.DELIVERY_NOTE],
								operation: [LEXWARE_OPERATIONS.CREATE],
							},
						},
						description: 'Date of the delivery note (required for creation)',
					},
					{
						displayName: 'Contact ID',
						name: 'contactId',
						type: 'string',
						default: '',
						displayOptions: {
							show: {
								resource: [LEXWARE_RESOURCE_TYPES.DELIVERY_NOTE],
								operation: [LEXWARE_OPERATIONS.CREATE],
							},
						},
						description: 'ID of the contact (required for creation)',
					},
					{
						displayName: 'Delivery Note Status',
						name: 'deliveryNoteStatus',
						type: 'options',
						default: 'draft',
						displayOptions: {
							show: {
								resource: [LEXWARE_RESOURCE_TYPES.DELIVERY_NOTE],
								operation: [LEXWARE_OPERATIONS.CREATE, LEXWARE_OPERATIONS.UPDATE],
							},
						},
						options: [
							{
								name: 'Draft',
								value: 'draft',
								description: 'Draft status - can be edited',
							},
							{
								name: 'Open',
								value: 'open',
								description: 'Open status - can be delivered',
							},
							{
								name: 'Delivered',
								value: 'delivered',
								description: 'Delivered status - final state',
							},
						],
						description: 'Status of the delivery note',
					},
					{
						displayName: 'Delivery Date',
						name: 'deliveryDate',
						type: 'dateTime',
						default: '',
						displayOptions: {
							show: {
								resource: [LEXWARE_RESOURCE_TYPES.DELIVERY_NOTE],
								operation: [LEXWARE_OPERATIONS.CREATE, LEXWARE_OPERATIONS.UPDATE],
							},
						},
						description: 'Date when the delivery should be made',
					},
					{
						displayName: 'Language',
						name: 'language',
						type: 'options',
						default: 'de',
						displayOptions: {
							show: {
								resource: [LEXWARE_RESOURCE_TYPES.DELIVERY_NOTE],
								operation: [LEXWARE_OPERATIONS.CREATE, LEXWARE_OPERATIONS.UPDATE],
							},
						},
						options: [
							{
								name: 'German',
								value: 'de',
								description: 'German language',
							},
							{
								name: 'English',
								value: 'en',
								description: 'English language',
							},
						],
						description: 'Language of the delivery note',
					},
					// Dunning specific fields
					{
						displayName: 'Voucher Date',
						name: 'voucherDate',
						type: 'dateTime',
						default: '',
						displayOptions: {
							show: {
								resource: [LEXWARE_RESOURCE_TYPES.DUNNING],
								operation: [LEXWARE_OPERATIONS.CREATE],
							},
						},
						description: 'Date of the dunning (required for creation)',
					},
					{
						displayName: 'Contact ID',
						name: 'contactId',
						type: 'string',
						default: '',
						displayOptions: {
							show: {
								resource: [LEXWARE_RESOURCE_TYPES.DUNNING],
								operation: [LEXWARE_OPERATIONS.CREATE],
							},
						},
						description: 'ID of the contact (required for creation)',
					},
					{
						displayName: 'Preceding Sales Voucher ID',
						name: 'precedingSalesVoucherId',
						type: 'string',
						default: '',
						displayOptions: {
							show: {
								resource: [LEXWARE_RESOURCE_TYPES.DUNNING],
								operation: [LEXWARE_OPERATIONS.CREATE],
							},
						},
						description: 'ID of the preceding sales voucher (required for creation)',
					},
					{
						displayName: 'Dunning Level',
						name: 'dunningLevel',
						type: 'number',
						default: 1,
						displayOptions: {
							show: {
								resource: [LEXWARE_RESOURCE_TYPES.DUNNING],
								operation: [LEXWARE_OPERATIONS.CREATE, LEXWARE_OPERATIONS.UPDATE],
							},
						},
						description: 'Dunning level (1-5, required for creation)',
					},
					{
						displayName: 'Dunning Status',
						name: 'dunningStatus',
						type: 'options',
						default: 'draft',
						displayOptions: {
							show: {
								resource: [LEXWARE_RESOURCE_TYPES.DUNNING],
								operation: [LEXWARE_OPERATIONS.CREATE, LEXWARE_OPERATIONS.UPDATE],
							},
						},
						options: [
							{
								name: 'Draft',
								value: 'draft',
								description: 'Draft status - can be edited',
							},
							{
								name: 'Open',
								value: 'open',
								description: 'Open status - can be finalized',
							},
							{
								name: 'Paid',
								value: 'paid',
								description: 'Paid status - final state',
							},
							{
								name: 'Voided',
								value: 'voided',
								description: 'Voided status - cancelled',
							},
						],
						description: 'Status of the dunning',
					},
					{
						displayName: 'Currency',
						name: 'currency',
						type: 'string',
						default: 'EUR',
						displayOptions: {
							show: {
								resource: [LEXWARE_RESOURCE_TYPES.DELIVERY_NOTE],
								operation: [LEXWARE_OPERATIONS.CREATE, LEXWARE_OPERATIONS.UPDATE],
							},
						},
						description: 'Currency code (e.g., EUR, USD)',
					},
					{
						displayName: 'Note',
						name: 'note',
						type: 'string',
						default: '',
						displayOptions: {
							show: {
								resource: [LEXWARE_RESOURCE_TYPES.DELIVERY_NOTE],
								operation: [LEXWARE_OPERATIONS.CREATE, LEXWARE_OPERATIONS.UPDATE],
							},
						},
						description: 'Additional notes for the delivery note',
					},
				],
			},
			// Pagination
			{
				displayName: 'Return All',
				name: 'returnAll',
				type: 'boolean',
				displayOptions: {
					show: {
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				default: false,
				description: 'Whether to return all results or only up to a given limit',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				displayOptions: {
					show: {
						operation: [LEXWARE_OPERATIONS.GET_ALL],
						returnAll: [false],
					},
				},
				typeOptions: {
					minValue: 1,
					maxValue: LEXWARE_DEFAULT_VALUES.MAX_PAGE_SIZE,
				},
				default: LEXWARE_DEFAULT_VALUES.DEFAULT_PAGE_SIZE,
				description: 'Max number of results to return',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const credentials = await this.getCredentials('lexwareOfficeApi') as ICredentialDataDecryptedObject;
				
				// Convert credentials to our interface
				const lexwareCredentials: ILexwareCredentials = {
					apiKey: credentials.apiKey as string,
					resourceUrl: credentials.resourceUrl as string,
				};
				
				const resourceFactory = new ResourceFactory(lexwareCredentials);
				
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;
				
				// Build parameters object
				const params = buildParameters.call(this, i);
				
				// Validate operation if it's a create operation
				if (operation === LEXWARE_OPERATIONS.CREATE) {
					const missingFields = resourceFactory.validateOperation(resource, operation, params);
					if (missingFields.length > 0) {
						throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
					}
				}
				
				// Execute the operation
				const result = await resourceFactory.executeOperation(resource, operation, params);
				
				// Handle pagination for getAll operations
				if (operation === LEXWARE_OPERATIONS.GET_ALL && !params.returnAll) {
					const limit = params.limit || LEXWARE_DEFAULT_VALUES.DEFAULT_PAGE_SIZE;
					returnData.push(...result.slice(0, limit));
				} else {
					returnData.push(result);
				}

			} catch (error: any) {
				if (this.continueOnFail()) {
					returnData.push({ error: error.message });
					continue;
				}
				throw error;
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}


}

function buildParameters(this: IExecuteFunctions, i: number): Record<string, any> {
	const resource = this.getNodeParameter('resource', i) as string;
	const operation = this.getNodeParameter('operation', i) as string;
	
	const params: Record<string, any> = {
		resource,
		operation,
		returnAll: this.getNodeParameter('returnAll', i, false) as boolean,
		limit: this.getNodeParameter('limit', i, LEXWARE_DEFAULT_VALUES.DEFAULT_PAGE_SIZE) as number,
		additionalFields: this.getNodeParameter('additionalFields', i, {}) as Record<string, any>,
	};

	// Add resource-specific parameters
	switch (resource) {
		case LEXWARE_RESOURCE_TYPES.CONTACT:
			if (operation === LEXWARE_OPERATIONS.GET || operation === LEXWARE_OPERATIONS.UPDATE) {
				params.contactId = this.getNodeParameter('contactId', i) as string;
			}
			if (operation === LEXWARE_OPERATIONS.CREATE) {
				params.contactType = this.getNodeParameter('contactType', i) as string;
			}
			break;
			
		case LEXWARE_RESOURCE_TYPES.ARTICLE:
			if (operation === LEXWARE_OPERATIONS.GET || operation === LEXWARE_OPERATIONS.UPDATE) {
				params.articleId = this.getNodeParameter('articleId', i) as string;
			}
			if (operation === LEXWARE_OPERATIONS.GET_ALL) {
				params.searchTerm = this.getNodeParameter('searchTerm', i, '') as string;
				params.categoryId = this.getNodeParameter('categoryId', i, '') as string;
				params.articleType = this.getNodeParameter('articleType', i, '') as string;
				params.archived = this.getNodeParameter('archived', i, undefined) as boolean | undefined;
			}
			break;
			
		case LEXWARE_RESOURCE_TYPES.VOUCHER:
			if (operation === LEXWARE_OPERATIONS.GET || operation === LEXWARE_OPERATIONS.UPDATE) {
				params.voucherId = this.getNodeParameter('voucherId', i) as string;
			}
			if (operation === LEXWARE_OPERATIONS.CREATE) {
				params.voucherType = this.getNodeParameter('voucherType', i) as string;
			}
			break;
			
		case LEXWARE_RESOURCE_TYPES.INVOICE:
			if (operation === LEXWARE_OPERATIONS.GET || operation === LEXWARE_OPERATIONS.UPDATE) {
				params.invoiceId = this.getNodeParameter('invoiceId', i) as string;
			}
			break;
			
		case LEXWARE_RESOURCE_TYPES.QUOTATION:
			if (operation === LEXWARE_OPERATIONS.GET || operation === LEXWARE_OPERATIONS.UPDATE) {
				params.quotationId = this.getNodeParameter('quotationId', i) as string;
			}
			break;
			
		case LEXWARE_RESOURCE_TYPES.CREDIT_NOTE:
			if (operation === LEXWARE_OPERATIONS.GET || operation === LEXWARE_OPERATIONS.UPDATE) {
				params.creditNoteId = this.getNodeParameter('creditNoteId', i) as string;
			}
			break;
			
		case LEXWARE_RESOURCE_TYPES.DELIVERY_NOTE:
			if (operation === LEXWARE_OPERATIONS.GET || operation === LEXWARE_OPERATIONS.UPDATE) {
				params.deliveryNoteId = this.getNodeParameter('deliveryNoteId', i) as string;
			}
			break;
			
		case LEXWARE_RESOURCE_TYPES.DUNNING:
			if (operation === LEXWARE_OPERATIONS.GET || 
				operation === LEXWARE_OPERATIONS.UPDATE || 
				operation === LEXWARE_OPERATIONS.FINALIZE || 
				operation === LEXWARE_OPERATIONS.DOCUMENT) {
				params.dunningId = this.getNodeParameter('dunningId', i) as string;
			}
			if (operation === LEXWARE_OPERATIONS.DOWNLOAD_FILE) {
				params.dunningId = this.getNodeParameter('dunningId', i) as string;
				params.fileId = this.getNodeParameter('fileId', i) as string;
			}
			break;
			
		case LEXWARE_RESOURCE_TYPES.FILE:
			if (operation === LEXWARE_OPERATIONS.GET) {
				params.fileId = this.getNodeParameter('fileId', i) as string;
			}
			break;
			
		case LEXWARE_RESOURCE_TYPES.COUNTRY:
			if (operation === LEXWARE_OPERATIONS.GET) {
				params.countryCode = this.getNodeParameter('countryCode', i) as string;
				params.countryFilter = this.getNodeParameter('countryFilter', i, 'all') as string;
				params.taxTypeFilter = this.getNodeParameter('taxTypeFilter', i, '') as string;
				params.dateFilter = this.getNodeParameter('dateFilter', i, '') as string;
			}
			break;
			
		case LEXWARE_RESOURCE_TYPES.PAYMENT_CONDITION:
			if (operation === LEXWARE_OPERATIONS.GET || operation === LEXWARE_OPERATIONS.UPDATE) {
				params.paymentConditionId = this.getNodeParameter('paymentConditionId', i) as string;
			}
			break;
			
		case LEXWARE_RESOURCE_TYPES.EVENT_SUBSCRIPTION:
			if (operation === LEXWARE_OPERATIONS.GET || operation === LEXWARE_OPERATIONS.UPDATE) {
				params.eventSubscriptionId = this.getNodeParameter('eventSubscriptionId', i) as string;
			}
			break;
	}

	return params;
}
