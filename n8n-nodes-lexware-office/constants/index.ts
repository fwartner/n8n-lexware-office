export const LEXWARE_API_ENDPOINTS = {
	CONTACTS: '/v1/contacts',
	ARTICLES: '/v1/articles',
	VOUCHERS: '/v1/vouchers',
	VOUCHER_LIST: '/v1/voucherlist',
	INVOICES: '/v1/invoices',
	DOWN_PAYMENT_INVOICES: '/v1/down-payment-invoices',
	QUOTATIONS: '/v1/quotations',
	CREDIT_NOTES: '/v1/credit-notes',
	ORDER_CONFIRMATIONS: '/v1/order-confirmations',
	DELIVERY_NOTES: '/v1/delivery-notes',
	DUNNINGS: '/v1/dunnings',
	FILES: '/v1/files',
	PROFILE: '/v1/profile',
	COUNTRIES: '/v1/countries',
	PAYMENT_CONDITIONS: '/v1/payment-conditions',
	PAYMENTS: '/v1/payments',
	POSTING_CATEGORIES: '/v1/posting-categories',
	PRINT_LAYOUTS: '/v1/print-layouts',
	EVENT_SUBSCRIPTIONS: '/v1/event-subscriptions',
	RECURRING_TEMPLATES: '/v1/recurring-templates',
	VOUCHERLIST: '/v1/voucherlist',
} as const;

export const LEXWARE_RESOURCE_TYPES = {
	CONTACT: 'contact',
	ARTICLE: 'article',
	VOUCHER: 'voucher',
	INVOICE: 'invoice',
	DOWN_PAYMENT_INVOICE: 'downPaymentInvoice',
	QUOTATION: 'quotation',
	CREDIT_NOTE: 'creditNote',
	ORDER_CONFIRMATION: 'orderConfirmation',
	DELIVERY_NOTE: 'deliveryNote',
	DUNNING: 'dunning',
	FILE: 'file',
	PROFILE: 'profile',
	COUNTRY: 'country',
	PAYMENT_CONDITION: 'paymentCondition',
	PAYMENT: 'payment',
	POSTING_CATEGORY: 'postingCategory',
	PRINT_LAYOUT: 'printLayout',
	EVENT_SUBSCRIPTION: 'eventSubscription',
	RECURRING_TEMPLATE: 'recurringTemplate',
	VOUCHERLIST: 'voucherlist',
} as const;

export const LEXWARE_OPERATIONS = {
	CREATE: 'create',
	GET: 'get',
	GET_ALL: 'getAll',
	UPDATE: 'update',
	DELETE: 'delete',
	FINALIZE: 'finalize',
	PURSUE: 'pursue',
	DOCUMENT: 'document',
	DOWNLOAD_FILE: 'downloadFile',
} as const;

export const LEXWARE_VOUCHER_TYPES = {
	SALES_INVOICE: 'salesinvoice',
	SALES_CREDIT_NOTE: 'salescreditnote',
	PURCHASE_INVOICE: 'purchaseinvoice',
	PURCHASE_CREDIT_NOTE: 'purchasecreditnote',
	INVOICE: 'invoice',
	DOWN_PAYMENT_INVOICE: 'downpaymentinvoice',
	CREDIT_NOTE: 'creditnote',
	ORDER_CONFIRMATION: 'orderconfirmation',
	QUOTATION: 'quotation',
	DELIVERY_NOTE: 'deliverynote',
	DUNNING: 'dunning',
} as const;

export const LEXWARE_CONTACT_TYPES = {
	COMPANY: 'company',
	PERSON: 'person',
} as const;

export const LEXWARE_CONTACT_ROLES = {
	CUSTOMER: 'customer',
	VENDOR: 'vendor',
	EMPLOYEE: 'employee',
} as const;

export const LEXWARE_ADDRESS_TYPES = {
	BILLING: 'billing',
	SHIPPING: 'shipping',
} as const;

export const LEXWARE_SALUTATIONS = {
	MR: 'Mr.',
	MS: 'Ms.',
	MRS: 'Mrs.',
	DR: 'Dr.',
	PROF: 'Prof.',
} as const;

export const LEXWARE_DISCOUNT_TYPES = {
	PERCENTAGE: 'percentage',
	AMOUNT: 'amount',
} as const;

export const LEXWARE_ARTICLE_TYPES = {
	SERVICE: 'service',
	MATERIAL: 'material',
	CUSTOM: 'custom',
} as const;

export const LEXWARE_PRICE_TYPES = {
	NET: 'NET',
	GROSS: 'GROSS',
} as const;

export const LEXWARE_LINE_ITEM_TYPES = {
	CUSTOM: 'custom',
	MATERIAL: 'material',
	SERVICE: 'service',
	TEXT: 'text',
} as const;

export const LEXWARE_TAX_TYPES = {
	GROSS: 'gross',
	NET: 'net',
	VAT_FREE: 'vatfree',
	INTRA_COMMUNITY_SUPPLY: 'intraCommunitySupply',
	CONSTRUCTION_SERVICE_13B: 'constructionService13b',
	EXTERNAL_SERVICE_13B: 'externalService13b',
	THIRD_PARTY_COUNTRY_SERVICE: 'thirdPartyCountryService',
	THIRD_PARTY_COUNTRY_DELIVERY: 'thirdPartyCountryDelivery',
} as const;

export const LEXWARE_SHIPPING_TYPES = {
	STANDARD: 'standard',
	EXPRESS: 'express',
	PICKUP: 'pickup',
} as const;

export const LEXWARE_VOUCHER_STATUSES = {
	DRAFT: 'draft',
	OPEN: 'open',
	PAID: 'paid',
	PAID_OFF: 'paidoff',
	VOIDED: 'voided',
	TRANSFERRED: 'transferred',
	SEPA_DEBIT: 'sepadebit',
	OVERDUE: 'overdue',
	ACCEPTED: 'accepted',
	REJECTED: 'rejected',
	UNCHECKED: 'unchecked',
} as const;

