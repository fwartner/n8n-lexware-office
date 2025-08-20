export interface ILexwareCredentials {
	apiKey: string;
	resourceUrl: string;
}

/**
 * Base interface for all Lexware resources with optimistic locking support
 * Based on the official Lexware API documentation for optimistic locking
 */
export interface ILexwareBaseResource extends ILexwareOptimisticLocking {
	id?: string;
	organizationId?: string;
	createdAt?: string;
	updatedAt?: string;
	createdBy?: string;
	updatedBy?: string;
}

export interface ILexwareContact extends ILexwareBaseResource {
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

export interface ILexwareArticle extends ILexwareBaseResource {
	id?: string;
	version: number;
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

export interface ILexwareVoucher extends ILexwareBaseResource {
	id?: string;
	voucherType: string;
	voucherDate: string;
	voucherNumber?: string;
	contactId?: string;
	contactName?: string;
	lineItems?: Array<{
		id?: string;
		type: 'custom' | 'material' | 'service' | 'text' | 'discount' | 'shipping';
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
	version: number;
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
		type: 'custom' | 'material' | 'service' | 'text' | 'discount' | 'shipping';
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
	version: number;
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
		type: 'custom' | 'material' | 'service' | 'text' | 'discount' | 'shipping';
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
	// Quotation specific status and lifecycle
	quotationStatus?: 'draft' | 'open' | 'accepted' | 'rejected' | 'expired' | 'cancelled';
	validUntil?: string;
	expiryDate?: string;
	acceptedDate?: string;
	rejectedDate?: string;
	cancelledDate?: string;
	
	// Enhanced properties from the official API
	version: number;
	organizationId?: string;
	createdAt?: string;
	updatedAt?: string;
	
	// Quotation specific properties
	quotationNumber?: string;
	quotationDate?: string;
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
		earlyPaymentDiscount?: number;
		latePaymentPenalty?: number;
		paymentMethods?: string[];
		bankingInfo?: {
			accountHolder?: string;
			iban?: string;
			bic?: string;
			bankName?: string;
		};
	};
	
	// Enhanced tax conditions
	taxConditions?: {
		taxType: string;
		taxRate?: number;
		taxSubType?: string;
		taxAmount?: number;
		netAmount?: number;
		grossAmount?: number;
		reverseCharge?: boolean;
		euVatRules?: boolean;
		distanceSalesPrinciple?: string;
		taxExemption?: string;
		taxExemptionReason?: string;
	};
	
	// Shipping and delivery
	shippingConditions?: {
		shippingType: string;
		shippingCosts?: number;
		shippingDate?: string;
		deliveryTerms?: string;
		deliveryDate?: string;
		shippingAddress?: {
			street?: string;
			zipCode?: string;
			city?: string;
			country?: string;
			countryCode?: string;
			contactPerson?: string;
		};
		shippingMethod?: string;
		shippingProvider?: string;
		trackingNumber?: string;
		shippingNotes?: string;
	};
	
	// Enhanced line items with quotation specific features
	lineItems?: Array<{
		id?: string;
		type: 'custom' | 'material' | 'service' | 'text' | 'discount' | 'shipping';
		name: string;
		description?: string;
		quantity?: number;
		unitName?: string;
		unitPrice?: {
			currency: string;
			netAmount?: number;
			grossAmount?: number;
			taxRatePercentage: number;
			discountPercentage?: number;
		};
		totalPrice?: {
			currency: string;
			netAmount?: number;
			grossAmount?: number;
			taxAmount?: number;
			discountAmount?: number;
		};
		articleId?: string;
		articleNumber?: string;
		discountPercentage?: number;
		discountAmount?: number;
		minimumQuantity?: number;
		maximumQuantity?: number;
		stockLevel?: number;
		availability?: 'inStock' | 'lowStock' | 'outOfStock' | 'preOrder';
		leadTime?: number;
		leadTimeUnit?: 'days' | 'weeks' | 'months';
		customFields?: Record<string, any>;
		attachments?: string[];
	}>;
	
	// Additional quotation properties
	note?: string;
	title?: string;
	language?: string;
	currency?: string;
	exchangeRate?: number;
	baseCurrency?: string;
	
	// Financial calculations
	totalNetAmount?: number;
	totalGrossAmount?: number;
	totalTaxAmount?: number;
	totalDiscountAmount?: number;
	totalShippingAmount?: number;
	totalRoundingAmount?: number;
	
