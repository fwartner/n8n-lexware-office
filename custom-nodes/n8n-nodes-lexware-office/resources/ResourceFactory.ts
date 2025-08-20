import { ILexwareCredentials } from '../types';
import { ContactResource } from './ContactResource';
import { ArticleResource } from './ArticleResource';
import { VoucherResource } from './VoucherResource';
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
			default:
				throw new Error(`Get operation not supported for resource type: ${resourceType}`);
		}
	}

	private async executeGetAll(resource: any, resourceType: string, params: Record<string, any>): Promise<any> {
		const paginationParams = this.buildPaginationParams(params);
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
				default:
					return [];
			}
		}
		
		return [];
	}
}
