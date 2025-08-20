import { LexwareApiClient } from '../utils/api';
import { LexwareDataTransformer } from '../utils/transformers';
import { ILexwareOrderConfirmation, ILexwareCredentials } from '../types';
import { 
	LEXWARE_API_ENDPOINTS,
	LEXWARE_ORDER_CONFIRMATION_STATUSES
} from '../constants';

export class OrderConfirmationResource {
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
			voucherType: 'orderconfirmation',
			voucherStatus: params?.voucherStatus || '', // Always include voucherStatus as it's required
		};
	}

	/**
	 * Retrieve a specific order confirmation by ID
	 * @param orderConfirmationId - The unique identifier of the order confirmation
	 * @returns Promise<ILexwareOrderConfirmation> - The order confirmation data
	 */
	async get(orderConfirmationId: string): Promise<ILexwareOrderConfirmation> {
		return this.apiClient.get<ILexwareOrderConfirmation>(`${LEXWARE_API_ENDPOINTS.ORDER_CONFIRMATIONS}/${orderConfirmationId}`);
	}

	/**
	 * Retrieve all order confirmations with optional filtering and pagination
	 * @param params - Optional parameters for filtering and pagination
	 * @returns Promise<ILexwareOrderConfirmation[]> - Array of order confirmations
	 */
	async getAll(params?: Record<string, any>): Promise<ILexwareOrderConfirmation[]> {
		// Use voucherlist endpoint with order confirmation filter
		const queryParams = this.ensureVoucherlistParams(params);
		return this.apiClient.get<ILexwareOrderConfirmation[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, queryParams);
	}

	/**
	 * Create a new order confirmation
	 * @param additionalFields - Order confirmation data and properties
	 * @returns Promise<ILexwareOrderConfirmation> - The created order confirmation
	 */
	async create(additionalFields: Record<string, any>): Promise<ILexwareOrderConfirmation> {
		const orderConfirmationData = LexwareDataTransformer.transformOrderConfirmationData(additionalFields);
		return this.apiClient.post<ILexwareOrderConfirmation>(LEXWARE_API_ENDPOINTS.ORDER_CONFIRMATIONS, orderConfirmationData);
	}

	/**
	 * Update an existing order confirmation
	 * @param orderConfirmationId - The order confirmation ID to update
	 * @param additionalFields - Updated order confirmation data
	 * @returns Promise<ILexwareOrderConfirmation> - The updated order confirmation
	 */
	async update(orderConfirmationId: string, additionalFields: Record<string, any>): Promise<ILexwareOrderConfirmation> {
		const sanitizedData = LexwareDataTransformer.sanitizeUpdateData(additionalFields);
		return this.apiClient.put<ILexwareOrderConfirmation>(`${LEXWARE_API_ENDPOINTS.ORDER_CONFIRMATIONS}/${orderConfirmationId}`, sanitizedData);
	}

	/**
	 * Delete an order confirmation
	 * @param orderConfirmationId - The order confirmation ID to delete
	 * @returns Promise<void>
	 */
	async delete(orderConfirmationId: string): Promise<void> {
		return this.apiClient.delete<void>(`${LEXWARE_API_ENDPOINTS.ORDER_CONFIRMATIONS}/${orderConfirmationId}`);
	}

	/**
	 * Pursue an order confirmation (change status from draft to open)
	 * @param orderConfirmationId - The order confirmation ID to pursue
	 * @returns Promise<ILexwareOrderConfirmation> - The pursued order confirmation
	 */
	async pursue(orderConfirmationId: string): Promise<ILexwareOrderConfirmation> {
		return this.apiClient.put<ILexwareOrderConfirmation>(`${LEXWARE_API_ENDPOINTS.ORDER_CONFIRMATIONS}/${orderConfirmationId}/pursue`, {});
	}

	/**
	 * Render order confirmation as PDF document
	 * @param orderConfirmationId - The order confirmation ID to render
	 * @returns Promise<any> - PDF document data
	 */
	async document(orderConfirmationId: string): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.ORDER_CONFIRMATIONS}/${orderConfirmationId}/document`);
	}

	/**
	 * Download order confirmation file
	 * @param orderConfirmationId - The order confirmation ID to download
	 * @returns Promise<Buffer> - Order confirmation file content
	 */
	async downloadFile(orderConfirmationId: string): Promise<Buffer> {
		const response = await this.apiClient.get<ArrayBuffer>(`${LEXWARE_API_ENDPOINTS.ORDER_CONFIRMATIONS}/${orderConfirmationId}/file`);
		return Buffer.from(response);
	}

	/**
	 * Get order confirmation deeplink
	 * @param orderConfirmationId - The order confirmation ID
	 * @returns Promise<string> - Deeplink URL
	 */
	async getDeeplink(orderConfirmationId: string): Promise<string> {
		return `https://app.lexware.de/order-confirmations/${orderConfirmationId}`;
	}

	/**
	 * Get order confirmations by status
	 * @param status - The order confirmation status to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareOrderConfirmation[]> - Filtered order confirmations
	 */
	async getByStatus(status: string, params?: Record<string, any>): Promise<ILexwareOrderConfirmation[]> {
		const statusParams = this.ensureVoucherlistParams({
			...params,
			orderConfirmationStatus: status,
		});
		return this.apiClient.get<ILexwareOrderConfirmation[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, statusParams);
	}

	/**
	 * Get confirmed order confirmations
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareOrderConfirmation[]> - Confirmed order confirmations
	 */
	async getConfirmed(params?: Record<string, any>): Promise<ILexwareOrderConfirmation[]> {
		return this.getByStatus(LEXWARE_ORDER_CONFIRMATION_STATUSES.CONFIRMED, params);
	}

	/**
	 * Get draft order confirmations
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareOrderConfirmation[]> - Draft order confirmations
	 */
	async getDrafts(params?: Record<string, any>): Promise<ILexwareOrderConfirmation[]> {
		return this.getByStatus(LEXWARE_ORDER_CONFIRMATION_STATUSES.DRAFT, params);
	}

	/**
	 * Get open order confirmations
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareOrderConfirmation[]> - Open order confirmations
	 */
	async getOpen(params?: Record<string, any>): Promise<ILexwareOrderConfirmation[]> {
		return this.getByStatus(LEXWARE_ORDER_CONFIRMATION_STATUSES.OPEN, params);
	}

	/**
	 * Get cancelled order confirmations
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareOrderConfirmation[]> - Cancelled order confirmations
	 */
	async getCancelled(params?: Record<string, any>): Promise<ILexwareOrderConfirmation[]> {
		return this.getByStatus(LEXWARE_ORDER_CONFIRMATION_STATUSES.CANCELLED, params);
	}

	/**
	 * Get completed order confirmations
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareOrderConfirmation[]> - Completed order confirmations
	 */
	async getCompleted(params?: Record<string, any>): Promise<ILexwareOrderConfirmation[]> {
		return this.getByStatus(LEXWARE_ORDER_CONFIRMATION_STATUSES.COMPLETED, params);
	}

	/**
	 * Get order confirmations by contact ID
	 * @param contactId - The contact ID to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareOrderConfirmation[]> - Filtered order confirmations
	 */
	async getByContact(contactId: string, params?: Record<string, any>): Promise<ILexwareOrderConfirmation[]> {
		const contactParams = this.ensureVoucherlistParams({
			...params,
			contactId,
		});
		return this.apiClient.get<ILexwareOrderConfirmation[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, contactParams);
	}

	/**
	 * Get order confirmations by date range
	 * @param startDate - Start date for filtering
	 * @param endDate - End date for filtering
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareOrderConfirmation[]> - Filtered order confirmations
	 */
	async getByDateRange(startDate: string, endDate: string, params?: Record<string, any>): Promise<ILexwareOrderConfirmation[]> {
		const dateParams = this.ensureVoucherlistParams({
			...params,
			voucherDateFrom: startDate,
			voucherDateTo: endDate,
		});
		return this.apiClient.get<ILexwareOrderConfirmation[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, dateParams);
	}

	/**
	 * Get order confirmations by delivery date range
	 * @param startDate - Start delivery date for filtering
	 * @param endDate - End delivery date for filtering
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareOrderConfirmation[]> - Filtered order confirmations
	 */
	async getByDeliveryDateRange(startDate: string, endDate: string, params?: Record<string, any>): Promise<ILexwareOrderConfirmation[]> {
		const deliveryDateParams = this.ensureVoucherlistParams({
			...params,
			deliveryDateFrom: startDate,
			deliveryDateTo: endDate,
		});
		return this.apiClient.get<ILexwareOrderConfirmation[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, deliveryDateParams);
	}

	/**
	 * Get order confirmations by amount range
	 * @param minAmount - Minimum amount for filtering
	 * @param maxAmount - Maximum amount for filtering
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareOrderConfirmation[]> - Filtered order confirmations
	 */
	async getByAmountRange(minAmount: number, maxAmount: number, params?: Record<string, any>): Promise<ILexwareOrderConfirmation[]> {
		const amountParams = this.ensureVoucherlistParams({
			...params,
			totalAmountFrom: minAmount,
			totalAmountTo: maxAmount,
		});
		return this.apiClient.get<ILexwareOrderConfirmation[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, amountParams);
	}

	/**
	 * Search order confirmations by text
	 * @param searchTerm - The search term to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareOrderConfirmation[]> - Search results
	 */
	async search(searchTerm: string, params?: Record<string, any>): Promise<ILexwareOrderConfirmation[]> {
		const searchParams = this.ensureVoucherlistParams({
			...params,
			q: searchTerm,
		});
		return this.apiClient.get<ILexwareOrderConfirmation[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, searchParams);
	}

	/**
	 * Get XRechnung order confirmations
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareOrderConfirmation[]> - XRechnung order confirmations
	 */
	async getXRechnungOrderConfirmations(params?: Record<string, any>): Promise<ILexwareOrderConfirmation[]> {
		const xrechnungParams = this.ensureVoucherlistParams({
			...params,
			isXRechnung: true,
		});
		return this.apiClient.get<ILexwareOrderConfirmation[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, xrechnungParams);
	}

	/**
	 * Get recurring order confirmations
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareOrderConfirmation[]> - Recurring order confirmations
	 */
	async getRecurringOrderConfirmations(params?: Record<string, any>): Promise<ILexwareOrderConfirmation[]> {
		const recurringParams = {
			...params,
			voucherType: 'orderconfirmation',
			isRecurring: true,
		};
		return this.apiClient.get<ILexwareOrderConfirmation[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, recurringParams);
	}

	/**
	 * Get order confirmations by tax type
	 * @param taxType - The tax type to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareOrderConfirmation[]> - Filtered order confirmations
	 */
	async getByTaxType(taxType: string, params?: Record<string, any>): Promise<ILexwareOrderConfirmation[]> {
		const taxParams = {
			...params,
			voucherType: 'orderconfirmation',
			taxType,
		};
		return this.apiClient.get<ILexwareOrderConfirmation[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, taxParams);
	}

	/**
	 * Get order confirmations by currency
	 * @param currency - The currency to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareOrderConfirmation[]> - Filtered order confirmations
	 */
	async getByCurrency(currency: string, params?: Record<string, any>): Promise<ILexwareOrderConfirmation[]> {
		const currencyParams = {
			...params,
			voucherType: 'orderconfirmation',
			currency,
		};
		return this.apiClient.get<ILexwareOrderConfirmation[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, currencyParams);
	}

	/**
	 * Get order confirmations by language
	 * @param language - The language to filter by
	 * @param params - Additional parameters
	 * @returns Promise<ILexwareOrderConfirmation[]> - Filtered order confirmations
	 */
	async getByLanguage(language: string, params?: Record<string, any>): Promise<ILexwareOrderConfirmation[]> {
		const languageParams = {
			...params,
			voucherType: 'orderconfirmation',
			language,
		};
		return this.apiClient.get<ILexwareOrderConfirmation[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, languageParams);
	}

	/**
	 * Confirm an order confirmation
	 * @param orderConfirmationId - The order confirmation ID to confirm
	 * @returns Promise<ILexwareOrderConfirmation> - Updated order confirmation
	 */
	async confirm(orderConfirmationId: string): Promise<ILexwareOrderConfirmation> {
		return this.apiClient.put<ILexwareOrderConfirmation>(`${LEXWARE_API_ENDPOINTS.ORDER_CONFIRMATIONS}/${orderConfirmationId}`, {
			orderConfirmationStatus: LEXWARE_ORDER_CONFIRMATION_STATUSES.CONFIRMED,
		});
	}

	/**
	 * Cancel an order confirmation
	 * @param orderConfirmationId - The order confirmation ID to cancel
	 * @returns Promise<ILexwareOrderConfirmation> - Updated order confirmation
	 */
	async cancel(orderConfirmationId: string): Promise<ILexwareOrderConfirmation> {
		return this.apiClient.put<ILexwareOrderConfirmation>(`${LEXWARE_API_ENDPOINTS.ORDER_CONFIRMATIONS}/${orderConfirmationId}`, {
			orderConfirmationStatus: LEXWARE_ORDER_CONFIRMATION_STATUSES.CANCELLED,
		});
	}

	/**
	 * Mark order confirmation as completed
	 * @param orderConfirmationId - The order confirmation ID to mark as completed
	 * @returns Promise<ILexwareOrderConfirmation> - Updated order confirmation
	 */
	async markAsCompleted(orderConfirmationId: string): Promise<ILexwareOrderConfirmation> {
		return this.apiClient.put<ILexwareOrderConfirmation>(`${LEXWARE_API_ENDPOINTS.ORDER_CONFIRMATIONS}/${orderConfirmationId}`, {
			orderConfirmationStatus: LEXWARE_ORDER_CONFIRMATION_STATUSES.COMPLETED,
		});
	}

	/**
	 * Validate order confirmation creation data
	 * @param additionalFields - The data to validate
	 * @returns string[] - Array of validation error messages
	 */
	validateCreateData(additionalFields: Record<string, any>): string[] {
		const requiredFields = ['voucherDate', 'contactId'];
		const errors = LexwareDataTransformer.validateRequiredFields(additionalFields, requiredFields);
		
		// Additional order confirmation-specific validation
		if (additionalFields.orderConfirmationStatus && !Object.values(LEXWARE_ORDER_CONFIRMATION_STATUSES).includes(additionalFields.orderConfirmationStatus)) {
			errors.push(`Invalid order confirmation status: ${additionalFields.orderConfirmationStatus}`);
		}
		
		if (additionalFields.validUntil && !this.isValidDate(additionalFields.validUntil)) {
			errors.push('Invalid valid until date format');
		}
		
		if (additionalFields.deliveryDate && !this.isValidDate(additionalFields.deliveryDate)) {
			errors.push('Invalid delivery date format');
		}
		
		if (additionalFields.lineItems && !Array.isArray(additionalFields.lineItems)) {
			errors.push('Line items must be an array');
		}
		
		return errors;
	}

	/**
	 * Validate order confirmation update data
	 * @param updateData - The data to validate
	 * @returns string[] - Array of validation error messages
	 */
	validateUpdateData(updateData: Record<string, any>): string[] {
		const errors: string[] = [];
		
		if (updateData.orderConfirmationStatus && !Object.values(LEXWARE_ORDER_CONFIRMATION_STATUSES).includes(updateData.orderConfirmationStatus)) {
			errors.push(`Invalid order confirmation status: ${updateData.orderConfirmationStatus}`);
		}
		
		if (updateData.validUntil && !this.isValidDate(updateData.validUntil)) {
			errors.push('Invalid valid until date format');
		}
		
		if (updateData.deliveryDate && !this.isValidDate(updateData.deliveryDate)) {
			errors.push('Invalid delivery date format');
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
