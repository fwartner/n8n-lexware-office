import { ILexwareVoucherList, ILexwareCredentials } from '../types';
import { LexwareApiClient } from '../utils/api';
import { LEXWARE_API_ENDPOINTS } from '../constants';

export class VoucherlistResource {
	private apiClient: LexwareApiClient;

	constructor(credentials: ILexwareCredentials) {
		this.apiClient = new LexwareApiClient(credentials);
	}

	/**
	 * Get all vouchers with optional filtering
	 */
	async getAll(params?: Record<string, any>): Promise<ILexwareVoucherList[]> {
		const queryParams = new URLSearchParams();
		
		if (params?.voucherType) queryParams.append('voucherType', params.voucherType);
		if (params?.voucherStatus) queryParams.append('voucherStatus', params.voucherStatus);
		if (params?.archived !== undefined) queryParams.append('archived', params.archived.toString());
		if (params?.contactId) queryParams.append('contactId', params.contactId);
		if (params?.voucherDateFrom) queryParams.append('voucherDateFrom', params.voucherDateFrom);
		if (params?.voucherDateTo) queryParams.append('voucherDateTo', params.voucherDateTo);
		if (params?.createdDateFrom) queryParams.append('createdDateFrom', params.createdDateFrom);
		if (params?.createdDateTo) queryParams.append('createdDateTo', params.createdDateTo);
		if (params?.updatedDateFrom) queryParams.append('updatedDateFrom', params.updatedDateFrom);
		if (params?.updatedDateTo) queryParams.append('updatedDateTo', params.updatedDateTo);
		if (params?.voucherNumber) queryParams.append('voucherNumber', params.voucherNumber);
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());
		if (params?.sort) queryParams.append('sort', params.sort);

