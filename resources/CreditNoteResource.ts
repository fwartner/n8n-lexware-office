import { LexwareApiClient } from '../utils/api';
import { LexwareDataTransformer } from '../utils/transformers';
import { ILexwareCreditNote, ILexwareCredentials } from '../types';
import { LEXWARE_API_ENDPOINTS } from '../constants';

export class CreditNoteResource {
	private apiClient: LexwareApiClient;

	constructor(credentials: ILexwareCredentials) {
		this.apiClient = new LexwareApiClient(credentials);
	}

	/**
	 * Retrieve a credit note by ID
	 * @param creditNoteId - The ID of the credit note
	 * @returns Promise<ILexwareCreditNote>
	 */
	async get(creditNoteId: string): Promise<ILexwareCreditNote> {
		return this.apiClient.get<ILexwareCreditNote>(`${LEXWARE_API_ENDPOINTS.CREDIT_NOTES}/${creditNoteId}`);
	}

	/**
	 * Get all credit notes with optional filtering
	 * Uses voucherlist endpoint with credit note filter
	 * @param params - Optional parameters for filtering and pagination
	 * @returns Promise<ILexwareCreditNote[]>
	 */
	async getAll(params?: Record<string, any>): Promise<ILexwareCreditNote[]> {
		// Use voucherlist endpoint with credit note filter
		const queryParams = {
			...params,
			voucherType: 'creditnote',
		};
		return this.apiClient.get<ILexwareCreditNote[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, queryParams);
	}

	/**
	 * Create a new credit note
	 * @param additionalFields - The credit note data
	 * @returns Promise<ILexwareCreditNote>
	 */
	async create(additionalFields: Record<string, any>): Promise<ILexwareCreditNote> {
		const creditNoteData = LexwareDataTransformer.transformCreditNoteData(additionalFields);
		return this.apiClient.post<ILexwareCreditNote>(LEXWARE_API_ENDPOINTS.CREDIT_NOTES, creditNoteData);
	}

	/**
	 * Update an existing credit note
	 * @param creditNoteId - The ID of the credit note to update
	 * @param additionalFields - The updated data
	 * @returns Promise<ILexwareCreditNote>
	 */
	async update(creditNoteId: string, additionalFields: Record<string, any>): Promise<ILexwareCreditNote> {
		const sanitizedData = LexwareDataTransformer.sanitizeUpdateData(additionalFields);
		return this.apiClient.put<ILexwareCreditNote>(`${LEXWARE_API_ENDPOINTS.CREDIT_NOTES}/${creditNoteId}`, sanitizedData);
	}

	/**
	 * Delete a credit note
	 * @param creditNoteId - The ID of the credit note to delete
	 * @returns Promise<void>
	 */
	async delete(creditNoteId: string): Promise<void> {
		return this.apiClient.delete<void>(`${LEXWARE_API_ENDPOINTS.CREDIT_NOTES}/${creditNoteId}`);
	}

	/**
	 * Pursue (finalize) a credit note
	 * This changes the status from 'draft' to 'open'
	 * @param creditNoteId - The ID of the credit note to finalize
	 * @returns Promise<ILexwareCreditNote>
	 */
	async finalize(creditNoteId: string): Promise<ILexwareCreditNote> {
		return this.apiClient.put<ILexwareCreditNote>(`${LEXWARE_API_ENDPOINTS.CREDIT_NOTES}/${creditNoteId}/finalize`, {});
	}

	/**
	 * Render a credit note document as PDF
	 * @param creditNoteId - The ID of the credit note
	 * @returns Promise<any> - PDF document data
	 */
	async renderDocument(creditNoteId: string): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.CREDIT_NOTES}/${creditNoteId}/document`);
	}

	/**
	 * Download a credit note file
	 * @param creditNoteId - The ID of the credit note
	 * @returns Promise<any> - File data
	 */
	async downloadFile(creditNoteId: string): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.CREDIT_NOTES}/${creditNoteId}/file`);
	}

	/**
	 * Get deeplink URL for a credit note
	 * @param creditNoteId - The ID of the credit note
	 * @returns Promise<string> - Deeplink URL
	 */
	async getDeeplink(creditNoteId: string): Promise<string> {
		// The API documentation mentions deeplinks to credit notes
		// This would typically return a URL that opens the credit note in the Lexware application
		// For now, we'll construct a basic deeplink format
		// In a real implementation, this might come from the API response
		return `https://app.lexware.de/credit-notes/${creditNoteId}`;
	}

	/**
	 * Validate credit note creation data
	 * @param additionalFields - The data to validate
	 * @returns string[] - Array of missing required field names
	 */
	validateCreateData(additionalFields: Record<string, any>): string[] {
		const requiredFields = ['voucherDate', 'contactId', 'precedingSalesVoucherId'];
		return LexwareDataTransformer.validateRequiredFields(additionalFields, requiredFields);
	}

	/**
	 * Validate credit note update data
	 * @param additionalFields - The data to validate
	 * @returns string[] - Array of missing required field names
	 */
	validateUpdateData(additionalFields: Record<string, any>): string[] {
		const requiredFields = ['version']; // Optimistic locking requires version
		return LexwareDataTransformer.validateRequiredFields(additionalFields, requiredFields);
	}
}
