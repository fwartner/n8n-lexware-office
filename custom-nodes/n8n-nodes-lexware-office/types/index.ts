export interface ILexwareCredentials {
	apiKey: string;
	resourceUrl: string;
}

export interface ILexwareContact {
	id?: string;
	version: number;
	roles: {
		customer?: boolean;
		vendor?: boolean;
		employee?: boolean;
	};
	company?: {
		name: string;
		contactPersons?: Array<{
			salutation?: string;
			firstName?: string;
			lastName: string;
			primary?: boolean;
		}>;
		vatId?: string;
		taxNumber?: string;
		commercialRegisterNumber?: string;
		commercialRegisterCourt?: string;
	};
	person?: {
		salutation?: string;
		firstName: string;
		lastName: string;
		title?: string;
		birthday?: string;
	};
	note?: string;
	addresses: Array<{
		type?: 'billing' | 'shipping';
		countryCode: string;
		street?: string;
		zipCode?: string;
		city?: string;
		address?: string;
		addressAddition?: string;
		state?: string;
		primary?: boolean;
	}>;
	phoneNumbers?: {
		private?: string[];
		business?: string[];
		mobile?: string[];
		fax?: string[];
		other?: string[];
	};
	emailAddresses?: {
		business?: string[];
		office?: string[];
		private?: string[];
		other?: string[];
	};
	bankAccounts?: Array<{
		accountHolder?: string;
		iban?: string;
		bic?: string;
		bankName?: string;
		accountNumber?: string;
		bankCode?: string;
		primary?: boolean;
	}>;
	taxSettings?: {
		taxNumber?: string;
		vatId?: string;
		taxType?: string;
		taxRate?: number;
		smallBusiness?: boolean;
	};
	shippingSettings?: {
		shippingType?: string;
		shippingCosts?: number;
		shippingConditions?: string;
	};
	paymentSettings?: {
		paymentTerms?: number;
		paymentMethod?: string;
		discountPercentage?: number;
		discountType?: 'percentage' | 'amount';
	};
	archived?: boolean;
	createdAt?: string;
	updatedAt?: string;
}

export interface ILexwareArticle {
	id?: string;
	version?: number;
	title: string;
	type: 'service' | 'material' | 'custom';
	unitName: string;
	price: {
		netPrice?: number;
		grossPrice?: number;
		leadingPrice: 'NET' | 'GROSS';
		taxRate: number;
		currency?: string;
	};
	description?: string;
	note?: string;
	archived?: boolean;
	createdAt?: string;
	updatedAt?: string;
	// Additional properties from the official API
	articleNumber?: string;
	categoryId?: string;
	weight?: number;
	dimensions?: {
		length?: number;
		width?: number;
		height?: number;
	};
	shippingInfo?: {
		shippingType?: string;
		shippingCosts?: number;
	};
	taxInfo?: {
		taxType?: string;
		taxRate?: number;
		smallBusiness?: boolean;
	};
}

export interface ILexwareVoucher {
	id?: string;
	voucherType: string;
	voucherDate: string;
	voucherNumber?: string;
	contactId?: string;
	contactName?: string;
	lineItems?: Array<{
		id?: string;
		type: 'custom' | 'material' | 'service' | 'text';
		name: string;
		quantity?: number;
		unitName?: string;
		unitPrice?: {
			currency: string;
			netAmount?: number;
			grossAmount?: number;
			taxRatePercentage: number;
		};
	}>;
	taxConditions?: {
		taxType: string;
	};
	shippingConditions?: {
		shippingType: string;
	};
	totalAmount?: number;
	openAmount?: number;
	currency?: string;
	archived?: boolean;
}

export interface ILexwareInvoice extends ILexwareVoucher {
	// Invoice specific status
	invoiceStatus?: 'draft' | 'open' | 'paid' | 'voided' | 'overdue' | 'partially_paid';
	dueDate?: string;
	
	// Enhanced properties from the official API
	version?: number;
	organizationId?: string;
	createdAt?: string;
	updatedAt?: string;
	
	// Invoice specific properties
	invoiceNumber?: string;
	invoiceDate?: string;
	deliveryDate?: string;
	shippingDate?: string;
	
