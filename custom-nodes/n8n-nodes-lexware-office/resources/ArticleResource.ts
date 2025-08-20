import { LexwareApiClient } from '../utils/api';
import { LexwareDataTransformer } from '../utils/transformers';
import { ILexwareArticle, ILexwareCredentials } from '../types';
import { LEXWARE_API_ENDPOINTS, LEXWARE_ARTICLE_TYPES } from '../constants';

export class ArticleResource {
	private apiClient: LexwareApiClient;

	constructor(credentials: ILexwareCredentials) {
		this.apiClient = new LexwareApiClient(credentials);
	}

	/**
	 * Retrieve a specific article by ID
	 * @param articleId - The unique identifier of the article
	 * @returns Promise<ILexwareArticle> - The article data
	 */
	async get(articleId: string): Promise<ILexwareArticle> {
		return this.apiClient.get<ILexwareArticle>(`${LEXWARE_API_ENDPOINTS.ARTICLES}/${articleId}`);
	}

	/**
	 * Retrieve all articles with optional filtering and pagination
	 * @param params - Optional parameters for filtering and pagination
	 * @returns Promise<ILexwareArticle[]> - Array of articles
	 */
	async getAll(params?: Record<string, any>): Promise<ILexwareArticle[]> {
		return this.apiClient.get<ILexwareArticle[]>(LEXWARE_API_ENDPOINTS.ARTICLES, params);
	}

	/**
	 * Create a new article
	 * @param additionalFields - Article data including required fields
	 * @returns Promise<ILexwareArticle> - The created article
	 */
	async create(additionalFields: Record<string, any>): Promise<ILexwareArticle> {
		const articleData = LexwareDataTransformer.transformArticleData(additionalFields);
		return this.apiClient.post<ILexwareArticle>(LEXWARE_API_ENDPOINTS.ARTICLES, articleData);
	}

	/**
	 * Update an existing article
	 * @param articleId - The unique identifier of the article to update
	 * @param additionalFields - Updated article data
	 * @returns Promise<ILexwareArticle> - The updated article
	 */
	async update(articleId: string, additionalFields: Record<string, any>): Promise<ILexwareArticle> {
		const sanitizedData = LexwareDataTransformer.sanitizeUpdateData(additionalFields);
		return this.apiClient.put<ILexwareArticle>(`${LEXWARE_API_ENDPOINTS.ARTICLES}/${articleId}`, sanitizedData);
	}

	/**
	 * Delete an article
	 * @param articleId - The unique identifier of the article to delete
	 * @returns Promise<void>
	 */
	async delete(articleId: string): Promise<void> {
		return this.apiClient.delete<void>(`${LEXWARE_API_ENDPOINTS.ARTICLES}/${articleId}`);
	}

	/**
	 * Search articles by name or description
	 * @param searchTerm - The search term to filter articles
	 * @param params - Additional search parameters
	 * @returns Promise<ILexwareArticle[]> - Filtered articles
	 */
	async search(searchTerm: string, params?: Record<string, any>): Promise<ILexwareArticle[]> {
		const searchParams = {
			...params,
			q: searchTerm,
		};
		return this.apiClient.get<ILexwareArticle[]>(LEXWARE_API_ENDPOINTS.ARTICLES, searchParams);
	}

	/**
	 * Get articles by category
	 * @param categoryId - The category ID to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareArticle[]> - Articles in the specified category
	 */
	async getByCategory(categoryId: string, params?: Record<string, any>): Promise<ILexwareArticle[]> {
		const categoryParams = {
			...params,
			categoryId,
		};
		return this.apiClient.get<ILexwareArticle[]>(LEXWARE_API_ENDPOINTS.ARTICLES, categoryParams);
	}

	/**
	 * Get articles by type (service, material, custom)
	 * @param type - The article type to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareArticle[]> - Articles of the specified type
	 */
	async getByType(type: keyof typeof LEXWARE_ARTICLE_TYPES, params?: Record<string, any>): Promise<ILexwareArticle[]> {
		const typeParams = {
			...params,
			type: LEXWARE_ARTICLE_TYPES[type],
		};
		return this.apiClient.get<ILexwareArticle[]>(LEXWARE_API_ENDPOINTS.ARTICLES, typeParams);
	}

	/**
	 * Get archived articles
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareArticle[]> - Archived articles
	 */
	async getArchived(params?: Record<string, any>): Promise<ILexwareArticle[]> {
		const archivedParams = {
			...params,
			archived: true,
		};
		return this.apiClient.get<ILexwareArticle[]>(LEXWARE_API_ENDPOINTS.ARTICLES, archivedParams);
	}

	/**
	 * Get active (non-archived) articles
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareArticle[]> - Active articles
	 */
	async getActive(params?: Record<string, any>): Promise<ILexwareArticle[]> {
		const activeParams = {
			...params,
			archived: false,
		};
		return this.apiClient.get<ILexwareArticle[]>(LEXWARE_API_ENDPOINTS.ARTICLES, activeParams);
	}

	/**
	 * Archive an article (soft delete)
	 * @param articleId - The unique identifier of the article to archive
	 * @returns Promise<ILexwareArticle> - The archived article
	 */
	async archive(articleId: string): Promise<ILexwareArticle> {
		return this.apiClient.put<ILexwareArticle>(`${LEXWARE_API_ENDPOINTS.ARTICLES}/${articleId}`, { archived: true });
	}

	/**
	 * Unarchive an article (restore from archive)
	 * @param articleId - The unique identifier of the article to unarchive
	 * @returns Promise<ILexwareArticle> - The unarchived article
	 */
	async unarchive(articleId: string): Promise<ILexwareArticle> {
		return this.apiClient.put<ILexwareArticle>(`${LEXWARE_API_ENDPOINTS.ARTICLES}/${articleId}`, { archived: false });
	}

	/**
	 * Validate required fields for article creation
	 * @param additionalFields - The article data to validate
	 * @returns string[] - Array of missing required field names
	 */
	validateCreateData(additionalFields: Record<string, any>): string[] {
		const requiredFields = ['title', 'type', 'unitName', 'price'];
		return LexwareDataTransformer.validateRequiredFields(additionalFields, requiredFields);
	}

	/**
	 * Validate article update data
	 * @param additionalFields - The article data to validate
	 * @returns string[] - Array of validation error messages
	 */
	validateUpdateData(additionalFields: Record<string, any>): string[] {
		const errors: string[] = [];
		
		// Validate article type if provided
		if (additionalFields.type && !Object.values(LEXWARE_ARTICLE_TYPES).includes(additionalFields.type)) {
			errors.push(`Invalid article type. Must be one of: ${Object.values(LEXWARE_ARTICLE_TYPES).join(', ')}`);
		}
		
		// Validate price structure if provided
		if (additionalFields.price) {
			if (additionalFields.price.taxRate && (additionalFields.price.taxRate < 0 || additionalFields.price.taxRate > 100)) {
				errors.push('Tax rate must be between 0 and 100');
			}
			if (additionalFields.price.leadingPrice && !['NET', 'GROSS'].includes(additionalFields.price.leadingPrice)) {
				errors.push('Leading price must be either NET or GROSS');
			}
		}
		
		return errors;
	}
}
