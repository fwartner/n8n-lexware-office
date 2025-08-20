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
	FINALIZE: 'finalize',
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
