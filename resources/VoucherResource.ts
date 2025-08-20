import { LexwareApiClient } from '../utils/api';
import { LexwareDataTransformer } from '../utils/transformers';
import { ILexwareVoucher, ILexwareCredentials } from '../types';
import { LEXWARE_API_ENDPOINTS } from '../constants';

export class VoucherResource {
	private apiClient: LexwareApiClient;

	constructor(credentials: ILexwareCredentials) {
		this.apiClient = new LexwareApiClient(credentials);
	}

	/**
	 * Get a specific voucher by ID
	 */
	async get(voucherId: string): Promise<ILexwareVoucher> {
		return this.apiClient.get<ILexwareVoucher>(`${LEXWARE_API_ENDPOINTS.VOUCHERS}/${voucherId}`);
	}

	/**
	 * Get all vouchers with optional filtering
	 */
	async getAll(params?: Record<string, any>): Promise<ILexwareVoucher[]> {
		const queryParams = new URLSearchParams();
		
		if (params?.voucherType) queryParams.append('voucherType', params.voucherType);
		if (params?.voucherStatus) queryParams.append('voucherStatus', params.voucherStatus);
		if (params?.contactId) queryParams.append('contactId', params.contactId);
		if (params?.voucherDateFrom) queryParams.append('voucherDateFrom', params.voucherDateFrom);
		if (params?.voucherDateTo) queryParams.append('voucherDateTo', params.voucherDateTo);
		if (params?.shippingDateFrom) queryParams.append('shippingDateFrom', params.shippingDateFrom);
		if (params?.shippingDateTo) queryParams.append('shippingDateTo', params.shippingDateTo);
		if (params?.categoryId) queryParams.append('categoryId', params.categoryId);
		if (params?.taxType) queryParams.append('taxType', params.taxType);
		if (params?.currency) queryParams.append('currency', params.currency);
		if (params?.language) queryParams.append('language', params.language);
		if (params?.isRecurring !== undefined) queryParams.append('isRecurring', params.isRecurring.toString());
		if (params?.isXRechnung !== undefined) queryParams.append('isXRechnung', params.isXRechnung.toString());
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());
		if (params?.sort) queryParams.append('sort', params.sort);

