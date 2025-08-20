import { LexwareApiClient } from '../utils/api';
import { LexwareDataTransformer } from '../utils/transformers';
import { ILexwareDownPaymentInvoice, ILexwareCredentials } from '../types';
import { LEXWARE_API_ENDPOINTS } from '../constants';

export class DownPaymentInvoiceResource {
	private apiClient: LexwareApiClient;

	constructor(credentials: ILexwareCredentials) {
		this.apiClient = new LexwareApiClient(credentials);
	}

	/**
	 * Retrieve a down payment invoice by ID
	 * Note: Down payment invoices are read-only resources
	 */
	async get(downPaymentInvoiceId: string): Promise<ILexwareDownPaymentInvoice> {
		return this.apiClient.get<ILexwareDownPaymentInvoice>(`${LEXWARE_API_ENDPOINTS.DOWN_PAYMENT_INVOICES}/${downPaymentInvoiceId}`);
	}

	/**
	 * Get all down payment invoices with filtering and pagination
	 * Uses the voucherlist endpoint with down payment invoice filter
	 */
	async getAll(params?: Record<string, any>): Promise<ILexwareDownPaymentInvoice[]> {
		// Use voucherlist endpoint with down payment invoice filter
		const queryParams = {
			...params,
			voucherType: 'downpaymentinvoice',
		};
		return this.apiClient.get<ILexwareDownPaymentInvoice[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, queryParams);
	}

	/**
	 * Download a down payment invoice file
	 * Note: File download is only available for down payment invoices with status "open"
	 */
	async downloadFile(downPaymentInvoiceId: string, options?: {
		printLayoutId?: string;
		language?: string;
	}): Promise<any> {
		const queryParams = options ? { ...options } : {};
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.DOWN_PAYMENT_INVOICES}/${downPaymentInvoiceId}/file`, queryParams);
	}

	/**
	 * Get deeplink to a down payment invoice in the Lexware application
	 */
	async getDeeplink(downPaymentInvoiceId: string): Promise<{ deeplink: string }> {
		return this.apiClient.get<{ deeplink: string }>(`${LEXWARE_API_ENDPOINTS.DOWN_PAYMENT_INVOICES}/${downPaymentInvoiceId}/deeplink`);
	}

	/**
	 * Get down payment invoices by closing invoice ID
	 * Useful for finding all down payments related to a specific closing invoice
	 */
	async getByClosingInvoice(closingInvoiceId: string): Promise<ILexwareDownPaymentInvoice[]> {
		const queryParams = {
			voucherType: 'downpaymentinvoice',
			closingInvoiceId,
		};
		return this.apiClient.get<ILexwareDownPaymentInvoice[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, queryParams);
	}

	/**
	 * Get down payment invoices by contact ID
	 * Useful for finding all down payments for a specific contact
	 */
	async getByContact(contactId: string, params?: Record<string, any>): Promise<ILexwareDownPaymentInvoice[]> {
		const queryParams = {
			...params,
			voucherType: 'downpaymentinvoice',
			contactId,
		};
		return this.apiClient.get<ILexwareDownPaymentInvoice[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, queryParams);
	}

	/**
	 * Get down payment invoices by status
	 * Useful for filtering by draft, open, paid, or voided status
	 */
	async getByStatus(status: 'draft' | 'open' | 'paid' | 'voided', params?: Record<string, any>): Promise<ILexwareDownPaymentInvoice[]> {
		const queryParams = {
			...params,
			voucherType: 'downpaymentinvoice',
			voucherStatus: status,
		};
		return this.apiClient.get<ILexwareDownPaymentInvoice[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, queryParams);
	}

	/**
	 * Get down payment invoices by date range
	 * Useful for finding down payments within a specific time period
	 */
	async getByDateRange(startDate: string, endDate: string, params?: Record<string, any>): Promise<ILexwareDownPaymentInvoice[]> {
		const queryParams = {
			...params,
			voucherType: 'downpaymentinvoice',
			voucherDateFrom: startDate,
			voucherDateTo: endDate,
		};
		return this.apiClient.get<ILexwareDownPaymentInvoice[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, queryParams);
	}

	/**
	 * Search down payment invoices by number
	 * Useful for finding specific down payment invoices by their number
	 */
	async searchByNumber(invoiceNumber: string, params?: Record<string, any>): Promise<ILexwareDownPaymentInvoice[]> {
		const queryParams = {
			...params,
			voucherType: 'downpaymentinvoice',
			voucherNumber: invoiceNumber,
		};
		return this.apiClient.get<ILexwareDownPaymentInvoice[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, queryParams);
	}

	/**
	 * Get down payment invoices with specific tax conditions
	 * Useful for filtering by tax type or tax sub-type
	 */
	async getByTaxConditions(taxType: string, taxSubType?: string, params?: Record<string, any>): Promise<ILexwareDownPaymentInvoice[]> {
		const queryParams = {
			...params,
			voucherType: 'downpaymentinvoice',
			taxType,
			...(taxSubType && { taxSubType }),
		};
		return this.apiClient.get<ILexwareDownPaymentInvoice[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, queryParams);
	}

	/**
	 * Validate if a down payment invoice can be downloaded
	 */
	validateDownloadData(downPaymentInvoice: ILexwareDownPaymentInvoice): string[] {
		const errors: string[] = [];
		
		if (downPaymentInvoice.downPaymentInvoiceStatus !== 'open') {
			errors.push('Down payment invoice must have status "open" to be downloaded');
		}
		
		return errors;
	}

	/**
	 * Validate if a down payment invoice can be accessed
	 */
	validateAccessData(downPaymentInvoice: ILexwareDownPaymentInvoice): string[] {
		const errors: string[] = [];
		
		if (!downPaymentInvoice.id) {
			errors.push('Down payment invoice ID is required');
		}
		
		return errors;
	}

	/**
	 * Get summary statistics for down payment invoices
	 * Useful for reporting and analytics
	 */
	async getSummary(params?: Record<string, any>): Promise<{
		total: number;
		draft: number;
		open: number;
		paid: number;
		voided: number;
		totalAmount: number;
		paidAmount: number;
		openAmount: number;
	}> {
		const allInvoices = await this.getAll(params);
		
		const summary = {
			total: allInvoices.length,
			draft: allInvoices.filter(inv => inv.downPaymentInvoiceStatus === 'draft').length,
			open: allInvoices.filter(inv => inv.downPaymentInvoiceStatus === 'open').length,
			paid: allInvoices.filter(inv => inv.downPaymentInvoiceStatus === 'paid').length,
			voided: allInvoices.filter(inv => inv.downPaymentInvoiceStatus === 'voided').length,
			totalAmount: allInvoices.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0),
			paidAmount: allInvoices
				.filter(inv => inv.downPaymentInvoiceStatus === 'paid')
				.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0),
			openAmount: allInvoices
				.filter(inv => inv.downPaymentInvoiceStatus === 'open')
				.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0),
		};
		
		return summary;
	}
}
