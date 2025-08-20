import { ILexwareCredentials } from '../types';
import { 
	ContactResource, 
	ArticleResource, 
	VoucherResource,
	InvoiceResource,
	DownPaymentInvoiceResource,
	QuotationResource,
	CreditNoteResource,
	OrderConfirmationResource,
	DeliveryNoteResource,
	DunningResource,
	FileResource,
	ProfileResource,
	CountryResource,
	PaymentConditionResource,
	PaymentResource,
	PostingCategoryResource,
	EventSubscriptionResource
} from './index';
import { LEXWARE_RESOURCE_TYPES } from '../constants';

export class ResourceFactory {
	private credentials: ILexwareCredentials;
	private resources: Map<string, any>;

	constructor(credentials: ILexwareCredentials) {
		this.credentials = credentials;
		this.resources = new Map();
		this.initializeResources();
	}

	private initializeResources(): void {
		this.resources.set(LEXWARE_RESOURCE_TYPES.CONTACT, new ContactResource(this.credentials));
		this.resources.set(LEXWARE_RESOURCE_TYPES.ARTICLE, new ArticleResource(this.credentials));
		this.resources.set(LEXWARE_RESOURCE_TYPES.VOUCHER, new VoucherResource(this.credentials));
		this.resources.set(LEXWARE_RESOURCE_TYPES.INVOICE, new InvoiceResource(this.credentials));
		this.resources.set(LEXWARE_RESOURCE_TYPES.DOWN_PAYMENT_INVOICE, new DownPaymentInvoiceResource(this.credentials));
		this.resources.set(LEXWARE_RESOURCE_TYPES.QUOTATION, new QuotationResource(this.credentials));
		this.resources.set(LEXWARE_RESOURCE_TYPES.CREDIT_NOTE, new CreditNoteResource(this.credentials));
		this.resources.set(LEXWARE_RESOURCE_TYPES.ORDER_CONFIRMATION, new OrderConfirmationResource(this.credentials));
		this.resources.set(LEXWARE_RESOURCE_TYPES.DELIVERY_NOTE, new DeliveryNoteResource(this.credentials));
		this.resources.set(LEXWARE_RESOURCE_TYPES.DUNNING, new DunningResource(this.credentials));
		this.resources.set(LEXWARE_RESOURCE_TYPES.FILE, new FileResource(this.credentials));
		this.resources.set(LEXWARE_RESOURCE_TYPES.PROFILE, new ProfileResource(this.credentials));
		this.resources.set(LEXWARE_RESOURCE_TYPES.COUNTRY, new CountryResource(this.credentials));
		this.resources.set(LEXWARE_RESOURCE_TYPES.PAYMENT_CONDITION, new PaymentConditionResource(this.credentials));
		this.resources.set(LEXWARE_RESOURCE_TYPES.PAYMENT, new PaymentResource(this.credentials));
		this.resources.set(LEXWARE_RESOURCE_TYPES.POSTING_CATEGORY, new PostingCategoryResource(this.credentials));
		this.resources.set(LEXWARE_RESOURCE_TYPES.EVENT_SUBSCRIPTION, new EventSubscriptionResource(this.credentials));
	}

	getResource(resourceType: string): any {
		const resource = this.resources.get(resourceType);
		if (!resource) {
			throw new Error(`Unsupported resource type: ${resourceType}`);
		}
		return resource;
	}

	async executeOperation(
		resourceType: string,
		operation: string,
		params: Record<string, any>
	): Promise<any> {
		const resource = this.getResource(resourceType);
		
		switch (operation) {
			case 'get':
				return this.executeGet(resource, resourceType, params);
			case 'getAll':
				return this.executeGetAll(resource, resourceType, params);
			case 'create':
				return this.executeCreate(resource, resourceType, params);
			case 'update':
				return this.executeUpdate(resource, resourceType, params);
			case 'finalize':
				return this.executeFinalize(resource, resourceType, params);
			case 'pursue':
				return this.executePursue(resource, resourceType, params);
			case 'document':
				return this.executeDocument(resource, resourceType, params);
			case 'downloadFile':
				return this.executeDownloadFile(resource, resourceType, params);
			default:
				throw new Error(`Unsupported operation: ${operation}`);
		}
	}