export const LEXWARE_INVOICE_STATUSES = {
	DRAFT: 'draft',
	OPEN: 'open',
	PAID: 'paid',
	VOIDED: 'voided',
	OVERDUE: 'overdue',
	PARTIALLY_PAID: 'partially_paid',
} as const;

export const LEXWARE_DOWN_PAYMENT_INVOICE_STATUSES = {
	DRAFT: 'draft',
	OPEN: 'open',
	PAID: 'paid',
	VOIDED: 'voided',
} as const;



export const LEXWARE_ORDER_CONFIRMATION_STATUSES = {
	DRAFT: 'draft',
	OPEN: 'open',
	CONFIRMED: 'confirmed',
	CANCELLED: 'cancelled',
	COMPLETED: 'completed',
} as const;

export const LEXWARE_CREDIT_NOTE_STATUSES = {
	DRAFT: 'draft',
	OPEN: 'open',
	VOIDED: 'voided',
} as const;

export const LEXWARE_LANGUAGES = {
	GERMAN: 'de',
	ENGLISH: 'en',
} as const;

export const LEXWARE_CREDIT_NOTE_TYPES = {
	SALES_CREDIT_NOTE: 'salescreditnote',
	PURCHASE_CREDIT_NOTE: 'purchasecreditnote',
} as const;

export const LEXWARE_DELIVERY_NOTE_STATUSES = {
	DRAFT: 'draft',
	OPEN: 'open',
	DELIVERED: 'delivered',
} as const;

export const LEXWARE_DELIVERY_TYPES = {
	STANDARD: 'standard',
	EXPRESS: 'express',
	PICKUP: 'pickup',
	COURIER: 'courier',
	POSTAL: 'postal',
} as const;

export const LEXWARE_DUNNING_STATUSES = {
	DRAFT: 'draft',
	OPEN: 'open',
	PAID: 'paid',
	VOIDED: 'voided',
} as const;

export const LEXWARE_DEFAULT_VALUES = {
	DEFAULT_TAX_RATE: 19,
	DEFAULT_UNIT_NAME: 'piece',
	DEFAULT_CURRENCY: 'EUR',
	DEFAULT_COUNTRY_CODE: 'DE',
	DEFAULT_PAGE_SIZE: 50,
	MAX_PAGE_SIZE: 250,
	DEFAULT_VERSION: 0,
} as const;

/**
 * Optimistic Locking Constants
 * Based on the official Lexware API documentation for optimistic locking
 */
export const LEXWARE_OPTIMISTIC_LOCKING = {
	VERSION_FIELD: 'version',
	VERSION_INCREMENT: 1,
	MIN_VERSION: 0,
	MAX_VERSION: 999999,
	VERSION_CONFLICT_ERROR: 'VERSION_CONFLICT',
	VERSION_MISMATCH_ERROR: 'VERSION_MISMATCH',
	CONCURRENT_UPDATE_ERROR: 'CONCURRENT_UPDATE',
} as const;

/**
 * Optimistic Locking Error Messages
 */
export const LEXWARE_OPTIMISTIC_LOCKING_MESSAGES = {
	VERSION_REQUIRED: 'Version field is required for optimistic locking',
	VERSION_MISMATCH: 'Version mismatch detected. The resource has been modified by another process.',
	CONCURRENT_UPDATE: 'Concurrent update detected. Please refresh and try again.',
	VERSION_OUT_OF_RANGE: 'Version number is out of valid range',
	UPDATE_FAILED: 'Update failed due to version conflict',
} as const;

/**
 * Pagination limits per endpoint as documented in the Lexware API
 * Based on the official documentation updated on 09.02.2022
 */
export const LEXWARE_PAGINATION_LIMITS = {
	// Core resources
	CONTACTS: {
		DEFAULT: 50,
		MAX: 250,
		MIN: 1,
	},
	ARTICLES: {
		DEFAULT: 50,
		MAX: 250,
		MIN: 1,
	},
	VOUCHERS: {
		DEFAULT: 50,
		MAX: 250,
		MIN: 1,
	},
	INVOICES: {
		DEFAULT: 50,
		MAX: 250,
		MIN: 1,
	},
	QUOTATIONS: {
		DEFAULT: 50,
		MAX: 250,
		MIN: 1,
	},
	CREDIT_NOTES: {
		DEFAULT: 50,
		MAX: 250,
		MIN: 1,
	},
	ORDER_CONFIRMATIONS: {
		DEFAULT: 50,
		MAX: 250,
		MIN: 1,
	},
	DELIVERY_NOTES: {
		DEFAULT: 50,
		MAX: 250,
		MIN: 1,
	},
	DUNNINGS: {
		DEFAULT: 50,
		MAX: 250,
		MIN: 1,
	},
	DOWN_PAYMENT_INVOICES: {
		DEFAULT: 50,
		MAX: 250,
		MIN: 1,
	},
	
	// File and system resources
	FILES: {
		DEFAULT: 50,
		MAX: 250,
		MIN: 1,
	},
	PROFILE: {
		DEFAULT: 1,
		MAX: 1,
		MIN: 1,
	},
	COUNTRIES: {
		DEFAULT: 50,
		MAX: 250,
		MIN: 1,
	},
	PAYMENT_CONDITIONS: {
		DEFAULT: 50,
		MAX: 250,
		MIN: 1,
	},
	PAYMENTS: {
		DEFAULT: 50,
		MAX: 250,
		MIN: 1,
	},
	POSTING_CATEGORIES: {
		DEFAULT: 50,
		MAX: 250,
		MIN: 1,
	},
	PRINT_LAYOUTS: {
		DEFAULT: 50,
		MAX: 250,
		MIN: 1,
	},
	EVENT_SUBSCRIPTIONS: {
		DEFAULT: 50,
		MAX: 250,
		MIN: 1,
	},
	RECURRING_TEMPLATES: {
		DEFAULT: 50,
		MAX: 250,
		MIN: 1,
	},
	VOUCHERLIST: {
		DEFAULT: 50,
		MAX: 250,
		MIN: 1,
	},
} as const;