	// Related vouchers and references
	relatedVouchers?: Array<{
		id: string;
		type: string;
		number?: string;
		date?: string;
		status?: string;
		amount?: number;
		currency?: string;
	}>;
	
	// Quotation specific features
	quotationType?: 'standard' | 'proposal' | 'estimate' | 'tender' | 'request';
	priority?: 'low' | 'medium' | 'high' | 'urgent';
	probability?: number; // 0-100 percentage
	expectedOrderValue?: number;
	expectedOrderDate?: string;
	
	// Approval workflow
	approvalRequired?: boolean;
	approvalStatus?: 'pending' | 'approved' | 'rejected';
	approvalDate?: string;
	approvedBy?: string;
	approvalNotes?: string;
	
	// Follow-up and reminders
	reminderEnabled?: boolean;
	reminderDate?: string;
	reminderFrequency?: 'daily' | 'weekly' | 'monthly';
	lastReminderSent?: string;
	nextReminderDate?: string;
	
	// Customer and sales information
	customerReference?: string;
	salesPerson?: string;
	salesChannel?: string;
	campaign?: string;
	leadSource?: string;
	
	// Terms and conditions
	termsAndConditions?: string;
	termsVersion?: string;
	termsAccepted?: boolean;
	termsAcceptedDate?: string;
	termsAcceptedBy?: string;
	
	// Attachments and documents
	attachments?: Array<{
		id: string;
		name: string;
		type: string;
		size?: number;
		url?: string;
		uploadDate?: string;
	}>;
	
	// Print and layout settings
	printLayout?: string;
	printLayoutName?: string;
	logoEnabled?: boolean;
	watermarkEnabled?: boolean;
	
	// XRechnung support (German e-invoicing standard)
	xrechnung?: {
		enabled?: boolean;
		version?: string;
		profile?: string;
		reference?: string;
		deliveryDate?: string;
		deliveryPeriod?: {
			startDate?: string;
			endDate?: string;
		};
		deliveryLocation?: {
			street?: string;
			zipCode?: string;
			city?: string;
			country?: string;
		};
		deliveryTerms?: string;
		deliveryInstructions?: string;
	};
	
	// Custom fields and metadata
	customFields?: Record<string, any>;
	tags?: string[];
	notes?: string;
	internalNotes?: string;
	
	// Audit and tracking
	createdBy?: string;
	updatedBy?: string;
	lastViewed?: string;
	viewCount?: number;
	
	// Integration and external references
	externalId?: string;
	externalSystem?: string;
	syncStatus?: 'synced' | 'pending' | 'failed';
	lastSyncDate?: string;
}

export interface ILexwareOrderConfirmation extends ILexwareVoucher {
	// Order confirmation specific status
	orderConfirmationStatus?: 'draft' | 'open' | 'confirmed' | 'cancelled' | 'completed';
	validUntil?: string;
	
	// Enhanced properties from the official API
	version: number;
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
		type: 'custom' | 'material' | 'service' | 'text' | 'discount' | 'shipping';
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
	version: number;
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
		type: 'custom' | 'material' | 'service' | 'text' | 'discount' | 'shipping';
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
	// Basic identification
	userEmail: string;
	userId?: string;
	companyName?: string;
	organizationId?: string;
	
	// Enhanced properties from the official API
	version?: number;
	createdAt?: string;
	updatedAt?: string;
	
	// Company information
	company?: {
		name: string;
		legalName?: string;
		tradeName?: string;
		registrationNumber?: string;
		taxNumber?: string;
		vatNumber?: string;
		address?: {
			street?: string;
			zipCode?: string;
			city?: string;
			country?: string;
			countryCode?: string;
		};
		contact?: {
			phone?: string;
			fax?: string;
			website?: string;
			email?: string;
		};
		banking?: {
			bankName?: string;
			accountHolder?: string;
			iban?: string;
			bic?: string;
			accountNumber?: string;
			bankCode?: string;
		};
	};
	
	// User information
	user?: {
		id: string;
		email: string;
		firstName?: string;
		lastName?: string;
		displayName?: string;
		role?: string;
		permissions?: string[];
		lastLogin?: string;
		status?: 'active' | 'inactive' | 'suspended';
		preferences?: Record<string, any>;
	};
	