	private async executeGet(resource: any, resourceType: string, params: Record<string, any>): Promise<any> {
		switch (resourceType) {
			case LEXWARE_RESOURCE_TYPES.CONTACT:
				return resource.get(params.contactId);
			case LEXWARE_RESOURCE_TYPES.ARTICLE:
				return resource.get(params.articleId);
			case LEXWARE_RESOURCE_TYPES.VOUCHER:
				return resource.get(params.voucherId);
			case LEXWARE_RESOURCE_TYPES.INVOICE:
				return resource.get(params.invoiceId);
			case LEXWARE_RESOURCE_TYPES.DOWN_PAYMENT_INVOICE:
				return resource.get(params.downPaymentInvoiceId);
			case LEXWARE_RESOURCE_TYPES.QUOTATION:
				return resource.get(params.quotationId);
			case LEXWARE_RESOURCE_TYPES.CREDIT_NOTE:
				return resource.get(params.creditNoteId);
			case LEXWARE_RESOURCE_TYPES.DELIVERY_NOTE:
				return resource.get(params.deliveryNoteId);
			case LEXWARE_RESOURCE_TYPES.DUNNING:
				return resource.get(params.dunningId);
			case LEXWARE_RESOURCE_TYPES.FILE:
				return resource.get(params.fileId);
			case LEXWARE_RESOURCE_TYPES.PROFILE:
				return resource.get();
			case LEXWARE_RESOURCE_TYPES.COUNTRY:
				return resource.get(params.countryCode);
			case LEXWARE_RESOURCE_TYPES.PAYMENT_CONDITION:
				return resource.get(params.paymentConditionId);
			case LEXWARE_RESOURCE_TYPES.PAYMENT:
				return resource.get(params.paymentId);
			case LEXWARE_RESOURCE_TYPES.POSTING_CATEGORY:
				return resource.get(params.postingCategoryId);
			case LEXWARE_RESOURCE_TYPES.EVENT_SUBSCRIPTION:
				return resource.get(params.eventSubscriptionId);
			default:
				throw new Error(`Get operation not supported for resource type: ${resourceType}`);
		}
	}

	private async executeGetAll(resource: any, resourceType: string, params: Record<string, any>): Promise<any> {
		const paginationParams = this.buildPaginationParams(params);
		
		// Handle country-specific filtering
		if (resourceType === LEXWARE_RESOURCE_TYPES.COUNTRY) {
			return this.executeCountryGetAll(resource, paginationParams, params);
		}
		
		// Handle down payment invoice specific filtering
		if (resourceType === LEXWARE_RESOURCE_TYPES.DOWN_PAYMENT_INVOICE) {
			return this.executeDownPaymentInvoiceGetAll(resource, paginationParams, params);
		}
		
		// Handle event subscription specific filtering
		if (resourceType === LEXWARE_RESOURCE_TYPES.EVENT_SUBSCRIPTION) {
			return this.executeEventSubscriptionGetAll(resource, paginationParams, params);
		}
		
		// Handle file specific filtering
		if (resourceType === LEXWARE_RESOURCE_TYPES.FILE) {
			return this.executeFileGetAll(resource, paginationParams, params);
		}
		
		// Handle invoice specific filtering
		if (resourceType === LEXWARE_RESOURCE_TYPES.INVOICE) {
			return this.executeInvoiceGetAll(resource, paginationParams, params);
		}
		
		// Handle order confirmation specific filtering
		if (resourceType === LEXWARE_RESOURCE_TYPES.ORDER_CONFIRMATION) {
			return this.executeOrderConfirmationGetAll(resource, paginationParams, params);
		}
		
		// Handle payment specific filtering
		if (resourceType === LEXWARE_RESOURCE_TYPES.PAYMENT) {
			return this.executePaymentGetAll(resource, paginationParams, params);
		}
		
		// Handle posting category specific filtering
		if (resourceType === LEXWARE_RESOURCE_TYPES.POSTING_CATEGORY) {
			return this.executePostingCategoryGetAll(resource, paginationParams, params);
		}
		
		return resource.getAll(paginationParams);
	}

