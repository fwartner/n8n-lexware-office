import { LexwareApiClient } from '../utils/api';
import { LexwareDataTransformer } from '../utils/transformers';
import { ILexwareArticle, ILexwareCredentials } from '../types';
import { LEXWARE_API_ENDPOINTS } from '../constants';

export class ArticleResource {
	private apiClient: LexwareApiClient;

	constructor(credentials: ILexwareCredentials) {
		this.apiClient = new LexwareApiClient(credentials);
	}

	async get(articleId: string): Promise<ILexwareArticle> {
		return this.apiClient.get<ILexwareArticle>(`${LEXWARE_API_ENDPOINTS.ARTICLES}/${articleId}`);
	}

	async getAll(params?: Record<string, any>): Promise<ILexwareArticle[]> {
		return this.apiClient.get<ILexwareArticle[]>(LEXWARE_API_ENDPOINTS.ARTICLES, params);
	}

	async create(additionalFields: Record<string, any>): Promise<ILexwareArticle> {
		const articleData = LexwareDataTransformer.transformArticleData(additionalFields);
		return this.apiClient.post<ILexwareArticle>(LEXWARE_API_ENDPOINTS.ARTICLES, articleData);
	}

	async update(articleId: string, additionalFields: Record<string, any>): Promise<ILexwareArticle> {
		const sanitizedData = LexwareDataTransformer.sanitizeUpdateData(additionalFields);
		return this.apiClient.put<ILexwareArticle>(`${LEXWARE_API_ENDPOINTS.ARTICLES}/${articleId}`, sanitizedData);
	}

	async delete(articleId: string): Promise<void> {
		return this.apiClient.delete<void>(`${LEXWARE_API_ENDPOINTS.ARTICLES}/${articleId}`);
	}

	validateCreateData(additionalFields: Record<string, any>): string[] {
		const requiredFields = ['name', 'type', 'unitName', 'price'];
		return LexwareDataTransformer.validateRequiredFields(additionalFields, requiredFields);
	}
}
