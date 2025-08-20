export const LEXWARE_API_ENDPOINTS = {
	CONTACTS: '/v1/contacts',
	ARTICLES: '/v1/articles',
	VOUCHERS: '/v1/vouchers',
	VOUCHER_LIST: '/v1/voucherlist',
	INVOICES: '/v1/invoices',
	QUOTATIONS: '/v1/quotations',
	CREDIT_NOTES: '/v1/credit-notes',
	DELIVERY_NOTES: '/v1/delivery-notes',
	DUNNINGS: '/v1/dunnings',
	FILES: '/v1/files',
	PROFILE: '/v1/profile',
	COUNTRIES: '/v1/countries',
	PAYMENT_CONDITIONS: '/v1/payment-conditions',
	EVENT_SUBSCRIPTIONS: '/v1/event-subscriptions',
} as const;

export const LEXWARE_RESOURCE_TYPES = {
	CONTACT: 'contact',
	ARTICLE: 'article',
	VOUCHER: 'voucher',
	INVOICE: 'invoice',
	QUOTATION: 'quotation',
	CREDIT_NOTE: 'creditNote',
	DELIVERY_NOTE: 'deliveryNote',
	DUNNING: 'dunning',
	FILE: 'file',
	PROFILE: 'profile',
	COUNTRY: 'country',
	PAYMENT_CONDITION: 'paymentCondition',
	EVENT_SUBSCRIPTION: 'eventSubscription',
} as const;

export const LEXWARE_OPERATIONS = {
	CREATE: 'create',
	GET: 'get',
	GET_ALL: 'getAll',
	UPDATE: 'update',
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
} as const;

export const LEXWARE_CONTACT_TYPES = {
	COMPANY: 'company',
	PERSON: 'person',
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
} as const;

export const LEXWARE_QUOTATION_STATUSES = {
	DRAFT: 'draft',
	OPEN: 'open',
	ACCEPTED: 'accepted',
	REJECTED: 'rejected',
} as const;

export const LEXWARE_CREDIT_NOTE_STATUSES = {
	DRAFT: 'draft',
	OPEN: 'open',
	VOIDED: 'voided',
} as const;

export const LEXWARE_DELIVERY_NOTE_STATUSES = {
	DRAFT: 'draft',
	OPEN: 'open',
	DELIVERED: 'delivered',
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