	private async executeCountryGetAll(resource: any, paginationParams: Record<string, any>, params: Record<string, any>): Promise<any> {
		const countryFilter = params.countryFilter || 'all';
		
		switch (countryFilter) {
			case 'eu':
				return resource.getEUCountries();
			case 'non-eu':
				return resource.getNonEUCountries();
			case 'xrechnung':
				return resource.getXRechnungCountries();
			case 'distanceSales':
				return resource.getDistanceSalesCountries();
			case 'validTaxRates':
				const dateFilter = params.dateFilter;
				const taxTypeFilter = params.taxTypeFilter;
				
				if (taxTypeFilter) {
					return resource.getCountriesByTaxClassification(taxTypeFilter);
				} else if (dateFilter) {
					return resource.getCountriesWithValidTaxRates(dateFilter);
				} else {
					return resource.getCountriesWithValidTaxRates();
				}
			default:
				return resource.getAll(paginationParams);
		}
	}

	private async executeDownPaymentInvoiceGetAll(resource: any, paginationParams: Record<string, any>, params: Record<string, any>): Promise<any> {
		// Handle down payment invoice specific filtering
		if (params.closingInvoiceId) {
			return resource.getByClosingInvoice(params.closingInvoiceId);
		}
		
		if (params.contactId) {
			return resource.getByContact(params.contactId, paginationParams);
		}
		
		if (params.status) {
			return resource.getByStatus(params.status, paginationParams);
		}
		
		if (params.startDate && params.endDate) {
			return resource.getByDateRange(params.startDate, params.endDate, paginationParams);
		}
		
		if (params.invoiceNumber) {
			return resource.searchByNumber(params.invoiceNumber, paginationParams);
		}
		
		if (params.taxType) {
			return resource.getByTaxConditions(params.taxType, params.taxSubType, paginationParams);
		}
		
		// Default: get all down payment invoices
		return resource.getAll(paginationParams);
	}

	private async executeEventSubscriptionGetAll(resource: any, paginationParams: Record<string, any>, params: Record<string, any>): Promise<any> {
		// Handle event subscription specific filtering
		if (params.eventType) {
			return resource.getByEventType(params.eventType, paginationParams);
		}
		
		if (params.active === true) {
			return resource.getActive(paginationParams);
		}
		
		if (params.active === false) {
			return resource.getInactive(paginationParams);
		}
		
		if (params.contactId) {
			return resource.getByContact(params.contactId, paginationParams);
		}
		
		if (params.voucherType) {
			return resource.getByVoucherType(params.voucherType, paginationParams);
		}
		
		if (params.status) {
			return resource.getByStatus(params.status, paginationParams);
		}
		
		if (params.searchTerm) {
			return resource.search(params.searchTerm, paginationParams);
		}
		
		// Default: get all event subscriptions
		return resource.getAll(paginationParams);
	}