	// Organization settings
	organization?: {
		id: string;
		name: string;
		type?: 'business' | 'freelancer' | 'association' | 'other';
		industry?: string;
		size?: 'micro' | 'small' | 'medium' | 'large';
		foundingDate?: string;
		timezone?: string;
		language?: string;
		currency?: string;
		locale?: string;
		settings?: Record<string, any>;
	};
	
	// Business features and capabilities
	businessFeatures?: {
		invoicing?: boolean;
		accounting?: boolean;
		contactManagement?: boolean;
		fileManagement?: boolean;
		reporting?: boolean;
		multiUser?: boolean;
		apiAccess?: boolean;
		webhookSupport?: boolean;
		xrechnungSupport?: boolean;
		distanceSalesSupport?: boolean;
		euServicesSupport?: boolean;
		recurringInvoices?: boolean;
		creditNotes?: boolean;
		deliveryNotes?: boolean;
		dunning?: boolean;
		paymentTracking?: boolean;
		taxManagement?: boolean;
		multiCurrency?: boolean;
		multiLanguage?: boolean;
		customFields?: boolean;
		workflowAutomation?: boolean;
		integrations?: string[];
		compliance?: {
			gdpr?: boolean;
			sox?: boolean;
			iso?: boolean;
			industry?: string[];
		};
	};
	
	// Tax configuration
	taxConfiguration?: {
		defaultTaxType?: string;
		defaultTaxRate?: number;
		taxTypes?: Array<{
			id: string;
			name: string;
			rate: number;
			description?: string;
			active?: boolean;
		}>;
		smallBusiness?: boolean;
		smallBusinessThreshold?: number;
		euVatRules?: boolean;
		distanceSalesPrinciple?: string;
		reverseCharge?: boolean;
		taxExemptions?: string[];
	};
	
	// Payment configuration
	paymentConfiguration?: {
		defaultCurrency?: string;
		supportedCurrencies?: string[];
		defaultPaymentTerms?: number;
		paymentMethods?: string[];
		bankingInfo?: {
			accountHolder?: string;
			iban?: string;
			bic?: string;
			bankName?: string;
		};
		invoiceSettings?: {
			numberingFormat?: string;
			nextNumber?: number;
			prefix?: string;
			suffix?: string;
			startDate?: string;
		};
	};
	
	// Document settings
	documentSettings?: {
		defaultLanguage?: string;
		supportedLanguages?: string[];
		defaultPrintLayout?: string;
		printLayouts?: string[];
		logo?: {
			url?: string;
			width?: number;
			height?: number;
			format?: string;
		};
		headerTemplate?: string;
		footerTemplate?: string;
		watermark?: boolean;
		digitalSignature?: boolean;
	};
	
	// API and integration settings
	apiSettings?: {
		enabled?: boolean;
		rateLimit?: number;
		webhookUrl?: string;
		webhookSecret?: string;
		allowedOrigins?: string[];
		apiKeys?: Array<{
			id: string;
			name: string;
			permissions?: string[];
			lastUsed?: string;
			createdAt?: string;
		}>;
		integrations?: Array<{
			name: string;
			enabled?: boolean;
			config?: Record<string, any>;
		}>;
	};
	
	// Subscription and billing
	subscription?: {
		plan?: string;
		planType?: 'free' | 'basic' | 'professional' | 'enterprise' | 'custom';
		status?: 'active' | 'trial' | 'expired' | 'cancelled' | 'suspended';
		startDate?: string;
		endDate?: string;
		trialEndDate?: string;
		nextBillingDate?: string;
		amount?: number;
		currency?: string;
		billingCycle?: 'monthly' | 'quarterly' | 'yearly';
		features?: string[];
		limits?: {
			contacts?: number;
			invoices?: number;
			storage?: number;
			apiCalls?: number;
			users?: number;
		};
		usage?: {
			contacts?: number;
			invoices?: number;
			storage?: number;
			apiCalls?: number;
			users?: number;
		};
	};
	
	// System information
	system?: {
		version?: string;
		environment?: 'development' | 'staging' | 'production';
		maintenanceMode?: boolean;
		lastMaintenance?: string;
		nextMaintenance?: string;
		backupFrequency?: string;
		lastBackup?: string;
		uptime?: number;
		performance?: {
			responseTime?: number;
			throughput?: number;
			errorRate?: number;
		};
	};
	
