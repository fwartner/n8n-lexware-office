import { ILexwareCredentials } from '../types';
import { ContactResource } from './ContactResource';
import { ArticleResource } from './ArticleResource';
import { VoucherResource } from './VoucherResource';
import { InvoiceResource } from './InvoiceResource';
import { QuotationResource } from './QuotationResource';
import { CreditNoteResource } from './CreditNoteResource';
import { DeliveryNoteResource } from './DeliveryNoteResource';
import { DunningResource } from './DunningResource';
import { FileResource } from './FileResource';
import { ProfileResource } from './ProfileResource';
import { CountryResource } from './CountryResource';
import { PaymentConditionResource } from './PaymentConditionResource';
import { EventSubscriptionResource } from './EventSubscriptionResource';
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
		this.resources.set(LEXWARE_RESOURCE_TYPES.QUOTATION, new QuotationResource(this.credentials));
		this.resources.set(LEXWARE_RESOURCE_TYPES.CREDIT_NOTE, new CreditNoteResource(this.credentials));
		this.resources.set(LEXWARE_RESOURCE_TYPES.DELIVERY_NOTE, new DeliveryNoteResource(this.credentials));
		this.resources.set(LEXWARE_RESOURCE_TYPES.DUNNING, new DunningResource(this.credentials));
		this.resources.set(LEXWARE_RESOURCE_TYPES.FILE, new FileResource(this.credentials));
		this.resources.set(LEXWARE_RESOURCE_TYPES.PROFILE, new ProfileResource(this.credentials));
		this.resources.set(LEXWARE_RESOURCE_TYPES.COUNTRY, new CountryResource(this.credentials));
		this.resources.set(LEXWARE_RESOURCE_TYPES.PAYMENT_CONDITION, new PaymentConditionResource(this.credentials));
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
				case LEXWARE_RESOURCE_TYPES.EVENT_SUBSCRIPTION:
					return resource.validateCreateData(params.additionalFields || {});
				default:
					return [];
			}
		}
		
		return [];
	}
}