	private async executeFileGetAll(resource: any, paginationParams: Record<string, any>, params: Record<string, any>): Promise<any> {
		// Handle file specific filtering
		if (params.fileType) {
			return resource.getByType(params.fileType, paginationParams);
		}
		
		if (params.category) {
			return resource.getByCategory(params.category, paginationParams);
		}
		
		if (params.contentType) {
			return resource.getByContentType(params.contentType, paginationParams);
		}
		
		if (params.accessLevel) {
			return resource.getByAccessLevel(params.accessLevel, paginationParams);
		}
		
		if (params.processingStatus) {
			return resource.getByProcessingStatus(params.processingStatus, paginationParams);
		}
		
		if (params.isEInvoice === true) {
			return resource.getEInvoices(paginationParams);
		}
		
		if (params.contactId) {
			return resource.getByContact(params.contactId, paginationParams);
		}
		
		if (params.articleId) {
			return resource.getByArticle(params.articleId, paginationParams);
		}
		
		if (params.searchTerm) {
			return resource.search(params.searchTerm, paginationParams);
		}
		
		if (params.startDate && params.endDate) {
			return resource.getByDateRange(params.startDate, params.endDate, paginationParams);
		}
		
		if (params.isArchived === true) {
			return resource.getArchived(paginationParams);
		}
		
		if (params.isArchived === false) {
			return resource.getPublic(paginationParams);
		}
		
		// Default: get all files
		return resource.getAll(paginationParams);
	}

	private async executeOrderConfirmationGetAll(resource: any, paginationParams: Record<string, any>, params: Record<string, any>): Promise<any> {
		// Handle order confirmation specific filtering
		if (params.orderConfirmationStatus) {
			return resource.getByStatus(params.orderConfirmationStatus, paginationParams);
		}
		
		if (params.contactId) {
			return resource.getByContact(params.contactId, paginationParams);
		}
		
		if (params.startDate && params.endDate) {
			return resource.getByDateRange(params.startDate, params.endDate, paginationParams);
		}
		
		if (params.deliveryDateStart && params.deliveryDateEnd) {
			return resource.getByDeliveryDateRange(params.deliveryDateStart, params.deliveryDateEnd, paginationParams);
		}
		
		if (params.minAmount && params.maxAmount) {
			return resource.getByAmountRange(params.minAmount, params.maxAmount, paginationParams);
		}
		
		if (params.searchTerm) {
			return resource.search(params.searchTerm, paginationParams);
		}
		
		if (params.isXRechnung === true) {
			return resource.getXRechnungOrderConfirmations(paginationParams);
		}
		
		if (params.isRecurring === true) {
			return resource.getRecurringOrderConfirmations(paginationParams);
		}
		
		if (params.taxType) {
			return resource.getByTaxType(params.taxType, paginationParams);
		}
		
		if (params.currency) {
			return resource.getByCurrency(params.currency, paginationParams);
		}
		
		if (params.language) {
			return resource.getByLanguage(params.language, paginationParams);
		}
		
		// Default: get all order confirmations
		return resource.getAll(paginationParams);
	}

	private async executePaymentGetAll(resource: any, paginationParams: Record<string, any>, params: Record<string, any>): Promise<any> {
		// Handle payment specific filtering
		if (params.paymentType) {
			return resource.getByType(params.paymentType, paginationParams);
		}
		
		if (params.paymentStatus) {
			return resource.getByStatus(params.paymentStatus, paginationParams);
		}
		
		if (params.contactId) {
			return resource.getByContact(params.contactId, paginationParams);
		}
		
		if (params.voucherId) {
			return resource.getByVoucher(params.voucherId, paginationParams);
		}
		
		if (params.startDate && params.endDate) {
			return resource.getByDateRange(params.startDate, params.endDate, paginationParams);
		}
		
		if (params.paidDateStart && params.paidDateEnd) {
			return resource.getByPaidDateRange(params.paidDateStart, params.paidDateEnd, paginationParams);
		}
		
		if (params.clearingDateStart && params.clearingDateEnd) {
			return resource.getByClearingDateRange(params.clearingDateStart, params.clearingDateEnd, paginationParams);
		}
		
		if (params.minAmount && params.maxAmount) {
			return resource.getByAmountRange(params.minAmount, params.maxAmount, paginationParams);
		}
		
		if (params.currency) {
			return resource.getByCurrency(params.currency, paginationParams);
		}
		
		if (params.paymentMethod) {
			return resource.getByPaymentMethod(params.paymentMethod, paginationParams);
		}
		
		if (params.paymentItemType) {
			return resource.getByPaymentItemType(params.paymentItemType, paginationParams);
		}
		
		if (params.searchTerm) {
			return resource.search(params.searchTerm, paginationParams);
		}
		
		if (params.transactionId) {
			return resource.getByTransactionId(params.transactionId, paginationParams);
		}
		
		if (params.reference) {
			return resource.getByReference(params.reference, paginationParams);
		}
		
		if (params.iban) {
			return resource.getByBankAccount(params.iban, paginationParams);
		}
		
		// Default: get all payments
		return resource.getAll(paginationParams);
	}

