import { LexwareApiClient } from '../utils/api';
import { LexwareDataTransformer } from '../utils/transformers';
import { ILexwareDunning, ILexwareCredentials } from '../types';
import { LEXWARE_API_ENDPOINTS } from '../constants';

export class DunningResource {
	private apiClient: LexwareApiClient;

	constructor(credentials: ILexwareCredentials) {
		this.apiClient = new LexwareApiClient(credentials);
	}

	/**
	 * Retrieve a dunning by ID
	 * @param dunningId - The ID of the dunning to retrieve
	 * @returns Promise<ILexwareDunning>
	 */
	async get(dunningId: string): Promise<ILexwareDunning> {
		return this.apiClient.get<ILexwareDunning>(`${LEXWARE_API_ENDPOINTS.DUNNINGS}/${dunningId}`);
	}

	/**
	 * Retrieve all dunnings with optional filtering
	 * @param params - Optional parameters for filtering and pagination
	 * @returns Promise<ILexwareDunning[]>
	 */
	async getAll(params?: Record<string, any>): Promise<ILexwareDunning[]> {
		// Use voucherlist endpoint with dunning filter for better performance
		// The voucherlist endpoint requires voucherStatus, so we need to ensure it's always present
		const queryParams = {
			...params,
			voucherType: 'dunning',
			voucherStatus: params?.voucherStatus || '', // Always include voucherStatus as it's required
		};
		return this.apiClient.get<ILexwareDunning[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, queryParams);
	}

	/**
	 * Create a new dunning
	 * @param additionalFields - The dunning data to create
	 * @returns Promise<ILexwareDunning>
	 */
	async create(additionalFields: Record<string, any>): Promise<ILexwareDunning> {
		const dunningData = LexwareDataTransformer.transformDunningData(additionalFields);
		return this.apiClient.post<ILexwareDunning>(LEXWARE_API_ENDPOINTS.DUNNINGS, dunningData);
	}

	/**
	 * Update an existing dunning
	 * @param dunningId - The ID of the dunning to update
	 * @param additionalFields - The fields to update
	 * @returns Promise<ILexwareDunning>
	 */
	async update(dunningId: string, additionalFields: Record<string, any>): Promise<ILexwareDunning> {
		const sanitizedData = LexwareDataTransformer.sanitizeUpdateData(additionalFields);
		return this.apiClient.put<ILexwareDunning>(`${LEXWARE_API_ENDPOINTS.DUNNINGS}/${dunningId}`, sanitizedData);
	}

	/**
	 * Delete a dunning (if supported by the API)
	 * @param dunningId - The ID of the dunning to delete
	 * @returns Promise<void>
	 */
	async delete(dunningId: string): Promise<void> {
		return this.apiClient.delete<void>(`${LEXWARE_API_ENDPOINTS.DUNNINGS}/${dunningId}`);
	}

	/**
	 * Pursue/finalize a dunning (change status from draft to open)
	 * @param dunningId - The ID of the dunning to finalize
	 * @returns Promise<ILexwareDunning>
	 */
	async finalize(dunningId: string): Promise<ILexwareDunning> {
		return this.apiClient.put<ILexwareDunning>(`${LEXWARE_API_ENDPOINTS.DUNNINGS}/${dunningId}/finalize`, {});
	}

	/**
	 * Render a dunning document as PDF
	 * @param dunningId - The ID of the dunning
	 * @returns Promise<any> - PDF document data
	 */
	async document(dunningId: string): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.DUNNINGS}/${dunningId}/document`);
	}

	/**
	 * Download a dunning file
	 * @param dunningId - The ID of the dunning
	 * @param fileId - The ID of the file to download
	 * @returns Promise<any> - File data
	 */
	async downloadFile(dunningId: string, fileId: string): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.DUNNINGS}/${dunningId}/files/${fileId}`);
	}

	/**
	 * Get deeplink URL for a dunning
	 * @param dunningId - The ID of the dunning
	 * @returns string - Deeplink URL
	 */
	getDeeplink(dunningId: string): string {
		// Construct deeplink URL based on Lexware app URL pattern
		// This would typically be: https://app.lexware.de/dunning/{id}
		return `https://app.lexware.de/dunning/${dunningId}`;
	}

	/**
	 * Validate required fields for creating a dunning
	 * @param additionalFields - The fields to validate
	 * @returns string[] - Array of missing required field names
	 */
	validateCreateData(additionalFields: Record<string, any>): string[] {
		const requiredFields = [
			'voucherDate', 
			'contactId', 
			'precedingSalesVoucherId', 
			'dunningLevel'
		];
		return LexwareDataTransformer.validateRequiredFields(additionalFields, requiredFields);
	}

	/**
	 * Validate required fields for updating a dunning
	 * @param additionalFields - The fields to validate
	 * @returns string[] - Array of missing required field names
	 */
	validateUpdateData(additionalFields: Record<string, any>): string[] {
		// For updates, only validate that at least one field is provided
		const providedFields = Object.keys(additionalFields).filter(key => 
			additionalFields[key] !== undefined && additionalFields[key] !== null
		);
		
		if (providedFields.length === 0) {
			return ['At least one field must be provided for update'];
		}
		
		return [];
	}

	/**
	 * Get dunning status options
	 * @returns string[] - Available dunning statuses
	 */
	getStatusOptions(): string[] {
		return ['draft', 'open', 'paid', 'voided'];
	}

	/**
	 * Get dunning level options
	 * @returns number[] - Available dunning levels
	 */
	getLevelOptions(): number[] {
		return [1, 2, 3, 4, 5]; // Typical dunning levels
	}
}