/**
 * Pagination parameter names as used in the Lexware API
 */
export const LEXWARE_PAGINATION_PARAMS = {
	SIZE: 'size',
	PAGE: 'page',
	SORT: 'sort',
	CURSOR: 'cursor',
	LIMIT: 'limit',
	OFFSET: 'offset',
} as const;

/**
 * Default sorting options for pagination
 */
export const LEXWARE_DEFAULT_SORT_OPTIONS = {
	CREATED_AT_ASC: 'createdAt:asc',
	CREATED_AT_DESC: 'createdAt:desc',
	UPDATED_AT_ASC: 'updatedAt:asc',
	UPDATED_AT_DESC: 'updatedAt:desc',
	VOUCHER_DATE_ASC: 'voucherDate:asc',
	VOUCHER_DATE_DESC: 'voucherDate:desc',
	NAME_ASC: 'name:asc',
	NAME_DESC: 'name:desc',
	ID_ASC: 'id:asc',
	ID_DESC: 'id:desc',
} as const;

export const LEXWARE_HTTP_METHODS = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE',
} as const;

export const LEXWARE_HEADERS = {
	ACCEPT: 'application/json',
	CONTENT_TYPE: 'application/json',
} as const;

export const LEXWARE_ERROR_MESSAGES = {
	INVALID_CREDENTIALS: 'Invalid API credentials',
	RESOURCE_NOT_FOUND: 'Resource not found',
	VALIDATION_ERROR: 'Validation error',
	RATE_LIMIT_EXCEEDED: 'Rate limit exceeded',
	NETWORK_ERROR: 'Network error',
	UNKNOWN_ERROR: 'Unknown error occurred',
} as const;

/**
 * Lexware API Error Codes
 * Based on the official Lexware API documentation for Error Codes
 */