	private async executePostingCategoryGetAll(resource: any, paginationParams: Record<string, any>, params: Record<string, any>): Promise<any> {
		// Handle posting category specific filtering
		if (params.type) {
			return resource.getByType(params.type, paginationParams);
		}

		if (params.status) {
			return resource.getByStatus(params.status, paginationParams);
		}

		if (params.parentId) {
			return resource.getByParent(params.parentId, paginationParams);
		}

		if (params.level !== undefined) {
			return resource.getByLevel(params.level, paginationParams);
		}

		if (params.accountNumber) {
			return resource.getByAccountNumber(params.accountNumber, paginationParams);
		}

		if (params.taxType) {
			return resource.getByTaxType(params.taxType, paginationParams);
		}

		if (params.isDefault === true) {
			return resource.getDefaults(paginationParams);
		}

		if (params.isSystem === true) {
			return resource.getSystemCategories(paginationParams);
		}

		if (params.isEditable === true) {
			return resource.getEditable(paginationParams);
		}

		if (params.searchTerm) {
			return resource.search(params.searchTerm, paginationParams);
		}

		if (params.language) {
			return resource.getByLanguage(params.language, paginationParams);
		}

		if (params.usageCountFrom && params.usageCountTo) {
			return resource.getByUsageRange(params.usageCountFrom, params.usageCountTo, paginationParams);
		}

		if (params.lastUsedFrom && params.lastUsedTo) {
			return resource.getByLastUsedRange(params.lastUsedFrom, params.lastUsedTo, paginationParams);
		}

		if (params.includeHierarchy === true) {
			return resource.getHierarchy(paginationParams);
		}

		if (params.includeChildren === true && params.parentId) {
			return resource.getWithChildren(params.parentId, paginationParams);
		}

		if (params.tag) {
			return resource.getByTag(params.tag, paginationParams);
		}

		// Default: get all posting categories
		return resource.getAll(paginationParams);
	}

	private async executeInvoiceGetAll(resource: any, paginationParams: Record<string, any>, params: Record<string, any>): Promise<any> {
		// Handle invoice specific filtering
		if (params.invoiceStatus) {
			return resource.getByStatus(params.invoiceStatus, paginationParams);
		}
		
		if (params.contactId) {
			return resource.getByContact(params.contactId, paginationParams);
		}
		
		if (params.startDate && params.endDate) {
			return resource.getByDateRange(params.startDate, params.endDate, paginationParams);
		}
		
		if (params.dueDateStart && params.dueDateEnd) {
			return resource.getByDueDateRange(params.dueDateStart, params.dueDateEnd, paginationParams);
		}
		
		if (params.minAmount && params.maxAmount) {
			return resource.getByAmountRange(params.minAmount, params.maxAmount, paginationParams);
		}
		
		if (params.searchTerm) {
			return resource.search(params.searchTerm, paginationParams);
		}
		
		if (params.isXRechnung === true) {
			return resource.getXRechnungInvoices(paginationParams);
		}
		
		if (params.isRecurring === true) {
			return resource.getRecurringInvoices(paginationParams);
		}
		
		if (params.isClosingInvoice === true) {
			return resource.getClosingInvoices(paginationParams);
		}
		
		if (params.taxType) {
			return resource.getByTaxType(params.taxType, paginationParams);
		}
		
		if (params.currency) {
			return resource.getByCurrency(params.currency, paginationParams);
		}
		
		if (params.language) {
			return resource.getByLanguage(params.language, paginationParams);
		}
		
		// Default: get all invoices
		return resource.getAll(paginationParams);
	}