	// Additional metadata
	tags?: string[];
	customFields?: Record<string, any>;
	notes?: string;
	
	// Validation and constraints
	validationRules?: {
		requiredFields?: string[];
		allowedValues?: Record<string, any[]>;
		formatRules?: Record<string, string>;
	};
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

export interface ILexwarePostingCategory {
	// Posting category identification
	id?: string;
	version?: number;
	organizationId?: string;
	createdAt?: string;
	updatedAt?: string;
	
	// Basic properties
	name: string;
	description?: string;
	number?: string;
	
	// Category classification
	type: 'income' | 'expense' | 'asset' | 'liability' | 'equity';
	status: 'active' | 'inactive' | 'archived';
	
	// Hierarchical structure
	parentId?: string;
	parentName?: string;
	level?: number;
	path?: string;
	
	// Financial properties
	accountNumber?: string;
	accountType?: string;
	taxRate?: number;
	taxType?: string;
	
	// Business logic
	isDefault?: boolean;
	isSystem?: boolean;
	isEditable?: boolean;
	
	// Additional metadata
	tags?: string[];
	customFields?: Record<string, any>;
	
	// Usage information
	usageCount?: number;
	lastUsed?: string;
	
	// Validation and constraints
	validationRules?: {
		requiredFields?: string[];
		allowedValues?: Record<string, any[]>;
		formatRules?: Record<string, string>;
	};
	
	// Localization
	language?: string;
	localizedName?: Record<string, string>;
	localizedDescription?: Record<string, string>;
}

export interface ILexwarePrintLayout {
	// Print layout identification
	id?: string;
	version?: number;
	organizationId?: string;
	createdAt?: string;
	updatedAt?: string;
	
	// Basic properties
	name: string;
	description?: string;
	number?: string;
	
	// Layout classification
	type: 'invoice' | 'quotation' | 'orderConfirmation' | 'deliveryNote' | 'creditNote' | 'dunning' | 'downPaymentInvoice' | 'receipt' | 'reminder' | 'confirmation';
	status: 'active' | 'inactive' | 'archived' | 'draft';
	
	// Layout configuration
	format: 'pdf' | 'html' | 'xml' | 'json';
	template?: string;
	templateVersion?: string;
	
	// Design properties
	orientation?: 'portrait' | 'landscape';
	pageSize?: 'A4' | 'A3' | 'A5' | 'letter' | 'legal' | 'custom';
	customPageSize?: {
		width: number;
		height: number;
		unit: 'mm' | 'cm' | 'inch' | 'pt';
	};
	
	// Margins and spacing
	margins?: {
		top: number;
		bottom: number;
		left: number;
		right: number;
		unit: 'mm' | 'cm' | 'inch' | 'pt';
	};
	
	// Font and styling
	defaultFont?: string;
	defaultFontSize?: number;
	headerFont?: string;
	headerFontSize?: number;
	footerFont?: string;
	footerFontSize?: number;
	
	// Header and footer configuration
	headerEnabled?: boolean;
	headerTemplate?: string;
	footerEnabled?: boolean;
	footerTemplate?: string;
	
	// Content sections
	sections?: Array<{
		id: string;
		name: string;
		type: 'header' | 'content' | 'footer' | 'custom';
		content?: string;
		position: {
			x: number;
			y: number;
			width: number;
			height: number;
		};
		visible?: boolean;
		editable?: boolean;
	}>;
	
	// Business logic
	isDefault?: boolean;
	isSystem?: boolean;
	isEditable?: boolean;
	isPublic?: boolean;
	
	// Usage and references
	usageCount?: number;
	lastUsed?: string;
	referencedBy?: Array<{
		id: string;
		type: string;
		name?: string;
	}>;
	
	// Additional metadata
	tags?: string[];
	customFields?: Record<string, any>;
	
	// Validation and constraints
	validationRules?: {
		requiredFields?: string[];
		allowedValues?: Record<string, any[]>;
		formatRules?: Record<string, string>;
	};
	
	// Localization
	language?: string;
	localizedName?: Record<string, string>;
	localizedDescription?: Record<string, string>;
	
	// Preview and rendering
	previewUrl?: string;
	thumbnailUrl?: string;
	renderSettings?: {
		resolution?: number;
		quality?: number;
		compression?: boolean;
		watermark?: boolean;
	};
}

export interface ILexwareRecurringTemplate {
	id: string;
	name: string;
	description?: string;
	
