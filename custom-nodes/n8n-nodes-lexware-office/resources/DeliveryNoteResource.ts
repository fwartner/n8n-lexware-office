import { LexwareApiClient } from '../utils/api';
import { LexwareDataTransformer } from '../utils/transformers';
import { ILexwareDeliveryNote, ILexwareCredentials } from '../types';
import { LEXWARE_API_ENDPOINTS } from '../constants';

export class DeliveryNoteResource {
	private apiClient: LexwareApiClient;

	constructor(credentials: ILexwareCredentials) {
		this.apiClient = new LexwareApiClient(credentials);
	}

	async get(deliveryNoteId: string): Promise<ILexwareDeliveryNote> {
		return this.apiClient.get<ILexwareDeliveryNote>(`${LEXWARE_API_ENDPOINTS.DELIVERY_NOTES}/${deliveryNoteId}`);
	}

	async getAll(params?: Record<string, any>): Promise<ILexwareDeliveryNote[]> {
		// Use voucherlist endpoint with delivery note filter
		const queryParams = {
			...params,
			voucherType: 'deliverynote',
		};
		return this.apiClient.get<ILexwareDeliveryNote[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, queryParams);
	}

	async create(additionalFields: Record<string, any>): Promise<ILexwareDeliveryNote> {
		const deliveryNoteData = LexwareDataTransformer.transformDeliveryNoteData(additionalFields);
		return this.apiClient.post<ILexwareDeliveryNote>(LEXWARE_API_ENDPOINTS.DELIVERY_NOTES, deliveryNoteData);
	}

	async update(deliveryNoteId: string, additionalFields: Record<string, any>): Promise<ILexwareDeliveryNote> {
		const sanitizedData = LexwareDataTransformer.sanitizeUpdateData(additionalFields);
		return this.apiClient.put<ILexwareDeliveryNote>(`${LEXWARE_API_ENDPOINTS.DELIVERY_NOTES}/${deliveryNoteId}`, sanitizedData);
	}

	async delete(deliveryNoteId: string): Promise<void> {
		return this.apiClient.delete<void>(`${LEXWARE_API_ENDPOINTS.DELIVERY_NOTES}/${deliveryNoteId}`);
	}

	/**
	 * Pursue a delivery note (change status from draft to open)
	 * Note: Pursuing is only available for delivery notes with status "draft"
	 */
	async pursue(deliveryNoteId: string): Promise<ILexwareDeliveryNote> {
		return this.apiClient.put<ILexwareDeliveryNote>(`${LEXWARE_API_ENDPOINTS.DELIVERY_NOTES}/${deliveryNoteId}/pursue`, {});
	}

	/**
	 * Render a delivery note document as PDF
	 * Note: PDF rendering is only available for delivery notes with status "open"
	 */
	async renderDocument(deliveryNoteId: string, options?: {
		printLayoutId?: string;
		language?: string;
	}): Promise<any> {
		const queryParams = options ? { ...options } : {};
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.DELIVERY_NOTES}/${deliveryNoteId}/document`, queryParams);
	}

	/**
	 * Download a delivery note file
	 * Note: File download is only available for delivery notes with status "open"
	 */
	async downloadFile(deliveryNoteId: string, options?: {
		printLayoutId?: string;
		language?: string;
	}): Promise<any> {
		const queryParams = options ? { ...options } : {};
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.DELIVERY_NOTES}/${deliveryNoteId}/file`, queryParams);
	}

	/**
	 * Get deeplink to a delivery note in the Lexware application
	 */
	async getDeeplink(deliveryNoteId: string): Promise<{ deeplink: string }> {
		return this.apiClient.get<{ deeplink: string }>(`${LEXWARE_API_ENDPOINTS.DELIVERY_NOTES}/${deliveryNoteId}/deeplink`);
	}

	/**
	 * Legacy method - kept for backward compatibility
	 * @deprecated Use renderDocument instead
	 */
	async document(deliveryNoteId: string): Promise<any> {
		return this.renderDocument(deliveryNoteId);
	}

	/**
	 * Legacy method - kept for backward compatibility
	 * @deprecated Use pursue instead
	 */
	async finalize(deliveryNoteId: string): Promise<ILexwareDeliveryNote> {
		return this.pursue(deliveryNoteId);
	}

	validateCreateData(additionalFields: Record<string, any>): string[] {
		const requiredFields = ['voucherDate', 'contactId'];
		return LexwareDataTransformer.validateRequiredFields(additionalFields, requiredFields);
	}

	/**
	 * Validate if a delivery note can be pursued
	 */
	validatePursueData(deliveryNote: ILexwareDeliveryNote): string[] {
		const errors: string[] = [];
		
		if (deliveryNote.deliveryNoteStatus !== 'draft') {
			errors.push('Delivery note must have status "draft" to be pursued');
		}
		
		if (!deliveryNote.contactId) {
			errors.push('Contact ID is required');
		}
		
		if (!deliveryNote.lineItems || deliveryNote.lineItems.length === 0) {
			errors.push('At least one line item is required');
		}
		
		return errors;
	}

	/**
	 * Validate if a delivery note can be rendered as PDF
	 */
	validateRenderData(deliveryNote: ILexwareDeliveryNote): string[] {
		const errors: string[] = [];
		
		if (deliveryNote.deliveryNoteStatus !== 'open') {
			errors.push('Delivery note must have status "open" to be rendered as PDF');
		}
		
		return errors;
	}
}
