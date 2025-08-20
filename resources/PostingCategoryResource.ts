import { LexwareApiClient } from '../utils/api';
import { LexwareDataTransformer } from '../utils/transformers';
import { ILexwarePostingCategory, ILexwareCredentials } from '../types';
import { 
	LEXWARE_API_ENDPOINTS,
	LEXWARE_POSTING_CATEGORY_TYPES,
	LEXWARE_POSTING_CATEGORY_STATUSES
} from '../constants';

export class PostingCategoryResource {
	private apiClient: LexwareApiClient;

	constructor(credentials: ILexwareCredentials) {
		this.apiClient = new LexwareApiClient(credentials);
	}

	/**
	 * Retrieve a specific posting category by ID
	 * @param postingCategoryId - The unique identifier of the posting category
	 * @returns Promise<ILexwarePostingCategory> - The posting category data
	 */
	async get(postingCategoryId: string): Promise<ILexwarePostingCategory> {
		return this.apiClient.get<ILexwarePostingCategory>(`${LEXWARE_API_ENDPOINTS.POSTING_CATEGORIES}/${postingCategoryId}`);
	}

	/**
	 * Retrieve all posting categories with optional filtering and pagination
	 * @param params - Optional parameters for filtering and pagination
	 * @returns Promise<ILexwarePostingCategory[]> - Array of posting categories
	 */
	async getAll(params?: Record<string, any>): Promise<ILexwarePostingCategory[]> {
		return this.apiClient.get<ILexwarePostingCategory[]>(LEXWARE_API_ENDPOINTS.POSTING_CATEGORIES, params);
	}

	/**
	 * Get posting categories by type
	 * @param type - The posting category type to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePostingCategory[]> - Filtered posting categories
	 */
	async getByType(type: string, params?: Record<string, any>): Promise<ILexwarePostingCategory[]> {
		const typeParams = {
			...params,
			type,
		};
		return this.apiClient.get<ILexwarePostingCategory[]>(LEXWARE_API_ENDPOINTS.POSTING_CATEGORIES, typeParams);
	}

	/**
	 * Get income posting categories
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePostingCategory[]> - Income posting categories
	 */
	async getIncomeCategories(params?: Record<string, any>): Promise<ILexwarePostingCategory[]> {
		return this.getByType(LEXWARE_POSTING_CATEGORY_TYPES.INCOME, params);
	}

	/**
	 * Get expense posting categories
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePostingCategory[]> - Expense posting categories
	 */
	async getExpenseCategories(params?: Record<string, any>): Promise<ILexwarePostingCategory[]> {
		return this.getByType(LEXWARE_POSTING_CATEGORY_TYPES.EXPENSE, params);
	}

	/**
	 * Get asset posting categories
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePostingCategory[]> - Asset posting categories
	 */
	async getAssetCategories(params?: Record<string, any>): Promise<ILexwarePostingCategory[]> {
		return this.getByType(LEXWARE_POSTING_CATEGORY_TYPES.ASSET, params);
	}

	/**
	 * Get liability posting categories
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePostingCategory[]> - Liability posting categories
	 */
	async getLiabilityCategories(params?: Record<string, any>): Promise<ILexwarePostingCategory[]> {
		return this.getByType(LEXWARE_POSTING_CATEGORY_TYPES.LIABILITY, params);
	}

	/**
	 * Get equity posting categories
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePostingCategory[]> - Equity posting categories
	 */
	async getEquityCategories(params?: Record<string, any>): Promise<ILexwarePostingCategory[]> {
		return this.getByType(LEXWARE_POSTING_CATEGORY_TYPES.EQUITY, params);
	}

	/**
	 * Get posting categories by status
	 * @param status - The posting category status to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePostingCategory[]> - Filtered posting categories
	 */
	async getByStatus(status: string, params?: Record<string, any>): Promise<ILexwarePostingCategory[]> {
		const statusParams = {
			...params,
			status,
		};
		return this.apiClient.get<ILexwarePostingCategory[]>(LEXWARE_API_ENDPOINTS.POSTING_CATEGORIES, statusParams);
	}