export const LEXWARE_ERROR_CODES = {
	// Authorization and Connection Errors
	AUTHENTICATION_FAILED: 'AUTHENTICATION_FAILED',
	INVALID_API_KEY: 'INVALID_API_KEY',
	API_KEY_EXPIRED: 'API_KEY_EXPIRED',
	INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',
	CONNECTION_TIMEOUT: 'CONNECTION_TIMEOUT',
	CONNECTION_REFUSED: 'CONNECTION_REFUSED',
	NETWORK_UNREACHABLE: 'NETWORK_UNREACHABLE',
	
	// Resource and Data Errors
	RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
	RESOURCE_ALREADY_EXISTS: 'RESOURCE_ALREADY_EXISTS',
	RESOURCE_IN_USE: 'RESOURCE_IN_USE',
	RESOURCE_DELETED: 'RESOURCE_DELETED',
	RESOURCE_LOCKED: 'RESOURCE_LOCKED',
	RESOURCE_CONFLICT: 'RESOURCE_CONFLICT',
	
	// Validation Errors
	VALIDATION_FAILED: 'VALIDATION_FAILED',
	REQUIRED_FIELD_MISSING: 'REQUIRED_FIELD_MISSING',
	INVALID_FIELD_VALUE: 'INVALID_FIELD_VALUE',
	FIELD_TOO_LONG: 'FIELD_TOO_LONG',
	FIELD_TOO_SHORT: 'FIELD_TOO_SHORT',
	INVALID_FORMAT: 'INVALID_FORMAT',
	INVALID_DATE: 'INVALID_DATE',
	INVALID_EMAIL: 'INVALID_EMAIL',
	INVALID_PHONE: 'INVALID_PHONE',
	INVALID_IBAN: 'INVALID_IBAN',
	INVALID_BIC: 'INVALID_BIC',
	INVALID_TAX_RATE: 'INVALID_TAX_RATE',
	INVALID_CURRENCY: 'INVALID_CURRENCY',
	INVALID_LANGUAGE: 'INVALID_LANGUAGE',
	
	// Business Logic Errors
	BUSINESS_RULE_VIOLATION: 'BUSINESS_RULE_VIOLATION',
	INVALID_TRANSITION: 'INVALID_TRANSITION',
	WORKFLOW_CONSTRAINT: 'WORKFLOW_CONSTRAINT',
	DUPLICATE_ENTRY: 'DUPLICATE_ENTRY',
	CIRCULAR_REFERENCE: 'CIRCULAR_REFERENCE',
	
	// Rate Limiting and Throttling
	RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
	THROTTLE_LIMIT_EXCEEDED: 'THROTTLE_LIMIT_EXCEEDED',
	QUOTA_EXCEEDED: 'QUOTA_EXCEEDED',
	
	// Server and System Errors
	INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
	SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
	MAINTENANCE_MODE: 'MAINTENANCE_MODE',
	SYSTEM_OVERLOAD: 'SYSTEM_OVERLOAD',
	DATABASE_ERROR: 'DATABASE_ERROR',
	EXTERNAL_SERVICE_ERROR: 'EXTERNAL_SERVICE_ERROR',
	
	// Optimistic Locking Errors
	VERSION_CONFLICT: 'VERSION_CONFLICT',
	CONCURRENT_MODIFICATION: 'CONCURRENT_MODIFICATION',
	STALE_DATA: 'STALE_DATA',
	
	// File and Upload Errors
	FILE_TOO_LARGE: 'FILE_TOO_LARGE',
	INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
	FILE_CORRUPTED: 'FILE_CORRUPTED',
	UPLOAD_FAILED: 'UPLOAD_FAILED',
	DOWNLOAD_FAILED: 'DOWNLOAD_FAILED',
	
	// XRechnung and E-Invoice Errors
	XRECHNUNG_VALIDATION_FAILED: 'XRECHNUNG_VALIDATION_FAILED',
	EINVOICE_FORMAT_ERROR: 'EINVOICE_FORMAT_ERROR',
	COMPANY_DATA_INVALID: 'COMPANY_DATA_INVALID',
	PRINT_SETTINGS_INVALID: 'PRINT_SETTINGS_INVALID',
	
	// Generic Errors
	UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

/**
 * Lexware API Error Code Messages
 * Based on the official Lexware API documentation for Error Codes
 */
export const LEXWARE_ERROR_CODE_MESSAGES = {
	// Authorization and Connection Errors
	[LEXWARE_ERROR_CODES.AUTHENTICATION_FAILED]: 'Authentication failed. Please check your credentials.',
	[LEXWARE_ERROR_CODES.INVALID_API_KEY]: 'Invalid API key provided.',
	[LEXWARE_ERROR_CODES.API_KEY_EXPIRED]: 'API key has expired. Please generate a new one.',
	[LEXWARE_ERROR_CODES.INSUFFICIENT_PERMISSIONS]: 'Insufficient permissions for this operation.',
	[LEXWARE_ERROR_CODES.CONNECTION_TIMEOUT]: 'Connection timeout. Please try again.',
	[LEXWARE_ERROR_CODES.CONNECTION_REFUSED]: 'Connection refused by the server.',
	[LEXWARE_ERROR_CODES.NETWORK_UNREACHABLE]: 'Network is unreachable.',
	
	// Resource and Data Errors
	[LEXWARE_ERROR_CODES.RESOURCE_NOT_FOUND]: 'The requested resource was not found.',
	[LEXWARE_ERROR_CODES.RESOURCE_ALREADY_EXISTS]: 'A resource with this identifier already exists.',
	[LEXWARE_ERROR_CODES.RESOURCE_IN_USE]: 'The resource is currently in use and cannot be modified.',
	[LEXWARE_ERROR_CODES.RESOURCE_DELETED]: 'The resource has been deleted.',
	[LEXWARE_ERROR_CODES.RESOURCE_LOCKED]: 'The resource is locked and cannot be accessed.',
	[LEXWARE_ERROR_CODES.RESOURCE_CONFLICT]: 'Resource conflict detected.',
	
	// Validation Errors
	[LEXWARE_ERROR_CODES.VALIDATION_FAILED]: 'Validation failed. Please check your input data.',
	[LEXWARE_ERROR_CODES.REQUIRED_FIELD_MISSING]: 'Required field is missing.',
	[LEXWARE_ERROR_CODES.INVALID_FIELD_VALUE]: 'Invalid value provided for field.',
	[LEXWARE_ERROR_CODES.FIELD_TOO_LONG]: 'Field value exceeds maximum length.',
	[LEXWARE_ERROR_CODES.FIELD_TOO_SHORT]: 'Field value is below minimum length.',
	[LEXWARE_ERROR_CODES.INVALID_FORMAT]: 'Invalid format provided.',
	[LEXWARE_ERROR_CODES.INVALID_DATE]: 'Invalid date format provided.',
	[LEXWARE_ERROR_CODES.INVALID_EMAIL]: 'Invalid email format provided.',
	[LEXWARE_ERROR_CODES.INVALID_PHONE]: 'Invalid phone number format provided.',
	[LEXWARE_ERROR_CODES.INVALID_IBAN]: 'Invalid IBAN format provided.',
	[LEXWARE_ERROR_CODES.INVALID_BIC]: 'Invalid BIC format provided.',
	[LEXWARE_ERROR_CODES.INVALID_TAX_RATE]: 'Invalid tax rate provided.',
	[LEXWARE_ERROR_CODES.INVALID_CURRENCY]: 'Invalid currency code provided.',
	[LEXWARE_ERROR_CODES.INVALID_LANGUAGE]: 'Invalid language code provided.',
	
	// Business Logic Errors
	[LEXWARE_ERROR_CODES.BUSINESS_RULE_VIOLATION]: 'Business rule violation detected.',
	[LEXWARE_ERROR_CODES.INVALID_TRANSITION]: 'Invalid state transition attempted.',
	[LEXWARE_ERROR_CODES.WORKFLOW_CONSTRAINT]: 'Workflow constraint violation.',
	[LEXWARE_ERROR_CODES.DUPLICATE_ENTRY]: 'Duplicate entry detected.',
	[LEXWARE_ERROR_CODES.CIRCULAR_REFERENCE]: 'Circular reference detected.',
	
	// Rate Limiting and Throttling
	[LEXWARE_ERROR_CODES.RATE_LIMIT_EXCEEDED]: 'Rate limit exceeded. Please wait before making additional requests.',
	[LEXWARE_ERROR_CODES.THROTTLE_LIMIT_EXCEEDED]: 'Throttle limit exceeded.',
	[LEXWARE_ERROR_CODES.QUOTA_EXCEEDED]: 'Quota exceeded for this operation.',
	
	// Server and System Errors
	[LEXWARE_ERROR_CODES.INTERNAL_SERVER_ERROR]: 'Internal server error occurred.',
	[LEXWARE_ERROR_CODES.SERVICE_UNAVAILABLE]: 'Service is temporarily unavailable.',
	[LEXWARE_ERROR_CODES.MAINTENANCE_MODE]: 'Service is in maintenance mode.',
	[LEXWARE_ERROR_CODES.SYSTEM_OVERLOAD]: 'System is overloaded. Please try again later.',
	[LEXWARE_ERROR_CODES.DATABASE_ERROR]: 'Database error occurred.',
	[LEXWARE_ERROR_CODES.EXTERNAL_SERVICE_ERROR]: 'External service error occurred.',
	
	// Optimistic Locking Errors
	[LEXWARE_ERROR_CODES.VERSION_CONFLICT]: 'Version conflict detected. The resource has been modified by another process.',
	[LEXWARE_ERROR_CODES.CONCURRENT_MODIFICATION]: 'Concurrent modification detected.',
	[LEXWARE_ERROR_CODES.STALE_DATA]: 'Stale data detected. Please refresh and try again.',
	
	// File and Upload Errors
	[LEXWARE_ERROR_CODES.FILE_TOO_LARGE]: 'File size exceeds maximum allowed limit.',
	[LEXWARE_ERROR_CODES.INVALID_FILE_TYPE]: 'Invalid file type provided.',
	[LEXWARE_ERROR_CODES.FILE_CORRUPTED]: 'File appears to be corrupted.',
	[LEXWARE_ERROR_CODES.UPLOAD_FAILED]: 'File upload failed.',
	[LEXWARE_ERROR_CODES.DOWNLOAD_FAILED]: 'File download failed.',
	
	// XRechnung and E-Invoice Errors
	[LEXWARE_ERROR_CODES.XRECHNUNG_VALIDATION_FAILED]: 'XRechnung validation failed.',
	[LEXWARE_ERROR_CODES.EINVOICE_FORMAT_ERROR]: 'E-Invoice format error.',
	[LEXWARE_ERROR_CODES.COMPANY_DATA_INVALID]: 'Company data validation failed.',
	[LEXWARE_ERROR_CODES.PRINT_SETTINGS_INVALID]: 'Print settings validation failed.',
	
	// Generic Errors
	[LEXWARE_ERROR_CODES.UNKNOWN_ERROR]: 'An unknown error occurred.',
} as const;

/**
 * Lexware API Error Categories
 * Based on the official Lexware API documentation for Error Codes
 */
export const LEXWARE_ERROR_CATEGORIES = {
	AUTHENTICATION: 'authentication',
	CONNECTION: 'connection',
	RESOURCE: 'resource',
	VALIDATION: 'validation',
	BUSINESS_LOGIC: 'business_logic',
	RATE_LIMITING: 'rate_limiting',
	SERVER: 'server',
	OPTIMISTIC_LOCKING: 'optimistic_locking',
	FILE: 'file',
	XRECHNUNG: 'xrechnung',
} as const;

/**
 * Lexware API Error Severity Levels
 * Based on the official Lexware API documentation for Error Codes
 */
export const LEXWARE_ERROR_SEVERITY = {
	LOW: 'low',
	MEDIUM: 'medium',
	HIGH: 'high',
	CRITICAL: 'critical',
} as const;

/**
 * HTTP Status Codes and their meanings
 * Based on the official Lexware API documentation
 */
export const LEXWARE_HTTP_STATUS_CODES = {
	// Success responses
	OK: 200,
	CREATED: 201,
	ACCEPTED: 202,
	NO_CONTENT: 204,
	
	// Redirection responses
	MOVED_PERMANENTLY: 301,
	FOUND: 302,
	NOT_MODIFIED: 304,
	TEMPORARY_REDIRECT: 307,
	PERMANENT_REDIRECT: 308,
	
	// Client error responses
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	METHOD_NOT_ALLOWED: 405,
	NOT_ACCEPTABLE: 406,
	REQUEST_TIMEOUT: 408,
	CONFLICT: 409,
	GONE: 410,
	UNPROCESSABLE_ENTITY: 422,
	TOO_MANY_REQUESTS: 429,
	REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
	
	// Server error responses
	INTERNAL_SERVER_ERROR: 500,
	NOT_IMPLEMENTED: 501,
	BAD_GATEWAY: 502,
	SERVICE_UNAVAILABLE: 503,
	GATEWAY_TIMEOUT: 504,
	HTTP_VERSION_NOT_SUPPORTED: 505,
} as const;

/**
 * HTTP Status Code Messages
 * Based on the official Lexware API documentation
 */
export const LEXWARE_HTTP_STATUS_MESSAGES = {
	[LEXWARE_HTTP_STATUS_CODES.OK]: 'Request successful',
	[LEXWARE_HTTP_STATUS_CODES.CREATED]: 'Resource created successfully',
	[LEXWARE_HTTP_STATUS_CODES.ACCEPTED]: 'Request accepted for processing',
	[LEXWARE_HTTP_STATUS_CODES.NO_CONTENT]: 'Request successful, no content to return',
	
	[LEXWARE_HTTP_STATUS_CODES.MOVED_PERMANENTLY]: 'Resource moved permanently',
	[LEXWARE_HTTP_STATUS_CODES.FOUND]: 'Resource found at different location',
	[LEXWARE_HTTP_STATUS_CODES.NOT_MODIFIED]: 'Resource not modified since last request',
	[LEXWARE_HTTP_STATUS_CODES.TEMPORARY_REDIRECT]: 'Temporary redirect',
	[LEXWARE_HTTP_STATUS_CODES.PERMANENT_REDIRECT]: 'Permanent redirect',
	
	[LEXWARE_HTTP_STATUS_CODES.BAD_REQUEST]: 'Bad request - invalid syntax or parameters',
	[LEXWARE_HTTP_STATUS_CODES.UNAUTHORIZED]: 'Unauthorized - authentication required',
	[LEXWARE_HTTP_STATUS_CODES.FORBIDDEN]: 'Forbidden - access denied',
	[LEXWARE_HTTP_STATUS_CODES.NOT_FOUND]: 'Resource not found',
	[LEXWARE_HTTP_STATUS_CODES.METHOD_NOT_ALLOWED]: 'HTTP method not allowed for this resource',
	[LEXWARE_HTTP_STATUS_CODES.NOT_ACCEPTABLE]: 'Request not acceptable - content negotiation failed',
	[LEXWARE_HTTP_STATUS_CODES.REQUEST_TIMEOUT]: 'Request timeout',
	[LEXWARE_HTTP_STATUS_CODES.CONFLICT]: 'Conflict - resource state conflict (e.g., optimistic locking)',
	[LEXWARE_HTTP_STATUS_CODES.GONE]: 'Resource no longer available',
	[LEXWARE_HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY]: 'Unprocessable entity - validation failed',
	[LEXWARE_HTTP_STATUS_CODES.TOO_MANY_REQUESTS]: 'Too many requests - rate limit exceeded',
	[LEXWARE_HTTP_STATUS_CODES.REQUEST_HEADER_FIELDS_TOO_LARGE]: 'Request header fields too large',
	
	[LEXWARE_HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR]: 'Internal server error',
	[LEXWARE_HTTP_STATUS_CODES.NOT_IMPLEMENTED]: 'Method not implemented',
	[LEXWARE_HTTP_STATUS_CODES.BAD_GATEWAY]: 'Bad gateway',
	[LEXWARE_HTTP_STATUS_CODES.SERVICE_UNAVAILABLE]: 'Service unavailable',
	[LEXWARE_HTTP_STATUS_CODES.GATEWAY_TIMEOUT]: 'Gateway timeout',
	[LEXWARE_HTTP_STATUS_CODES.HTTP_VERSION_NOT_SUPPORTED]: 'HTTP version not supported',
} as const;

/**
 * HTTP Status Code Categories
 * Based on the official Lexware API documentation
 */
export const LEXWARE_HTTP_STATUS_CATEGORIES = {
	SUCCESS: '2xx',
	REDIRECTION: '3xx',
	CLIENT_ERROR: '4xx',
	SERVER_ERROR: '5xx',
} as const;

/**
 * HTTP Status Code Ranges
 * Based on the official Lexware API documentation
 */
export const LEXWARE_HTTP_STATUS_RANGES = {
	SUCCESS: [200, 299],
	REDIRECTION: [300, 399],
	CLIENT_ERROR: [400, 499],
	SERVER_ERROR: [500, 599],
} as const;

export const LEXWARE_EVENT_TYPES = {
	// Voucher events
	VOUCHER_CREATED: 'voucher.created',
	VOUCHER_CHANGED: 'voucher.changed',
	VOUCHER_DELETED: 'voucher.deleted',
	VOUCHER_STATUS_CHANGED: 'voucher.status.changed',
	
	// Invoice events
	INVOICE_CREATED: 'invoice.created',
	INVOICE_CHANGED: 'invoice.changed',
	INVOICE_STATUS_CHANGED: 'invoice.status.changed',
	INVOICE_PAID: 'invoice.paid',
	INVOICE_OVERDUE: 'invoice.overdue',
	
	// Quotation events
	QUOTATION_CREATED: 'quotation.created',
	QUOTATION_CHANGED: 'quotation.changed',
	QUOTATION_STATUS_CHANGED: 'quotation.status.changed',
	QUOTATION_ACCEPTED: 'quotation.accepted',
	QUOTATION_REJECTED: 'quotation.rejected',
	
	// Credit note events
	CREDIT_NOTE_CREATED: 'credit-note.created',
	CREDIT_NOTE_CHANGED: 'credit-note.changed',
	CREDIT_NOTE_STATUS_CHANGED: 'credit-note.status.changed',
	
	// Delivery note events
	DELIVERY_NOTE_CREATED: 'delivery-note.created',
	DELIVERY_NOTE_CHANGED: 'delivery-note.changed',
	DELIVERY_NOTE_STATUS_CHANGED: 'delivery-note.status.changed',
	DELIVERY_NOTE_DELIVERED: 'delivery-note.delivered',
	
	// Order confirmation events
	ORDER_CONFIRMATION_CREATED: 'order-confirmation.created',
	ORDER_CONFIRMATION_CHANGED: 'order-confirmation.changed',
	ORDER_CONFIRMATION_STATUS_CHANGED: 'order-confirmation.status.changed',
	
	// Dunning events
	DUNNING_CREATED: 'dunning.created',
	DUNNING_CHANGED: 'dunning.changed',
	DUNNING_STATUS_CHANGED: 'dunning.status.changed',
	DUNNING_LEVEL_CHANGED: 'dunning.level.changed',
	
	// Contact events
	CONTACT_CREATED: 'contact.created',
	CONTACT_CHANGED: 'contact.changed',
	CONTACT_DELETED: 'contact.deleted',
	
	// Article events
	ARTICLE_CREATED: 'article.created',
	ARTICLE_CHANGED: 'article.changed',
	ARTICLE_DELETED: 'article.deleted',
	
	// File events
	FILE_UPLOADED: 'file.uploaded',
	FILE_DELETED: 'file.deleted',
	
	// Payment events
	PAYMENT_RECEIVED: 'payment.received',
	PAYMENT_PROCESSED: 'payment.processed',
	
	// System events
	SUBSCRIPTION_CREATED: 'subscription.created',
	SUBSCRIPTION_CHANGED: 'subscription.changed',
	SUBSCRIPTION_DELETED: 'subscription.deleted',
	SUBSCRIPTION_EXPIRED: 'subscription.expired',
	SUBSCRIPTION_VERIFIED: 'subscription.verified',
} as const;

export const LEXWARE_WEBHOOK_SECURITY = {
	VERIFICATION_HEADER: 'X-Lexware-Signature',
	VERIFICATION_ALGORITHM: 'sha256',
	RETRY_HEADERS: {
		RETRY_COUNT: 'X-Lexware-Retry-Count',
		RETRY_AFTER: 'X-Lexware-Retry-After',
		DELIVERY_ID: 'X-Lexware-Delivery-Id',
	},
} as const;

export const LEXWARE_FILE_TYPES = {
	// Document types
	INVOICE: 'invoice',
	CREDIT_NOTE: 'credit_note',
	QUOTATION: 'quotation',
	DELIVERY_NOTE: 'delivery_note',
	DUNNING: 'dunning',
	ORDER_CONFIRMATION: 'order_confirmation',
	
	// Receipt and voucher types
	RECEIPT: 'receipt',
	VOUCHER: 'voucher',
	BOOKKEEPING: 'bookkeeping',
	
	// E-invoice formats
	EINVOICE_XRECHNUNG: 'einvoice_xrechnung',
	EINVOICE_ZUGFERD: 'einvoice_zugferd',
	EINVOICE_XML: 'einvoice_xml',
	
	// Image and media types
	IMAGE: 'image',
	SCAN: 'scan',
	PHOTO: 'photo',
	PDF: 'pdf',
	
	// Other types
	CONTRACT: 'contract',
	LETTER: 'letter',
	OTHER: 'other',
} as const;

export const LEXWARE_FILE_CATEGORIES = {
	// Business documents
	SALES: 'sales',
	PURCHASE: 'purchase',
	FINANCIAL: 'financial',
	ADMINISTRATIVE: 'administrative',
	
	// Document types
	INVOICES: 'invoices',
	RECEIPTS: 'receipts',
	CONTRACTS: 'contracts',
	CORRESPONDENCE: 'correspondence',
	
	// Media types
	IMAGES: 'images',
	SCANS: 'scans',
	DOCUMENTS: 'documents',
	ARCHIVES: 'archives',
} as const;

export const LEXWARE_FILE_ACCESS_LEVELS = {
	PRIVATE: 'private',
	PUBLIC: 'public',
	RESTRICTED: 'restricted',
} as const;

export const LEXWARE_FILE_PROCESSING_STATUSES = {
	PENDING: 'pending',
	PROCESSING: 'processing',
	COMPLETED: 'completed',
	FAILED: 'failed',
} as const;

export const LEXWARE_FILE_CHECKSUM_ALGORITHMS = {
	MD5: 'md5',
	SHA1: 'sha1',
	SHA256: 'sha256',
} as const;

export const LEXWARE_SUPPORTED_CONTENT_TYPES = {
	// Images
	JPEG: 'image/jpeg',
	PNG: 'image/png',
	GIF: 'image/gif',
	TIFF: 'image/tiff',
	WEBP: 'image/webp',
	
	// Documents
	PDF: 'application/pdf',
	DOC: 'application/msword',
	DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	XLS: 'application/vnd.ms-excel',
	XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	
	// E-invoices
	XML: 'application/xml',
	ZUGFERD: 'application/vnd.etsi.zugferd+xml',
	XRECHNUNG: 'application/vnd.etsi.xrechnung+xml',
	
	// Archives
	ZIP: 'application/zip',
	RAR: 'application/x-rar-compressed',
	SEVEN_ZIP: 'application/x-7z-compressed',
} as const;



export const LEXWARE_COUNTRY_PROPERTIES = {
	EU_MEMBER: 'euMember',
	TAX_CLASSIFICATION: 'taxClassification',
	XRECHNUNG_SUPPORT: 'supportsXRechnung',
	DISTANCE_SALES: 'supportsDistanceSales',
	CURRENCY: 'currency',
	LANGUAGE: 'language',
	TIMEZONE: 'timezone',
	PHONE_CODE: 'phoneCode',
	POSTAL_CODE_FORMAT: 'postalCodeFormat',
	DATE_FORMAT: 'dateFormat',
	NUMBER_FORMAT: 'numberFormat',
} as const;

export const LEXWARE_COUNTRY_FILTERS = {
	EU: 'eu',
	TAX_TYPE: 'taxType',
	VALID_TAX_RATES: 'validTaxRates',
	XRECHNUNG: 'xrechnung',
	DISTANCE_SALES: 'distanceSales',
	DATE: 'date',
} as const;

export const LEXWARE_COMMON_COUNTRY_CODES = {
	GERMANY: 'DE',
	AUSTRIA: 'AT',
	SWITZERLAND: 'CH',
	FRANCE: 'FR',
	ITALY: 'IT',
	SPAIN: 'ES',
	NETHERLANDS: 'NL',
	BELGIUM: 'BE',
	LUXEMBOURG: 'LU',
	UNITED_STATES: 'US',
	UNITED_KINGDOM: 'GB',
	CANADA: 'CA',
	AUSTRALIA: 'AU',
	JAPAN: 'JP',
	CHINA: 'CN',
	INDIA: 'IN',
	BRAZIL: 'BR',
	MEXICO: 'MX',
	RUSSIA: 'RU',
	SOUTH_AFRICA: 'ZA',
} as const;

export const LEXWARE_PAYMENT_ITEM_TYPES = {
	RECEIVABLE: 'receivable',
	PAYABLE: 'payable',
	IRRECOVERABLE_RECEIVABLE: 'irrecoverableReceivable',
} as const;

export const LEXWARE_POSTING_CATEGORY_TYPES = {
	INCOME: 'income',
	EXPENSE: 'expense',
	ASSET: 'asset',
	LIABILITY: 'liability',
	EQUITY: 'equity',
} as const;

export const LEXWARE_POSTING_CATEGORY_STATUSES = {
	ACTIVE: 'active',
	INACTIVE: 'inactive',
	ARCHIVED: 'archived',
} as const;

export const LEXWARE_PRINT_LAYOUT_TYPES = {
	INVOICE: 'invoice',
	QUOTATION: 'quotation',
	ORDER_CONFIRMATION: 'orderConfirmation',
	DELIVERY_NOTE: 'deliveryNote',
	CREDIT_NOTE: 'creditNote',
	DUNNING: 'dunning',
	DOWN_PAYMENT_INVOICE: 'downPaymentInvoice',
	RECEIPT: 'receipt',
	REMINDER: 'reminder',
	CONFIRMATION: 'confirmation',
} as const;

export const LEXWARE_PRINT_LAYOUT_STATUSES = {
	ACTIVE: 'active',
	INACTIVE: 'inactive',
	ARCHIVED: 'archived',
	DRAFT: 'draft',
} as const;

export const LEXWARE_PRINT_LAYOUT_FORMATS = {
	PDF: 'pdf',
	HTML: 'html',
	XML: 'xml',
	JSON: 'json',
} as const;

export const LEXWARE_PROFILE_ORGANIZATION_TYPES = {
	BUSINESS: 'business',
	FREELANCER: 'freelancer',
	ASSOCIATION: 'association',
	OTHER: 'other',
} as const;

export const LEXWARE_PROFILE_ORGANIZATION_SIZES = {
	MICRO: 'micro',
	SMALL: 'small',
	MEDIUM: 'medium',
	LARGE: 'large',
} as const;

export const LEXWARE_PROFILE_USER_STATUSES = {
	ACTIVE: 'active',
	INACTIVE: 'inactive',
	SUSPENDED: 'suspended',
} as const;

export const LEXWARE_PROFILE_SUBSCRIPTION_PLAN_TYPES = {
	FREE: 'free',
	BASIC: 'basic',
	PROFESSIONAL: 'professional',
	ENTERPRISE: 'enterprise',
	CUSTOM: 'custom',
} as const;

export const LEXWARE_PROFILE_SUBSCRIPTION_STATUSES = {
	ACTIVE: 'active',
	TRIAL: 'trial',
	EXPIRED: 'expired',
	CANCELLED: 'cancelled',
	SUSPENDED: 'suspended',
} as const;

export const LEXWARE_PROFILE_SUBSCRIPTION_BILLING_CYCLES = {
	MONTHLY: 'monthly',
	QUARTERLY: 'quarterly',
	YEARLY: 'yearly',
} as const;

export const LEXWARE_PROFILE_SYSTEM_ENVIRONMENTS = {
	DEVELOPMENT: 'development',
	STAGING: 'staging',
	PRODUCTION: 'production',
} as const;

export const LEXWARE_QUOTATION_STATUSES = {
	DRAFT: 'draft',
	OPEN: 'open',
	ACCEPTED: 'accepted',
	REJECTED: 'rejected',
	EXPIRED: 'expired',
	CANCELLED: 'cancelled',
} as const;

export const LEXWARE_QUOTATION_TYPES = {
	STANDARD: 'standard',
	PROPOSAL: 'proposal',
	ESTIMATE: 'estimate',
	TENDER: 'tender',
	REQUEST: 'request',
} as const;

export const LEXWARE_QUOTATION_PRIORITIES = {
	LOW: 'low',
	MEDIUM: 'medium',
	HIGH: 'high',
	URGENT: 'urgent',
} as const;

export const LEXWARE_QUOTATION_APPROVAL_STATUSES = {
	PENDING: 'pending',
	APPROVED: 'approved',
	REJECTED: 'rejected',
} as const;

export const LEXWARE_QUOTATION_REMINDER_FREQUENCIES = {
	DAILY: 'daily',
	WEEKLY: 'weekly',
	MONTHLY: 'monthly',
} as const;

export const LEXWARE_QUOTATION_LINE_ITEM_TYPES = {
	CUSTOM: 'custom',
	MATERIAL: 'material',
	SERVICE: 'service',
	TEXT: 'text',
	DISCOUNT: 'discount',
	SHIPPING: 'shipping',
} as const;

export const LEXWARE_QUOTATION_AVAILABILITY_STATUSES = {
	IN_STOCK: 'inStock',
	LOW_STOCK: 'lowStock',
	OUT_OF_STOCK: 'outOfStock',
	PRE_ORDER: 'preOrder',
} as const;

export const LEXWARE_QUOTATION_LEAD_TIME_UNITS = {
	DAYS: 'days',
	WEEKS: 'weeks',
	MONTHS: 'months',
} as const;

export const LEXWARE_RECURRING_TEMPLATE_TYPES = {
	INVOICE: 'invoice',
	QUOTATION: 'quotation',
	ORDER_CONFIRMATION: 'orderConfirmation',
	DELIVERY_NOTE: 'deliveryNote',
} as const;

export const LEXWARE_RECURRING_TEMPLATE_STATUSES = {
	ACTIVE: 'active',
	INACTIVE: 'inactive',
	DRAFT: 'draft',
	ARCHIVED: 'archived',
} as const;

export const LEXWARE_RECURRING_TEMPLATE_RECURRENCE_TYPES = {
	DAILY: 'daily',
	WEEKLY: 'weekly',
	MONTHLY: 'monthly',
	QUARTERLY: 'quarterly',
	YEARLY: 'yearly',
	CUSTOM: 'custom',
} as const;

export const LEXWARE_RECURRING_TEMPLATE_DAYS_OF_WEEK = {
	MONDAY: 1,
	TUESDAY: 2,
	WEDNESDAY: 3,
	THURSDAY: 4,
	FRIDAY: 5,
	SATURDAY: 6,
	SUNDAY: 7,
} as const;

export const LEXWARE_RECURRING_TEMPLATE_WEEKS_OF_MONTH = {
	FIRST: 1,
	SECOND: 2,
	THIRD: 3,
	FOURTH: 4,
	LAST: 5,
} as const;
