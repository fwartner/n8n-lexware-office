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
	EVENT_SUBSCRIPTIONS: '/v1/event-subscriptions',
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
	EVENT_SUBSCRIPTION: 'eventSubscription',
} as const;

export const LEXWARE_OPERATIONS = {
	CREATE: 'create',
	GET: 'get',
	GET_ALL: 'getAll',
	UPDATE: 'update',
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

export const LEXWARE_QUOTATION_STATUSES = {
	DRAFT: 'draft',
	OPEN: 'open',
	ACCEPTED: 'accepted',
	REJECTED: 'rejected',
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