	// Template type and category
	templateType: 'invoice' | 'quotation' | 'orderConfirmation' | 'deliveryNote';
	category?: string;
	
	// Recurrence settings
	recurrenceType: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'custom';
	recurrenceInterval: number; // Every X days/weeks/months/etc.
	recurrenceDayOfWeek?: number; // 1-7 (Monday-Sunday) for weekly
	recurrenceDayOfMonth?: number; // 1-31 for monthly
	recurrenceMonthOfYear?: number; // 1-12 for yearly
	recurrenceWeekOfMonth?: number; // 1-5 for monthly
	recurrenceEndDate?: string;
	recurrenceMaxOccurrences?: number;
	
	// Template content
	contactId?: string;
	contactName?: string;
	lineItems?: Array<{
		id?: string;
		type: 'custom' | 'material' | 'service' | 'text' | 'discount' | 'shipping';
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
		articleId?: string;
		articleNumber?: string;
		discountPercentage?: number;
		discountAmount?: number;
	}>;
	
	// Voucher settings
	voucherDate?: string;
	dueDate?: string;
	paymentTerms?: number;
	paymentTermsLabel?: string;
	paymentTermsLabelTemplate?: string;
	
	// Tax and financial settings
	taxType?: string;
	taxRate?: number;
	taxSubType?: string;
	currency?: string;
	exchangeRate?: number;
	
	// Document settings
	language?: string;
	note?: string;
	title?: string;
	printLayoutId?: string;
	
	// Status and lifecycle
	status: 'active' | 'inactive' | 'draft' | 'archived';
	isActive: boolean;
	lastGenerated?: string;
	nextGenerationDate?: string;
	generationCount: number;
	maxGenerations?: number;
	
	// Enhanced properties from the official API
	version?: number;
	organizationId?: string;
	createdAt?: string;
	updatedAt?: string;
	createdBy?: string;
	updatedBy?: string;
	
	// Additional metadata
	tags?: string[];
	customFields?: Record<string, any>;
	notes?: string;
	internalNotes?: string;
	
	// Validation and constraints
	validationRules?: {
		requiredFields?: string[];
		allowedValues?: Record<string, any[]>;
		formatRules?: Record<string, string>;
	};
}

export interface ILexwareVoucherList {
	id: string;
	voucherType: string;
	voucherStatus: string;
	voucherNumber: string;
	voucherDate: string;
	contactId: string;
	contactName?: string;
	
	// Enhanced properties from the official API
	version?: number;
	organizationId?: string;
	createdAt?: string;
	updatedAt?: string;
	createdBy?: string;
	updatedBy?: string;
	
	// Voucher details
	title?: string;
	note?: string;
	language?: string;
	currency?: string;
	
	// Financial information
	totalNetAmount?: number;
	totalGrossAmount?: number;
	totalTaxAmount?: number;
	totalDiscountAmount?: number;
	totalShippingAmount?: number;
	
	// Payment and tax information
	paymentTerms?: number;
	paymentTermsLabel?: string;
	paymentTermsLabelTemplate?: string;
	taxType?: string;
	taxRate?: number;
	taxSubType?: string;
	
	// Dates and timing
	dueDate?: string;
	shippingDate?: string;
	deliveryDate?: string;
	
	// Status and lifecycle
	archived?: boolean;
	isRecurring?: boolean;
	recurringTemplateId?: string;
	isClosingInvoice?: boolean;
	closingInvoiceId?: string;
	
	// Related vouchers
	relatedVouchers?: Array<{
		id: string;
		type: string;
		number?: string;
		date?: string;
		status?: string;
		amount?: number;
		currency?: string;
	}>;
	
	// XRechnung support
	isXRechnung?: boolean;
	xrechnungVersion?: string;
	xrechnungProfile?: string;
	
	// Distance sales support
	distanceSalesPrinciple?: string;
	euDestinationCountry?: string;
	
	// Additional metadata
	tags?: string[];
	customFields?: Record<string, any>;
	notes?: string;
	internalNotes?: string;
	
