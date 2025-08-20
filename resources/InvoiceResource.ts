import { LexwareApiClient } from '../utils/api';
import { LexwareDataTransformer } from '../utils/transformers';
import { ILexwareInvoice, ILexwareCredentials } from '../types';
import { 
	LEXWARE_API_ENDPOINTS,
	LEXWARE_INVOICE_STATUSES
} from '../constants';

export class InvoiceResource {
	private apiClient: LexwareApiClient;

	constructor(credentials: ILexwareCredentials) {
		this.apiClient = new LexwareApiClient(credentials);
	}

	/**
	 * Helper method to ensure all voucherlist calls include required parameters
	 */
	private ensureVoucherlistParams(params: Record<string, any>): Record<string, any> {
		return {
			...params,
			voucherType: 'invoice',
			voucherStatus: params?.voucherStatus || '', // Always include voucherStatus as it's required
		};
	}

	/**
	 * Retrieve a specific invoice by ID
	 * @param invoiceId - The unique identifier of the invoice
	 * @returns Promise<ILexwareInvoice> - The invoice data
	 */
	async get(invoiceId: string): Promise<ILexwareInvoice> {
		return this.apiClient.get<ILexwareInvoice>(`${LEXWARE_API_ENDPOINTS.INVOICES}/${invoiceId}`);
	}

	/**
	 * Retrieve all invoices with optional filtering and pagination
	 * @param params - Optional parameters for filtering and pagination
	 * @returns Promise<ILexwareInvoice[]> - Array of invoices
	 */
	async getAll(params?: Record<string, any>): Promise<ILexwareInvoice[]> {
		// Use voucherlist endpoint with invoice filter
		// The voucherlist endpoint requires voucherStatus, so we need to ensure it's always present
		const queryParams = {
			...params,
			voucherType: 'invoice',
			voucherStatus: params?.voucherStatus || '', // Always include voucherStatus as it's required
		};
		return this.apiClient.get<ILexwareInvoice[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, queryParams);
	}

	/**
	 * Create a new invoice
	 * @param additionalFields - Invoice data and properties
	 * @returns Promise<ILexwareInvoice> - The created invoice
	 */
	async create(additionalFields: Record<string, any>): Promise<ILexwareInvoice> {
		const invoiceData = LexwareDataTransformer.transformInvoiceData(additionalFields);
		return this.apiClient.post<ILexwareInvoice>(LEXWARE_API_ENDPOINTS.INVOICES, invoiceData);
	}

	/**
	 * Update an existing invoice
	 * @param invoiceId - The invoice ID to update
	 * @param additionalFields - Updated invoice data
	 * @returns Promise<ILexwareInvoice> - The updated invoice
	 */
	async update(invoiceId: string, additionalFields: Record<string, any>): Promise<ILexwareInvoice> {
		const sanitizedData = LexwareDataTransformer.sanitizeUpdateData(additionalFields);
		return this.apiClient.put<ILexwareInvoice>(`${LEXWARE_API_ENDPOINTS.INVOICES}/${invoiceId}`, sanitizedData);
	}

	/**
	 * Delete an invoice
	 * @param invoiceId - The invoice ID to delete
	 * @returns Promise<void>
	 */
	async delete(invoiceId: string): Promise<void> {
		return this.apiClient.delete<void>(`${LEXWARE_API_ENDPOINTS.INVOICES}/${invoiceId}`);
	}

	/**
	 * Finalize an invoice (change status from draft to open)
	 * @param invoiceId - The invoice ID to finalize
	 * @returns Promise<ILexwareInvoice> - The finalized invoice
	 */
	async finalize(invoiceId: string): Promise<ILexwareInvoice> {
		return this.apiClient.put<ILexwareInvoice>(`${LEXWARE_API_ENDPOINTS.INVOICES}/${invoiceId}/finalize`, {});
	}