	// Payment and financial information
	paymentConditions?: {
		paymentTerms?: number;
		paymentTermsLabel?: string;
		paymentTermsLabelTemplate?: string;
		dueDate?: string;
		discountPercentage?: number;
		discountDays?: number;
	};
	
	// Enhanced tax conditions
	taxConditions?: {
		taxType: string;
		taxRate?: number;
		taxSubType?: string;
		taxAmount?: number;
		netAmount?: number;
		grossAmount?: number;
	};
	
	// Shipping and delivery
	shippingConditions?: {
		shippingType: string;
		shippingCosts?: number;
		shippingDate?: string;
		deliveryTerms?: string;
		shippingAddress?: {
			street?: string;
			zipCode?: string;
			city?: string;
			country?: string;
		};
	};
	
	// Enhanced line items
	lineItems?: Array<{
		id?: string;
		type: 'custom' | 'material' | 'service' | 'text';
		name: string;
		description?: string;
		quantity?: number;
		unitName?: string;
		unitPrice?: {
			currency: string;
			netAmount?: number;
			grossAmount?: number;
			taxRatePercentage: number;
		};
		totalPrice?: {
			currency: string;
			netAmount?: number;
			grossAmount?: number;
			taxAmount?: number;
		};
		articleId?: string;
		articleNumber?: string;
		discountPercentage?: number;
		discountAmount?: number;
	}>;
	
	// Additional invoice properties
	note?: string;
	title?: string;
	language?: string;
	currency?: string;
	
	// Financial calculations
	totalNetAmount?: number;
	totalGrossAmount?: number;
	totalTaxAmount?: number;
	totalDiscountAmount?: number;
	totalShippingAmount?: number;
	
	// Related vouchers and references
	relatedVouchers?: Array<{
		id: string;
		type: string;
		number?: string;
		relationship?: string;
	}>;
	
	// Print and document settings
	printLayoutId?: string;
	documentLanguage?: string;
	
	// XRechnung and e-invoice support
	isXRechnung?: boolean;
	xrechnungVersion?: string;
	xrechnungProfile?: string;
	
	// Distance sales support
	distanceSalesPrinciple?: string;
	euDestinationCountry?: string;
	
	// Recurring invoice support
	recurringTemplateId?: string;
	isRecurring?: boolean;
	recurringInterval?: string;
	
	// Closing invoice support
	closingInvoiceId?: string;
	closingInvoiceNumber?: string;
	isClosingInvoice?: boolean;
	
	// Additional metadata
	tags?: string[];
	customFields?: Record<string, any>;
}

export interface ILexwareDownPaymentInvoice extends ILexwareVoucher {
	downPaymentInvoiceStatus?: 'draft' | 'open' | 'paid' | 'voided';
	closingInvoiceId?: string;
	closingInvoiceNumber?: string;
	downPaymentPercentage?: number;
	downPaymentAmount?: number;
	remainingAmount?: number;
	// Additional properties from the official API
	version?: number;
	organizationId?: string;
	createdAt?: string;
	updatedAt?: string;
	// Down payment specific properties
	downPaymentInvoiceNumber?: string;
	originalInvoiceId?: string;
	originalInvoiceNumber?: string;
	// Payment and tax information
	paymentConditions?: {
		paymentTerms?: number;
		paymentTermsLabel?: string;
		paymentTermsLabelTemplate?: string;
	};
	taxConditions?: {
		taxType: string;
		taxRate?: number;
		taxSubType?: string;
	};
	// Line items with enhanced properties
	lineItems?: Array<{
		id?: string;
		type: 'custom' | 'material' | 'service' | 'text';
		name: string;
		description?: string;
		quantity?: number;
		unitName?: string;
		unitPrice?: {
			currency: string;
			netAmount?: number;
			grossAmount?: number;
			taxRatePercentage: number;
		};
		totalPrice?: {
			currency: string;
			netAmount?: number;
			grossAmount?: number;
			taxAmount?: number;
		};
		articleId?: string;
		articleNumber?: string;
	}>;
	// Additional voucher properties
	note?: string;
	title?: string;
	language?: string;
	// Related vouchers
	relatedVouchers?: Array<{
		id: string;
		type: string;
		number?: string;
	}>;
	// Print layout
	printLayoutId?: string;
	// Distance sales support
	distanceSalesPrinciple?: string;
}