	/**
	 * Get active posting categories
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePostingCategory[]> - Active posting categories
	 */
	async getActive(params?: Record<string, any>): Promise<ILexwarePostingCategory[]> {
		return this.getByStatus(LEXWARE_POSTING_CATEGORY_STATUSES.ACTIVE, params);
	}

	/**
	 * Get inactive posting categories
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePostingCategory[]> - Inactive posting categories
	 */
	async getInactive(params?: Record<string, any>): Promise<ILexwarePostingCategory[]> {
		return this.getByStatus(LEXWARE_POSTING_CATEGORY_STATUSES.INACTIVE, params);
	}

	/**
	 * Get archived posting categories
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePostingCategory[]> - Archived posting categories
	 */
	async getArchived(params?: Record<string, any>): Promise<ILexwarePostingCategory[]> {
		return this.getByStatus(LEXWARE_POSTING_CATEGORY_STATUSES.ARCHIVED, params);
	}

	/**
	 * Get posting categories by parent ID
	 * @param parentId - The parent category ID to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePostingCategory[]> - Filtered posting categories
	 */
	async getByParent(parentId: string, params?: Record<string, any>): Promise<ILexwarePostingCategory[]> {
		const parentParams = {
			...params,
			parentId,
		};
		return this.apiClient.get<ILexwarePostingCategory[]>(LEXWARE_API_ENDPOINTS.POSTING_CATEGORIES, parentParams);
	}

	/**
	 * Get root posting categories (no parent)
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePostingCategory[]> - Root posting categories
	 */
	async getRootCategories(params?: Record<string, any>): Promise<ILexwarePostingCategory[]> {
		const rootParams = {
			...params,
			parentId: null,
		};
		return this.apiClient.get<ILexwarePostingCategory[]>(LEXWARE_API_ENDPOINTS.POSTING_CATEGORIES, rootParams);
	}

	/**
	 * Get posting categories by level
	 * @param level - The hierarchy level to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePostingCategory[]> - Filtered posting categories
	 */
	async getByLevel(level: number, params?: Record<string, any>): Promise<ILexwarePostingCategory[]> {
		const levelParams = {
			...params,
			level,
		};
		return this.apiClient.get<ILexwarePostingCategory[]>(LEXWARE_API_ENDPOINTS.POSTING_CATEGORIES, levelParams);
	}

	/**
	 * Get posting categories by account number
	 * @param accountNumber - The account number to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePostingCategory[]> - Filtered posting categories
	 */
	async getByAccountNumber(accountNumber: string, params?: Record<string, any>): Promise<ILexwarePostingCategory[]> {
		const accountParams = {
			...params,
			accountNumber,
		};
		return this.apiClient.get<ILexwarePostingCategory[]>(LEXWARE_API_ENDPOINTS.POSTING_CATEGORIES, accountParams);
	}

	/**
	 * Get posting categories by tax type
	 * @param taxType - The tax type to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePostingCategory[]> - Filtered posting categories
	 */
	async getByTaxType(taxType: string, params?: Record<string, any>): Promise<ILexwarePostingCategory[]> {
		const taxParams = {
			...params,
			taxType,
		};
		return this.apiClient.get<ILexwarePostingCategory[]>(LEXWARE_API_ENDPOINTS.POSTING_CATEGORIES, taxParams);
	}

	/**
	 * Get default posting categories
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePostingCategory[]> - Default posting categories
	 */
	async getDefaults(params?: Record<string, any>): Promise<ILexwarePostingCategory[]> {
		const defaultParams = {
			...params,
			isDefault: true,
		};
		return this.apiClient.get<ILexwarePostingCategory[]>(LEXWARE_API_ENDPOINTS.POSTING_CATEGORIES, defaultParams);
	}