	/**
	 * Render invoice as PDF document
	 * @param invoiceId - The invoice ID to render
	 * @returns Promise<any> - PDF document data
	 */
	async document(invoiceId: string): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.INVOICES}/${invoiceId}/document`);
	}

	/**
	 * Download invoice file
	 * @param invoiceId - The invoice ID to download
	 * @returns Promise<Buffer> - Invoice file content
	 */
	async downloadFile(invoiceId: string): Promise<Buffer> {
		const response = await this.apiClient.get<ArrayBuffer>(`${LEXWARE_API_ENDPOINTS.INVOICES}/${invoiceId}/file`);
		return Buffer.from(response);
	}

	/**
	 * Get invoice deeplink
	 * @param invoiceId - The invoice ID
	 * @returns Promise<string> - Deeplink URL
	 */
	async getDeeplink(invoiceId: string): Promise<string> {
		return `https://app.lexware.de/invoices/${invoiceId}`;
	}

	/**
	 * Get invoices by status
	 * @param status - The invoice status to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareInvoice[]> - Filtered invoices
	 */
	async getByStatus(status: string, params?: Record<string, any>): Promise<ILexwareInvoice[]> {
		const statusParams = {
			...params,
			voucherType: 'invoice',
			voucherStatus: params?.voucherStatus || '', // Always include voucherStatus as it's required
			invoiceStatus: status,
		};
		return this.apiClient.get<ILexwareInvoice[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, statusParams);
	}

	/**
	 * Get overdue invoices
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareInvoice[]> - Overdue invoices
	 */
	async getOverdue(params?: Record<string, any>): Promise<ILexwareInvoice[]> {
		return this.getByStatus(LEXWARE_INVOICE_STATUSES.OVERDUE, params);
	}

	/**
	 * Get paid invoices
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareInvoice[]> - Paid invoices
	 */
	async getPaid(params?: Record<string, any>): Promise<ILexwareInvoice[]> {
		return this.getByStatus(LEXWARE_INVOICE_STATUSES.PAID, params);
	}

	/**
	 * Get draft invoices
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareInvoice[]> - Draft invoices
	 */
	async getDrafts(params?: Record<string, any>): Promise<ILexwareInvoice[]> {
		return this.getByStatus(LEXWARE_INVOICE_STATUSES.DRAFT, params);
	}

	/**
	 * Get open invoices
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareInvoice[]> - Open invoices
	 */
	async getOpen(params?: Record<string, any>): Promise<ILexwareInvoice[]> {
		return this.getByStatus(LEXWARE_INVOICE_STATUSES.OPEN, params);
	}

	/**
	 * Get invoices by contact ID
	 * @param contactId - The contact ID to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareInvoice[]> - Filtered invoices
	 */
	async getByContact(contactId: string, params?: Record<string, any>): Promise<ILexwareInvoice[]> {
		const contactParams = {
			...params,
			voucherType: 'invoice',
			contactId,
		};
		return this.apiClient.get<ILexwareInvoice[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, contactParams);
	}

	/**
	 * Get invoices by date range
	 * @param startDate - Start date for filtering
	 * @param endDate - End date for filtering
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareInvoice[]> - Filtered invoices
	 */
	async getByDateRange(startDate: string, endDate: string, params?: Record<string, any>): Promise<ILexwareInvoice[]> {
		const dateParams = {
			...params,
			voucherType: 'invoice',
			voucherDateFrom: startDate,
			voucherDateTo: endDate,
		};
		return this.apiClient.get<ILexwareInvoice[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, dateParams);
	}

	/**
	 * Get invoices by due date range
	 * @param startDate - Start due date for filtering
	 * @param endDate - End due date for filtering
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareInvoice[]> - Filtered invoices
	 */
	async getByDueDateRange(startDate: string, endDate: string, params?: Record<string, any>): Promise<ILexwareInvoice[]> {
		const dueDateParams = {
			...params,
			voucherType: 'invoice',
			dueDateFrom: startDate,
			dueDateTo: endDate,
		};
		return this.apiClient.get<ILexwareInvoice[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, dueDateParams);
	}

	/**
	 * Get invoices by amount range
	 * @param minAmount - Minimum amount for filtering
	 * @param maxAmount - Maximum amount for filtering
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareInvoice[]> - Filtered invoices
	 */
	async getByAmountRange(minAmount: number, maxAmount: number, params?: Record<string, any>): Promise<ILexwareInvoice[]> {
		const amountParams = {
			...params,
			voucherType: 'invoice',
			totalAmountFrom: minAmount,
			totalAmountTo: maxAmount,
		};
		return this.apiClient.get<ILexwareInvoice[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, amountParams);
	}

	/**
	 * Search invoices by text
	 * @param searchTerm - The search term to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareInvoice[]> - Search results
	 */
	async search(searchTerm: string, params?: Record<string, any>): Promise<ILexwareInvoice[]> {
		const searchParams = {
			...params,
			voucherType: 'invoice',
			q: searchTerm,
		};
		return this.apiClient.get<ILexwareInvoice[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, searchParams);
	}

	/**
	 * Get XRechnung invoices
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareInvoice[]> - XRechnung invoices
	 */
	async getXRechnungInvoices(params?: Record<string, any>): Promise<ILexwareInvoice[]> {
		const xrechnungParams = {
			...params,
			voucherType: 'invoice',
			isXRechnung: true,
		};
		return this.apiClient.get<ILexwareInvoice[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, xrechnungParams);
	}

	/**
	 * Get recurring invoices
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareInvoice[]> - Recurring invoices
	 */
	async getRecurringInvoices(params?: Record<string, any>): Promise<ILexwareInvoice[]> {
		const recurringParams = {
			...params,
			voucherType: 'invoice',
			isRecurring: true,
		};
		return this.apiClient.get<ILexwareInvoice[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, recurringParams);
	}

	/**
	 * Get closing invoices
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareInvoice[]> - Closing invoices
	 */
	async getClosingInvoices(params?: Record<string, any>): Promise<ILexwareInvoice[]> {
		const closingParams = {
			...params,
			voucherType: 'invoice',
			isClosingInvoice: true,
		};
		return this.apiClient.get<ILexwareInvoice[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, closingParams);
	}

	/**
	 * Get invoices by tax type
	 * @param taxType - The tax type to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareInvoice[]> - Filtered invoices
	 */
	async getByTaxType(taxType: string, params?: Record<string, any>): Promise<ILexwareInvoice[]> {
		const taxParams = {
			...params,
			voucherType: 'invoice',
			taxType,
		};
		return this.apiClient.get<ILexwareInvoice[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, taxParams);
	}

	/**
	 * Get invoices by currency
	 * @param currency - The currency to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareInvoice[]> - Filtered invoices
	 */
	async getByCurrency(currency: string, params?: Record<string, any>): Promise<ILexwareInvoice[]> {
		const currencyParams = {
			...params,
			voucherType: 'invoice',
			currency,
		};
		return this.apiClient.get<ILexwareInvoice[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, currencyParams);
	}

	/**
	 * Get invoices by language
	 * @param language - The language to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareInvoice[]> - Filtered invoices
	 */
	async getByLanguage(language: string, params?: Record<string, any>): Promise<ILexwareInvoice[]> {
		const languageParams = {
			...params,
			voucherType: 'invoice',
			language,
		};
		return this.apiClient.get<ILexwareInvoice[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, languageParams);
	}

	/**
	 * Mark invoice as paid
	 * @param invoiceId - The invoice ID to mark as paid
	 * @param paymentDate - Optional payment date
	 * @returns Promise<ILexwareInvoice> - Updated invoice
	 */
	async markAsPaid(invoiceId: string, paymentDate?: string): Promise<ILexwareInvoice> {
		const paymentData = paymentDate ? { paidDate: paymentDate } : {};
		return this.apiClient.put<ILexwareInvoice>(`${LEXWARE_API_ENDPOINTS.INVOICES}/${invoiceId}`, {
			invoiceStatus: LEXWARE_INVOICE_STATUSES.PAID,
			...paymentData,
		});
	}

	/**
	 * Mark invoice as voided
	 * @param invoiceId - The invoice ID to void
	 * @returns Promise<ILexwareInvoice> - Updated invoice
	 */
	async void(invoiceId: string): Promise<ILexwareInvoice> {
		return this.apiClient.put<ILexwareInvoice>(`${LEXWARE_API_ENDPOINTS.INVOICES}/${invoiceId}`, {
			invoiceStatus: LEXWARE_INVOICE_STATUSES.VOIDED,
		});
	}

	/**
	 * Send invoice reminder
	 * @param invoiceId - The invoice ID to send reminder for
	 * @returns Promise<any> - Reminder response
	 */
	async sendReminder(invoiceId: string): Promise<any> {
		return this.apiClient.post<any>(`${LEXWARE_API_ENDPOINTS.INVOICES}/${invoiceId}/reminder`, {});
	}

	/**
	 * Validate invoice creation data
	 * @param additionalFields - The data to validate
	 * @returns string[] - Array of validation error messages
	 */
	validateCreateData(additionalFields: Record<string, any>): string[] {
		const requiredFields = ['voucherDate', 'contactId'];
		const errors = LexwareDataTransformer.validateRequiredFields(additionalFields, requiredFields);
		
		// Additional invoice-specific validation
		if (additionalFields.invoiceStatus && !Object.values(LEXWARE_INVOICE_STATUSES).includes(additionalFields.invoiceStatus)) {
			errors.push(`Invalid invoice status: ${additionalFields.invoiceStatus}`);
		}
		
		if (additionalFields.dueDate && !this.isValidDate(additionalFields.dueDate)) {
			errors.push('Invalid due date format');
		}
		
		if (additionalFields.lineItems && !Array.isArray(additionalFields.lineItems)) {
			errors.push('Line items must be an array');
		}
		
		return errors;
	}

	/**
	 * Validate invoice update data
	 * @param updateData - The data to validate
	 * @returns string[] - Array of validation error messages
	 */
	validateUpdateData(updateData: Record<string, any>): string[] {
		const errors: string[] = [];
		
		if (updateData.invoiceStatus && !Object.values(LEXWARE_INVOICE_STATUSES).includes(updateData.invoiceStatus)) {
			errors.push(`Invalid invoice status: ${updateData.invoiceStatus}`);
		}
		
		if (updateData.dueDate && !this.isValidDate(updateData.dueDate)) {
			errors.push('Invalid due date format');
		}
		
		if (updateData.lineItems && !Array.isArray(updateData.lineItems)) {
			errors.push('Line items must be an array');
		}
		
		return errors;
	}

	/**
	 * Check if date string is valid
	 * @param dateString - The date string to validate
	 * @returns boolean - True if valid date
	 */
	private isValidDate(dateString: string): boolean {
		const date = new Date(dateString);
		return date instanceof Date && !isNaN(date.getTime());
	}
}