export interface ILexwareQuotation extends ILexwareVoucher {
	quotationStatus?: 'draft' | 'open' | 'accepted' | 'rejected';
	validUntil?: string;
}

export interface ILexwareOrderConfirmation extends ILexwareVoucher {
	// Order confirmation specific status
	orderConfirmationStatus?: 'draft' | 'open' | 'confirmed' | 'cancelled' | 'completed';
	validUntil?: string;
	
	// Enhanced properties from the official API
	version?: number;
	organizationId?: string;
	createdAt?: string;
	updatedAt?: string;
	
	// Order confirmation specific properties
	orderConfirmationNumber?: string;
	orderConfirmationDate?: string;
	deliveryDate?: string;
	shippingDate?: string;
	
	// Payment and financial information
	paymentConditions?: {
		paymentTerms?: number;
		paymentTermsLabel?: string;
		paymentTermsLabelTemplate?: string;
		dueDate?: string;
		discountPercentage?: number;
		discountDays?: number;
	};
	
	// Enhanced tax conditions
	taxConditions?: {
		taxType: string;
		taxRate?: number;
		taxSubType?: string;
		taxAmount?: number;
		netAmount?: number;
		grossAmount?: number;
	};
	
	// Shipping and delivery
	shippingConditions?: {
		shippingType: string;
		shippingCosts?: number;
		shippingDate?: string;
		deliveryTerms?: string;
		shippingAddress?: {
			street?: string;
			zipCode?: string;
			city?: string;
			country?: string;
		};
	};
	
	// Enhanced line items
	lineItems?: Array<{
		id?: string;
		type: 'custom' | 'material' | 'service' | 'text';
		name: string;
		description?: string;
		quantity?: number;
		unitName?: string;
		unitPrice?: {
			currency: string;
			netAmount?: number;
			grossAmount?: number;
			taxRatePercentage: number;
		};
		totalPrice?: {
			currency: string;
			netAmount?: number;
			grossAmount?: number;
			taxAmount?: number;
		};
		articleId?: string;
		articleNumber?: string;
		discountPercentage?: number;
		discountAmount?: number;
	}>;
	
	// Additional order confirmation properties
	note?: string;
	title?: string;
	language?: string;
	currency?: string;
	
	// Financial calculations
	totalNetAmount?: number;
	totalGrossAmount?: number;
	totalTaxAmount?: number;
	totalDiscountAmount?: number;
	totalShippingAmount?: number;
	
	// Related vouchers and references
	relatedVouchers?: Array<{
		id: string;
		type: string;
		number?: string;
		relationship?: string;
	}>;
	
	// Print and document settings
	printLayoutId?: string;
	documentLanguage?: string;
	
	// XRechnung and e-invoice support
	isXRechnung?: boolean;
	xrechnungVersion?: string;
	xrechnungProfile?: string;
	
	// Distance sales support
	distanceSalesPrinciple?: string;
	euDestinationCountry?: string;
	
	// Recurring order confirmation support
	recurringTemplateId?: string;
	isRecurring?: boolean;
	recurringInterval?: string;
	
	// Additional metadata
	tags?: string[];
	customFields?: Record<string, any>;
}

export interface ILexwareCreditNote extends ILexwareVoucher {
	creditNoteStatus?: 'draft' | 'open' | 'voided';
	precedingSalesVoucherId?: string;
	// Additional properties from the Lexware API documentation
	version?: number;
	organizationId?: string;
	createdAt?: string;
	updatedAt?: string;
	// Credit note specific properties
	creditNoteNumber?: string;
	originalInvoiceId?: string;
	originalInvoiceNumber?: string;
	// Payment and tax information
	paymentConditions?: {
		paymentTerms?: number;
		paymentTermsLabel?: string;
	};
	taxConditions?: {
		taxType: string;
		taxRate?: number;
		taxSubType?: string;
	};
	// Line items with enhanced properties
	lineItems?: Array<{
		id?: string;
		type: 'custom' | 'material' | 'service' | 'text';
		name: string;
		description?: string;
		quantity?: number;
		unitName?: string;
		unitPrice?: {
			currency: string;
			netAmount?: number;
			grossAmount?: number;
			taxRatePercentage: number;
		};
		totalPrice?: {
			currency: string;
			netAmount?: number;
			grossAmount?: number;
			taxAmount?: number;
		};
		articleId?: string;
		articleNumber?: string;
	}>;
	// Additional voucher properties
	note?: string;
	title?: string;
	language?: string;
	// Related vouchers
	relatedVouchers?: Array<{
		id: string;
		type: string;
		number?: string;
	}>;
	// Print layout
	printLayoutId?: string;
}

