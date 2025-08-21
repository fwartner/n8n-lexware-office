import { LexwareApiClient } from '../utils/api';
import { LexwareDataTransformer } from '../utils/transformers';
import { ILexwareQuotation, ILexwareCredentials } from '../types';
import { 
	LEXWARE_API_ENDPOINTS,
	LEXWARE_QUOTATION_STATUSES,
	LEXWARE_QUOTATION_TYPES,
	LEXWARE_QUOTATION_PRIORITIES,
	LEXWARE_QUOTATION_APPROVAL_STATUSES,
	LEXWARE_QUOTATION_REMINDER_FREQUENCIES,
	LEXWARE_QUOTATION_LINE_ITEM_TYPES,
	LEXWARE_QUOTATION_AVAILABILITY_STATUSES,
	LEXWARE_QUOTATION_LEAD_TIME_UNITS
} from '../constants';

export class QuotationResource {
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
			voucherType: 'quotation',
			voucherStatus: params?.voucherStatus || '', // Always include voucherStatus as it's required
		};
	}

	/**
	 * Retrieve a quotation by ID
	 * @param quotationId - The quotation ID
	 * @returns Promise<ILexwareQuotation> - The quotation data
	 */
	async get(quotationId: string): Promise<ILexwareQuotation> {
		return this.apiClient.get<ILexwareQuotation>(`${LEXWARE_API_ENDPOINTS.QUOTATIONS}/${quotationId}`);
	}

	/**
	 * Retrieve all quotations with optional filtering
	 * @param params - Optional query parameters
	 * @returns Promise<ILexwareQuotation[]> - Array of quotations
	 */
	async getAll(params?: Record<string, any>): Promise<ILexwareQuotation[]> {
		// Use voucherlist endpoint with quotation filter
		const queryParams = this.ensureVoucherlistParams(params);
		return this.apiClient.get<ILexwareQuotation[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, queryParams);
	}

	/**
	 * Create a new quotation
	 * @param additionalFields - The quotation data
	 * @returns Promise<ILexwareQuotation> - The created quotation
	 */
	async create(additionalFields: Record<string, any>): Promise<ILexwareQuotation> {
		const quotationData = LexwareDataTransformer.transformQuotationData(additionalFields);
		return this.apiClient.post<ILexwareQuotation>(LEXWARE_API_ENDPOINTS.QUOTATIONS, quotationData);
	}

	/**
	 * Update an existing quotation
	 * @param quotationId - The quotation ID
	 * @param additionalFields - The data to update
	 * @returns Promise<ILexwareQuotation> - The updated quotation
	 */
	async update(quotationId: string, additionalFields: Record<string, any>): Promise<ILexwareQuotation> {
		const sanitizedData = LexwareDataTransformer.sanitizeUpdateData(additionalFields);
		return this.apiClient.put<ILexwareQuotation>(`${LEXWARE_API_ENDPOINTS.QUOTATIONS}/${quotationId}`, sanitizedData);
	}

	/**
	 * Delete a quotation
	 * @param quotationId - The quotation ID
	 * @returns Promise<void> - Success status
	 */
	async delete(quotationId: string): Promise<void> {
		return this.apiClient.delete<void>(`${LEXWARE_API_ENDPOINTS.QUOTATIONS}/${quotationId}`);
	}

	/**
	 * Accept a quotation
	 * @param quotationId - The quotation ID
	 * @returns Promise<ILexwareQuotation> - The accepted quotation
	 */
	async accept(quotationId: string): Promise<ILexwareQuotation> {
		return this.apiClient.put<ILexwareQuotation>(`${LEXWARE_API_ENDPOINTS.QUOTATIONS}/${quotationId}/accept`, {});
	}

	/**
	 * Reject a quotation
	 * @param quotationId - The quotation ID
	 * @returns Promise<ILexwareQuotation> - The rejected quotation
	 */
	async reject(quotationId: string): Promise<ILexwareQuotation> {
		return this.apiClient.put<ILexwareQuotation>(`${LEXWARE_API_ENDPOINTS.QUOTATIONS}/${quotationId}/reject`, {});
	}

	/**
	 * Render quotation document (PDF)
	 * @param quotationId - The quotation ID
	 * @returns Promise<any> - Document data
	 */
	async document(quotationId: string): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.QUOTATIONS}/${quotationId}/document`);
	}

	/**
	 * Download quotation file
	 * @param quotationId - The quotation ID
	 * @returns Promise<any> - File data
	 */
	async downloadFile(quotationId: string): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.QUOTATIONS}/${quotationId}/file`);
	}

	/**
	 * Get quotation deeplink
	 * @param quotationId - The quotation ID
	 * @returns Promise<any> - Deeplink data
	 */
	async getDeeplink(quotationId: string): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.QUOTATIONS}/${quotationId}/deeplink`);
	}

	/**
	 * Cancel a quotation
	 * @param quotationId - The quotation ID
	 * @param reason - Cancellation reason
	 * @returns Promise<ILexwareQuotation> - The cancelled quotation
	 */
	async cancel(quotationId: string, reason?: string): Promise<ILexwareQuotation> {
		const data = reason ? { reason } : {};
		return this.apiClient.put<ILexwareQuotation>(`${LEXWARE_API_ENDPOINTS.QUOTATIONS}/${quotationId}/cancel`, data);
	}

	/**
	 * Expire a quotation
	 * @param quotationId - The quotation ID
	 * @returns Promise<ILexwareQuotation> - The expired quotation
	 */
	async expire(quotationId: string): Promise<ILexwareQuotation> {
		return this.apiClient.put<ILexwareQuotation>(`${LEXWARE_API_ENDPOINTS.QUOTATIONS}/${quotationId}/expire`, {});
	}

	/**
	 * Reopen a quotation
	 * @param quotationId - The quotation ID
	 * @returns Promise<ILexwareQuotation> - The reopened quotation
	 */
	async reopen(quotationId: string): Promise<ILexwareQuotation> {
		return this.apiClient.put<ILexwareQuotation>(`${LEXWARE_API_ENDPOINTS.QUOTATIONS}/${quotationId}/reopen`, {});
	}

	/**
	 * Duplicate a quotation
	 * @param quotationId - The quotation ID
	 * @param newData - Additional data for the new quotation
	 * @returns Promise<ILexwareQuotation> - The duplicated quotation
	 */
	async duplicate(quotationId: string, newData?: Record<string, any>): Promise<ILexwareQuotation> {
		return this.apiClient.post<ILexwareQuotation>(`${LEXWARE_API_ENDPOINTS.QUOTATIONS}/${quotationId}/duplicate`, newData || {});
	}

	/**
	 * Send quotation via email
	 * @param quotationId - The quotation ID
	 * @param emailData - Email configuration
	 * @returns Promise<any> - Email sending result
	 */
	async sendEmail(quotationId: string, emailData: Record<string, any>): Promise<any> {
		return this.apiClient.post<any>(`${LEXWARE_API_ENDPOINTS.QUOTATIONS}/${quotationId}/send-email`, emailData);
	}

	/**
	 * Get quotation statistics
	 * @param params - Optional query parameters
	 * @returns Promise<any> - Statistics data
	 */
	async getStatistics(params?: Record<string, any>): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.QUOTATIONS}/statistics`, params);
	}

	/**
	 * Get quotations by status
	 * @param status - The quotation status
	 * @param params - Optional query parameters
	 * @returns Promise<ILexwareQuotation[]> - Array of quotations
	 */
	async getByStatus(status: string, params?: Record<string, any>): Promise<ILexwareQuotation[]> {
		const queryParams = this.ensureVoucherlistParams({
			...params,
			quotationStatus: status,
		});
		return this.apiClient.get<ILexwareQuotation[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, queryParams);
	}

	/**
	 * Get quotations by type
	 * @param type - The quotation type
	 * @param params - Optional query parameters
	 * @returns Promise<ILexwareQuotation[]> - Array of quotations
	 */
	async getByType(type: string, params?: Record<string, any>): Promise<ILexwareQuotation[]> {
		const queryParams = this.ensureVoucherlistParams({
			...params,
			quotationType: type,
		});
		return this.apiClient.get<ILexwareQuotation[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, queryParams);
	}

	/**
	 * Get quotations by priority
	 * @param priority - The quotation priority
	 * @param params - Optional query parameters
	 * @returns Promise<ILexwareQuotation[]> - Array of quotations
	 */
	async getByPriority(priority: string, params?: Record<string, any>): Promise<ILexwareQuotation[]> {
		const queryParams = this.ensureVoucherlistParams({
			...params,
			priority: priority,
		});
		return this.apiClient.get<ILexwareQuotation[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, queryParams);
	}

	/**
	 * Get quotations by date range
	 * @param startDate - Start date (YYYY-MM-DD)
	 * @param endDate - End date (YYYY-MM-DD)
	 * @param params - Optional query parameters
	 * @returns Promise<ILexwareQuotation[]> - Array of quotations
	 */
	async getByDateRange(startDate: string, endDate: string, params?: Record<string, any>): Promise<ILexwareQuotation[]> {
		const queryParams = this.ensureVoucherlistParams({
			...params,
			startDate: startDate,
			endDate: endDate,
		});
		return this.apiClient.get<ILexwareQuotation[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, queryParams);
	}

	/**
	 * Get quotations by contact
	 * @param contactId - The contact ID
	 * @param params - Optional query parameters
	 * @returns Promise<ILexwareQuotation[]> - Array of quotations
	 */
	async getByContact(contactId: string, params?: Record<string, any>): Promise<ILexwareQuotation[]> {
		const queryParams = this.ensureVoucherlistParams({
			...params,
			contactId: contactId,
		});
		return this.apiClient.get<ILexwareQuotation[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, queryParams);
	}

	/**
	 * Get quotations by sales person
	 * @param salesPerson - The sales person identifier
	 * @param params - Optional query parameters
	 * @returns Promise<ILexwareQuotation[]> - Array of quotations
	 */
	async getBySalesPerson(salesPerson: string, params?: Record<string, any>): Promise<ILexwareQuotation[]> {
		const queryParams = this.ensureVoucherlistParams({
			...params,
			salesPerson: salesPerson,
		});
		return this.apiClient.get<ILexwareQuotation[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, queryParams);
	}

	/**
	 * Get quotations by campaign
	 * @param campaign - The campaign identifier
	 * @param params - Optional query parameters
	 * @returns Promise<ILexwareQuotation[]> - Array of quotations
	 */
	async getByCampaign(campaign: string, params?: Record<string, any>): Promise<ILexwareQuotation[]> {
		const queryParams = this.ensureVoucherlistParams({
			...params,
			campaign: campaign,
		});
		return this.apiClient.get<ILexwareQuotation[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, queryParams);
	}

	/**
	 * Get quotations by value range
	 * @param minValue - Minimum value
	 * @param maxValue - Maximum value
	 * @param params - Optional query parameters
	 * @returns Promise<ILexwareQuotation[]> - Array of quotations
	 */
	async getByValueRange(minValue: number, maxValue: number, params?: Record<string, any>): Promise<ILexwareQuotation[]> {
		const queryParams = this.ensureVoucherlistParams({
			...params,
			minValue: minValue,
			maxValue: maxValue,
		});
		return this.apiClient.get<ILexwareQuotation[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, queryParams);
	}

	/**
	 * Get quotations by probability
	 * @param minProbability - Minimum probability (0-100)
	 * @param maxProbability - Maximum probability (0-100)
	 * @param params - Optional query parameters
	 * @returns Promise<ILexwareQuotation[]> - Array of quotations
	 */
	async getByProbability(minProbability: number, maxProbability: number, params?: Record<string, any>): Promise<ILexwareQuotation[]> {
		const queryParams = this.ensureVoucherlistParams({
			...params,
			minProbability: minProbability,
			maxProbability: maxProbability,
		});
		return this.apiClient.get<ILexwareQuotation[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, queryParams);
	}

	/**
	 * Get quotations requiring approval
	 * @param params - Optional query parameters
	 * @returns Promise<ILexwareQuotation[]> - Array of quotations
	 */
	async getRequiringApproval(params?: Record<string, any>): Promise<ILexwareQuotation[]> {
		const queryParams = this.ensureVoucherlistParams({
			...params,
			approvalRequired: true,
		});
		return this.apiClient.get<ILexwareQuotation[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, queryParams);
	}

	/**
	 * Get quotations with reminders
	 * @param params - Optional query parameters
	 * @returns Promise<ILexwareQuotation[]> - Array of quotations
	 */
	async getWithReminders(params?: Record<string, any>): Promise<ILexwareQuotation[]> {
		const queryParams = this.ensureVoucherlistParams({
			...params,
			reminderEnabled: true,
		});
		return this.apiClient.get<ILexwareQuotation[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, queryParams);
	}

	/**
	 * Get expired quotations
	 * @param params - Optional query parameters
	 * @returns Promise<ILexwareQuotation[]> - Array of quotations
	 */
	async getExpired(params?: Record<string, any>): Promise<ILexwareQuotation[]> {
		const queryParams = this.ensureVoucherlistParams({
			...params,
			quotationStatus: LEXWARE_QUOTATION_STATUSES.EXPIRED,
		});
		return this.apiClient.get<ILexwareQuotation[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, queryParams);
	}

	/**
	 * Get quotations expiring soon
	 * @param days - Number of days to look ahead
	 * @param params - Optional query parameters
	 * @returns Promise<ILexwareQuotation[]> - Array of quotations
	 */
	async getExpiringSoon(days: number = 7, params?: Record<string, any>): Promise<ILexwareQuotation[]> {
		const queryParams = this.ensureVoucherlistParams({
			...params,
			expiringWithinDays: days,
		});
		return this.apiClient.get<ILexwareQuotation[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, queryParams);
	}

	/**
	 * Get quotations by language
	 * @param language - The language code
	 * @param params - Optional query parameters
	 * @returns Promise<ILexwareQuotation[]> - Array of quotations
	 */
	async getByLanguage(language: string, params?: Record<string, any>): Promise<ILexwareQuotation[]> {
		const queryParams = this.ensureVoucherlistParams({
			...params,
			language: language,
		});
		return this.apiClient.get<ILexwareQuotation[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, queryParams);
	}

	/**
	 * Get quotations by currency
	 * @param currency - The currency code
	 * @param params - Optional query parameters
	 * @returns Promise<ILexwareQuotation[]> - Array of quotations
	 */
	async getByCurrency(currency: string, params?: Record<string, any>): Promise<ILexwareQuotation[]> {
		const queryParams = this.ensureVoucherlistParams({
			...params,
			currency: currency,
		});
		return this.apiClient.get<ILexwareQuotation[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, queryParams);
	}

	/**
	 * Get quotations with XRechnung support
	 * @param params - Optional query parameters
	 * @returns Promise<ILexwareQuotation[]> - Array of quotations
	 */
	async getWithXRechnung(params?: Record<string, any>): Promise<ILexwareQuotation[]> {
		const queryParams = this.ensureVoucherlistParams({
			...params,
			xrechnungEnabled: true,
		});
		return this.apiClient.get<ILexwareQuotation[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, queryParams);
	}

	/**
	 * Get quotations by print layout
	 * @param printLayout - The print layout ID
	 * @param params - Optional query parameters
	 * @returns Promise<ILexwareQuotation[]> - Array of quotations
	 */
	async getByPrintLayout(printLayout: string, params?: Record<string, any>): Promise<ILexwareQuotation[]> {
		const queryParams = this.ensureVoucherlistParams({
			...params,
			printLayout: printLayout,
		});
		return this.apiClient.get<ILexwareQuotation[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, queryParams);
	}

	/**
	 * Get quotations by tag
	 * @param tag - The tag to search for
	 * @param params - Optional query parameters
	 * @returns Promise<ILexwareQuotation[]> - Array of quotations
	 */
	async getByTag(tag: string, params?: Record<string, any>): Promise<ILexwareQuotation[]> {
		const queryParams = this.ensureVoucherlistParams({
			...params,
			tag: tag,
		});
		return this.apiClient.get<ILexwareQuotation[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, queryParams);
	}

	/**
	 * Search quotations by text
	 * @param searchTerm - The search term
	 * @param params - Optional query parameters
	 * @returns Promise<ILexwareQuotation[]> - Array of quotations
	 */
	async search(searchTerm: string, params?: Record<string, any>): Promise<ILexwareQuotation[]> {
		const queryParams = this.ensureVoucherlistParams({
			...params,
			search: searchTerm,
		});
		return this.apiClient.get<ILexwareQuotation[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, queryParams);
	}

	/**
	 * Get quotations with attachments
	 * @param params - Optional query parameters
	 * @returns Promise<ILexwareQuotation[]> - Array of quotations
	 */
	async getWithAttachments(params?: Record<string, any>): Promise<ILexwareQuotation[]> {
		const queryParams = this.ensureVoucherlistParams({
			...params,
			hasAttachments: true,
		});
		return this.apiClient.get<ILexwareQuotation[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, queryParams);
	}

	/**
	 * Get quotations by external reference
	 * @param externalId - The external ID
	 * @param externalSystem - The external system
	 * @param params - Optional query parameters
	 * @returns Promise<ILexwareQuotation[]> - Array of quotations
	 */
	async getByExternalReference(externalId: string, externalSystem: string, params?: Record<string, any>): Promise<ILexwareQuotation[]> {
		const queryParams = this.ensureVoucherlistParams({
			...params,
			externalId: externalId,
			externalSystem: externalSystem,
		});
		return this.apiClient.get<ILexwareQuotation[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, queryParams);
	}

	/**
	 * Validate quotation creation data
	 * @param additionalFields - The quotation data to validate
	 * @returns string[] - Array of validation error messages
	 */
	validateCreateData(additionalFields: Record<string, any>): string[] {
		const errors: string[] = [];
		
		// Required fields validation
		if (!additionalFields.voucherDate) {
			errors.push('voucherDate is required');
		}
		if (!additionalFields.contactId) {
			errors.push('contactId is required');
		}
		
		// Additional validation
		const validationErrors = this.validateQuotationData(additionalFields);
		errors.push(...validationErrors);
		
		return errors;
	}

	/**
	 * Validate quotation update data
	 * @param additionalFields - The quotation data to validate
	 * @returns string[] - Array of validation error messages
	 */
	validateUpdateData(additionalFields: Record<string, any>): string[] {
		return this.validateQuotationData(additionalFields);
	}

	/**
	 * Validate quotation data (common validation logic)
	 * @param quotationData - The quotation data to validate
	 * @returns string[] - Array of validation error messages
	 */
	private validateQuotationData(quotationData: Record<string, any>): string[] {
		const errors: string[] = [];
		
		// Date validation
		if (quotationData.voucherDate && !this.isValidDate(quotationData.voucherDate)) {
			errors.push('Valid voucherDate format is required (YYYY-MM-DD)');
		}
		if (quotationData.validUntil && !this.isValidDate(quotationData.validUntil)) {
			errors.push('Valid validUntil format is required (YYYY-MM-DD)');
		}
		if (quotationData.expiryDate && !this.isValidDate(quotationData.expiryDate)) {
			errors.push('Valid expiryDate format is required (YYYY-MM-DD)');
		}
		if (quotationData.deliveryDate && !this.isValidDate(quotationData.deliveryDate)) {
			errors.push('Valid deliveryDate format is required (YYYY-MM-DD)');
		}
		if (quotationData.shippingDate && !this.isValidDate(quotationData.shippingDate)) {
			errors.push('Valid shippingDate format is required (YYYY-MM-DD)');
		}
		if (quotationData.foundingDate && !this.isValidDate(quotationData.foundingDate)) {
			errors.push('Valid foundingDate format is required (YYYY-MM-DD)');
		}
		if (quotationData.expectedOrderDate && !this.isValidDate(quotationData.expectedOrderDate)) {
			errors.push('Valid expectedOrderDate format is required (YYYY-MM-DD)');
		}
		if (quotationData.approvalDate && !this.isValidDate(quotationData.approvalDate)) {
			errors.push('Valid approvalDate format is required (YYYY-MM-DD)');
		}
		if (quotationData.reminderDate && !this.isValidDate(quotationData.reminderDate)) {
			errors.push('Valid reminderDate format is required (YYYY-MM-DD)');
		}
		if (quotationData.lastReminderSent && !this.isValidDate(quotationData.lastReminderSent)) {
			errors.push('Valid lastReminderSent format is required (YYYY-MM-DD)');
		}
		if (quotationData.nextReminderDate && !this.isValidDate(quotationData.nextReminderDate)) {
			errors.push('Valid nextReminderDate format is required (YYYY-MM-DD)');
		}
		if (quotationData.termsAcceptedDate && !this.isValidDate(quotationData.termsAcceptedDate)) {
			errors.push('Valid termsAcceptedDate format is required (YYYY-MM-DD)');
		}
		if (quotationData.uploadDate && !this.isValidDate(quotationData.uploadDate)) {
			errors.push('Valid uploadDate format is required (YYYY-MM-DD)');
		}
		if (quotationData.lastViewed && !this.isValidDate(quotationData.lastViewed)) {
			errors.push('Valid lastViewed format is required (YYYY-MM-DD)');
		}
		if (quotationData.lastSyncDate && !this.isValidDate(quotationData.lastSyncDate)) {
			errors.push('Valid lastSyncDate format is required (YYYY-MM-DD)');
		}
		
		// Status validation
		if (quotationData.quotationStatus && !Object.values(LEXWARE_QUOTATION_STATUSES).includes(quotationData.quotationStatus)) {
			errors.push(`Invalid quotationStatus. Must be one of: ${Object.values(LEXWARE_QUOTATION_STATUSES).join(', ')}`);
		}
		
		// Type validation
		if (quotationData.quotationType && !Object.values(LEXWARE_QUOTATION_TYPES).includes(quotationData.quotationType)) {
			errors.push(`Invalid quotationType. Must be one of: ${Object.values(LEXWARE_QUOTATION_TYPES).join(', ')}`);
		}
		
		// Priority validation
		if (quotationData.priority && !Object.values(LEXWARE_QUOTATION_PRIORITIES).includes(quotationData.priority)) {
			errors.push(`Invalid priority. Must be one of: ${Object.values(LEXWARE_QUOTATION_PRIORITIES).join(', ')}`);
		}
		
		// Approval status validation
		if (quotationData.approvalStatus && !Object.values(LEXWARE_QUOTATION_APPROVAL_STATUSES).includes(quotationData.approvalStatus)) {
			errors.push(`Invalid approvalStatus. Must be one of: ${Object.values(LEXWARE_QUOTATION_APPROVAL_STATUSES).join(', ')}`);
		}
		
		// Reminder frequency validation
		if (quotationData.reminderFrequency && !Object.values(LEXWARE_QUOTATION_REMINDER_FREQUENCIES).includes(quotationData.reminderFrequency)) {
			errors.push(`Invalid reminderFrequency. Must be one of: ${Object.values(LEXWARE_QUOTATION_REMINDER_FREQUENCIES).join(', ')}`);
		}
		
		// Lead time unit validation
		if (quotationData.leadTimeUnit && !Object.values(LEXWARE_QUOTATION_LEAD_TIME_UNITS).includes(quotationData.leadTimeUnit)) {
			errors.push(`Invalid leadTimeUnit. Must be one of: ${Object.values(LEXWARE_QUOTATION_LEAD_TIME_UNITS).join(', ')}`);
		}
		
		// Availability validation
		if (quotationData.availability && !Object.values(LEXWARE_QUOTATION_AVAILABILITY_STATUSES).includes(quotationData.availability)) {
			errors.push(`Invalid availability. Must be one of: ${Object.values(LEXWARE_QUOTATION_AVAILABILITY_STATUSES).join(', ')}`);
		}
		
		// Line item type validation
		if (quotationData.lineItems) {
			for (let i = 0; i < quotationData.lineItems.length; i++) {
				const item = quotationData.lineItems[i];
				if (item.type && !Object.values(LEXWARE_QUOTATION_LINE_ITEM_TYPES).includes(item.type)) {
					errors.push(`Invalid line item type at index ${i}. Must be one of: ${Object.values(LEXWARE_QUOTATION_LINE_ITEM_TYPES).join(', ')}`);
				}
			}
		}
		
		// Numeric validation
		if (quotationData.probability && (isNaN(quotationData.probability) || quotationData.probability < 0 || quotationData.probability > 100)) {
			errors.push('Probability must be between 0 and 100');
		}
		if (quotationData.expectedOrderValue && (isNaN(quotationData.expectedOrderValue) || quotationData.expectedOrderValue < 0)) {
			errors.push('Expected order value must be a positive number');
		}
		if (quotationData.exchangeRate && (isNaN(quotationData.exchangeRate) || quotationData.exchangeRate <= 0)) {
			errors.push('Exchange rate must be a positive number');
		}
		if (quotationData.totalNetAmount && (isNaN(quotationData.totalNetAmount) || quotationData.totalNetAmount < 0)) {
			errors.push('Total net amount must be a positive number');
		}
		if (quotationData.totalGrossAmount && (isNaN(quotationData.totalGrossAmount) || quotationData.totalGrossAmount < 0)) {
			errors.push('Total gross amount must be a positive number');
		}
		if (quotationData.totalTaxAmount && (isNaN(quotationData.totalTaxAmount) || quotationData.totalTaxAmount < 0)) {
			errors.push('Total tax amount must be a positive number');
		}
		if (quotationData.totalDiscountAmount && (isNaN(quotationData.totalDiscountAmount) || quotationData.totalDiscountAmount < 0)) {
			errors.push('Total discount amount must be a positive number');
		}
		if (quotationData.totalShippingAmount && (isNaN(quotationData.totalShippingAmount) || quotationData.totalShippingAmount < 0)) {
			errors.push('Total shipping amount must be a positive number');
		}
		if (quotationData.totalRoundingAmount && (isNaN(quotationData.totalRoundingAmount))) {
			errors.push('Total rounding amount must be a valid number');
		}
		if (quotationData.viewCount && (isNaN(quotationData.viewCount) || quotationData.viewCount < 0)) {
			errors.push('View count must be a positive number');
		}
		
		// String length validation
		if (quotationData.title && quotationData.title.length > 200) {
			errors.push('Title must be 200 characters or less');
		}
		if (quotationData.note && quotationData.note.length > 1000) {
			errors.push('Note must be 1000 characters or less');
		}
		if (quotationData.customerReference && quotationData.customerReference.length > 100) {
			errors.push('Customer reference must be 100 characters or less');
		}
		if (quotationData.salesPerson && quotationData.salesPerson.length > 100) {
			errors.push('Sales person must be 100 characters or less');
		}
		if (quotationData.salesChannel && quotationData.salesChannel.length > 100) {
			errors.push('Sales channel must be 100 characters or less');
		}
		if (quotationData.campaign && quotationData.campaign.length > 100) {
			errors.push('Campaign must be 100 characters or less');
		}
		if (quotationData.leadSource && quotationData.leadSource.length > 100) {
			errors.push('Lead source must be 100 characters or less');
		}
		if (quotationData.termsAndConditions && quotationData.termsAndConditions.length > 5000) {
			errors.push('Terms and conditions must be 5000 characters or less');
		}
		if (quotationData.termsVersion && quotationData.termsVersion.length > 50) {
			errors.push('Terms version must be 50 characters or less');
		}
		if (quotationData.approvalNotes && quotationData.approvalNotes.length > 1000) {
			errors.push('Approval notes must be 1000 characters or less');
		}
		if (quotationData.shippingNotes && quotationData.shippingNotes.length > 500) {
			errors.push('Shipping notes must be 500 characters or less');
		}
		if (quotationData.internalNotes && quotationData.internalNotes.length > 1000) {
			errors.push('Internal notes must be 1000 characters or less');
		}
		if (quotationData.externalId && quotationData.externalId.length > 100) {
			errors.push('External ID must be 100 characters or less');
		}
		if (quotationData.externalSystem && quotationData.externalSystem.length > 100) {
			errors.push('External system must be 100 characters or less');
		}
		
		// Currency validation
		if (quotationData.currency && !this.isValidCurrency(quotationData.currency)) {
			errors.push('Valid currency code is required (e.g., EUR, USD, CHF)');
		}
		if (quotationData.baseCurrency && !this.isValidCurrency(quotationData.baseCurrency)) {
			errors.push('Valid base currency code is required (e.g., EUR, USD, CHF)');
		}
		
		// Language validation
		if (quotationData.language && !this.isValidLanguage(quotationData.language)) {
			errors.push('Valid language code is required (e.g., de, en, fr)');
		}
		
		// Email validation
		if (quotationData.email && !this.isValidEmail(quotationData.email)) {
			errors.push('Valid email format is required');
		}
		
		// URL validation
		if (quotationData.website && !this.isValidUrl(quotationData.website)) {
			errors.push('Valid website URL format is required');
		}
		
		// Phone validation
		if (quotationData.phone && !this.isValidPhone(quotationData.phone)) {
			errors.push('Valid phone number format is required');
		}
		
		// IBAN validation
		if (quotationData.iban && !this.isValidIBAN(quotationData.iban)) {
			errors.push('Valid IBAN format is required');
		}
		
		// BIC validation
		if (quotationData.bic && !this.isValidBIC(quotationData.bic)) {
			errors.push('Valid BIC format is required');
		}
		
		// Version validation
		if (quotationData.version && !this.isValidVersion(quotationData.version)) {
			errors.push('Valid version format is required (e.g., 1.0.0)');
		}
		
		return errors;
	}

	/**
	 * Validate date format
	 * @param date - The date to validate
	 * @returns boolean - True if valid
	 */
	private isValidDate(date: string): boolean {
		const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
		if (!dateRegex.test(date)) return false;
		
		const dateObj = new Date(date);
		return dateObj instanceof Date && !isNaN(dateObj.getTime());
	}

	/**
	 * Validate email format
	 * @param email - The email to validate
	 * @returns boolean - True if valid
	 */
	private isValidEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	/**
	 * Validate phone number format
	 * @param phone - The phone number to validate
	 * @returns boolean - True if valid
	 */
	private isValidPhone(phone: string): boolean {
		const phoneRegex = /^[\+]?[0-9\s\-\(\)]{7,20}$/;
		return phoneRegex.test(phone);
	}

	/**
	 * Validate URL format
	 * @param url - The URL to validate
	 * @returns boolean - True if valid
	 */
	private isValidUrl(url: string): boolean {
		try {
			new URL(url);
			return true;
		} catch {
			return false;
		}
	}

	/**
	 * Validate IBAN format
	 * @param iban - The IBAN to validate
	 * @returns boolean - True if valid
	 */
	private isValidIBAN(iban: string): boolean {
		const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}$/;
		return ibanRegex.test(iban.replace(/\s/g, '').toUpperCase());
	}

	/**
	 * Validate BIC format
	 * @param bic - The BIC to validate
	 * @returns boolean - True if valid
	 */
	private isValidBIC(bic: string): boolean {
		const bicRegex = /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/;
		return bicRegex.test(bic.toUpperCase());
	}

	/**
	 * Validate language code
	 * @param language - The language to validate
	 * @returns boolean - True if valid
	 */
	private isValidLanguage(language: string): boolean {
		const validLanguages = ['de', 'en', 'fr', 'it', 'es', 'nl', 'pl', 'cs', 'hu', 'ro'];
		return validLanguages.includes(language.toLowerCase());
	}

	/**
	 * Validate currency code
	 * @param currency - The currency to validate
	 * @returns boolean - True if valid
	 */
	private isValidCurrency(currency: string): boolean {
		const validCurrencies = ['EUR', 'USD', 'CHF', 'GBP', 'JPY', 'CAD', 'AUD', 'CNY'];
		return validCurrencies.includes(currency.toUpperCase());
	}

	/**
	 * Validate version format
	 * @param version - The version to validate
	 * @returns boolean - True if valid
	 */
	private isValidVersion(version: string): boolean {
		const versionRegex = /^\d+\.\d+\.\d+$/;
		return versionRegex.test(version);
	}
}
