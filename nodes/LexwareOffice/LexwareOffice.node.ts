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
	LEXWARE_DEFAULT_VALUES,
	LEXWARE_PAGINATION_LIMITS,
	LEXWARE_DEFAULT_SORT_OPTIONS,
	LEXWARE_CONTACT_ROLES
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
					{
						name: 'Recurring Template',
						value: LEXWARE_RESOURCE_TYPES.RECURRING_TEMPLATE,
					},
					{
						name: 'Voucherlist',
						value: LEXWARE_RESOURCE_TYPES.VOUCHERLIST,
					},
					{
						name: 'Trigger',
						value: LEXWARE_RESOURCE_TYPES.TRIGGER,
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
							LEXWARE_RESOURCE_TYPES.RECURRING_TEMPLATE,
							LEXWARE_RESOURCE_TYPES.VOUCHERLIST,
							LEXWARE_RESOURCE_TYPES.TRIGGER,
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
					{
						name: 'Trigger',
						value: LEXWARE_OPERATIONS.TRIGGER,
						description: 'Trigger webhook events',
						action: 'Trigger webhook events',
						displayOptions: {
							show: {
								resource: [LEXWARE_RESOURCE_TYPES.TRIGGER],
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
							LEXWARE_RESOURCE_TYPES.RECURRING_TEMPLATE,
							LEXWARE_RESOURCE_TYPES.VOUCHERLIST,
							LEXWARE_RESOURCE_TYPES.TRIGGER,
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
					{
						name: 'Trigger',
						value: LEXWARE_OPERATIONS.TRIGGER,
						description: 'Trigger webhook events',
						action: 'Trigger webhook events',
						displayOptions: {
							show: {
								resource: [LEXWARE_RESOURCE_TYPES.TRIGGER],
							},
						},
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
			// Contact creation fields
			{
				displayName: 'Company Name',
				name: 'companyName',
				type: 'string',
				default: '',
				required: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.CONTACT],
						operation: [LEXWARE_OPERATIONS.CREATE],
						contactType: [LEXWARE_CONTACT_TYPES.COMPANY],
					},
				},
				description: 'Name of the company',
			},
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				default: '',
				required: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.CONTACT],
						operation: [LEXWARE_OPERATIONS.CREATE],
						contactType: [LEXWARE_CONTACT_TYPES.PERSON],
					},
				},
				description: 'First name of the person',
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				default: '',
				required: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.CONTACT],
						operation: [LEXWARE_OPERATIONS.CREATE],
						contactType: [LEXWARE_CONTACT_TYPES.PERSON],
					},
				},
				description: 'Last name of the person',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				required: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.CONTACT],
						operation: [LEXWARE_OPERATIONS.CREATE],
					},
				},
				description: 'Email address of the contact',
			},
			{
				displayName: 'Phone',
				name: 'phone',
				type: 'string',
				default: '',
				required: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.CONTACT],
						operation: [LEXWARE_OPERATIONS.CREATE],
					},
				},
				description: 'Phone number of the contact',
			},
			{
				displayName: 'Street',
				name: 'street',
				type: 'string',
				default: '',
				required: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.CONTACT],
						operation: [LEXWARE_OPERATIONS.CREATE],
					},
				},
				description: 'Street address of the contact',
			},
			{
				displayName: 'ZIP Code',
				name: 'zipCode',
				type: 'string',
				default: '',
				required: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.CONTACT],
						operation: [LEXWARE_OPERATIONS.CREATE],
					},
				},
				description: 'ZIP/Postal code of the contact',
			},
			{
				displayName: 'City',
				name: 'city',
				type: 'string',
				default: '',
				required: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.CONTACT],
						operation: [LEXWARE_OPERATIONS.CREATE],
					},
				},
				description: 'City of the contact',
			},
			{
				displayName: 'Country',
				name: 'country',
				type: 'string',
				default: 'DE',
				required: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.CONTACT],
						operation: [LEXWARE_OPERATIONS.CREATE],
					},
				},
				description: 'Country code of the contact (e.g., DE, AT, CH)',
			},
			{
				displayName: 'VAT Number',
				name: 'vatNumber',
				type: 'string',
				default: '',
				required: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.CONTACT],
						operation: [LEXWARE_OPERATIONS.CREATE],
					},
				},
				description: 'VAT identification number',
			},
			{
				displayName: 'Tax Number',
				name: 'taxNumber',
				type: 'string',
				default: '',
				required: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.CONTACT],
						operation: [LEXWARE_OPERATIONS.CREATE],
					},
				},
				description: 'Tax identification number',
			},
			{
				displayName: 'Contact Role',
				name: 'contactRole',
				type: 'options',
				options: [
					{ name: 'Customer', value: LEXWARE_CONTACT_ROLES.CUSTOMER },
					{ name: 'Vendor', value: LEXWARE_CONTACT_ROLES.VENDOR },
					{ name: 'Employee', value: LEXWARE_CONTACT_ROLES.EMPLOYEE },
				],
				default: LEXWARE_CONTACT_ROLES.CUSTOMER,
				required: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.CONTACT],
						operation: [LEXWARE_OPERATIONS.CREATE],
					},
				},
				description: 'Role of the contact in your system',
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
			// Article creation fields
			{
				displayName: 'Article Name',
				name: 'articleName',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.ARTICLE],
						operation: [LEXWARE_OPERATIONS.CREATE],
					},
				},
				description: 'Name of the article',
			},
			{
				displayName: 'Article Description',
				name: 'articleDescription',
				type: 'string',
				default: '',
				required: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.ARTICLE],
						operation: [LEXWARE_OPERATIONS.CREATE],
					},
				},
				description: 'Description of the article',
			},
			{
				displayName: 'Article Type (Create)',
				name: 'articleTypeCreate',
				type: 'options',
				options: [
					{ name: 'Service', value: LEXWARE_ARTICLE_TYPES.SERVICE },
					{ name: 'Material', value: LEXWARE_ARTICLE_TYPES.MATERIAL },
					{ name: 'Custom', value: LEXWARE_ARTICLE_TYPES.CUSTOM },
				],
				default: LEXWARE_ARTICLE_TYPES.SERVICE,
				required: true,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.ARTICLE],
						operation: [LEXWARE_OPERATIONS.CREATE],
					},
				},
				description: 'Type of article to create',
			},
			{
				displayName: 'Unit Price',
				name: 'unitPrice',
				type: 'number',
				default: 0,
				required: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.ARTICLE],
						operation: [LEXWARE_OPERATIONS.CREATE],
					},
				},
				description: 'Unit price of the article',
			},
			{
				displayName: 'Currency',
				name: 'currency',
				type: 'string',
				default: 'EUR',
				required: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.ARTICLE],
						operation: [LEXWARE_OPERATIONS.CREATE],
					},
				},
				description: 'Currency for the article price',
			},
			{
				displayName: 'Tax Rate',
				name: 'taxRate',
				type: 'number',
				default: 19,
				required: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.ARTICLE],
						operation: [LEXWARE_OPERATIONS.CREATE],
					},
				},
				description: 'Tax rate percentage for the article',
			},
			{
				displayName: 'Unit Name',
				name: 'unitName',
				type: 'string',
				default: 'piece',
				required: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.ARTICLE],
						operation: [LEXWARE_OPERATIONS.CREATE],
					},
				},
				description: 'Unit name (e.g., piece, hour, kg)',
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
			// Invoice creation fields
			{
				displayName: 'Contact ID',
				name: 'invoiceContactId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.INVOICE],
						operation: [LEXWARE_OPERATIONS.CREATE],
					},
				},
				description: 'ID of the contact for this invoice',
			},
			{
				displayName: 'Invoice Date',
				name: 'invoiceDate',
				type: 'dateTime',
				default: '',
				required: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.INVOICE],
						operation: [LEXWARE_OPERATIONS.CREATE],
					},
				},
				description: 'Date of the invoice',
			},
			{
				displayName: 'Due Date',
				name: 'dueDate',
				type: 'dateTime',
				default: '',
				required: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.INVOICE],
						operation: [LEXWARE_OPERATIONS.CREATE],
					},
				},
				description: 'Due date of the invoice',
			},
			{
				displayName: 'Currency',
				name: 'invoiceCurrency',
				type: 'string',
				default: 'EUR',
				required: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.INVOICE],
						operation: [LEXWARE_OPERATIONS.CREATE],
					},
				},
				description: 'Currency for the invoice',
			},
			{
				displayName: 'Language',
				name: 'invoiceLanguage',
				type: 'string',
				default: 'de',
				required: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.INVOICE],
						operation: [LEXWARE_OPERATIONS.CREATE],
					},
				},
				description: 'Language for the invoice',
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
			// Payment specific fields
			{
				displayName: 'Payment ID',
				name: 'paymentId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PAYMENT],
						operation: [LEXWARE_OPERATIONS.GET],
					},
				},
				description: 'The ID of the payment',
			},
			// Posting Category specific fields
			{
				displayName: 'Posting Category ID',
				name: 'postingCategoryId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.POSTING_CATEGORY],
						operation: [LEXWARE_OPERATIONS.GET, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'The ID of the posting category',
			},
			{
				displayName: 'Posting Category Type',
				name: 'type',
				type: 'options',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.POSTING_CATEGORY],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				options: [
					{ name: 'All Types', value: '' },
					{ name: 'Income', value: 'income' },
					{ name: 'Expense', value: 'expense' },
					{ name: 'Asset', value: 'asset' },
					{ name: 'Liability', value: 'liability' },
					{ name: 'Equity', value: 'equity' },
				],
				description: 'Filter by posting category type',
			},
			{
				displayName: 'Posting Category Status',
				name: 'status',
				type: 'options',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.POSTING_CATEGORY],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				options: [
					{ name: 'All Statuses', value: '' },
					{ name: 'Active', value: 'active' },
					{ name: 'Inactive', value: 'inactive' },
					{ name: 'Archived', value: 'archived' },
				],
				description: 'Filter by posting category status',
			},
			{
				displayName: 'Parent ID',
				name: 'parentId',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.POSTING_CATEGORY],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by parent category ID',
			},
			{
				displayName: 'Level',
				name: 'level',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.POSTING_CATEGORY],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by hierarchy level',
			},
			{
				displayName: 'Account Number',
				name: 'accountNumber',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.POSTING_CATEGORY],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by account number',
			},
			{
				displayName: 'Tax Type',
				name: 'taxType',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.POSTING_CATEGORY],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by tax type',
			},
			{
				displayName: 'Is Default',
				name: 'isDefault',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.POSTING_CATEGORY],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by default categories',
			},
			{
				displayName: 'Is System',
				name: 'isSystem',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.POSTING_CATEGORY],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by system categories',
			},
			{
				displayName: 'Is Editable',
				name: 'isEditable',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.POSTING_CATEGORY],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by editable categories',
			},
			{
				displayName: 'Search Term',
				name: 'searchTerm',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.POSTING_CATEGORY],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Search term for filtering',
			},
			{
				displayName: 'Language',
				name: 'language',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.POSTING_CATEGORY],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by language',
			},
			{
				displayName: 'Usage Count From',
				name: 'usageCountFrom',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.POSTING_CATEGORY],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Minimum usage count for filtering',
			},
			{
				displayName: 'Usage Count To',
				name: 'usageCountTo',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.POSTING_CATEGORY],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Maximum usage count for filtering',
			},
			{
				displayName: 'Last Used From',
				name: 'lastUsedFrom',
				type: 'dateTime',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.POSTING_CATEGORY],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Start date for last used filtering (YYYY-MM-DD)',
			},
			{
				displayName: 'Last Used To',
				name: 'lastUsedTo',
				type: 'dateTime',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.POSTING_CATEGORY],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'End date for last used filtering (YYYY-MM-DD)',
			},
			{
				displayName: 'Include Hierarchy',
				name: 'includeHierarchy',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.POSTING_CATEGORY],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Include hierarchical structure',
			},
			{
				displayName: 'Include Children',
				name: 'includeChildren',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.POSTING_CATEGORY],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Include child categories',
			},
			{
				displayName: 'Tag',
				name: 'tag',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.POSTING_CATEGORY],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by tag',
			},
			// Print Layout specific fields
			{
				displayName: 'Print Layout ID',
				name: 'printLayoutId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PRINT_LAYOUT],
						operation: [LEXWARE_OPERATIONS.GET, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'The ID of the print layout',
			},
			{
				displayName: 'Print Layout Type',
				name: 'type',
				type: 'options',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PRINT_LAYOUT],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				options: [
					{ name: 'All Types', value: '' },
					{ name: 'Invoice', value: 'invoice' },
					{ name: 'Quotation', value: 'quotation' },
					{ name: 'Order Confirmation', value: 'orderConfirmation' },
					{ name: 'Delivery Note', value: 'deliveryNote' },
					{ name: 'Credit Note', value: 'creditNote' },
					{ name: 'Dunning', value: 'dunning' },
					{ name: 'Down Payment Invoice', value: 'downPaymentInvoice' },
					{ name: 'Receipt', value: 'receipt' },
					{ name: 'Reminder', value: 'reminder' },
					{ name: 'Confirmation', value: 'confirmation' },
				],
				description: 'Filter by print layout type',
			},
			{
				displayName: 'Print Layout Status',
				name: 'status',
				type: 'options',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PRINT_LAYOUT],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				options: [
					{ name: 'All Statuses', value: '' },
					{ name: 'Active', value: 'active' },
					{ name: 'Inactive', value: 'inactive' },
					{ name: 'Archived', value: 'archived' },
					{ name: 'Draft', value: 'draft' },
				],
				description: 'Filter by print layout status',
			},
			{
				displayName: 'Format',
				name: 'format',
				type: 'options',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PRINT_LAYOUT],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				options: [
					{ name: 'All Formats', value: '' },
					{ name: 'PDF', value: 'pdf' },
					{ name: 'HTML', value: 'html' },
					{ name: 'XML', value: 'xml' },
					{ name: 'JSON', value: 'json' },
				],
				description: 'Filter by print layout format',
			},
			{
				displayName: 'Page Size',
				name: 'pageSize',
				type: 'options',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PRINT_LAYOUT],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				options: [
					{ name: 'All Sizes', value: '' },
					{ name: 'A4', value: 'A4' },
					{ name: 'A3', value: 'A3' },
					{ name: 'A5', value: 'A5' },
					{ name: 'Letter', value: 'letter' },
					{ name: 'Legal', value: 'legal' },
					{ name: 'Custom', value: 'custom' },
				],
				description: 'Filter by page size',
			},
			{
				displayName: 'Orientation',
				name: 'orientation',
				type: 'options',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PRINT_LAYOUT],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				options: [
					{ name: 'All Orientations', value: '' },
					{ name: 'Portrait', value: 'portrait' },
					{ name: 'Landscape', value: 'landscape' },
				],
				description: 'Filter by orientation',
			},
			{
				displayName: 'Is Default',
				name: 'isDefault',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PRINT_LAYOUT],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by default layouts',
			},
			{
				displayName: 'Is System',
				name: 'isSystem',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PRINT_LAYOUT],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by system layouts',
			},
			{
				displayName: 'Is Editable',
				name: 'isEditable',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PRINT_LAYOUT],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by editable layouts',
			},
			{
				displayName: 'Is Public',
				name: 'isPublic',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PRINT_LAYOUT],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by public layouts',
			},
			{
				displayName: 'Search Term',
				name: 'searchTerm',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PRINT_LAYOUT],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Search term for filtering',
			},
			{
				displayName: 'Language',
				name: 'language',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PRINT_LAYOUT],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by language',
			},
			{
				displayName: 'Usage Count From',
				name: 'usageCountFrom',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PRINT_LAYOUT],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Minimum usage count for filtering',
			},
			{
				displayName: 'Usage Count To',
				name: 'usageCountTo',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PRINT_LAYOUT],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Maximum usage count for filtering',
			},
			{
				displayName: 'Last Used From',
				name: 'lastUsedFrom',
				type: 'dateTime',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PRINT_LAYOUT],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Start date for last used filtering (YYYY-MM-DD)',
			},
			{
				displayName: 'Last Used To',
				name: 'lastUsedTo',
				type: 'dateTime',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PRINT_LAYOUT],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'End date for last used filtering (YYYY-MM-DD)',
			},
			{
				displayName: 'Tag',
				name: 'tag',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PRINT_LAYOUT],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by tag',
			},
			{
				displayName: 'Font',
				name: 'font',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PRINT_LAYOUT],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by font',
			},
			{
				displayName: 'Header Enabled',
				name: 'headerEnabled',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PRINT_LAYOUT],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by layouts with headers',
			},
			{
				displayName: 'Footer Enabled',
				name: 'footerEnabled',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PRINT_LAYOUT],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by layouts with footers',
			},
			{
				displayName: 'Template Version',
				name: 'templateVersion',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PRINT_LAYOUT],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by template version',
			},
			{
				displayName: 'Resolution',
				name: 'resolution',
				type: 'number',
				default: 300,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PRINT_LAYOUT],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by resolution (DPI)',
			},
			// Profile specific fields
			{
				displayName: 'Company Name',
				name: 'companyName',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PROFILE],
						operation: [LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Company name for profile update',
			},
			{
				displayName: 'Legal Name',
				name: 'legalName',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PROFILE],
						operation: [LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Legal company name',
			},
			{
				displayName: 'Trade Name',
				name: 'tradeName',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PROFILE],
						operation: [LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Trade name for the company',
			},
			{
				displayName: 'Registration Number',
				name: 'registrationNumber',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PROFILE],
						operation: [LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Company registration number',
			},
			{
				displayName: 'Tax Number',
				name: 'taxNumber',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PROFILE],
						operation: [LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Company tax number',
			},
			{
				displayName: 'VAT Number',
				name: 'vatNumber',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PROFILE],
						operation: [LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Company VAT number (EU format)',
			},
			{
				displayName: 'Street',
				name: 'street',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PROFILE],
						operation: [LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Company street address',
			},
			{
				displayName: 'ZIP Code',
				name: 'zipCode',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PROFILE],
						operation: [LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Company ZIP/postal code',
			},
			{
				displayName: 'City',
				name: 'city',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PROFILE],
						operation: [LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Company city',
			},
			{
				displayName: 'Country',
				name: 'country',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PROFILE],
						operation: [LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Company country',
			},
			{
				displayName: 'Phone',
				name: 'phone',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PROFILE],
						operation: [LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Company phone number',
			},
			{
				displayName: 'Website',
				name: 'website',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PROFILE],
						operation: [LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Company website URL',
			},
			{
				displayName: 'Bank Name',
				name: 'bankName',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PROFILE],
						operation: [LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Company bank name',
			},
			{
				displayName: 'Account Holder',
				name: 'accountHolder',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PROFILE],
						operation: [LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Bank account holder name',
			},
			{
				displayName: 'IBAN',
				name: 'iban',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PROFILE],
						operation: [LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Company IBAN',
			},
			{
				displayName: 'BIC',
				name: 'bic',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PROFILE],
						operation: [LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Company BIC/SWIFT code',
			},
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PROFILE],
						operation: [LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'User first name',
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PROFILE],
						operation: [LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'User last name',
			},
			{
				displayName: 'Organization Type',
				name: 'organizationType',
				type: 'options',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PROFILE],
						operation: [LEXWARE_OPERATIONS.UPDATE],
					},
				},
				options: [
					{ name: 'Business', value: 'business' },
					{ name: 'Freelancer', value: 'freelancer' },
					{ name: 'Association', value: 'association' },
					{ name: 'Other', value: 'other' },
				],
				description: 'Organization type',
			},
			{
				displayName: 'Industry',
				name: 'industry',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PROFILE],
						operation: [LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Organization industry',
			},
			{
				displayName: 'Organization Size',
				name: 'organizationSize',
				type: 'options',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PROFILE],
						operation: [LEXWARE_OPERATIONS.UPDATE],
					},
				},
				options: [
					{ name: 'Micro', value: 'micro' },
					{ name: 'Small', value: 'small' },
					{ name: 'Medium', value: 'medium' },
					{ name: 'Large', value: 'large' },
				],
				description: 'Organization size',
			},
			{
				displayName: 'Founding Date',
				name: 'foundingDate',
				type: 'dateTime',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PROFILE],
						operation: [LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Organization founding date (YYYY-MM-DD)',
			},
			{
				displayName: 'Timezone',
				name: 'timezone',
				type: 'options',
				default: 'Europe/Berlin',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PROFILE],
						operation: [LEXWARE_OPERATIONS.UPDATE],
					},
				},
				options: [
					{ name: 'UTC', value: 'UTC' },
					{ name: 'Europe/Berlin', value: 'Europe/Berlin' },
					{ name: 'Europe/London', value: 'Europe/London' },
					{ name: 'America/New_York', value: 'America/New_York' },
					{ name: 'Asia/Tokyo', value: 'Asia/Tokyo' },
				],
				description: 'Organization timezone',
			},
			{
				displayName: 'Language',
				name: 'language',
				type: 'options',
				default: 'de',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PROFILE],
						operation: [LEXWARE_OPERATIONS.UPDATE],
					},
				},
				options: [
					{ name: 'German', value: 'de' },
					{ name: 'English', value: 'en' },
					{ name: 'French', value: 'fr' },
					{ name: 'Italian', value: 'it' },
					{ name: 'Spanish', value: 'es' },
				],
				description: 'Organization language',
			},
			{
				displayName: 'Currency',
				name: 'currency',
				type: 'options',
				default: 'EUR',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PROFILE],
						operation: [LEXWARE_OPERATIONS.UPDATE],
					},
				},
				options: [
					{ name: 'Euro', value: 'EUR' },
					{ name: 'US Dollar', value: 'USD' },
					{ name: 'Swiss Franc', value: 'CHF' },
					{ name: 'British Pound', value: 'GBP' },
					{ name: 'Japanese Yen', value: 'JPY' },
				],
				description: 'Organization currency',
			},
			{
				displayName: 'Default Tax Rate',
				name: 'defaultTaxRate',
				type: 'number',
				default: 19,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PROFILE],
						operation: [LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Default tax rate percentage',
			},
			{
				displayName: 'Small Business',
				name: 'smallBusiness',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PROFILE],
						operation: [LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Whether the organization is a small business',
			},
			{
				displayName: 'Small Business Threshold',
				name: 'smallBusinessThreshold',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PROFILE],
						operation: [LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Small business threshold amount',
			},
			{
				displayName: 'EU VAT Rules',
				name: 'euVatRules',
				type: 'boolean',
				default: true,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PROFILE],
						operation: [LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Whether EU VAT rules apply',
			},
			{
				displayName: 'Distance Sales Principle',
				name: 'distanceSalesPrinciple',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PROFILE],
						operation: [LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Distance sales principle for EU services',
			},
			{
				displayName: 'Default Payment Terms',
				name: 'defaultPaymentTerms',
				type: 'number',
				default: 30,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PROFILE],
						operation: [LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Default payment terms in days',
			},
			{
				displayName: 'Default Print Layout',
				name: 'defaultPrintLayout',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PROFILE],
						operation: [LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Default print layout ID',
			},
			{
				displayName: 'Logo URL',
				name: 'logoUrl',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PROFILE],
						operation: [LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Company logo URL',
			},
			{
				displayName: 'Webhook URL',
				name: 'webhookUrl',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PROFILE],
						operation: [LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Webhook URL for notifications',
			},
			{
				displayName: 'Webhook Secret',
				name: 'webhookSecret',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PROFILE],
						operation: [LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Webhook secret for security',
			},
			{
				displayName: 'API Rate Limit',
				name: 'apiRateLimit',
				type: 'number',
				default: 2,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PROFILE],
						operation: [LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'API rate limit (requests per second)',
			},
			{
				displayName: 'Environment',
				name: 'environment',
				type: 'options',
				default: 'production',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PROFILE],
						operation: [LEXWARE_OPERATIONS.UPDATE],
					},
				},
				options: [
					{ name: 'Development', value: 'development' },
					{ name: 'Staging', value: 'staging' },
					{ name: 'Production', value: 'production' },
				],
				description: 'System environment',
			},
			{
				displayName: 'Maintenance Mode',
				name: 'maintenanceMode',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PROFILE],
						operation: [LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Whether system is in maintenance mode',
			},
			{
				displayName: 'Backup Frequency',
				name: 'backupFrequency',
				type: 'string',
				default: 'daily',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PROFILE],
						operation: [LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Backup frequency (daily, weekly, monthly)',
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
						operation: [LEXWARE_OPERATIONS.GET, LEXWARE_OPERATIONS.UPDATE, LEXWARE_OPERATIONS.DELETE],
					},
				},
				description: 'The ID of the quotation',
			},
			{
				displayName: 'Quotation Status',
				name: 'quotationStatus',
				type: 'options',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.QUOTATION],
						operation: [LEXWARE_OPERATIONS.GET_ALL, LEXWARE_OPERATIONS.CREATE, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				options: [
					{ name: 'All Statuses', value: '' },
					{ name: 'Draft', value: 'draft' },
					{ name: 'Open', value: 'open' },
					{ name: 'Accepted', value: 'accepted' },
					{ name: 'Rejected', value: 'rejected' },
					{ name: 'Expired', value: 'expired' },
					{ name: 'Cancelled', value: 'cancelled' },
				],
				description: 'Filter by quotation status',
			},
			{
				displayName: 'Quotation Type',
				name: 'quotationType',
				type: 'options',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.QUOTATION],
						operation: [LEXWARE_OPERATIONS.GET_ALL, LEXWARE_OPERATIONS.CREATE, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				options: [
					{ name: 'All Types', value: '' },
					{ name: 'Standard', value: 'standard' },
					{ name: 'Proposal', value: 'proposal' },
					{ name: 'Estimate', value: 'estimate' },
					{ name: 'Tender', value: 'tender' },
					{ name: 'Request', value: 'request' },
				],
				description: 'Filter by quotation type',
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'options',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.QUOTATION],
						operation: [LEXWARE_OPERATIONS.GET_ALL, LEXWARE_OPERATIONS.CREATE, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				options: [
					{ name: 'All Priorities', value: '' },
					{ name: 'Low', value: 'low' },
					{ name: 'Medium', value: 'medium' },
					{ name: 'High', value: 'high' },
					{ name: 'Urgent', value: 'urgent' },
				],
				description: 'Filter by priority',
			},
			{
				displayName: 'Probability',
				name: 'probability',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.QUOTATION],
						operation: [LEXWARE_OPERATIONS.CREATE, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Probability percentage (0-100)',
			},
			{
				displayName: 'Expected Order Value',
				name: 'expectedOrderValue',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.QUOTATION],
						operation: [LEXWARE_OPERATIONS.CREATE, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Expected order value',
			},
			{
				displayName: 'Expected Order Date',
				name: 'expectedOrderDate',
				type: 'dateTime',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.QUOTATION],
						operation: [LEXWARE_OPERATIONS.CREATE, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Expected order date (YYYY-MM-DD)',
			},
			{
				displayName: 'Valid Until',
				name: 'validUntil',
				type: 'dateTime',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.QUOTATION],
						operation: [LEXWARE_OPERATIONS.CREATE, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Quotation validity date (YYYY-MM-DD)',
			},
			{
				displayName: 'Delivery Date',
				name: 'deliveryDate',
				type: 'dateTime',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.QUOTATION],
						operation: [LEXWARE_OPERATIONS.CREATE, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Expected delivery date (YYYY-MM-DD)',
			},
			{
				displayName: 'Shipping Date',
				name: 'shippingDate',
				type: 'dateTime',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.QUOTATION],
						operation: [LEXWARE_OPERATIONS.CREATE, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Expected shipping date (YYYY-MM-DD)',
			},
			{
				displayName: 'Approval Required',
				name: 'approvalRequired',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.QUOTATION],
						operation: [LEXWARE_OPERATIONS.CREATE, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Whether approval is required',
			},
			{
				displayName: 'Approval Status',
				name: 'approvalStatus',
				type: 'options',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.QUOTATION],
						operation: [LEXWARE_OPERATIONS.GET_ALL, LEXWARE_OPERATIONS.CREATE, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				options: [
					{ name: 'All Statuses', value: '' },
					{ name: 'Pending', value: 'pending' },
					{ name: 'Approved', value: 'approved' },
					{ name: 'Rejected', value: 'rejected' },
				],
				description: 'Filter by approval status',
			},
			{
				displayName: 'Reminder Enabled',
				name: 'reminderEnabled',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.QUOTATION],
						operation: [LEXWARE_OPERATIONS.CREATE, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Whether reminders are enabled',
			},
			{
				displayName: 'Reminder Date',
				name: 'reminderDate',
				type: 'dateTime',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.QUOTATION],
						operation: [LEXWARE_OPERATIONS.CREATE, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Reminder date (YYYY-MM-DD)',
			},
			{
				displayName: 'Reminder Frequency',
				name: 'reminderFrequency',
				type: 'options',
				default: 'weekly',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.QUOTATION],
						operation: [LEXWARE_OPERATIONS.CREATE, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				options: [
					{ name: 'Daily', value: 'daily' },
					{ name: 'Weekly', value: 'weekly' },
					{ name: 'Monthly', value: 'monthly' },
				],
				description: 'Reminder frequency',
			},
			{
				displayName: 'Customer Reference',
				name: 'customerReference',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.QUOTATION],
						operation: [LEXWARE_OPERATIONS.CREATE, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Customer reference number',
			},
			{
				displayName: 'Sales Person',
				name: 'salesPerson',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.QUOTATION],
						operation: [LEXWARE_OPERATIONS.CREATE, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Sales person identifier',
			},
			{
				displayName: 'Sales Channel',
				name: 'salesChannel',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.QUOTATION],
						operation: [LEXWARE_OPERATIONS.CREATE, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Sales channel identifier',
			},
			{
				displayName: 'Campaign',
				name: 'campaign',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.QUOTATION],
						operation: [LEXWARE_OPERATIONS.CREATE, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Campaign identifier',
			},
			{
				displayName: 'Lead Source',
				name: 'leadSource',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.QUOTATION],
						operation: [LEXWARE_OPERATIONS.CREATE, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Lead source identifier',
			},
			{
				displayName: 'Terms and Conditions',
				name: 'termsAndConditions',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.QUOTATION],
						operation: [LEXWARE_OPERATIONS.CREATE, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Terms and conditions text',
			},
			{
				displayName: 'Terms Version',
				name: 'termsVersion',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.QUOTATION],
						operation: [LEXWARE_OPERATIONS.CREATE, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Terms and conditions version',
			},
			{
				displayName: 'Print Layout',
				name: 'printLayout',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.QUOTATION],
						operation: [LEXWARE_OPERATIONS.CREATE, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Print layout ID',
			},
			{
				displayName: 'Logo Enabled',
				name: 'logoEnabled',
				type: 'boolean',
				default: true,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.QUOTATION],
						operation: [LEXWARE_OPERATIONS.CREATE, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Whether logo is enabled',
			},
			{
				displayName: 'Watermark Enabled',
				name: 'watermarkEnabled',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.QUOTATION],
						operation: [LEXWARE_OPERATIONS.CREATE, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Whether watermark is enabled',
			},
			{
				displayName: 'XRechnung Enabled',
				name: 'xrechnungEnabled',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.QUOTATION],
						operation: [LEXWARE_OPERATIONS.CREATE, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Whether XRechnung is enabled',
			},
			{
				displayName: 'XRechnung Version',
				name: 'xrechnungVersion',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.QUOTATION],
						operation: [LEXWARE_OPERATIONS.CREATE, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'XRechnung version',
			},
			{
				displayName: 'XRechnung Profile',
				name: 'xrechnungProfile',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.QUOTATION],
						operation: [LEXWARE_OPERATIONS.CREATE, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'XRechnung profile',
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.QUOTATION],
						operation: [LEXWARE_OPERATIONS.CREATE, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Comma-separated tags',
			},
			{
				displayName: 'Notes',
				name: 'notes',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.QUOTATION],
						operation: [LEXWARE_OPERATIONS.CREATE, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Additional notes',
			},
			{
				displayName: 'Internal Notes',
				name: 'internalNotes',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.QUOTATION],
						operation: [LEXWARE_OPERATIONS.CREATE, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'Internal notes (not visible to customer)',
			},
			{
				displayName: 'External ID',
				name: 'externalId',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.QUOTATION],
						operation: [LEXWARE_OPERATIONS.CREATE, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'External system ID',
			},
			{
				displayName: 'External System',
				name: 'externalSystem',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.QUOTATION],
						operation: [LEXWARE_OPERATIONS.CREATE, LEXWARE_OPERATIONS.UPDATE],
					},
				},
				description: 'External system name',
			},
			{
				displayName: 'Search Term',
				name: 'searchTerm',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.QUOTATION],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Search term for text search',
			},
			{
				displayName: 'Has Attachments',
				name: 'hasAttachments',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.QUOTATION],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by attachments',
			},
			{
				displayName: 'Min Value',
				name: 'minValue',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.QUOTATION],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Minimum value filter',
			},
			{
				displayName: 'Max Value',
				name: 'maxValue',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.QUOTATION],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Maximum value filter',
			},
			{
				displayName: 'Min Probability',
				name: 'minProbability',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.QUOTATION],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Minimum probability filter (0-100)',
			},
			{
				displayName: 'Max Probability',
				name: 'maxProbability',
				type: 'number',
				default: 100,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.QUOTATION],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Maximum probability filter (0-100)',
			},
			{
				displayName: 'Expiring Within Days',
				name: 'expiringWithinDays',
				type: 'number',
				default: 7,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.QUOTATION],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter quotations expiring within days',
			},
			{
				displayName: 'Payment Type',
				name: 'paymentType',
				type: 'options',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PAYMENT],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				options: [
					{ name: 'All Types', value: '' },
					{ name: 'Incoming', value: 'incoming' },
					{ name: 'Outgoing', value: 'outgoing' },
				],
				description: 'Filter by payment type',
			},
			{
				displayName: 'Payment Status',
				name: 'paymentStatus',
				type: 'options',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PAYMENT],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				options: [
					{ name: 'All Statuses', value: '' },
					{ name: 'Pending', value: 'pending' },
					{ name: 'Completed', value: 'completed' },
					{ name: 'Failed', value: 'failed' },
					{ name: 'Cancelled', value: 'cancelled' },
				],
				description: 'Filter by payment status',
			},
			{
				displayName: 'Paid Date Start',
				name: 'paidDateStart',
				type: 'dateTime',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PAYMENT],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Start paid date for filtering (YYYY-MM-DD)',
			},
			{
				displayName: 'Paid Date End',
				name: 'paidDateEnd',
				type: 'dateTime',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PAYMENT],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'End paid date for filtering (YYYY-MM-DD)',
			},
			{
				displayName: 'Clearing Date Start',
				name: 'clearingDateStart',
				type: 'dateTime',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PAYMENT],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Start clearing date for filtering (YYYY-MM-DD)',
			},
			{
				displayName: 'Clearing Date End',
				name: 'clearingDateEnd',
				type: 'dateTime',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PAYMENT],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'End clearing date for filtering (YYYY-MM-DD)',
			},
			{
				displayName: 'Payment Method',
				name: 'paymentMethod',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PAYMENT],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by payment method',
			},
			{
				displayName: 'Payment Item Type',
				name: 'paymentItemType',
				type: 'options',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PAYMENT],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				options: [
					{ name: 'All Types', value: '' },
					{ name: 'Receivable', value: 'receivable' },
					{ name: 'Payable', value: 'payable' },
					{ name: 'Irrecoverable Receivable', value: 'irrecoverableReceivable' },
				],
				description: 'Filter by payment item type',
			},
			{
				displayName: 'Transaction ID',
				name: 'transactionId',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PAYMENT],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by transaction ID',
			},
			{
				displayName: 'Reference',
				name: 'reference',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PAYMENT],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by reference',
			},
			{
				displayName: 'IBAN',
				name: 'iban',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.PAYMENT],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by IBAN',
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
			// Recurring Template specific fields
			{
				displayName: 'Template ID',
				name: 'templateId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.RECURRING_TEMPLATE],
						operation: [LEXWARE_OPERATIONS.GET],
					},
				},
				description: 'The ID of the recurring template',
			},
			{
				displayName: 'Template Type',
				name: 'templateType',
				type: 'options',
				options: [
					{ name: 'Invoice', value: 'invoice' },
					{ name: 'Quotation', value: 'quotation' },
					{ name: 'Order Confirmation', value: 'orderConfirmation' },
					{ name: 'Delivery Note', value: 'deliveryNote' },
				],
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.RECURRING_TEMPLATE],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by template type',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Active', value: 'active' },
					{ name: 'Inactive', value: 'inactive' },
					{ name: 'Draft', value: 'draft' },
					{ name: 'Archived', value: 'archived' },
				],
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.RECURRING_TEMPLATE],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by template status',
			},
			{
				displayName: 'Active Status',
				name: 'isActive',
				type: 'options',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Active Only', value: 'true' },
					{ name: 'Inactive Only', value: 'false' },
				],
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.RECURRING_TEMPLATE],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by active status',
			},
			{
				displayName: 'Contact ID',
				name: 'contactId',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.RECURRING_TEMPLATE],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by contact ID',
			},
			{
				displayName: 'Recurrence Type',
				name: 'recurrenceType',
				type: 'options',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Daily', value: 'daily' },
					{ name: 'Weekly', value: 'weekly' },
					{ name: 'Monthly', value: 'monthly' },
					{ name: 'Quarterly', value: 'quarterly' },
					{ name: 'Yearly', value: 'yearly' },
					{ name: 'Custom', value: 'custom' },
				],
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.RECURRING_TEMPLATE],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by recurrence type',
			},
			{
				displayName: 'Category',
				name: 'category',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.RECURRING_TEMPLATE],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by category',
			},
			{
				displayName: 'Search Term',
				name: 'searchTerm',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.RECURRING_TEMPLATE],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Search templates by name or description',
			},
			{
				displayName: 'Expiring Within Days',
				name: 'expiringWithinDays',
				type: 'number',
				default: 30,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.RECURRING_TEMPLATE],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter templates expiring within specified days',
			},
			{
				displayName: 'Min Generation Count',
				name: 'minGenerationCount',
				type: 'number',
				default: 10,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.RECURRING_TEMPLATE],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter templates with minimum generation count',
			},
			{
				displayName: 'Language',
				name: 'language',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.RECURRING_TEMPLATE],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by language code (e.g., de, en)',
			},
			{
				displayName: 'Currency',
				name: 'currency',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.RECURRING_TEMPLATE],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by currency code (e.g., EUR, USD)',
			},
			{
				displayName: 'Tag',
				name: 'tag',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.RECURRING_TEMPLATE],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by tag',
			},
			// Voucherlist specific fields
			{
				displayName: 'Voucher Type',
				name: 'voucherType',
				type: 'options',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Sales Invoice', value: 'salesinvoice' },
					{ name: 'Sales Credit Note', value: 'salescreditnote' },
					{ name: 'Purchase Invoice', value: 'purchaseinvoice' },
					{ name: 'Purchase Credit Note', value: 'purchasecreditnote' },
					{ name: 'Invoice', value: 'invoice' },
					{ name: 'Down Payment Invoice', value: 'downpaymentinvoice' },
					{ name: 'Credit Note', value: 'creditnote' },
					{ name: 'Order Confirmation', value: 'orderconfirmation' },
					{ name: 'Quotation', value: 'quotation' },
					{ name: 'Delivery Note', value: 'deliverynote' },
					{ name: 'Dunning', value: 'dunning' },
				],
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.VOUCHERLIST],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by voucher type',
			},
			{
				displayName: 'Voucher Status',
				name: 'voucherStatus',
				type: 'options',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Draft', value: 'draft' },
					{ name: 'Open', value: 'open' },
					{ name: 'Paid', value: 'paid' },
					{ name: 'Paid Off', value: 'paidoff' },
					{ name: 'Voided', value: 'voided' },
					{ name: 'Transferred', value: 'transferred' },
					{ name: 'SEPA Debit', value: 'sepadebit' },
					{ name: 'Overdue', value: 'overdue' },
					{ name: 'Accepted', value: 'accepted' },
					{ name: 'Rejected', value: 'rejected' },
					{ name: 'Unchecked', value: 'unchecked' },
				],
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.VOUCHERLIST],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by voucher status',
			},
			{
				displayName: 'Archived Status',
				name: 'archived',
				type: 'options',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Archived Only', value: 'true' },
					{ name: 'Public Only', value: 'false' },
				],
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.VOUCHERLIST],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by archived status',
			},
			{
				displayName: 'Contact ID',
				name: 'contactId',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.VOUCHERLIST],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by contact ID',
			},
			{
				displayName: 'Voucher Date From',
				name: 'voucherDateFrom',
				type: 'dateTime',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.VOUCHERLIST],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter vouchers from this date',
			},
			{
				displayName: 'Voucher Date To',
				name: 'voucherDateTo',
				type: 'dateTime',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.VOUCHERLIST],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter vouchers until this date',
			},
			{
				displayName: 'Created Date From',
				name: 'createdDateFrom',
				type: 'dateTime',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.VOUCHERLIST],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter vouchers created from this date',
			},
			{
				displayName: 'Created Date To',
				name: 'createdDateTo',
				type: 'dateTime',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.VOUCHERLIST],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter vouchers created until this date',
			},
			{
				displayName: 'Updated Date From',
				name: 'updatedDateFrom',
				type: 'dateTime',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.VOUCHERLIST],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter vouchers updated from this date',
			},
			{
				displayName: 'Updated Date To',
				name: 'updatedDateTo',
				type: 'dateTime',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.VOUCHERLIST],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter vouchers updated until this date',
			},
			{
				displayName: 'Voucher Number',
				name: 'voucherNumber',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.VOUCHERLIST],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Search vouchers by number',
			},
			{
				displayName: 'Is Recurring',
				name: 'isRecurring',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.VOUCHERLIST],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter recurring vouchers only',
			},
			{
				displayName: 'Is Closing Invoice',
				name: 'isClosingInvoice',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.VOUCHERLIST],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter closing invoices only',
			},
			{
				displayName: 'Is XRechnung',
				name: 'isXRechnung',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.VOUCHERLIST],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter XRechnung vouchers only',
			},
			{
				displayName: 'Currency',
				name: 'currency',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.VOUCHERLIST],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by currency code (e.g., EUR, USD)',
			},
			{
				displayName: 'Language',
				name: 'language',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.VOUCHERLIST],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by language code (e.g., de, en)',
			},
			{
				displayName: 'Min Amount',
				name: 'minAmount',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.VOUCHERLIST],
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
						resource: [LEXWARE_RESOURCE_TYPES.VOUCHERLIST],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Maximum amount for filtering',
			},
			{
				displayName: 'Tag',
				name: 'tag',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.VOUCHERLIST],
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				description: 'Filter by tag',
			},
			// Trigger-specific fields
			{
				displayName: 'Event Type',
				name: 'eventType',
				type: 'options',
				options: [
					{
						name: 'Contact Created',
						value: 'contact.created',
					},
					{
						name: 'Contact Updated',
						value: 'contact.updated',
					},
					{
						name: 'Contact Deleted',
						value: 'contact.deleted',
					},
					{
						name: 'Invoice Created',
						value: 'invoice.created',
					},
					{
						name: 'Invoice Updated',
						value: 'invoice.updated',
					},
					{
						name: 'Invoice Deleted',
						value: 'invoice.deleted',
					},
					{
						name: 'Article Created',
						value: 'article.created',
					},
					{
						name: 'Article Updated',
						value: 'article.updated',
					},
					{
						name: 'Article Deleted',
						value: 'article.deleted',
					},
				],
				default: 'contact.created',
				required: true,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.TRIGGER],
						operation: [LEXWARE_OPERATIONS.TRIGGER],
					},
				},
				description: 'Type of event to trigger',
			},
			{
				displayName: 'Webhook URL',
				name: 'webhookUrl',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.TRIGGER],
						operation: [LEXWARE_OPERATIONS.TRIGGER],
					},
				},
				description: 'URL to send webhook notifications to',
			},
			{
				displayName: 'Webhook Secret',
				name: 'webhookSecret',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [LEXWARE_RESOURCE_TYPES.TRIGGER],
						operation: [LEXWARE_OPERATIONS.TRIGGER],
					},
				},
				description: 'Secret key for webhook security',
			},
			// Generic additional fields for creation/update
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
					{
						displayName: 'Notes',
						name: 'notes',
						type: 'string',
						default: '',
						description: 'Additional notes for the resource',
					},
					{
						displayName: 'Tags',
						name: 'tags',
						type: 'string',
						default: '',
						description: 'Tags for the resource',
					},
					{
						displayName: 'External ID',
						name: 'externalId',
						type: 'string',
						default: '',
						description: 'External ID for the resource',
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
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				displayOptions: {
					show: {
						operation: [LEXWARE_OPERATIONS.GET_ALL],
						returnAll: [false],
					},
				},
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'Page number (0-based)',
			},
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'options',
				displayOptions: {
					show: {
						operation: [LEXWARE_OPERATIONS.GET_ALL],
					},
				},
				options: [
					{ name: 'Created At (Ascending)', value: LEXWARE_DEFAULT_SORT_OPTIONS.CREATED_AT_ASC },
					{ name: 'Created At (Descending)', value: LEXWARE_DEFAULT_SORT_OPTIONS.CREATED_AT_DESC },
					{ name: 'Updated At (Ascending)', value: LEXWARE_DEFAULT_SORT_OPTIONS.UPDATED_AT_ASC },
					{ name: 'Updated At (Descending)', value: LEXWARE_DEFAULT_SORT_OPTIONS.UPDATED_AT_DESC },
					{ name: 'Voucher Date (Ascending)', value: LEXWARE_DEFAULT_SORT_OPTIONS.VOUCHER_DATE_ASC },
					{ name: 'Voucher Date (Descending)', value: LEXWARE_DEFAULT_SORT_OPTIONS.VOUCHER_DATE_DESC },
					{ name: 'Name (Ascending)', value: LEXWARE_DEFAULT_SORT_OPTIONS.NAME_ASC },
					{ name: 'Name (Descending)', value: LEXWARE_DEFAULT_SORT_OPTIONS.NAME_DESC },
					{ name: 'ID (Ascending)', value: LEXWARE_DEFAULT_SORT_OPTIONS.ID_ASC },
					{ name: 'ID (Descending)', value: LEXWARE_DEFAULT_SORT_OPTIONS.ID_DESC },
				],
				default: LEXWARE_DEFAULT_SORT_OPTIONS.CREATED_AT_DESC,
				description: 'Sort order for results',
			},
			{
				displayName: 'Cursor',
				name: 'cursor',
				type: 'string',
				displayOptions: {
					show: {
						operation: [LEXWARE_OPERATIONS.GET_ALL],
						returnAll: [false],
					},
				},
				default: '',
				description: 'Cursor for cursor-based pagination',
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				displayOptions: {
					show: {
						operation: [LEXWARE_OPERATIONS.GET_ALL],
						returnAll: [false],
					},
				},
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'Offset for offset-based pagination',
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
		page: this.getNodeParameter('page', i, 0) as number,
		sort: this.getNodeParameter('sort', i, LEXWARE_DEFAULT_SORT_OPTIONS.CREATED_AT_DESC) as string,
		cursor: this.getNodeParameter('cursor', i, '') as string,
		offset: this.getNodeParameter('offset', i, 0) as number,
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
				// Contact creation fields
				params.companyName = this.getNodeParameter('companyName', i, '') as string;
				params.firstName = this.getNodeParameter('firstName', i, '') as string;
				params.lastName = this.getNodeParameter('lastName', i, '') as string;
				params.email = this.getNodeParameter('email', i, '') as string;
				params.phone = this.getNodeParameter('phone', i, '') as string;
				params.street = this.getNodeParameter('street', i, '') as string;
				params.zipCode = this.getNodeParameter('zipCode', i, '') as string;
				params.city = this.getNodeParameter('city', i, '') as string;
				params.country = this.getNodeParameter('country', i, 'DE') as string;
				params.vatNumber = this.getNodeParameter('vatNumber', i, '') as string;
				params.taxNumber = this.getNodeParameter('taxNumber', i, '') as string;
				params.contactRole = this.getNodeParameter('contactRole', i, LEXWARE_CONTACT_ROLES.CUSTOMER) as string;
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
			if (operation === LEXWARE_OPERATIONS.CREATE) {
				// Article creation fields
				params.articleName = this.getNodeParameter('articleName', i) as string;
				params.articleDescription = this.getNodeParameter('articleDescription', i, '') as string;
				params.articleTypeCreate = this.getNodeParameter('articleTypeCreate', i, LEXWARE_ARTICLE_TYPES.SERVICE) as string;
				params.unitPrice = this.getNodeParameter('unitPrice', i, 0) as number;
				params.currency = this.getNodeParameter('currency', i, 'EUR') as string;
				params.taxRate = this.getNodeParameter('taxRate', i, 19) as number;
				params.unitName = this.getNodeParameter('unitName', i, 'piece') as string;
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
			if (operation === LEXWARE_OPERATIONS.CREATE) {
				// Invoice creation fields
				params.invoiceContactId = this.getNodeParameter('invoiceContactId', i) as string;
				params.invoiceDate = this.getNodeParameter('invoiceDate', i, '') as string;
				params.dueDate = this.getNodeParameter('dueDate', i, '') as string;
				params.invoiceCurrency = this.getNodeParameter('invoiceCurrency', i, 'EUR') as string;
				params.invoiceLanguage = this.getNodeParameter('invoiceLanguage', i, 'de') as string;
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
		case LEXWARE_RESOURCE_TYPES.PAYMENT:
			if (operation === LEXWARE_OPERATIONS.GET) {
				params.paymentId = this.getNodeParameter('paymentId', i) as string;
			}
			if (operation === LEXWARE_OPERATIONS.GET_ALL) {
				params.paymentType = this.getNodeParameter('paymentType', i, '') as string;
				params.paymentStatus = this.getNodeParameter('paymentStatus', i, '') as string;
				params.contactId = this.getNodeParameter('contactId', i, '') as string;
				params.voucherId = this.getNodeParameter('voucherId', i, '') as string;
				params.startDate = this.getNodeParameter('startDate', i, '') as string;
				params.endDate = this.getNodeParameter('endDate', i, '') as string;
				params.paidDateStart = this.getNodeParameter('paidDateStart', i, '') as string;
				params.paidDateEnd = this.getNodeParameter('paidDateEnd', i, '') as string;
				params.clearingDateStart = this.getNodeParameter('clearingDateStart', i, '') as string;
				params.clearingDateEnd = this.getNodeParameter('clearingDateEnd', i, '') as string;
				params.minAmount = this.getNodeParameter('minAmount', i, 0) as number;
				params.maxAmount = this.getNodeParameter('maxAmount', i, 0) as number;
				params.currency = this.getNodeParameter('currency', i, '') as string;
				params.paymentMethod = this.getNodeParameter('paymentMethod', i, '') as string;
				params.paymentItemType = this.getNodeParameter('paymentItemType', i, '') as string;
				params.searchTerm = this.getNodeParameter('searchTerm', i, '') as string;
				params.transactionId = this.getNodeParameter('transactionId', i, '') as string;
				params.reference = this.getNodeParameter('reference', i, '') as string;
				params.iban = this.getNodeParameter('iban', i, '') as string;
			}
			break;
			
		case LEXWARE_RESOURCE_TYPES.POSTING_CATEGORY:
			if (operation === LEXWARE_OPERATIONS.GET || operation === LEXWARE_OPERATIONS.UPDATE) {
				params.postingCategoryId = this.getNodeParameter('postingCategoryId', i) as string;
			}
			if (operation === LEXWARE_OPERATIONS.GET_ALL) {
				params.type = this.getNodeParameter('type', i, '') as string;
				params.status = this.getNodeParameter('status', i, '') as string;
				params.parentId = this.getNodeParameter('parentId', i, '') as string;
				params.level = this.getNodeParameter('level', i, 0) as number;
				params.accountNumber = this.getNodeParameter('accountNumber', i, '') as string;
				params.taxType = this.getNodeParameter('taxType', i, '') as string;
				params.isDefault = this.getNodeParameter('isDefault', i, false) as boolean;
				params.isSystem = this.getNodeParameter('isSystem', i, false) as boolean;
				params.isEditable = this.getNodeParameter('isEditable', i, false) as boolean;
				params.searchTerm = this.getNodeParameter('searchTerm', i, '') as string;
				params.language = this.getNodeParameter('language', i, '') as string;
				params.usageCountFrom = this.getNodeParameter('usageCountFrom', i, 0) as number;
				params.usageCountTo = this.getNodeParameter('usageCountTo', i, 0) as number;
				params.lastUsedFrom = this.getNodeParameter('lastUsedFrom', i, '') as string;
				params.lastUsedTo = this.getNodeParameter('lastUsedTo', i, '') as string;
				params.includeHierarchy = this.getNodeParameter('includeHierarchy', i, false) as boolean;
				params.includeChildren = this.getNodeParameter('includeChildren', i, false) as boolean;
				params.tag = this.getNodeParameter('tag', i, '') as string;
			}
			break;
			
		case LEXWARE_RESOURCE_TYPES.PRINT_LAYOUT:
			if (operation === LEXWARE_OPERATIONS.GET || operation === LEXWARE_OPERATIONS.UPDATE) {
				params.printLayoutId = this.getNodeParameter('printLayoutId', i) as string;
			}
			if (operation === LEXWARE_OPERATIONS.GET_ALL) {
				params.type = this.getNodeParameter('type', i, '') as string;
				params.status = this.getNodeParameter('status', i, '') as string;
				params.format = this.getNodeParameter('format', i, '') as string;
				params.pageSize = this.getNodeParameter('pageSize', i, '') as string;
				params.orientation = this.getNodeParameter('orientation', i, '') as string;
				params.isDefault = this.getNodeParameter('isDefault', i, false) as boolean;
				params.isSystem = this.getNodeParameter('isSystem', i, false) as boolean;
				params.isEditable = this.getNodeParameter('isEditable', i, false) as boolean;
				params.isPublic = this.getNodeParameter('isPublic', i, false) as boolean;
				params.searchTerm = this.getNodeParameter('searchTerm', i, '') as string;
				params.language = this.getNodeParameter('language', i, '') as string;
				params.usageCountFrom = this.getNodeParameter('usageCountFrom', i, 0) as number;
				params.usageCountTo = this.getNodeParameter('usageCountTo', i, 0) as number;
				params.lastUsedFrom = this.getNodeParameter('lastUsedFrom', i, '') as string;
				params.lastUsedTo = this.getNodeParameter('lastUsedTo', i, '') as string;
				params.tag = this.getNodeParameter('tag', i, '') as string;
				params.font = this.getNodeParameter('font', i, '') as string;
				params.headerEnabled = this.getNodeParameter('headerEnabled', i, false) as boolean;
				params.footerEnabled = this.getNodeParameter('footerEnabled', i, false) as boolean;
				params.templateVersion = this.getNodeParameter('templateVersion', i, '') as string;
				params.resolution = this.getNodeParameter('resolution', i, 300) as number;
			}
			break;
			
		case LEXWARE_RESOURCE_TYPES.PROFILE:
			if (operation === LEXWARE_OPERATIONS.UPDATE) {
				// Company information
				if (this.getNodeParameter('companyName', i, '') as string) {
					params.additionalFields = {
						...params.additionalFields,
						company: {
							...params.additionalFields?.company,
							name: this.getNodeParameter('companyName', i, '') as string,
							legalName: this.getNodeParameter('legalName', i, '') as string,
							tradeName: this.getNodeParameter('tradeName', i, '') as string,
							registrationNumber: this.getNodeParameter('registrationNumber', i, '') as string,
							taxNumber: this.getNodeParameter('taxNumber', i, '') as string,
							vatNumber: this.getNodeParameter('vatNumber', i, '') as string,
							address: {
								street: this.getNodeParameter('street', i, '') as string,
								zipCode: this.getNodeParameter('zipCode', i, '') as string,
								city: this.getNodeParameter('city', i, '') as string,
								country: this.getNodeParameter('country', i, '') as string,
							},
							contact: {
								phone: this.getNodeParameter('phone', i, '') as string,
								website: this.getNodeParameter('website', i, '') as string,
							},
							banking: {
								bankName: this.getNodeParameter('bankName', i, '') as string,
								accountHolder: this.getNodeParameter('accountHolder', i, '') as string,
								iban: this.getNodeParameter('iban', i, '') as string,
								bic: this.getNodeParameter('bic', i, '') as string,
							},
						},
						user: {
							...params.additionalFields?.user,
							firstName: this.getNodeParameter('firstName', i, '') as string,
							lastName: this.getNodeParameter('lastName', i, '') as string,
						},
						organization: {
							...params.additionalFields?.organization,
							type: this.getNodeParameter('organizationType', i, '') as string,
							industry: this.getNodeParameter('industry', i, '') as string,
							size: this.getNodeParameter('organizationSize', i, '') as string,
							foundingDate: this.getNodeParameter('foundingDate', i, '') as string,
							timezone: this.getNodeParameter('timezone', i, 'Europe/Berlin') as string,
							language: this.getNodeParameter('language', i, 'de') as string,
							currency: this.getNodeParameter('currency', i, 'EUR') as string,
						},
						taxConfiguration: {
							...params.additionalFields?.taxConfiguration,
							defaultTaxRate: this.getNodeParameter('defaultTaxRate', i, 19) as number,
							smallBusiness: this.getNodeParameter('smallBusiness', i, false) as boolean,
							smallBusinessThreshold: this.getNodeParameter('smallBusinessThreshold', i, 0) as number,
							euVatRules: this.getNodeParameter('euVatRules', i, true) as boolean,
							distanceSalesPrinciple: this.getNodeParameter('distanceSalesPrinciple', i, '') as string,
						},
						paymentConfiguration: {
							...params.additionalFields?.paymentConfiguration,
							defaultPaymentTerms: this.getNodeParameter('defaultPaymentTerms', i, 30) as number,
						},
						documentSettings: {
							...params.additionalFields?.documentSettings,
							defaultPrintLayout: this.getNodeParameter('defaultPrintLayout', i, '') as string,
							logo: {
								url: this.getNodeParameter('logoUrl', i, '') as string,
							},
						},
						apiSettings: {
							...params.additionalFields?.apiSettings,
							webhookUrl: this.getNodeParameter('webhookUrl', i, '') as string,
							webhookSecret: this.getNodeParameter('webhookSecret', i, '') as string,
							rateLimit: this.getNodeParameter('apiRateLimit', i, 2) as number,
						},
						system: {
							...params.additionalFields?.system,
							environment: this.getNodeParameter('environment', i, 'production') as string,
							maintenanceMode: this.getNodeParameter('maintenanceMode', i, false) as boolean,
							backupFrequency: this.getNodeParameter('backupFrequency', i, 'daily') as string,
						},
					};
				}
			}
			break;
			
		case LEXWARE_RESOURCE_TYPES.QUOTATION:
			if (operation === LEXWARE_OPERATIONS.GET || operation === LEXWARE_OPERATIONS.UPDATE || operation === LEXWARE_OPERATIONS.DELETE) {
				params.quotationId = this.getNodeParameter('quotationId', i) as string;
			}
			if (operation === LEXWARE_OPERATIONS.GET_ALL) {
				params.quotationStatus = this.getNodeParameter('quotationStatus', i, '') as string;
				params.quotationType = this.getNodeParameter('quotationType', i, '') as string;
				params.priority = this.getNodeParameter('priority', i, '') as string;
				params.approvalStatus = this.getNodeParameter('approvalStatus', i, '') as string;
				params.searchTerm = this.getNodeParameter('searchTerm', i, '') as string;
				params.hasAttachments = this.getNodeParameter('hasAttachments', i, false) as boolean;
				params.minValue = this.getNodeParameter('minValue', i, 0) as number;
				params.maxValue = this.getNodeParameter('maxValue', i, 0) as number;
				params.minProbability = this.getNodeParameter('minProbability', i, 0) as number;
				params.maxProbability = this.getNodeParameter('maxProbability', i, 100) as number;
				params.expiringWithinDays = this.getNodeParameter('expiringWithinDays', i, 7) as number;
			}
			if (operation === LEXWARE_OPERATIONS.CREATE || operation === LEXWARE_OPERATIONS.UPDATE) {
				params.additionalFields = {
					...params.additionalFields,
					quotationStatus: this.getNodeParameter('quotationStatus', i, '') as string,
					quotationType: this.getNodeParameter('quotationType', i, '') as string,
					priority: this.getNodeParameter('priority', i, '') as string,
					probability: this.getNodeParameter('probability', i, 0) as number,
					expectedOrderValue: this.getNodeParameter('expectedOrderValue', i, 0) as number,
					expectedOrderDate: this.getNodeParameter('expectedOrderDate', i, '') as string,
					validUntil: this.getNodeParameter('validUntil', i, '') as string,
					deliveryDate: this.getNodeParameter('deliveryDate', i, '') as string,
					shippingDate: this.getNodeParameter('shippingDate', i, '') as string,
					approvalRequired: this.getNodeParameter('approvalRequired', i, false) as boolean,
					approvalStatus: this.getNodeParameter('approvalStatus', i, '') as string,
					reminderEnabled: this.getNodeParameter('reminderEnabled', i, false) as boolean,
					reminderDate: this.getNodeParameter('reminderDate', i, '') as string,
					reminderFrequency: this.getNodeParameter('reminderFrequency', i, 'weekly') as string,
					customerReference: this.getNodeParameter('customerReference', i, '') as string,
					salesPerson: this.getNodeParameter('salesPerson', i, '') as string,
					salesChannel: this.getNodeParameter('salesChannel', i, '') as string,
					campaign: this.getNodeParameter('campaign', i, '') as string,
					leadSource: this.getNodeParameter('leadSource', i, '') as string,
					termsAndConditions: this.getNodeParameter('termsAndConditions', i, '') as string,
					termsVersion: this.getNodeParameter('termsVersion', i, '') as string,
					printLayout: this.getNodeParameter('printLayout', i, '') as string,
					logoEnabled: this.getNodeParameter('logoEnabled', i, true) as boolean,
					watermarkEnabled: this.getNodeParameter('watermarkEnabled', i, false) as boolean,
					xrechnungEnabled: this.getNodeParameter('xrechnungEnabled', i, false) as boolean,
					xrechnungVersion: this.getNodeParameter('xrechnungVersion', i, '') as string,
					xrechnungProfile: this.getNodeParameter('xrechnungProfile', i, '') as string,
					tags: this.getNodeParameter('tags', i, '') as string,
					notes: this.getNodeParameter('notes', i, '') as string,
					internalNotes: this.getNodeParameter('internalNotes', i, '') as string,
					externalId: this.getNodeParameter('externalId', i, '') as string,
					externalSystem: this.getNodeParameter('externalSystem', i, '') as string,
				};
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
			
		case LEXWARE_RESOURCE_TYPES.RECURRING_TEMPLATE:
			if (operation === LEXWARE_OPERATIONS.GET) {
				params.templateId = this.getNodeParameter('templateId', i) as string;
			}
			if (operation === LEXWARE_OPERATIONS.GET_ALL) {
				params.templateType = this.getNodeParameter('templateType', i, '') as string;
				params.status = this.getNodeParameter('status', i, '') as string;
				params.isActive = this.getNodeParameter('isActive', i, '') as string;
				params.contactId = this.getNodeParameter('contactId', i, '') as string;
				params.recurrenceType = this.getNodeParameter('recurrenceType', i, '') as string;
				params.category = this.getNodeParameter('category', i, '') as string;
				params.searchTerm = this.getNodeParameter('searchTerm', i, '') as string;
				params.expiringWithinDays = this.getNodeParameter('expiringWithinDays', i, 30) as number;
				params.minGenerationCount = this.getNodeParameter('minGenerationCount', i, 10) as number;
				params.language = this.getNodeParameter('language', i, '') as string;
				params.currency = this.getNodeParameter('currency', i, '') as string;
				params.tag = this.getNodeParameter('tag', i, '') as string;
			}
			break;
			
		case LEXWARE_RESOURCE_TYPES.VOUCHERLIST:
			if (operation === LEXWARE_OPERATIONS.GET_ALL) {
				// Always include all parameters for VOUCHERLIST GET_ALL, even if empty
				// This ensures the API receives all expected parameters
				params.voucherType = this.getNodeParameter('voucherType', i, '') as string;
				params.voucherStatus = this.getNodeParameter('voucherStatus', i, '') as string;
				params.archived = this.getNodeParameter('archived', i, '') as string;
				params.contactId = this.getNodeParameter('contactId', i, '') as string;
				params.voucherDateFrom = this.getNodeParameter('voucherDateFrom', i, '') as string;
				params.voucherDateTo = this.getNodeParameter('voucherDateTo', i, '') as string;
				params.createdDateFrom = this.getNodeParameter('createdDateFrom', i, '') as string;
				params.createdDateTo = this.getNodeParameter('createdDateTo', i, '') as string;
				params.updatedDateFrom = this.getNodeParameter('updatedDateFrom', i, '') as string;
				params.updatedDateTo = this.getNodeParameter('updatedDateTo', i, '') as string;
				params.voucherNumber = this.getNodeParameter('voucherNumber', i, '') as string;
				params.isRecurring = this.getNodeParameter('isRecurring', i, false) as boolean;
				params.isClosingInvoice = this.getNodeParameter('isClosingInvoice', i, false) as boolean;
				params.isXRechnung = this.getNodeParameter('isXRechnung', i, false) as boolean;
				params.currency = this.getNodeParameter('currency', i, '') as string;
				params.language = this.getNodeParameter('language', i, '') as string;
				params.minAmount = this.getNodeParameter('minAmount', i, 0) as number;
				params.maxAmount = this.getNodeParameter('maxAmount', i, 0) as number;
				params.tag = this.getNodeParameter('tag', i, '') as string;
				
				// Ensure required parameters are never undefined
				if (params.voucherStatus === undefined) params.voucherStatus = '';
				if (params.voucherType === undefined) params.voucherType = '';
				if (params.archived === undefined) params.archived = '';
			}
			break;
			
		case LEXWARE_RESOURCE_TYPES.TRIGGER:
			if (operation === LEXWARE_OPERATIONS.TRIGGER) {
				params.eventType = this.getNodeParameter('eventType', i) as string;
				params.webhookUrl = this.getNodeParameter('webhookUrl', i) as string;
				params.webhookSecret = this.getNodeParameter('webhookSecret', i, '') as string;
			}
			break;
	}

	return params;
}

// Export an instance of the node for n8n
export const LexwareOfficeNode = new LexwareOffice();