	private async executeCreate(resource: any, resourceType: string, params: Record<string, any>): Promise<any> {
		const additionalFields = params.additionalFields || {};
		
		switch (resourceType) {
			case LEXWARE_RESOURCE_TYPES.CONTACT:
				return resource.create(params.contactType, additionalFields);
			case LEXWARE_RESOURCE_TYPES.ARTICLE:
				return resource.create(additionalFields);
			case LEXWARE_RESOURCE_TYPES.VOUCHER:
				return resource.create(params.voucherType, additionalFields);
			case LEXWARE_RESOURCE_TYPES.INVOICE:
				return resource.create(additionalFields);
			case LEXWARE_RESOURCE_TYPES.QUOTATION:
				return resource.create(additionalFields);
			case LEXWARE_RESOURCE_TYPES.CREDIT_NOTE:
				return resource.create(additionalFields);
			case LEXWARE_RESOURCE_TYPES.DELIVERY_NOTE:
				return resource.create(additionalFields);
			case LEXWARE_RESOURCE_TYPES.DUNNING:
				return resource.create(additionalFields);
			case LEXWARE_RESOURCE_TYPES.PAYMENT_CONDITION:
				return resource.create(additionalFields);
			case LEXWARE_RESOURCE_TYPES.POSTING_CATEGORY:
				return resource.create(additionalFields);
			case LEXWARE_RESOURCE_TYPES.EVENT_SUBSCRIPTION:
				return resource.create(additionalFields);
			default:
				throw new Error(`Create operation not supported for resource type: ${resourceType}`);
		}
	}

	private async executeUpdate(resource: any, resourceType: string, params: Record<string, any>): Promise<any> {
		const additionalFields = params.additionalFields || {};
		
		switch (resourceType) {
			case LEXWARE_RESOURCE_TYPES.CONTACT:
				return resource.update(params.contactId, additionalFields);
			case LEXWARE_RESOURCE_TYPES.ARTICLE:
				return resource.update(params.articleId, additionalFields);
			case LEXWARE_RESOURCE_TYPES.VOUCHER:
				return resource.update(params.voucherId, additionalFields);
			case LEXWARE_RESOURCE_TYPES.INVOICE:
				return resource.update(params.invoiceId, additionalFields);
			case LEXWARE_RESOURCE_TYPES.QUOTATION:
				return resource.update(params.quotationId, additionalFields);
			case LEXWARE_RESOURCE_TYPES.CREDIT_NOTE:
				return resource.update(params.creditNoteId, additionalFields);
			case LEXWARE_RESOURCE_TYPES.DELIVERY_NOTE:
				return resource.update(params.deliveryNoteId, additionalFields);
			case LEXWARE_RESOURCE_TYPES.DUNNING:
				return resource.update(params.dunningId, additionalFields);
			case LEXWARE_RESOURCE_TYPES.PROFILE:
				return resource.update(additionalFields);
			case LEXWARE_RESOURCE_TYPES.PAYMENT_CONDITION:
				return resource.update(params.paymentConditionId, additionalFields);
			case LEXWARE_RESOURCE_TYPES.POSTING_CATEGORY:
				return resource.update(params.postingCategoryId, additionalFields);
			case LEXWARE_RESOURCE_TYPES.EVENT_SUBSCRIPTION:
				return resource.update(params.eventSubscriptionId, additionalFields);
			default:
				throw new Error(`Update operation not supported for resource type: ${resourceType}`);
		}
	}