	/**
	 * Get system posting categories
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePostingCategory[]> - System posting categories
	 */
	async getSystemCategories(params?: Record<string, any>): Promise<ILexwarePostingCategory[]> {
		const systemParams = {
			...params,
			isSystem: true,
		};
		return this.apiClient.get<ILexwarePostingCategory[]>(LEXWARE_API_ENDPOINTS.POSTING_CATEGORIES, systemParams);
	}

	/**
	 * Get editable posting categories
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePostingCategory[]> - Editable posting categories
	 */
	async getEditable(params?: Record<string, any>): Promise<ILexwarePostingCategory[]> {
		const editableParams = {
			...params,
			isEditable: true,
		};
		return this.apiClient.get<ILexwarePostingCategory[]>(LEXWARE_API_ENDPOINTS.POSTING_CATEGORIES, editableParams);
	}

	/**
	 * Search posting categories by text
	 * @param searchTerm - The search term to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePostingCategory[]> - Search results
	 */
	async search(searchTerm: string, params?: Record<string, any>): Promise<ILexwarePostingCategory[]> {
		const searchParams = {
			...params,
			q: searchTerm,
		};
		return this.apiClient.get<ILexwarePostingCategory[]>(LEXWARE_API_ENDPOINTS.POSTING_CATEGORIES, searchParams);
	}

	/**
	 * Get posting categories by language
	 * @param language - The language to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePostingCategory[]> - Filtered posting categories
	 */
	async getByLanguage(language: string, params?: Record<string, any>): Promise<ILexwarePostingCategory[]> {
		const languageParams = {
			...params,
			language,
		};
		return this.apiClient.get<ILexwarePostingCategory[]>(LEXWARE_API_ENDPOINTS.POSTING_CATEGORIES, languageParams);
	}

	/**
	 * Get posting categories by usage count range
	 * @param minUsage - Minimum usage count for filtering
	 * @param maxUsage - Maximum usage count for filtering
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePostingCategory[]> - Filtered posting categories
	 */
	async getByUsageRange(minUsage: number, maxUsage: number, params?: Record<string, any>): Promise<ILexwarePostingCategory[]> {
		const usageParams = {
			...params,
			usageCountFrom: minUsage,
			usageCountTo: maxUsage,
		};
		return this.apiClient.get<ILexwarePostingCategory[]>(LEXWARE_API_ENDPOINTS.POSTING_CATEGORIES, usageParams);
	}

	/**
	 * Get posting categories by last used date range
	 * @param startDate - Start date for filtering
	 * @param endDate - End date for filtering
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePostingCategory[]> - Filtered posting categories
	 */
	async getByLastUsedRange(startDate: string, endDate: string, params?: Record<string, any>): Promise<ILexwarePostingCategory[]> {
		const lastUsedParams = {
			...params,
			lastUsedFrom: startDate,
			lastUsedTo: endDate,
		};
		return this.apiClient.get<ILexwarePostingCategory[]>(LEXWARE_API_ENDPOINTS.POSTING_CATEGORIES, lastUsedParams);
	}

	/**
	 * Get posting category hierarchy
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePostingCategory[]> - Hierarchical posting categories
	 */
	async getHierarchy(params?: Record<string, any>): Promise<ILexwarePostingCategory[]> {
		const hierarchyParams = {
			...params,
			includeHierarchy: true,
		};
		return this.apiClient.get<ILexwarePostingCategory[]>(LEXWARE_API_ENDPOINTS.POSTING_CATEGORIES, hierarchyParams);
	}

	/**
	 * Get posting categories with children
	 * @param parentId - The parent category ID
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePostingCategory[]> - Posting categories with children
	 */
	async getWithChildren(parentId: string, params?: Record<string, any>): Promise<ILexwarePostingCategory[]> {
		const childrenParams = {
			...params,
			includeChildren: true,
			parentId,
		};
		return this.apiClient.get<ILexwarePostingCategory[]>(LEXWARE_API_ENDPOINTS.POSTING_CATEGORIES, childrenParams);
	}