export interface ILexwareDeliveryNote extends ILexwareVoucher {
	deliveryNoteStatus?: 'draft' | 'open' | 'delivered';
	deliveryDate?: string;
	deliveryConditions?: {
		deliveryType?: string;
		deliveryDate?: string;
		shippingDate?: string;
		deliveryAddress?: {
			type?: 'billing' | 'shipping';
			countryCode: string;
			street?: string;
			zipCode?: string;
			city?: string;
			address?: string;
			addressAddition?: string;
			state?: string;
		};
	};
	paymentTerms?: {
		paymentTermsId?: string;
		paymentTermsLabel?: string;
		paymentTermsLabelTemplate?: string;
		discountPercentage?: number;
		discountType?: 'percentage' | 'amount';
	};
	relatedVouchers?: Array<{
		id: string;
		type: string;
		number?: string;
	}>;
	language?: 'de' | 'en';
	archived?: boolean;
	createdDate?: string;
	updatedDate?: string;
}

export interface ILexwareDunning extends ILexwareVoucher {
	dunningStatus?: 'draft' | 'open' | 'paid' | 'voided';
	dunningLevel?: number;
	precedingSalesVoucherId?: string;
}

export interface ILexwareFile {
	id?: string;
	voucherId?: string;
	type?: string;
	fileName?: string;
	fileSize?: number;
	contentType?: string;
	// Enhanced properties from the official API
	version?: number;
	organizationId?: string;
	createdAt?: string;
	updatedAt?: string;
	// File metadata
	description?: string;
	tags?: string[];
	category?: string;
	// File content and format
	encoding?: string;
	checksum?: string;
	checksumAlgorithm?: 'md5' | 'sha1' | 'sha256';
	// File associations
	contactId?: string;
	articleId?: string;
	// File status and permissions
	isPublic?: boolean;
	isArchived?: boolean;
	accessLevel?: 'private' | 'public' | 'restricted';
	// File processing
	processingStatus?: 'pending' | 'processing' | 'completed' | 'failed';
	processingError?: string;
	// E-invoice support (XML format)
	isEInvoice?: boolean;
	eInvoiceFormat?: 'xrechnung' | 'zugferd' | 'other';
	eInvoiceVersion?: string;
	// File relationships
	parentFileId?: string;
	relatedFiles?: string[];
	// Download and access
	downloadUrl?: string;
	previewUrl?: string;
	thumbnailUrl?: string;
	// File validation
	isValid?: boolean;
	validationErrors?: string[];
	// Custom metadata
	customFields?: Record<string, any>;
}

export interface ILexwareProfile {
	userEmail: string;
	userId?: string;
	companyName?: string;
	organizationId?: string;
}

export interface ILexwareCountry {
	code: string;
	name: string;
	taxClassification?: {
		taxType?: string;
		taxRate?: number;
		taxSubType?: string;
		validFrom?: string;
		validTo?: string;
	};
	euMember?: boolean;
	supportsXRechnung?: boolean;
	supportsDistanceSales?: boolean;
	currency?: string;
	language?: string;
	timezone?: string;
	phoneCode?: string;
	postalCodeFormat?: string;
	dateFormat?: string;
	numberFormat?: string;
}

export interface ILexwarePaymentCondition {
	id: string;
	name: string;
	description?: string;
	paymentTerms?: number;
}

export interface ILexwarePayment {
	// Payment identification
	id?: string;
	version?: number;
	organizationId?: string;
	createdAt?: string;
	updatedAt?: string;
	
	// Payment details
	paymentNumber?: string;
	paymentDate?: string;
	paidDate?: string;
	amount?: number;
	currency?: string;
	
