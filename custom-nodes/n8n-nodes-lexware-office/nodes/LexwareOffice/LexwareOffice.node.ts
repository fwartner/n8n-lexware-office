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
		icon: 'lexware.svg',
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
						name: 'Down Payment Invoice',
						value: LEXWARE_RESOURCE_TYPES.DOWN_PAYMENT_INVOICE,
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
							LEXWARE_RESOURCE_TYPES.DOWN_PAYMENT_INVOICE,
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
			{
				displayName: 'Invoice Status',
				name: 'invoiceStatus',
				type: 'options',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.INVOICE],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				options: [
					{ name: 'All Statuses', value: '' },
					{ name: 'Draft', value: 'draft' },
					{ name: 'Open', value: 'open' },
					{ name: 'Paid', value: 'paid' },
					{ name: 'Voided', value: 'voided' },
					{ name: 'Overdue', value: 'overdue' },
					{ name: 'Partially Paid', value: 'partially_paid' },
				],
				description: 'Filter by invoice status',
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.INVOICE],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Start date for filtering (YYYY-MM-DD)',
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.INVOICE],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'End date for filtering (YYYY-MM-DD)',
			},
			{
				displayName: 'Due Date Start',
				name: 'dueDateStart',
				type: 'dateTime',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.INVOICE],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Start due date for filtering (YYYY-MM-DD)',
			},
			{
				displayName: 'Due Date End',
				name: 'dueDateEnd',
				type: 'dateTime',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.INVOICE],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'End due date for filtering (YYYY-MM-DD)',
			},
			{
				displayName: 'Min Amount',
				name: 'minAmount',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.INVOICE],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Minimum amount for filtering',
			},
			{
				displayName: 'Max Amount',
				name: 'maxAmount',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.INVOICE],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Maximum amount for filtering',
			},
			{
				displayName: 'Search Term',
				name: 'searchTerm',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.INVOICE],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Search invoices by text',
			},
			{
				displayName: 'XRechnung Only',
				name: 'isXRechnung',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.INVOICE],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter for XRechnung invoices only',
			},
			{
				displayName: 'Recurring Only',
				name: 'isRecurring',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.INVOICE],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter for recurring invoices only',
			},
			{
				displayName: 'Closing Invoice Only',
				name: 'isClosingInvoice',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.INVOICE],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter for closing invoices only',
			},
			{
				displayName: 'Tax Type',
				name: 'taxType',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.INVOICE],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by tax type (e.g., vat, vatfree, export)',
			},
			{
				displayName: 'Currency',
				name: 'currency',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.INVOICE],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by currency (e.g., EUR, USD)',
			},
			{
				displayName: 'Language',
				name: 'language',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.INVOICE],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by language (e.g., de, en)',
			},
			// Down Payment Invoice specific fields
			{
				displayName: 'Down Payment Invoice ID',
				name: 'downPaymentInvoiceId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.DOWN_PAYMENT_INVOICE],
						operation: [LEXWARE_OPERATIONS.GET],
					},
				},
				description: 'The ID of the down payment invoice',
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
			// Order Confirmation specific fields
			{
				displayName: 'Order Confirmation ID',
				name: 'orderConfirmationId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.ORDER_CONFIRMATION],
						operation: [LEXWARE_OPERATIONS.GET, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'The ID of the order confirmation',
			},
			{
				displayName: 'Order Confirmation Status',
				name: 'orderConfirmationStatus',
				type: 'options',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.ORDER_CONFIRMATION],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				options: [
					{ name: 'All Statuses', value: '' },
					{ name: 'Draft', value: 'draft' },
					{ name: 'Open', value: 'open' },
					{ name: 'Confirmed', value: 'confirmed' },
					{ name: 'Cancelled', value: 'cancelled' },
					{ name: 'Completed', value: 'completed' },
				],
				description: 'Filter by order confirmation status',
			},
			{
				displayName: 'Delivery Date Start',
				name: 'deliveryDateStart',
				type: 'dateTime',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.ORDER_CONFIRMATION],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Start delivery date for filtering (YYYY-MM-DD)',
			},
			{
				displayName: 'Delivery Date End',
				name: 'deliveryDateEnd',
				type: 'dateTime',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.ORDER_CONFIRMATION],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'End delivery date for filtering (YYYY-MM-DD)',
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
						operation: [LEXWARE_OPERATIONS.GET, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'The ID of the file',
			},
			{
				displayName: 'File Type',
				name: 'fileType',
				type: 'options',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.FILE],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				options: [
					{ name: 'Invoice', value: 'invoice' },
					{ name: 'Credit Note', value: 'credit_note' },
					{ name: 'Quotation', value: 'quotation' },
					{ name: 'Delivery Note', value: 'delivery_note' },
					{ name: 'Dunning', value: 'dunning' },
					{ name: 'Receipt', value: 'receipt' },
					{ name: 'Voucher', value: 'voucher' },
					{ name: 'Image', value: 'image' },
					{ name: 'PDF', value: 'pdf' },
					{ name: 'Contract', value: 'contract' },
					{ name: 'Other', value: 'other' },
				],
				description: 'Type of file to filter by',
			},
			{
				displayName: 'Category',
				name: 'category',
				type: 'options',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.FILE],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				options: [
					{ name: 'Sales', value: 'sales' },
					{ name: 'Purchase', value: 'purchase' },
					{ name: 'Financial', value: 'financial' },
					{ name: 'Administrative', value: 'administrative' },
					{ name: 'Invoices', value: 'invoices' },
					{ name: 'Receipts', value: 'receipts' },
					{ name: 'Contracts', value: 'contracts' },
					{ name: 'Images', value: 'images' },
					{ name: 'Scans', value: 'scans' },
					{ name: 'Documents', value: 'documents' },
				],
				description: 'Category of file to filter by',
			},
			{
				displayName: 'Content Type',
				name: 'contentType',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.FILE],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'MIME type to filter by (e.g., image/jpeg, application/pdf)',
			},
			{
				displayName: 'Access Level',
				name: 'accessLevel',
				type: 'options',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.FILE],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				options: [
					{ name: 'All', value: '' },
					{ name: 'Private', value: 'private' },
					{ name: 'Public', value: 'public' },
					{ name: 'Restricted', value: 'restricted' },
				],
				description: 'Access level to filter by',
			},
			{
				displayName: 'Processing Status',
				name: 'processingStatus',
				type: 'options',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.FILE],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				options: [
					{ name: 'All', value: '' },
					{ name: 'Pending', value: 'pending' },
					{ name: 'Processing', value: 'processing' },
					{ name: 'Completed', value: 'completed' },
					{ name: 'Failed', value: 'failed' },
				],
				description: 'Processing status to filter by',
			},
			{
				displayName: 'E-Invoice Only',
				name: 'isEInvoice',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.FILE],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter for e-invoice files only',
			},
			{
				displayName: 'Search Term',
				name: 'searchTerm',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.FILE],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Search files by description or tags',
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.FILE],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Start date for filtering (YYYY-MM-DD)',
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.FILE],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'End date for filtering (YYYY-MM-DD)',
			},
			{
				displayName: 'Archived Status',
				name: 'isArchived',
				type: 'options',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.FILE],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				options: [
					{ name: 'All Files', value: '' },
					{ name: 'Active Only', value: 'false' },
					{ name: 'Archived Only', value: 'true' },
				],
				description: 'Filter by archived status',
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
			{
				displayName: 'Event Type',
				name: 'eventType',
				type: 'options',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.EVENT_SUBSCRIPTION],
						operation: [LEXWARE_OPERATIONS.GET_ALL, LEXWARE_OPERATIONS.CREATE],
					},
				},
				options: [
					{ name: 'Voucher Created', value: 'voucher.created' },
					{ name: 'Voucher Changed', value: 'voucher.changed' },
					{ name: 'Invoice Created', value: 'invoice.created' },
					{ name: 'Invoice Status Changed', value: 'invoice.status.changed' },
					{ name: 'Quotation Created', value: 'quotation.created' },
					{ name: 'Credit Note Created', value: 'credit-note.created' },
					{ name: 'Delivery Note Created', value: 'delivery-note.created' },
					{ name: 'Dunning Created', value: 'dunning.created' },
					{ name: 'Contact Created', value: 'contact.created' },
					{ name: 'Article Created', value: 'article.created' },
					{ name: 'File Uploaded', value: 'file.uploaded' },
					{ name: 'Payment Received', value: 'payment.received' },
				],
				description: 'Type of event to subscribe to',
			},
			{
				displayName: 'Active Status',
				name: 'active',
				type: 'options',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.EVENT_SUBSCRIPTION],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				options: [
					{ name: 'All', value: '' },
					{ name: 'Active Only', value: 'true' },
					{ name: 'Inactive Only', value: 'false' },
				],
				description: 'Filter by active status',
			},
			{
				displayName: 'Contact ID',
				name: 'contactId',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.EVENT_SUBSCRIPTION],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by contact ID',
			},
			{
				displayName: 'Voucher Type',
				name: 'voucherType',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.EVENT_SUBSCRIPTION],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by voucher type',
			},
			{
				displayName: 'Search Term',
				name: 'searchTerm',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.EVENT_SUBSCRIPTION],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Search subscriptions by description or tags',
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
					// Down Payment Invoice specific fields
					{
						displayName: 'Closing Invoice ID',
						name: 'closingInvoiceId',
						type: 'string',
						default: '',
						displayOptions: {
							show: {
								resource: [LEXWARE_RESOURCE_TYPES.DOWN_PAYMENT_INVOICE],
								operation: [LEXWARE_OPERATIONS.GET_ALL],
							},
						},
						description: 'ID of the closing invoice to filter by',
					},
					{
						displayName: 'Status',
						name: 'status',
						type: 'options',
						default: '',
						displayOptions: {
							show: {
								resource: [LEXWARE_RESOURCE_TYPES.DOWN_PAYMENT_INVOICE],
								operation: [LEXWARE_OPERATIONS.GET_ALL],
							},
						},
						options: [
							{
								name: 'All',
								value: '',
								description: 'All statuses',
							},
							{
								name: 'Draft',
								value: 'draft',
								description: 'Draft status',
							},
							{
								name: 'Open',
								value: 'open',
								description: 'Open status',
							},
							{
								name: 'Paid',
								value: 'paid',
								description: 'Paid status',
							},
							{
								name: 'Voided',
								value: 'voided',
								description: 'Voided status',
							},
						],
						description: 'Filter by down payment invoice status',
					},
					{
						displayName: 'Start Date',
						name: 'startDate',
						type: 'dateTime',
						default: '',
						displayOptions: {
							show: {
								resource: [LEXWARE_RESOURCE_TYPES.DOWN_PAYMENT_INVOICE],
								operation: [LEXWARE_OPERATIONS.GET_ALL],
							},
						},
						description: 'Start date for filtering (YYYY-MM-DD)',
					},
					{
						displayName: 'End Date',
						name: 'endDate',
						type: 'dateTime',
						default: '',
						displayOptions: {
							show: {
								resource: [LEXWARE_RESOURCE_TYPES.DOWN_PAYMENT_INVOICE],
								operation: [LEXWARE_OPERATIONS.GET_ALL],
							},
						},
						description: 'End date for filtering (YYYY-MM-DD)',
					},
					{
						displayName: 'Invoice Number',
						name: 'invoiceNumber',
						type: 'string',
						default: '',
						displayOptions: {
							show: {
								resource: [LEXWARE_RESOURCE_TYPES.DOWN_PAYMENT_INVOICE],
								operation: [LEXWARE_OPERATIONS.GET_ALL],
							},
						},
						description: 'Invoice number to search for',
					},
					{
						displayName: 'Tax Type',
						name: 'taxType',
						type: 'string',
						default: '',
						displayOptions: {
							show: {
								resource: [LEXWARE_RESOURCE_TYPES.DOWN_PAYMENT_INVOICE],
								operation: [LEXWARE_OPERATIONS.GET_ALL],
							},
						},
						description: 'Tax type to filter by',
					},
					{
						displayName: 'Tax Sub Type',
						name: 'taxSubType',
						type: 'string',
						default: '',
						displayOptions: {
							show: {
								resource: [LEXWARE_RESOURCE_TYPES.DOWN_PAYMENT_INVOICE],
								operation: [LEXWARE_OPERATIONS.GET_ALL],
							},
						},
						description: 'Tax sub type to filter by',
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
			if (operation === LEXWARE_OPERATIONS.GET_ALL) {
				params.invoiceStatus = this.getNodeParameter('invoiceStatus', i, '') as string;
				params.startDate = this.getNodeParameter('startDate', i, '') as string;
				params.endDate = this.getNodeParameter('endDate', i, '') as string;
				params.dueDateStart = this.getNodeParameter('dueDateStart', i, '') as string;
				params.dueDateEnd = this.getNodeParameter('dueDateEnd', i, '') as string;
				params.minAmount = this.getNodeParameter('minAmount', i, 0) as number;
				params.maxAmount = this.getNodeParameter('maxAmount', i, 0) as number;
				params.searchTerm = this.getNodeParameter('searchTerm', i, '') as string;
				params.isXRechnung = this.getNodeParameter('isXRechnung', i, false) as boolean;
				params.isRecurring = this.getNodeParameter('isRecurring', i, false) as boolean;
				params.isClosingInvoice = this.getNodeParameter('isClosingInvoice', i, false) as boolean;
				params.taxType = this.getNodeParameter('taxType', i, '') as string;
				params.currency = this.getNodeParameter('currency', i, '') as string;
				params.language = this.getNodeParameter('language', i, '') as string;
			}
			break;
			
		case LEXWARE_RESOURCE_TYPES.DOWN_PAYMENT_INVOICE:
			if (operation === LEXWARE_OPERATIONS.GET) {
				params.downPaymentInvoiceId = this.getNodeParameter('downPaymentInvoiceId', i) as string;
			}
			if (operation === LEXWARE_OPERATIONS.GET_ALL) {
				params.closingInvoiceId = this.getNodeParameter('closingInvoiceId', i, '') as string;
				params.contactId = this.getNodeParameter('contactId', i, '') as string;
				params.status = this.getNodeParameter('status', i, '') as string;
				params.startDate = this.getNodeParameter('startDate', i, '') as string;
				params.endDate = this.getNodeParameter('endDate', i, '') as string;
				params.invoiceNumber = this.getNodeParameter('invoiceNumber', i, '') as string;
				params.taxType = this.getNodeParameter('taxType', i, '') as string;
				params.taxSubType = this.getNodeParameter('taxSubType', i, '') as string;
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
		case LEXWARE_RESOURCE_TYPES.ORDER_CONFIRMATION:
			if (operation === LEXWARE_OPERATIONS.GET || operation === LEXWARE_OPERATIONS.UPDATE) {
				params.orderConfirmationId = this.getNodeParameter('orderConfirmationId', i) as string;
			}
			if (operation === LEXWARE_OPERATIONS.GET_ALL) {
				params.orderConfirmationStatus = this.getNodeParameter('orderConfirmationStatus', i, '') as string;
				params.startDate = this.getNodeParameter('startDate', i, '') as string;
				params.endDate = this.getNodeParameter('endDate', i, '') as string;
				params.deliveryDateStart = this.getNodeParameter('deliveryDateStart', i, '') as string;
				params.deliveryDateEnd = this.getNodeParameter('deliveryDateEnd', i, '') as string;
				params.minAmount = this.getNodeParameter('minAmount', i, 0) as number;
				params.maxAmount = this.getNodeParameter('maxAmount', i, 0) as number;
				params.searchTerm = this.getNodeParameter('searchTerm', i, '') as string;
				params.isXRechnung = this.getNodeParameter('isXRechnung', i, false) as boolean;
				params.isRecurring = this.getNodeParameter('isRecurring', i, false) as boolean;
				params.taxType = this.getNodeParameter('taxType', i, '') as string;
				params.currency = this.getNodeParameter('currency', i, '') as string;
				params.language = this.getNodeParameter('language', i, '') as string;
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
			if (operation === LEXWARE_OPERATIONS.GET || operation === LEXWARE_OPERATIONS.UPDATE) {
				params.fileId = this.getNodeParameter('fileId', i) as string;
			}
			if (operation === LEXWARE_OPERATIONS.GET_ALL) {
				params.fileType = this.getNodeParameter('fileType', i, '') as string;
				params.category = this.getNodeParameter('category', i, '') as string;
				params.contentType = this.getNodeParameter('contentType', i, '') as string;
				params.accessLevel = this.getNodeParameter('accessLevel', i, '') as string;
				params.processingStatus = this.getNodeParameter('processingStatus', i, '') as string;
				params.isEInvoice = this.getNodeParameter('isEInvoice', i, false) as boolean;
				params.searchTerm = this.getNodeParameter('searchTerm', i, '') as string;
				params.startDate = this.getNodeParameter('startDate', i, '') as string;
				params.endDate = this.getNodeParameter('endDate', i, '') as string;
				params.isArchived = this.getNodeParameter('isArchived', i, '') as string;
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
			if (operation === LEXWARE_OPERATIONS.GET_ALL) {
				params.eventType = this.getNodeParameter('eventType', i, '') as string;
				params.active = this.getNodeParameter('active', i, '') as string;
				params.contactId = this.getNodeParameter('contactId', i, '') as string;
				params.voucherType = this.getNodeParameter('voucherType', i, '') as string;
				params.searchTerm = this.getNodeParameter('searchTerm', i, '') as string;
			}
			if (operation === LEXWARE_OPERATIONS.CREATE) {
				params.eventType = this.getNodeParameter('eventType', i) as string;
			}
			break;
	}

	return params;
}
