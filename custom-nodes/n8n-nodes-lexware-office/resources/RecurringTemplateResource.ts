import { ILexwareRecurringTemplate, ILexwareCredentials } from '../types';
import { LexwareApiClient } from '../utils/api';
import { LEXWARE_API_ENDPOINTS } from '../constants';

export class RecurringTemplateResource {
	private apiClient: LexwareApiClient;

	constructor(credentials: ILexwareCredentials) {
		this.apiClient = new LexwareApiClient(credentials);
	}

	/**
	 * Get a specific recurring template by ID
	 */
	async get(templateId: string): Promise<ILexwareRecurringTemplate> {
		return this.apiClient.get<ILexwareRecurringTemplate>(`${LEXWARE_API_ENDPOINTS.RECURRING_TEMPLATES}/${templateId}`);
	}

	/**
	 * Get all recurring templates with optional filtering
	 */
	async getAll(params?: Record<string, any>): Promise<ILexwareRecurringTemplate[]> {
		const queryParams = new URLSearchParams();
		
		if (params?.templateType) queryParams.append('templateType', params.templateType);
		if (params?.status) queryParams.append('status', params.status);
		if (params?.contactId) queryParams.append('contactId', params.contactId);
		if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString());
		if (params?.recurrenceType) queryParams.append('recurrenceType', params.recurrenceType);
		if (params?.category) queryParams.append('category', params.category);
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());
		if (params?.sort) queryParams.append('sort', params.sort);

		const url = queryParams.toString() ? `${LEXWARE_API_ENDPOINTS.RECURRING_TEMPLATES}?${queryParams.toString()}` : LEXWARE_API_ENDPOINTS.RECURRING_TEMPLATES;
		return this.apiClient.get<ILexwareRecurringTemplate[]>(url);
	}

	/**
	 * Get recurring templates by type
	 */
	async getByType(templateType: string, params?: Record<string, any>): Promise<ILexwareRecurringTemplate[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('templateType', templateType);
		
		if (params?.status) queryParams.append('status', params.status);
		if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString());
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareRecurringTemplate[]>(`${LEXWARE_API_ENDPOINTS.RECURRING_TEMPLATES}?${queryParams.toString()}`);
	}

	/**
	 * Get recurring templates by status
	 */
	async getByStatus(status: string, params?: Record<string, any>): Promise<ILexwareRecurringTemplate[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('status', status);
		
		if (params?.templateType) queryParams.append('templateType', params.templateType);
		if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString());
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareRecurringTemplate[]>(`${LEXWARE_API_ENDPOINTS.RECURRING_TEMPLATES}?${queryParams.toString()}`);
	}

	/**
	 * Get active recurring templates
	 */
	async getActive(params?: Record<string, any>): Promise<ILexwareRecurringTemplate[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('isActive', 'true');
		
		if (params?.templateType) queryParams.append('templateType', params.templateType);
		if (params?.status) queryParams.append('status', params.status);
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareRecurringTemplate[]>(`${LEXWARE_API_ENDPOINTS.RECURRING_TEMPLATES}?${queryParams.toString()}`);
	}

	/**
	 * Get recurring templates by contact
	 */
	async getByContact(contactId: string, params?: Record<string, any>): Promise<ILexwareRecurringTemplate[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('contactId', contactId);
		
		if (params?.templateType) queryParams.append('templateType', params.templateType);
		if (params?.status) queryParams.append('status', params.status);
		if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString());
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareRecurringTemplate[]>(`${LEXWARE_API_ENDPOINTS.RECURRING_TEMPLATES}?${queryParams.toString()}`);
	}

	/**
	 * Get recurring templates by recurrence type
	 */
	async getByRecurrenceType(recurrenceType: string, params?: Record<string, any>): Promise<ILexwareRecurringTemplate[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('recurrenceType', recurrenceType);
		
		if (params?.templateType) queryParams.append('templateType', params.templateType);
		if (params?.status) queryParams.append('status', params.status);
		if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString());
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareRecurringTemplate[]>(`${LEXWARE_API_ENDPOINTS.RECURRING_TEMPLATES}?${queryParams.toString()}`);
	}

	/**
	 * Get recurring templates by category
	 */
	async getByCategory(category: string, params?: Record<string, any>): Promise<ILexwareRecurringTemplate[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('category', category);
		
		if (params?.templateType) queryParams.append('templateType', params.templateType);
		if (params?.status) queryParams.append('status', params.status);
		if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString());
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareRecurringTemplate[]>(`${LEXWARE_API_ENDPOINTS.RECURRING_TEMPLATES}?${queryParams.toString()}`);
	}

	/**
	 * Search recurring templates by name or description
	 */
	async search(searchTerm: string, params?: Record<string, any>): Promise<ILexwareRecurringTemplate[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('search', searchTerm);
		
		if (params?.templateType) queryParams.append('templateType', params.templateType);
		if (params?.status) queryParams.append('status', params.status);
		if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString());
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareRecurringTemplate[]>(`${LEXWARE_API_ENDPOINTS.RECURRING_TEMPLATES}?${queryParams.toString()}`);
	}

	/**
	 * Get recurring templates expiring soon
	 */
	async getExpiringSoon(days: number = 30, params?: Record<string, any>): Promise<ILexwareRecurringTemplate[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('expiringWithinDays', days.toString());
		
		if (params?.templateType) queryParams.append('templateType', params.templateType);
		if (params?.status) queryParams.append('status', params.status);
		if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString());
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareRecurringTemplate[]>(`${LEXWARE_API_ENDPOINTS.RECURRING_TEMPLATES}?${queryParams.toString()}`);
	}

	/**
	 * Get recurring templates with high generation count
	 */
	async getWithHighGenerationCount(minCount: number = 10, params?: Record<string, any>): Promise<ILexwareRecurringTemplate[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('minGenerationCount', minCount.toString());
		
		if (params?.templateType) queryParams.append('templateType', params.templateType);
		if (params?.status) queryParams.append('status', params.status);
		if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString());
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareRecurringTemplate[]>(`${LEXWARE_API_ENDPOINTS.RECURRING_TEMPLATES}?${queryParams.toString()}`);
	}

	/**
	 * Get recurring templates by language
	 */
	async getByLanguage(language: string, params?: Record<string, any>): Promise<ILexwareRecurringTemplate[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('language', language);
		
		if (params?.templateType) queryParams.append('templateType', params.templateType);
		if (params?.status) queryParams.append('status', params.status);
		if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString());
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareRecurringTemplate[]>(`${LEXWARE_API_ENDPOINTS.RECURRING_TEMPLATES}?${queryParams.toString()}`);
	}

	/**
	 * Get recurring templates by currency
	 */
	async getByCurrency(currency: string, params?: Record<string, any>): Promise<ILexwareRecurringTemplate[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('currency', currency);
		
		if (params?.templateType) queryParams.append('templateType', params.templateType);
		if (params?.status) queryParams.append('status', params.status);
		if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString());
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareRecurringTemplate[]>(`${LEXWARE_API_ENDPOINTS.RECURRING_TEMPLATES}?${queryParams.toString()}`);
	}

	/**
	 * Get recurring templates by tag
	 */
	async getByTag(tag: string, params?: Record<string, any>): Promise<ILexwareRecurringTemplate[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('tag', tag);
		
		if (params?.templateType) queryParams.append('templateType', params.templateType);
		if (params?.status) queryParams.append('status', params.status);
		if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString());
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareRecurringTemplate[]>(`${LEXWARE_API_ENDPOINTS.RECURRING_TEMPLATES}?${queryParams.toString()}`);
	}

	/**
	 * Get recurring templates statistics
	 */
	async getStatistics(params?: Record<string, any>): Promise<any> {
		const queryParams = new URLSearchParams();
		
		if (params?.templateType) queryParams.append('templateType', params.templateType);
		if (params?.status) queryParams.append('status', params.status);
		if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString());
		if (params?.recurrenceType) queryParams.append('recurrenceType', params.recurrenceType);
		if (params?.category) queryParams.append('category', params.category);

		const url = queryParams.toString() ? `${LEXWARE_API_ENDPOINTS.RECURRING_TEMPLATES}/statistics?${queryParams.toString()}` : `${LEXWARE_API_ENDPOINTS.RECURRING_TEMPLATES}/statistics`;
		return this.apiClient.get<any>(url);
	}

	/**
	 * Validate recurring template data
	 */
	validateTemplateData(templateData: Record<string, any>): string[] {
		const errors: string[] = [];

		if (!templateData.name || templateData.name.trim() === '') {
			errors.push('Template name is required');
		}

		if (!templateData.templateType) {
			errors.push('Template type is required');
		}

		if (!templateData.recurrenceType) {
			errors.push('Recurrence type is required');
		}

		if (!templateData.recurrenceInterval || templateData.recurrenceInterval <= 0) {
			errors.push('Valid recurrence interval is required');
		}

		if (templateData.recurrenceType === 'weekly' && (!templateData.recurrenceDayOfWeek || templateData.recurrenceDayOfWeek < 1 || templateData.recurrenceDayOfWeek > 7)) {
			errors.push('Valid recurrence day of week (1-7) is required for weekly recurrence');
		}

		if (templateData.recurrenceType === 'monthly' && (!templateData.recurrenceDayOfMonth || templateData.recurrenceDayOfMonth < 1 || templateData.recurrenceDayOfMonth > 31)) {
			errors.push('Valid recurrence day of month (1-31) is required for monthly recurrence');
		}

		if (templateData.recurrenceType === 'yearly' && (!templateData.recurrenceMonthOfYear || templateData.recurrenceMonthOfYear < 1 || templateData.recurrenceMonthOfYear > 12)) {
			errors.push('Valid recurrence month of year (1-12) is required for yearly recurrence');
		}

		if (templateData.recurrenceEndDate && !this.isValidDate(templateData.recurrenceEndDate)) {
			errors.push('Valid recurrence end date format is required');
		}

		if (templateData.recurrenceMaxOccurrences && (templateData.recurrenceMaxOccurrences <= 0 || templateData.recurrenceMaxOccurrences > 1000)) {
			errors.push('Recurrence max occurrences must be between 1 and 1000');
		}

		if (templateData.contactId && templateData.contactId.trim() === '') {
			errors.push('Valid contact ID is required if provided');
		}

		if (templateData.currency && !this.isValidCurrency(templateData.currency)) {
			errors.push('Valid currency code is required');
		}

		if (templateData.language && !this.isValidLanguage(templateData.language)) {
			errors.push('Valid language code is required');
		}

		if (templateData.note && templateData.note.length > 1000) {
			errors.push('Note must not exceed 1000 characters');
		}

		if (templateData.title && templateData.title.length > 200) {
			errors.push('Title must not exceed 200 characters');
		}

		return errors;
	}

	/**
	 * Helper validation methods
	 */
	private isValidDate(date: string): boolean {
		const dateObj = new Date(date);
		return dateObj instanceof Date && !isNaN(dateObj.getTime());
	}

	private isValidCurrency(currency: string): boolean {
		const validCurrencies = ['EUR', 'USD', 'GBP', 'CHF', 'CAD', 'AUD', 'JPY', 'CNY'];
		return validCurrencies.includes(currency.toUpperCase());
	}

	private isValidLanguage(language: string): boolean {
		const validLanguages = ['de', 'en', 'fr', 'it', 'es', 'nl', 'pl', 'pt', 'ru', 'zh', 'ja', 'ko'];
		return validLanguages.includes(language.toLowerCase());
	}
}