	/**
	 * Get posting categories by tag
	 * @param tag - The tag to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwarePostingCategory[]> - Filtered posting categories
	 */
	async getByTag(tag: string, params?: Record<string, any>): Promise<ILexwarePostingCategory[]> {
		const tagParams = {
			...params,
			tag,
		};
		return this.apiClient.get<ILexwarePostingCategory[]>(LEXWARE_API_ENDPOINTS.POSTING_CATEGORIES, tagParams);
	}

	/**
	 * Validate posting category creation data
	 * @param postingCategoryData - The data to validate
	 * @returns string[] - Array of validation error messages
	 */
	validateCreateData(postingCategoryData: Record<string, any>): string[] {
		const errors: string[] = [];
		
		// Required fields validation
		if (!postingCategoryData.name || postingCategoryData.name.trim() === '') {
			errors.push('Posting category name is required');
		}
		
		if (!postingCategoryData.type || !Object.values(LEXWARE_POSTING_CATEGORY_TYPES).includes(postingCategoryData.type)) {
			errors.push('Valid posting category type is required');
		}
		
		if (!postingCategoryData.status || !Object.values(LEXWARE_POSTING_CATEGORY_STATUSES).includes(postingCategoryData.status)) {
			errors.push('Valid posting category status is required');
		}
		
		// Name length validation
		if (postingCategoryData.name && postingCategoryData.name.length > 100) {
			errors.push('Posting category name must be 100 characters or less');
		}
		
		// Description length validation
		if (postingCategoryData.description && postingCategoryData.description.length > 500) {
			errors.push('Posting category description must be 500 characters or less');
		}
		
		// Number format validation
		if (postingCategoryData.number && !/^[A-Z0-9\-_]+$/i.test(postingCategoryData.number)) {
			errors.push('Posting category number must contain only alphanumeric characters, hyphens, and underscores');
		}
		
		// Tax rate validation
		if (postingCategoryData.taxRate !== undefined && (isNaN(postingCategoryData.taxRate) || postingCategoryData.taxRate < 0 || postingCategoryData.taxRate > 100)) {
			errors.push('Tax rate must be a number between 0 and 100');
		}
		
		// Account number validation
		if (postingCategoryData.accountNumber && !/^[0-9\-_]+$/.test(postingCategoryData.accountNumber)) {
			errors.push('Account number must contain only numbers, hyphens, and underscores');
		}
		
		return errors;
	}

	/**
	 * Validate posting category update data
	 * @param updateData - The data to validate
	 * @returns string[] - Array of validation error messages
	 */
	validateUpdateData(updateData: Record<string, any>): string[] {
		const errors: string[] = [];
		
		// Name length validation
		if (updateData.name && updateData.name.length > 100) {
			errors.push('Posting category name must be 100 characters or less');
		}
		
		// Description length validation
		if (updateData.description && updateData.description.length > 500) {
			errors.push('Posting category description must be 500 characters or less');
		}
		
		// Type validation
		if (updateData.type && !Object.values(LEXWARE_POSTING_CATEGORY_TYPES).includes(updateData.type)) {
			errors.push('Invalid posting category type');
		}
		
		// Status validation
		if (updateData.status && !Object.values(LEXWARE_POSTING_CATEGORY_STATUSES).includes(updateData.status)) {
			errors.push('Invalid posting category status');
		}
		
		// Number format validation
		if (updateData.number && !/^[A-Z0-9\-_]+$/i.test(updateData.number)) {
			errors.push('Posting category number must contain only alphanumeric characters, hyphens, and underscores');
		}
		
		// Tax rate validation
		if (updateData.taxRate !== undefined && (isNaN(updateData.taxRate) || updateData.taxRate < 0 || updateData.taxRate > 100)) {
			errors.push('Tax rate must be a number between 0 and 100');
		}
		
		// Account number validation
		if (updateData.accountNumber && !/^[0-9\-_]+$/.test(updateData.accountNumber)) {
			errors.push('Account number must contain only numbers, hyphens, and underscores');
		}
		
		return errors;
	}
}