		const url = queryParams.toString() ? `${LEXWARE_API_ENDPOINTS.VOUCHERS}?${queryParams.toString()}` : LEXWARE_API_ENDPOINTS.VOUCHERS;
		return this.apiClient.get<ILexwareVoucher[]>(url);
	}

	/**
	 * Create a new voucher
	 */
	async create(voucherType: string, additionalFields: Record<string, any>): Promise<ILexwareVoucher> {
		const voucherData = LexwareDataTransformer.transformVoucherData(voucherType, additionalFields);
		return this.apiClient.post<ILexwareVoucher>(LEXWARE_API_ENDPOINTS.VOUCHERS, voucherData);
	}

	/**
	 * Update an existing voucher
	 */
	async update(voucherId: string, additionalFields: Record<string, any>): Promise<ILexwareVoucher> {
		const sanitizedData = LexwareDataTransformer.sanitizeUpdateData(additionalFields);
		return this.apiClient.put<ILexwareVoucher>(`${LEXWARE_API_ENDPOINTS.VOUCHERS}/${voucherId}`, sanitizedData);
	}

	/**
	 * Delete a voucher
	 */
	async delete(voucherId: string): Promise<void> {
		return this.apiClient.delete<void>(`${LEXWARE_API_ENDPOINTS.VOUCHERS}/${voucherId}`);
	}

	/**
	 * Get vouchers by type
	 */
	async getByType(voucherType: string, params?: Record<string, any>): Promise<ILexwareVoucher[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('voucherType', voucherType);
		
		if (params?.voucherStatus) queryParams.append('voucherStatus', params.voucherStatus);
		if (params?.contactId) queryParams.append('contactId', params.contactId);
		if (params?.voucherDateFrom) queryParams.append('voucherDateFrom', params.voucherDateFrom);
		if (params?.voucherDateTo) queryParams.append('voucherDateTo', params.voucherDateTo);
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareVoucher[]>(`${LEXWARE_API_ENDPOINTS.VOUCHERS}?${queryParams.toString()}`);
	}

	/**
	 * Get vouchers by status
	 */
	async getByStatus(voucherStatus: string, params?: Record<string, any>): Promise<ILexwareVoucher[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('voucherStatus', voucherStatus);
		
		if (params?.voucherType) queryParams.append('voucherType', params.voucherType);
		if (params?.contactId) queryParams.append('contactId', params.contactId);
		if (params?.voucherDateFrom) queryParams.append('voucherDateFrom', params.voucherDateFrom);
		if (params?.voucherDateTo) queryParams.append('voucherDateTo', params.voucherDateTo);
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareVoucher[]>(`${LEXWARE_API_ENDPOINTS.VOUCHERS}?${queryParams.toString()}`);
	}

	/**
	 * Get vouchers by contact
	 */
	async getByContact(contactId: string, params?: Record<string, any>): Promise<ILexwareVoucher[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('contactId', contactId);
		
		if (params?.voucherType) queryParams.append('voucherType', params.voucherType);
		if (params?.voucherStatus) queryParams.append('voucherStatus', params.voucherStatus);
		if (params?.voucherDateFrom) queryParams.append('voucherDateFrom', params.voucherDateFrom);
		if (params?.voucherDateTo) queryParams.append('voucherDateTo', params.voucherDateTo);
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareVoucher[]>(`${LEXWARE_API_ENDPOINTS.VOUCHERS}?${queryParams.toString()}`);
	}

	/**
	 * Get vouchers by date range
	 */
	async getByDateRange(startDate: string, endDate: string, params?: Record<string, any>): Promise<ILexwareVoucher[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('voucherDateFrom', startDate);
		queryParams.append('voucherDateTo', endDate);
		
		if (params?.voucherType) queryParams.append('voucherType', params.voucherType);
		if (params?.voucherStatus) queryParams.append('voucherStatus', params.voucherStatus);
		if (params?.contactId) queryParams.append('contactId', params.contactId);
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareVoucher[]>(`${LEXWARE_API_ENDPOINTS.VOUCHERS}?${queryParams.toString()}`);
	}

	/**
	 * Get vouchers by shipping date range
	 */
	async getByShippingDateRange(startDate: string, endDate: string, params?: Record<string, any>): Promise<ILexwareVoucher[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('shippingDateFrom', startDate);
		queryParams.append('shippingDateTo', endDate);
		
		if (params?.voucherType) queryParams.append('voucherType', params.voucherType);
		if (params?.voucherStatus) queryParams.append('voucherStatus', params.voucherStatus);
		if (params?.contactId) queryParams.append('contactId', params.contactId);
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareVoucher[]>(`${LEXWARE_API_ENDPOINTS.VOUCHERS}?${queryParams.toString()}`);
	}

	/**
	 * Get vouchers by category
	 */
	async getByCategory(categoryId: string, params?: Record<string, any>): Promise<ILexwareVoucher[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('categoryId', categoryId);
		
		if (params?.voucherType) queryParams.append('voucherType', params.voucherType);
		if (params?.voucherStatus) queryParams.append('voucherStatus', params.voucherStatus);
		if (params?.contactId) queryParams.append('contactId', params.contactId);
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareVoucher[]>(`${LEXWARE_API_ENDPOINTS.VOUCHERS}?${queryParams.toString()}`);
	}

	/**
	 * Get vouchers by tax type
	 */
	async getByTaxType(taxType: string, params?: Record<string, any>): Promise<ILexwareVoucher[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('taxType', taxType);
		
		if (params?.voucherType) queryParams.append('voucherType', params.voucherType);
		if (params?.voucherStatus) queryParams.append('voucherStatus', params.voucherStatus);
		if (params?.contactId) queryParams.append('contactId', params.contactId);
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareVoucher[]>(`${LEXWARE_API_ENDPOINTS.VOUCHERS}?${queryParams.toString()}`);
	}

	/**
	 * Get vouchers by currency
	 */
	async getByCurrency(currency: string, params?: Record<string, any>): Promise<ILexwareVoucher[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('currency', currency);
		
		if (params?.voucherType) queryParams.append('voucherType', params.voucherType);
		if (params?.voucherStatus) queryParams.append('voucherStatus', params.voucherStatus);
		if (params?.contactId) queryParams.append('contactId', params.contactId);
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareVoucher[]>(`${LEXWARE_API_ENDPOINTS.VOUCHERS}?${queryParams.toString()}`);
	}

	/**
	 * Get vouchers by language
	 */
	async getByLanguage(language: string, params?: Record<string, any>): Promise<ILexwareVoucher[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('language', language);
		
		if (params?.voucherType) queryParams.append('voucherType', params.voucherType);
		if (params?.voucherStatus) queryParams.append('voucherStatus', params.voucherStatus);
		if (params?.contactId) queryParams.append('contactId', params.contactId);
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareVoucher[]>(`${LEXWARE_API_ENDPOINTS.VOUCHERS}?${queryParams.toString()}`);
	}

	/**
	 * Get recurring vouchers
	 */
	async getRecurring(params?: Record<string, any>): Promise<ILexwareVoucher[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('isRecurring', 'true');
		
		if (params?.voucherType) queryParams.append('voucherType', params.voucherType);
		if (params?.voucherStatus) queryParams.append('voucherStatus', params.voucherStatus);
		if (params?.contactId) queryParams.append('contactId', params.contactId);
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareVoucher[]>(`${LEXWARE_API_ENDPOINTS.VOUCHERS}?${queryParams.toString()}`);
	}

	/**
	 * Get XRechnung vouchers
	 */
	async getXRechnung(params?: Record<string, any>): Promise<ILexwareVoucher[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('isXRechnung', 'true');
		
		if (params?.voucherType) queryParams.append('voucherType', params.voucherType);
		if (params?.voucherStatus) queryParams.append('voucherStatus', params.voucherStatus);
		if (params?.contactId) queryParams.append('contactId', params.contactId);
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareVoucher[]>(`${LEXWARE_API_ENDPOINTS.VOUCHERS}?${queryParams.toString()}`);
	}

	/**
	 * Get vouchers by amount range
	 */
	async getByAmountRange(minAmount: number, maxAmount: number, params?: Record<string, any>): Promise<ILexwareVoucher[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('minAmount', minAmount.toString());
		queryParams.append('maxAmount', maxAmount.toString());
		
		if (params?.voucherType) queryParams.append('voucherType', params.voucherType);
		if (params?.voucherStatus) queryParams.append('voucherStatus', params.voucherStatus);
		if (params?.contactId) queryParams.append('contactId', params.contactId);
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareVoucher[]>(`${LEXWARE_API_ENDPOINTS.VOUCHERS}?${queryParams.toString()}`);
	}

	/**
	 * Search vouchers by text
	 */
	async search(searchTerm: string, params?: Record<string, any>): Promise<ILexwareVoucher[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('search', searchTerm);
		
		if (params?.voucherType) queryParams.append('voucherType', params.voucherType);
		if (params?.voucherStatus) queryParams.append('voucherStatus', params.voucherStatus);
		if (params?.contactId) queryParams.append('contactId', params.contactId);
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareVoucher[]>(`${LEXWARE_API_ENDPOINTS.VOUCHERS}?${queryParams.toString()}`);
	}

	/**
	 * Get voucher deeplink
	 */
	async getDeeplink(voucherId: string): Promise<string> {
		const response = await this.apiClient.get<{ deeplink: string }>(`${LEXWARE_API_ENDPOINTS.VOUCHERS}/${voucherId}/deeplink`);
		return response.deeplink;
	}

	/**
	 * Upload a file to a voucher
	 */
	async uploadFile(voucherId: string, fileData: Buffer, fileName: string, contentType: string): Promise<any> {
		const formData = new FormData();
		formData.append('file', new Blob([fileData], { type: contentType }), fileName);
		
		return this.apiClient.post<any>(`${LEXWARE_API_ENDPOINTS.VOUCHERS}/${voucherId}/files`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	}

	/**
	 * Get files attached to a voucher
	 */
	async getFiles(voucherId: string): Promise<any[]> {
		return this.apiClient.get<any[]>(`${LEXWARE_API_ENDPOINTS.VOUCHERS}/${voucherId}/files`);
	}

	/**
	 * Delete a file from a voucher
	 */
	async deleteFile(voucherId: string, fileId: string): Promise<void> {
		return this.apiClient.delete<void>(`${LEXWARE_API_ENDPOINTS.VOUCHERS}/${voucherId}/files/${fileId}`);
	}

	/**
	 * Get voucher statistics
	 */
	async getStatistics(params?: Record<string, any>): Promise<any> {
		const queryParams = new URLSearchParams();
		
		if (params?.voucherType) queryParams.append('voucherType', params.voucherType);
		if (params?.voucherStatus) queryParams.append('voucherStatus', params.voucherStatus);
		if (params?.contactId) queryParams.append('contactId', params.contactId);
		if (params?.voucherDateFrom) queryParams.append('voucherDateFrom', params.voucherDateFrom);
		if (params?.voucherDateTo) queryParams.append('voucherDateTo', params.voucherDateTo);

		const url = queryParams.toString() ? `${LEXWARE_API_ENDPOINTS.VOUCHERS}/statistics?${queryParams.toString()}` : `${LEXWARE_API_ENDPOINTS.VOUCHERS}/statistics`;
		return this.apiClient.get<any>(url);
	}

	/**
	 * Get available category IDs for vouchers
	 */
	async getCategoryIds(): Promise<string[]> {
		return this.apiClient.get<string[]>(`${LEXWARE_API_ENDPOINTS.VOUCHERS}/category-ids`);
	}

	/**
	 * Validate voucher creation data
	 */
	validateCreateData(voucherType: string, additionalFields: Record<string, any>): string[] {
		const errors: string[] = [];

		// Required fields validation
		if (!voucherType || voucherType.trim() === '') {
			errors.push('Voucher type is required');
		}

		if (!additionalFields.voucherDate) {
			errors.push('Voucher date is required');
		}

		if (!additionalFields.contactId) {
			errors.push('Contact ID is required');
		}

		// Voucher type specific validation
		if (voucherType === 'salesinvoice' || voucherType === 'salescreditnote') {
			if (!additionalFields.lineItems || additionalFields.lineItems.length === 0) {
				errors.push('Line items are required for sales vouchers');
			}

			// Validate line items
			if (additionalFields.lineItems) {
				additionalFields.lineItems.forEach((item: any, index: number) => {
					if (!item.name) {
						errors.push(`Line item ${index + 1}: Name is required`);
					}
					if (!item.unitPrice || !item.unitPrice.currency) {
						errors.push(`Line item ${index + 1}: Unit price with currency is required`);
					}
					if (item.quantity !== undefined && item.quantity <= 0) {
						errors.push(`Line item ${index + 1}: Quantity must be greater than 0`);
					}
				});
			}
		}

		// Date validation
		if (additionalFields.voucherDate && !this.isValidDate(additionalFields.voucherDate)) {
			errors.push('Valid voucher date format is required');
		}

		if (additionalFields.dueDate && !this.isValidDate(additionalFields.dueDate)) {
			errors.push('Valid due date format is required');
		}

		if (additionalFields.shippingDate && !this.isValidDate(additionalFields.shippingDate)) {
			errors.push('Valid shipping date format is required');
		}

		// Currency validation
		if (additionalFields.currency && !this.isValidCurrency(additionalFields.currency)) {
			errors.push('Valid currency code is required');
		}

		// Language validation
		if (additionalFields.language && !this.isValidLanguage(additionalFields.language)) {
			errors.push('Valid language code is required');
		}

		// Tax rate validation
		if (additionalFields.taxRate !== undefined && (additionalFields.taxRate < 0 || additionalFields.taxRate > 100)) {
			errors.push('Tax rate must be between 0 and 100');
		}

		// Amount validation
		if (additionalFields.totalNetAmount !== undefined && additionalFields.totalNetAmount < 0) {
			errors.push('Total net amount cannot be negative');
		}

		if (additionalFields.totalGrossAmount !== undefined && additionalFields.totalGrossAmount < 0) {
			errors.push('Total gross amount cannot be negative');
		}

		return errors;
	}

	/**
	 * Validate voucher update data
	 */
	validateUpdateData(additionalFields: Record<string, any>): string[] {
		const errors: string[] = [];

		// Date validation
		if (additionalFields.voucherDate && !this.isValidDate(additionalFields.voucherDate)) {
			errors.push('Valid voucher date format is required');
		}

		if (additionalFields.dueDate && !this.isValidDate(additionalFields.dueDate)) {
			errors.push('Valid due date format is required');
		}

		if (additionalFields.shippingDate && !this.isValidDate(additionalFields.shippingDate)) {
			errors.push('Valid shipping date format is required');
		}

		// Currency validation
		if (additionalFields.currency && !this.isValidCurrency(additionalFields.currency)) {
			errors.push('Valid currency code is required');
		}

		// Language validation
		if (additionalFields.language && !this.isValidLanguage(additionalFields.language)) {
			errors.push('Valid language code is required');
		}

		// Tax rate validation
		if (additionalFields.taxRate !== undefined && (additionalFields.taxRate < 0 || additionalFields.taxRate > 100)) {
			errors.push('Tax rate must be between 0 and 100');
		}

		// Amount validation
		if (additionalFields.totalNetAmount !== undefined && additionalFields.totalNetAmount < 0) {
			errors.push('Total net amount cannot be negative');
		}

		if (additionalFields.totalGrossAmount !== undefined && additionalFields.totalGrossAmount < 0) {
			errors.push('Total gross amount cannot be negative');
		}

		return errors;
	}

	/**
	 * Validate voucher filter parameters
	 */
	validateFilterParams(filterParams: Record<string, any>): string[] {
		const errors: string[] = [];

		if (filterParams.voucherDateFrom && !this.isValidDate(filterParams.voucherDateFrom)) {
			errors.push('Valid voucherDateFrom format is required');
		}

		if (filterParams.voucherDateTo && !this.isValidDate(filterParams.voucherDateTo)) {
			errors.push('Valid voucherDateTo format is required');
		}

		if (filterParams.shippingDateFrom && !this.isValidDate(filterParams.shippingDateFrom)) {
			errors.push('Valid shippingDateFrom format is required');
		}

		if (filterParams.shippingDateTo && !this.isValidDate(filterParams.shippingDateTo)) {
			errors.push('Valid shippingDateTo format is required');
		}

		if (filterParams.minAmount && (filterParams.minAmount < 0 || filterParams.minAmount > filterParams.maxAmount)) {
			errors.push('Valid minAmount is required (must be >= 0 and <= maxAmount)');
		}

		if (filterParams.maxAmount && filterParams.maxAmount < 0) {
			errors.push('Valid maxAmount is required (must be >= 0)');
		}

		if (filterParams.size && (filterParams.size < 1 || filterParams.size > 250)) {
			errors.push('Valid size is required (must be between 1 and 250)');
		}

		if (filterParams.page && filterParams.page < 0) {
			errors.push('Valid page is required (must be >= 0)');
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