	// Validation and constraints
	validationRules?: {
		requiredFields?: string[];
		allowedValues?: Record<string, any[]>;
		formatRules?: Record<string, string>;
	};
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
	cursor?: string;
	limit?: number;
	offset?: number;
}

export interface ILexwarePaginationMetadata {
	totalCount?: number;
	totalPages?: number;
	currentPage?: number;
	hasNextPage?: boolean;
	hasPreviousPage?: boolean;
	nextCursor?: string;
	previousCursor?: string;
	pageSize?: number;
}

export interface ILexwarePaginationResponse<T> {
	data: T[];
	pagination?: ILexwarePaginationMetadata;
}

/**
 * Optimistic Locking Interface
 * Based on the official Lexware API documentation for optimistic locking
 */
export interface ILexwareOptimisticLocking {
	version: number;
	lastModified?: string;
	lastModifiedBy?: string;
}

/**
 * Optimistic Locking Error Response
 */
export interface ILexwareOptimisticLockingError {
	error: string;
	code: string;
	message: string;
	currentVersion?: number;
	requestedVersion?: number;
	timestamp: string;
	resourceId?: string;
	resourceType?: string;
}

/**
 * Optimistic Locking Update Request
 */
export interface ILexwareOptimisticLockingUpdateRequest<T> {
	data: T;
	version: number;
	forceUpdate?: boolean;
	skipVersionCheck?: boolean;
}

/**
 * HTTP Status Code Information
 * Based on the official Lexware API documentation
 */
export interface ILexwareHttpStatusInfo {
	code: number;
	message: string;
	category: string;
	description: string;
	retryable: boolean;
	userActionable: boolean;
}

/**
 * HTTP Response Information
 * Based on the official Lexware API documentation
 */
export interface ILexwareHttpResponse<T> {
	data: T;
	status: number;
	statusText: string;
	headers: Record<string, string>;
	timestamp: string;
	requestId?: string;
}

/**
 * HTTP Error Response
 * Based on the official Lexware API documentation
 */
export interface ILexwareHttpErrorResponse {
	status: number;
	statusText: string;
	message: string;
	code?: string;
	details?: Record<string, any>;
	timestamp: string;
	requestId?: string;
	path?: string;
	method?: string;
	userMessage?: string;
	developerMessage?: string;
	retryAfter?: number;
	rateLimitRemaining?: number;
	rateLimitReset?: number;
}

/**
 * Lexware API Error Response
 * Based on the official Lexware API documentation for Error Codes
 */
export interface ILexwareApiErrorResponse {
	// Standard error response fields
	error: string;
	code: string;
	message: string;
	status: number;
	
	// Additional error information
	timestamp: string;
	requestId?: string;
	path?: string;
	method?: string;
	
	// Error details and context
	details?: Record<string, any>;
	fieldErrors?: Array<{
		field: string;
		code: string;
		message: string;
		value?: any;
	}>;
	
	// Business logic errors
	businessRule?: string;
	workflowState?: string;
	constraintViolation?: string;
	
	// Resource information
	resourceType?: string;
	resourceId?: string;
	resourceVersion?: number;
	
	// Rate limiting information
	rateLimitRemaining?: number;
	rateLimitReset?: number;
	retryAfter?: number;
	
	// User guidance
	userMessage?: string;
	developerMessage?: string;
	suggestedAction?: string;
	
	// Error categorization
	category?: string;
	severity?: string;
	retryable?: boolean;
	
	// Legacy support
	legacyCode?: string;
	legacyMessage?: string;
}

/**
 * Lexware API Error Code Information
 * Based on the official Lexware API documentation for Error Codes
 */
export interface ILexwareErrorCodeInfo {
	code: string;
	message: string;
	category: string;
	severity: string;
	retryable: boolean;
	userActionable: boolean;
	httpStatus: number;
	description: string;
	suggestedAction: string;
	documentationUrl?: string;
}

/**
 * Lexware API Error Field Validation
 * Based on the official Lexware API documentation for Error Codes
 */
export interface ILexwareErrorFieldValidation {
	field: string;
	code: string;
	message: string;
	value?: any;
	expected?: any;
	constraints?: Record<string, any>;
	path?: string;
}

/**
 * Lexware API Error Context
 * Based on the official Lexware API documentation for Error Codes
 */
export interface ILexwareErrorContext {
	operation: string;
	resourceType: string;
	resourceId?: string;
	userId?: string;
	organizationId?: string;
	environment: string;
	version: string;
	requestData?: Record<string, any>;
	responseData?: Record<string, any>;
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
	| 'postingCategory'
	| 'printLayout'
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
