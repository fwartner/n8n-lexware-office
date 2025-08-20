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
		// Let's try a completely different approach
		// Maybe the API expects the parameters in the URL path or as headers
		// Let's build the request manually to see exactly what's happening
		
		// Build the URL with query parameters manually
		const queryParams = new URLSearchParams();
		
		// Always include voucherStatus - this seems to be required
		queryParams.append('voucherStatus', params?.voucherStatus || '');
		
		// Include other parameters
		if (params?.voucherType !== undefined) queryParams.append('voucherType', params.voucherType);
		if (params?.archived !== undefined) queryParams.append('archived', params.archived.toString());
		if (params?.contactId !== undefined) queryParams.append('contactId', params.contactId);
		if (params?.voucherDateFrom !== undefined) queryParams.append('voucherDateFrom', params.voucherDateFrom);
		if (params?.voucherDateTo !== undefined) queryParams.append('voucherDateTo', params.voucherDateTo);
		if (params?.createdDateFrom !== undefined) queryParams.append('createdDateFrom', params.createdDateFrom);
		if (params?.createdDateTo !== undefined) queryParams.append('createdDateTo', params.createdDateTo);
		if (params?.updatedDateFrom !== undefined) queryParams.append('updatedDateFrom', params.updatedDateFrom);
		if (params?.updatedDateTo !== undefined) queryParams.append('updatedDateTo', params.updatedDateTo);
		if (params?.voucherNumber !== undefined) queryParams.append('voucherNumber', params.voucherNumber);
		if (params?.size !== undefined) queryParams.append('size', params.size.toString());
		if (params?.page !== undefined) queryParams.append('page', params.page.toString());
		if (params?.sort !== undefined) queryParams.append('sort', params.sort);

		// Build the full URL with query parameters
		const url = `${LEXWARE_API_ENDPOINTS.VOUCHERLIST}?${queryParams.toString()}`;
		
		// Call the API client with the pre-built URL and no additional params
		// This way we have full control over the query string
		return this.apiClient.get<ILexwareVoucherList[]>(url);
	}

	/**
	 * Get vouchers by type
	 */
	async getByType(voucherType: string, params?: Record<string, any>): Promise<ILexwareVoucherList[]> {
		const apiParams = {
			voucherType: voucherType,
			voucherStatus: params?.voucherStatus || '',
			archived: params?.archived !== undefined ? params.archived.toString() : '',
			contactId: params?.contactId || '',
			voucherDateFrom: params?.voucherDateFrom || '',
			voucherDateTo: params?.voucherDateTo || '',
			size: params?.size ? params.size.toString() : '',
			page: params?.page ? params.page.toString() : '',
		};

		return this.apiClient.get<ILexwareVoucherList[]>(LEXWARE_API_ENDPOINTS.VOUCHERLIST, apiParams);
	}

	/**
	 * Get vouchers by status
	 */
	async getByStatus(voucherStatus: string, params?: Record<string, any>): Promise<ILexwareVoucherList[]> {
		const apiParams = {
			voucherStatus: voucherStatus,
			voucherType: params?.voucherType || '',
			archived: params?.archived !== undefined ? params.archived.toString() : '',
			contactId: params?.contactId || '',
			voucherDateFrom: params?.voucherDateFrom || '',
			voucherDateTo: params?.voucherDateTo || '',
			size: params?.size ? params.size.toString() : '',
			page: params?.page ? params.page.toString() : '',
		};

		return this.apiClient.get<ILexwareVoucherList[]>(LEXWARE_API_ENDPOINTS.VOUCHERLIST, apiParams);
	}

	/**
	 * Get vouchers by contact
	 */
	async getByContact(contactId: string, params?: Record<string, any>): Promise<ILexwareVoucherList[]> {
		const apiParams = {
			contactId: contactId,
			voucherType: params?.voucherType || '',
			voucherStatus: params?.voucherStatus || '',
			archived: params?.archived !== undefined ? params.archived.toString() : '',
			voucherDateFrom: params?.voucherDateFrom || '',
			voucherDateTo: params?.voucherDateTo || '',
			size: params?.size ? params.size.toString() : '',
			page: params?.page ? params.page.toString() : '',
		};

		return this.apiClient.get<ILexwareVoucherList[]>(LEXWARE_API_ENDPOINTS.VOUCHERLIST, apiParams);
	}

	/**
	 * Get vouchers by date range
	 */
	async getByDateRange(startDate: string, endDate: string, params?: Record<string, any>): Promise<ILexwareVoucherList[]> {
		const apiParams = {
			voucherDateFrom: startDate,
			voucherDateTo: endDate,
			voucherType: params?.voucherType || '',
			voucherStatus: params?.voucherStatus || '',
			archived: params?.archived !== undefined ? params.archived.toString() : '',
			contactId: params?.contactId || '',
			size: params?.size ? params.size.toString() : '',
			page: params?.page ? params.page.toString() : '',
		};

		return this.apiClient.get<ILexwareVoucherList[]>(LEXWARE_API_ENDPOINTS.VOUCHERLIST, apiParams);
	}

	/**
	 * Get vouchers by creation date range
	 */
	async getByCreationDateRange(startDate: string, endDate: string, params?: Record<string, any>): Promise<ILexwareVoucherList[]> {
		const apiParams = {
			createdDateFrom: startDate,
			createdDateTo: endDate,
			voucherType: params?.voucherType || '',
			voucherStatus: params?.voucherStatus || '',
			archived: params?.archived !== undefined ? params.archived.toString() : '',
			contactId: params?.contactId || '',
			size: params?.size ? params.size.toString() : '',
			page: params?.page ? params.page.toString() : '',
		};

		return this.apiClient.get<ILexwareVoucherList[]>(LEXWARE_API_ENDPOINTS.VOUCHERLIST, apiParams);
	}

	/**
	 * Get vouchers by update date range
	 */
	async getByUpdateDateRange(startDate: string, endDate: string, params?: Record<string, any>): Promise<ILexwareVoucherList[]> {
		const apiParams = {
			updatedDateFrom: startDate,
			updatedDateTo: endDate,
			voucherType: params?.voucherType || '',
			voucherStatus: params?.voucherStatus || '',
			archived: params?.archived !== undefined ? params.archived.toString() : '',
			contactId: params?.contactId || '',
			size: params?.size ? params.size.toString() : '',
			page: params?.page ? params.page.toString() : '',
		};

		return this.apiClient.get<ILexwareVoucherList[]>(LEXWARE_API_ENDPOINTS.VOUCHERLIST, apiParams);
	}

	/**
	 * Search vouchers by number
	 */
	async searchByNumber(voucherNumber: string, params?: Record<string, any>): Promise<ILexwareVoucherList[]> {
		const apiParams = {
			voucherNumber: voucherNumber,
			voucherType: params?.voucherType || '',
			voucherStatus: params?.voucherStatus || '',
			archived: params?.archived !== undefined ? params.archived.toString() : '',
			contactId: params?.contactId || '',
			size: params?.size ? params.size.toString() : '',
			page: params?.page ? params.page.toString() : '',
		};

		return this.apiClient.get<ILexwareVoucherList[]>(LEXWARE_API_ENDPOINTS.VOUCHERLIST, apiParams);
	}

	/**
	 * Get archived vouchers
	 */
	async getArchived(params?: Record<string, any>): Promise<ILexwareVoucherList[]> {
		const apiParams = {
			archived: 'true',
			voucherType: params?.voucherType || '',
			voucherStatus: params?.voucherStatus || '',
			contactId: params?.contactId || '',
			voucherDateFrom: params?.voucherDateFrom || '',
			voucherDateTo: params?.voucherDateTo || '',
			size: params?.size ? params.size.toString() : '',
			page: params?.page ? params.page.toString() : '',
		};

		return this.apiClient.get<ILexwareVoucherList[]>(LEXWARE_API_ENDPOINTS.VOUCHERLIST, apiParams);
	}

	/**
	 * Get public (non-archived) vouchers
	 */
	async getPublic(params?: Record<string, any>): Promise<ILexwareVoucherList[]> {
		const apiParams = {
			archived: 'false',
			voucherType: params?.voucherType || '',
			voucherStatus: params?.voucherStatus || '',
			contactId: params?.contactId || '',
			voucherDateFrom: params?.voucherDateFrom || '',
			voucherDateTo: params?.voucherDateTo || '',
			size: params?.size ? params.size.toString() : '',
			page: params?.page ? params.page.toString() : '',
		};

		return this.apiClient.get<ILexwareVoucherList[]>(LEXWARE_API_ENDPOINTS.VOUCHERLIST, apiParams);
	}

	/**
	 * Get recurring vouchers
	 */
	async getRecurring(params?: Record<string, any>): Promise<ILexwareVoucherList[]> {
		const apiParams = {
			isRecurring: 'true',
			voucherType: params?.voucherType || '',
			voucherStatus: params?.voucherStatus || '',
			archived: params?.archived !== undefined ? params.archived.toString() : '',
			contactId: params?.contactId || '',
			size: params?.size ? params.size.toString() : '',
			page: params?.page ? params.page.toString() : '',
		};

		return this.apiClient.get<ILexwareVoucherList[]>(LEXWARE_API_ENDPOINTS.VOUCHERLIST, apiParams);
	}

	/**
	 * Get closing invoices
	 */
	async getClosingInvoices(params?: Record<string, any>): Promise<ILexwareVoucherList[]> {
		const apiParams = {
			isClosingInvoice: 'true',
			voucherStatus: params?.voucherStatus || '',
			archived: params?.archived !== undefined ? params.archived.toString() : '',
			contactId: params?.contactId || '',
			voucherDateFrom: params?.voucherDateFrom || '',
			voucherDateTo: params?.voucherDateTo || '',
			size: params?.size ? params.size.toString() : '',
			page: params?.page ? params.page.toString() : '',
		};

		return this.apiClient.get<ILexwareVoucherList[]>(LEXWARE_API_ENDPOINTS.VOUCHERLIST, apiParams);
	}

	/**
	 * Get XRechnung vouchers
	 */
	async getXRechnung(params?: Record<string, any>): Promise<ILexwareVoucherList[]> {
		const apiParams = {
			isXRechnung: 'true',
			voucherType: params?.voucherType || '',
			voucherStatus: params?.voucherStatus || '',
			archived: params?.archived !== undefined ? params.archived.toString() : '',
			contactId: params?.contactId || '',
			size: params?.size ? params.size.toString() : '',
			page: params?.page ? params.page.toString() : '',
		};

		return this.apiClient.get<ILexwareVoucherList[]>(LEXWARE_API_ENDPOINTS.VOUCHERLIST, apiParams);
	}

	/**
	 * Get vouchers by currency
	 */
	async getByCurrency(currency: string, params?: Record<string, any>): Promise<ILexwareVoucherList[]> {
		const apiParams = {
			currency: currency,
			voucherType: params?.voucherType || '',
			voucherStatus: params?.voucherStatus || '',
			archived: params?.archived !== undefined ? params.archived.toString() : '',
			contactId: params?.contactId || '',
			size: params?.size ? params.size.toString() : '',
			page: params?.page ? params.page.toString() : '',
		};

		return this.apiClient.get<ILexwareVoucherList[]>(LEXWARE_API_ENDPOINTS.VOUCHERLIST, apiParams);
	}

	/**
	 * Get vouchers by language
	 */
	async getByLanguage(language: string, params?: Record<string, any>): Promise<ILexwareVoucherList[]> {
		const apiParams = {
			language: language,
			voucherType: params?.voucherType || '',
			voucherStatus: params?.voucherStatus || '',
			archived: params?.archived !== undefined ? params.archived.toString() : '',
			contactId: params?.contactId || '',
			size: params?.size ? params.size.toString() : '',
			page: params?.page ? params.page.toString() : '',
		};

		return this.apiClient.get<ILexwareVoucherList[]>(LEXWARE_API_ENDPOINTS.VOUCHERLIST, apiParams);
	}

	/**
	 * Get vouchers by amount range
	 */
	async getByAmountRange(minAmount: number, maxAmount: number, params?: Record<string, any>): Promise<ILexwareVoucherList[]> {
		const apiParams = {
			minAmount: minAmount.toString(),
			maxAmount: maxAmount.toString(),
			voucherType: params?.voucherType || '',
			voucherStatus: params?.voucherStatus || '',
			archived: params?.archived !== undefined ? params.archived.toString() : '',
			contactId: params?.contactId || '',
			size: params?.size ? params.size.toString() : '',
			page: params?.page ? params.page.toString() : '',
		};

		return this.apiClient.get<ILexwareVoucherList[]>(LEXWARE_API_ENDPOINTS.VOUCHERLIST, apiParams);
	}

	/**
	 * Get vouchers by tag
	 */
	async getByTag(tag: string, params?: Record<string, any>): Promise<ILexwareVoucherList[]> {
		const apiParams = {
			tag: tag,
			voucherType: params?.voucherType || '',
			voucherStatus: params?.voucherStatus || '',
			archived: params?.archived !== undefined ? params.archived.toString() : '',
			contactId: params?.contactId || '',
			size: params?.size ? params.size.toString() : '',
			page: params?.page ? params.page.toString() : '',
		};

		return this.apiClient.get<ILexwareVoucherList[]>(LEXWARE_API_ENDPOINTS.VOUCHERLIST, apiParams);
	}

	/**
	 * Get voucher statistics
	 */
	async getStatistics(params?: Record<string, any>): Promise<any> {
		const apiParams = {
			voucherType: params?.voucherType || '',
			voucherStatus: params?.voucherStatus || '',
			archived: params?.archived !== undefined ? params.archived.toString() : '',
			contactId: params?.contactId || '',
			voucherDateFrom: params?.voucherDateFrom || '',
			voucherDateTo: params?.voucherDateTo || '',
		};

		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.VOUCHERLIST}/statistics`, apiParams);
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