	private buildPaginationParams(params: Record<string, any>): Record<string, any> {
		if (params.returnAll) {
			return {};
		}
		
		return {
			size: Math.min(params.limit || 50, 250),
			page: 0,
		};
	}

	private async executeFinalize(resource: any, resourceType: string, params: Record<string, any>): Promise<any> {
		switch (resourceType) {
			case LEXWARE_RESOURCE_TYPES.DUNNING:
				return resource.finalize(params.dunningId);
			default:
				throw new Error(`Finalize operation not supported for resource type: ${resourceType}`);
		}
	}

	private async executePursue(resource: any, resourceType: string, params: Record<string, any>): Promise<any> {
		switch (resourceType) {
			case LEXWARE_RESOURCE_TYPES.ORDER_CONFIRMATION:
				return resource.pursue(params.orderConfirmationId);
			case LEXWARE_RESOURCE_TYPES.INVOICE:
				return resource.pursue(params.invoiceId);
			case LEXWARE_RESOURCE_TYPES.CREDIT_NOTE:
				return resource.pursue(params.creditNoteId);
			default:
				throw new Error(`Pursue operation not supported for resource type: ${resourceType}`);
		}
	}

	private async executeDocument(resource: any, resourceType: string, params: Record<string, any>): Promise<any> {
		switch (resourceType) {
			case LEXWARE_RESOURCE_TYPES.DUNNING:
				return resource.document(params.dunningId);
			default:
				throw new Error(`Document operation not supported for resource type: ${resourceType}`);
		}
	}

	private async executeDownloadFile(resource: any, resourceType: string, params: Record<string, any>): Promise<any> {
		switch (resourceType) {
			case LEXWARE_RESOURCE_TYPES.DUNNING:
				return resource.downloadFile(params.dunningId, params.fileId);
			default:
				throw new Error(`Download file operation not supported for resource type: ${resourceType}`);
		}
	}

	validateOperation(resourceType: string, operation: string, params: Record<string, any>): string[] {
		const resource = this.getResource(resourceType);
		
		if (operation === 'create') {
			switch (resourceType) {
				case LEXWARE_RESOURCE_TYPES.CONTACT:
					return resource.validateCreateData(params.contactType, params.additionalFields || {});
				case LEXWARE_RESOURCE_TYPES.ARTICLE:
					return resource.validateCreateData(params.additionalFields || {});
				case LEXWARE_RESOURCE_TYPES.VOUCHER:
					return resource.validateCreateData(params.voucherType, params.additionalFields || {});
				case LEXWARE_RESOURCE_TYPES.INVOICE:
					return resource.validateCreateData(params.additionalFields || {});
				case LEXWARE_RESOURCE_TYPES.QUOTATION:
					return resource.validateCreateData(params.additionalFields || {});
				case LEXWARE_RESOURCE_TYPES.CREDIT_NOTE:
					return resource.validateCreateData(params.additionalFields || {});
				case LEXWARE_RESOURCE_TYPES.DELIVERY_NOTE:
					return resource.validateCreateData(params.additionalFields || {});
				case LEXWARE_RESOURCE_TYPES.DUNNING:
					return resource.validateCreateData(params.additionalFields || {});
				case LEXWARE_RESOURCE_TYPES.PAYMENT_CONDITION:
					return resource.validateCreateData(params.additionalFields || {});
				case LEXWARE_RESOURCE_TYPES.POSTING_CATEGORY:
					return resource.validateCreateData(params.additionalFields || {});
				case LEXWARE_RESOURCE_TYPES.PAYMENT:
					return resource.validatePaymentData(params.additionalFields || {});
				case LEXWARE_RESOURCE_TYPES.EVENT_SUBSCRIPTION:
					return resource.validateCreateData(params.additionalFields || {});
				default:
					return [];
			}
		}
		
		return [];
	}
}