		const url = queryParams.toString() ? `${LEXWARE_API_ENDPOINTS.VOUCHERLIST}?${queryParams.toString()}` : LEXWARE_API_ENDPOINTS.VOUCHERLIST;
		return this.apiClient.get<ILexwareVoucherList[]>(url);
	}

	/**
	 * Get vouchers by type
	 */
	async getByType(voucherType: string, params?: Record<string, any>): Promise<ILexwareVoucherList[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('voucherType', voucherType);
		
		if (params?.voucherStatus) queryParams.append('voucherStatus', params.voucherStatus);
		if (params?.archived !== undefined) queryParams.append('archived', params.archived.toString());
		if (params?.contactId) queryParams.append('contactId', params.contactId);
		if (params?.voucherDateFrom) queryParams.append('voucherDateFrom', params.voucherDateFrom);
		if (params?.voucherDateTo) queryParams.append('voucherDateTo', params.voucherDateTo);
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareVoucherList[]>(`${LEXWARE_API_ENDPOINTS.VOUCHERLIST}?${queryParams.toString()}`);
	}

	/**
	 * Get vouchers by status
	 */
	async getByStatus(voucherStatus: string, params?: Record<string, any>): Promise<ILexwareVoucherList[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('voucherStatus', voucherStatus);
		
		if (params?.voucherType) queryParams.append('voucherType', params.voucherType);
		if (params?.archived !== undefined) queryParams.append('archived', params.archived.toString());
		if (params?.contactId) queryParams.append('contactId', params.contactId);
		if (params?.voucherDateFrom) queryParams.append('voucherDateFrom', params.voucherDateFrom);
		if (params?.voucherDateTo) queryParams.append('voucherDateTo', params.voucherDateTo);
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareVoucherList[]>(`${LEXWARE_API_ENDPOINTS.VOUCHERLIST}?${queryParams.toString()}`);
	}

	/**
	 * Get vouchers by contact
	 */
	async getByContact(contactId: string, params?: Record<string, any>): Promise<ILexwareVoucherList[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('contactId', contactId);
		
		if (params?.voucherType) queryParams.append('voucherType', params.voucherType);
		if (params?.voucherStatus) queryParams.append('voucherStatus', params.voucherStatus);
		if (params?.archived !== undefined) queryParams.append('archived', params.archived.toString());
		if (params?.voucherDateFrom) queryParams.append('voucherDateFrom', params.voucherDateFrom);
		if (params?.voucherDateTo) queryParams.append('voucherDateTo', params.voucherDateTo);
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareVoucherList[]>(`${LEXWARE_API_ENDPOINTS.VOUCHERLIST}?${queryParams.toString()}`);
	}

	/**
	 * Get vouchers by date range
	 */
	async getByDateRange(startDate: string, endDate: string, params?: Record<string, any>): Promise<ILexwareVoucherList[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('voucherDateFrom', startDate);
		queryParams.append('voucherDateTo', endDate);
		
		if (params?.voucherType) queryParams.append('voucherType', params.voucherType);
		if (params?.voucherStatus) queryParams.append('voucherStatus', params.voucherStatus);
		if (params?.archived !== undefined) queryParams.append('archived', params.archived.toString());
		if (params?.contactId) queryParams.append('contactId', params.contactId);
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareVoucherList[]>(`${LEXWARE_API_ENDPOINTS.VOUCHERLIST}?${queryParams.toString()}`);
	}

	/**
	 * Get vouchers by creation date range
	 */
	async getByCreationDateRange(startDate: string, endDate: string, params?: Record<string, any>): Promise<ILexwareVoucherList[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('createdDateFrom', startDate);
		queryParams.append('createdDateTo', endDate);
		
		if (params?.voucherType) queryParams.append('voucherType', params.voucherType);
		if (params?.voucherStatus) queryParams.append('voucherStatus', params.voucherStatus);
		if (params?.archived !== undefined) queryParams.append('archived', params.archived.toString());
		if (params?.contactId) queryParams.append('contactId', params.contactId);
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareVoucherList[]>(`${LEXWARE_API_ENDPOINTS.VOUCHERLIST}?${queryParams.toString()}`);
	}

	/**
	 * Get vouchers by update date range
	 */
	async getByUpdateDateRange(startDate: string, endDate: string, params?: Record<string, any>): Promise<ILexwareVoucherList[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('updatedDateFrom', startDate);
		queryParams.append('updatedDateTo', endDate);
		
		if (params?.voucherType) queryParams.append('voucherType', params.voucherType);
		if (params?.voucherStatus) queryParams.append('voucherStatus', params.voucherStatus);
		if (params?.archived !== undefined) queryParams.append('archived', params.archived.toString());
		if (params?.contactId) queryParams.append('contactId', params.contactId);
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareVoucherList[]>(`${LEXWARE_API_ENDPOINTS.VOUCHERLIST}?${queryParams.toString()}`);
	}

	/**
	 * Search vouchers by number
	 */
	async searchByNumber(voucherNumber: string, params?: Record<string, any>): Promise<ILexwareVoucherList[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('voucherNumber', voucherNumber);
		
		if (params?.voucherType) queryParams.append('voucherType', params.voucherType);
		if (params?.voucherStatus) queryParams.append('voucherStatus', params.voucherStatus);
		if (params?.archived !== undefined) queryParams.append('archived', params.archived.toString());
		if (params?.contactId) queryParams.append('contactId', params.contactId);
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareVoucherList[]>(`${LEXWARE_API_ENDPOINTS.VOUCHERLIST}?${queryParams.toString()}`);
	}

	/**
	 * Get archived vouchers
	 */
	async getArchived(params?: Record<string, any>): Promise<ILexwareVoucherList[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('archived', 'true');
		
		if (params?.voucherType) queryParams.append('voucherType', params.voucherType);
		if (params?.voucherStatus) queryParams.append('voucherStatus', params.voucherStatus);
		if (params?.contactId) queryParams.append('contactId', params.contactId);
		if (params?.voucherDateFrom) queryParams.append('voucherDateFrom', params.voucherDateFrom);
		if (params?.voucherDateTo) queryParams.append('voucherDateTo', params.voucherDateTo);
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareVoucherList[]>(`${LEXWARE_API_ENDPOINTS.VOUCHERLIST}?${queryParams.toString()}`);
	}

	/**
	 * Get public (non-archived) vouchers
	 */
	async getPublic(params?: Record<string, any>): Promise<ILexwareVoucherList[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('archived', 'false');
		
		if (params?.voucherType) queryParams.append('voucherType', params.voucherType);
		if (params?.voucherStatus) queryParams.append('voucherStatus', params.voucherStatus);
		if (params?.contactId) queryParams.append('contactId', params.contactId);
		if (params?.voucherDateFrom) queryParams.append('voucherDateFrom', params.voucherDateFrom);
		if (params?.voucherDateTo) queryParams.append('voucherDateTo', params.voucherDateTo);
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareVoucherList[]>(`${LEXWARE_API_ENDPOINTS.VOUCHERLIST}?${queryParams.toString()}`);
	}

	/**
	 * Get recurring vouchers
	 */
	async getRecurring(params?: Record<string, any>): Promise<ILexwareVoucherList[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('isRecurring', 'true');
		
		if (params?.voucherType) queryParams.append('voucherType', params.voucherType);
		if (params?.voucherStatus) queryParams.append('voucherStatus', params.voucherStatus);
		if (params?.archived !== undefined) queryParams.append('archived', params.archived.toString());
		if (params?.contactId) queryParams.append('contactId', params.contactId);
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareVoucherList[]>(`${LEXWARE_API_ENDPOINTS.VOUCHERLIST}?${queryParams.toString()}`);
	}

	/**
	 * Get closing invoices
	 */
	async getClosingInvoices(params?: Record<string, any>): Promise<ILexwareVoucherList[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('isClosingInvoice', 'true');
		
		if (params?.voucherStatus) queryParams.append('voucherStatus', params.voucherStatus);
		if (params?.archived !== undefined) queryParams.append('archived', params.archived.toString());
		if (params?.contactId) queryParams.append('contactId', params.contactId);
		if (params?.voucherDateFrom) queryParams.append('voucherDateFrom', params.voucherDateFrom);
		if (params?.voucherDateTo) queryParams.append('voucherDateTo', params.voucherDateTo);
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareVoucherList[]>(`${LEXWARE_API_ENDPOINTS.VOUCHERLIST}?${queryParams.toString()}`);
	}

	/**
	 * Get XRechnung vouchers
	 */
	async getXRechnung(params?: Record<string, any>): Promise<ILexwareVoucherList[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('isXRechnung', 'true');
		
		if (params?.voucherType) queryParams.append('voucherType', params.voucherType);
		if (params?.voucherStatus) queryParams.append('voucherStatus', params.voucherStatus);
		if (params?.archived !== undefined) queryParams.append('archived', params.archived.toString());
		if (params?.contactId) queryParams.append('contactId', params.contactId);
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareVoucherList[]>(`${LEXWARE_API_ENDPOINTS.VOUCHERLIST}?${queryParams.toString()}`);
	}

	/**
	 * Get vouchers by currency
	 */
	async getByCurrency(currency: string, params?: Record<string, any>): Promise<ILexwareVoucherList[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('currency', currency);
		
		if (params?.voucherType) queryParams.append('voucherType', params.voucherType);
		if (params?.voucherStatus) queryParams.append('voucherStatus', params.voucherStatus);
		if (params?.archived !== undefined) queryParams.append('archived', params.archived.toString());
		if (params?.contactId) queryParams.append('contactId', params.contactId);
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareVoucherList[]>(`${LEXWARE_API_ENDPOINTS.VOUCHERLIST}?${queryParams.toString()}`);
	}

	/**
	 * Get vouchers by language
	 */
	async getByLanguage(language: string, params?: Record<string, any>): Promise<ILexwareVoucherList[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('language', language);
		
		if (params?.voucherType) queryParams.append('voucherType', params.voucherType);
		if (params?.voucherStatus) queryParams.append('voucherStatus', params.voucherStatus);
		if (params?.archived !== undefined) queryParams.append('archived', params.archived.toString());
		if (params?.contactId) queryParams.append('contactId', params.contactId);
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareVoucherList[]>(`${LEXWARE_API_ENDPOINTS.VOUCHERLIST}?${queryParams.toString()}`);
	}

	/**
	 * Get vouchers by amount range
	 */
	async getByAmountRange(minAmount: number, maxAmount: number, params?: Record<string, any>): Promise<ILexwareVoucherList[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('minAmount', minAmount.toString());
		queryParams.append('maxAmount', maxAmount.toString());
		
		if (params?.voucherType) queryParams.append('voucherType', params.voucherType);
		if (params?.voucherStatus) queryParams.append('voucherStatus', params.voucherStatus);
		if (params?.archived !== undefined) queryParams.append('archived', params.archived.toString());
		if (params?.contactId) queryParams.append('contactId', params.contactId);
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareVoucherList[]>(`${LEXWARE_API_ENDPOINTS.VOUCHERLIST}?${queryParams.toString()}`);
	}

	/**
	 * Get vouchers by tag
	 */
	async getByTag(tag: string, params?: Record<string, any>): Promise<ILexwareVoucherList[]> {
		const queryParams = new URLSearchParams();
		queryParams.append('tag', tag);
		
		if (params?.voucherType) queryParams.append('voucherType', params.voucherType);
		if (params?.voucherStatus) queryParams.append('voucherStatus', params.voucherStatus);
		if (params?.archived !== undefined) queryParams.append('archived', params.archived.toString());
		if (params?.contactId) queryParams.append('contactId', params.contactId);
		if (params?.size) queryParams.append('size', params.size.toString());
		if (params?.page) queryParams.append('page', params.page.toString());

		return this.apiClient.get<ILexwareVoucherList[]>(`${LEXWARE_API_ENDPOINTS.VOUCHERLIST}?${queryParams.toString()}`);
	}

	/**
	 * Get voucher statistics
	 */
	async getStatistics(params?: Record<string, any>): Promise<any> {
		const queryParams = new URLSearchParams();
		
		if (params?.voucherType) queryParams.append('voucherType', params.voucherType);
		if (params?.voucherStatus) queryParams.append('voucherStatus', params.voucherStatus);
		if (params?.archived !== undefined) queryParams.append('archived', params.archived.toString());
		if (params?.contactId) queryParams.append('contactId', params.contactId);
		if (params?.voucherDateFrom) queryParams.append('voucherDateFrom', params.voucherDateFrom);
		if (params?.voucherDateTo) queryParams.append('voucherDateTo', params.voucherDateTo);

		const url = queryParams.toString() ? `${LEXWARE_API_ENDPOINTS.VOUCHERLIST}/statistics?${queryParams.toString()}` : `${LEXWARE_API_ENDPOINTS.VOUCHERLIST}/statistics`;
		return this.apiClient.get<any>(url);
	}

	/**
	 * Validate voucherlist filter parameters
	 */
	validateFilterParams(filterParams: Record<string, any>): string[] {
		const errors: string[] = [];

		if (filterParams.voucherDateFrom && !this.isValidDate(filterParams.voucherDateFrom)) {
			errors.push('Valid voucherDateFrom format is required');
		}

		if (filterParams.voucherDateTo && !this.isValidDate(filterParams.voucherDateTo)) {
			errors.push('Valid voucherDateTo format is required');
		}

		if (filterParams.createdDateFrom && !this.isValidDate(filterParams.createdDateFrom)) {
			errors.push('Valid createdDateFrom format is required');
		}

		if (filterParams.createdDateTo && !this.isValidDate(filterParams.createdDateTo)) {
			errors.push('Valid createdDateTo format is required');
		}

		if (filterParams.updatedDateFrom && !this.isValidDate(filterParams.updatedDateFrom)) {
			errors.push('Valid updatedDateFrom format is required');
		}

		if (filterParams.updatedDateTo && !this.isValidDate(filterParams.updatedDateTo)) {
			errors.push('Valid updatedDateTo format is required');
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
}
