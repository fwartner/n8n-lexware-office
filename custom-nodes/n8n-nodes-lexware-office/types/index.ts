export interface ILexwareCredentials {
	apiKey: string;
	resourceUrl: string;
}

export interface ILexwareContact {
	id?: string;
	version: number;
	roles: Record<string, any>;
	company?: {
		name: string;
		contactPersons?: Array<{
			salutation?: string;
			lastName: string;
		}>;
	};
	person?: {
		salutation?: string;
		firstName: string;
		lastName: string;
	};
	note?: string;
	addresses: Array<{
		countryCode: string;
		street?: string;
		zipCode?: string;
		city?: string;
	}>;
	phoneNumbers?: {
		private?: string[];
		fax?: string[];
		other?: string[];
	};
	emailAddresses?: {
		business?: string[];
		office?: string[];
		private?: string[];
		other?: string[];
	};
}

export interface ILexwareArticle {
	id?: string;
	title: string;
	type: 'service' | 'material' | 'custom';
	unitName: string;
	price: {
		netPrice?: number;
		grossPrice?: number;
		leadingPrice: 'NET' | 'GROSS';
		taxRate: number;
	};
	description?: string;
	archived?: boolean;
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
	invoiceStatus?: 'draft' | 'open' | 'paid' | 'voided';
	dueDate?: string;
}

export interface ILexwareQuotation extends ILexwareVoucher {
	quotationStatus?: 'draft' | 'open' | 'accepted' | 'rejected';
	validUntil?: string;
}

export interface ILexwareCreditNote extends ILexwareVoucher {
	creditNoteStatus?: 'draft' | 'open' | 'voided';
	precedingSalesVoucherId?: string;
}

export interface ILexwareDeliveryNote extends ILexwareVoucher {
	deliveryNoteStatus?: 'draft' | 'open' | 'delivered';
	deliveryDate?: string;
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
}

export interface ILexwarePaymentCondition {
	id: string;
	name: string;
	description?: string;
	paymentTerms?: number;
}

export interface ILexwareEventSubscription {
	id: string;
	eventType: string;
	url: string;
	active: boolean;
	createdAt: string;
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
	| 'quotation'
	| 'creditNote'
	| 'deliveryNote'
	| 'dunning'
	| 'file'
	| 'profile'
	| 'country'
	| 'paymentCondition'
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