	// Payment type and status
	paymentType?: 'incoming' | 'outgoing';
	paymentStatus?: 'pending' | 'completed' | 'failed' | 'cancelled';
	paymentMethod?: string;
	
	// Related entities
	contactId?: string;
	contactName?: string;
	voucherId?: string;
	voucherType?: string;
	voucherNumber?: string;
	
	// Payment items
	paymentItems?: Array<{
		id?: string;
		type: 'receivable' | 'payable' | 'irrecoverableReceivable';
		amount: number;
		currency: string;
		description?: string;
		voucherId?: string;
		voucherType?: string;
		voucherNumber?: string;
		lineItemId?: string;
		taxAmount?: number;
		discountAmount?: number;
		netAmount?: number;
		grossAmount?: number;
	}>;
	
	// Bank account information
	bankAccount?: {
		accountHolder?: string;
		iban?: string;
		bic?: string;
		bankName?: string;
		accountNumber?: string;
		bankCode?: string;
	};
	
	// Additional metadata
	note?: string;
	tags?: string[];
	customFields?: Record<string, any>;
	
	// Transaction details
	transactionId?: string;
	reference?: string;
	clearingDate?: string;
	
	// Tax and financial information
	taxAmount?: number;
	discountAmount?: number;
	netAmount?: number;
	grossAmount?: number;
	
	// Exchange rate information
	exchangeRate?: number;
	originalCurrency?: string;
	originalAmount?: number;
}

export interface ILexwareEventSubscription {
	id: string;
	eventType: string;
	url: string;
	active: boolean;
	createdAt: string;
	// Enhanced properties from the official API
	version?: number;
	organizationId?: string;
	updatedAt?: string;
	// Webhook callback properties
	webhookUrl?: string;
	secret?: string;
	headers?: Record<string, string>;
	// Event subscription details
	description?: string;
	eventFilter?: {
		voucherType?: string;
		voucherStatus?: string;
		contactId?: string;
		dateFrom?: string;
		dateTo?: string;
	};
	// Retry and delivery settings
	retryCount?: number;
	maxRetries?: number;
	retryDelay?: number;
	lastDeliveryAttempt?: string;
	lastDeliveryStatus?: 'success' | 'failed' | 'pending';
	lastDeliveryResponse?: {
		statusCode: number;
		responseBody?: string;
		errorMessage?: string;
	};
	// Subscription metadata
	tags?: string[];
	priority?: 'low' | 'normal' | 'high';
	expiresAt?: string;
	// Verification and security
	verificationToken?: string;
	isVerified?: boolean;
	verificationDate?: string;
}

export interface ILexwareApiResponse<T> {
	data: T;
	status: number;
	message?: string;
}

export interface ILexwarePaginationParams {
	size?: number;
	page?: number;
	sort?: string;
}

export interface ILexwareVoucherListParams extends ILexwarePaginationParams {
	voucherType?: string;
	voucherStatus?: string;
	archived?: boolean;
	contactId?: string;
	voucherDateFrom?: string;
	voucherDateTo?: string;
	createdDateFrom?: string;
	createdDateTo?: string;
	updatedDateFrom?: string;
	updatedDateTo?: string;
	voucherNumber?: string;
}

export type LexwareResource = 
	| 'contact'
	| 'article'
	| 'voucher'
	| 'invoice'
	| 'downPaymentInvoice'
	| 'quotation'
	| 'creditNote'
	| 'deliveryNote'
	| 'dunning'
	| 'file'
	| 'profile'
	| 'country'
	| 'paymentCondition'
	| 'payment'
	| 'eventSubscription';

export type LexwareOperation = 'create' | 'get' | 'getAll' | 'update';

export interface ILexwareNodeParameters {
	resource: LexwareResource;
	operation: LexwareOperation;
	contactId?: string;
	contactType?: 'company' | 'person';
	articleId?: string;
	voucherId?: string;
	voucherType?: string;
	invoiceId?: string;
	downPaymentInvoiceId?: string;
	quotationId?: string;
	creditNoteId?: string;
	deliveryNoteId?: string;
	dunningId?: string;
	fileId?: string;
	additionalFields?: Record<string, any>;
	returnAll?: boolean;
	limit?: number;
}

// n8n credential interface compatibility
export interface ICredentialDataDecryptedObject {
	[key: string]: any;
}
