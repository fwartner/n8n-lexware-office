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

	async finalize(deliveryNoteId: string): Promise<ILexwareDeliveryNote> {
		return this.apiClient.put<ILexwareDeliveryNote>(`${LEXWARE_API_ENDPOINTS.DELIVERY_NOTES}/${deliveryNoteId}/finalize`, {});
	}

	async document(deliveryNoteId: string): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.DELIVERY_NOTES}/${deliveryNoteId}/document`);
	}

	validateCreateData(additionalFields: Record<string, any>): string[] {
		const requiredFields = ['voucherDate', 'contactId'];
		return LexwareDataTransformer.validateRequiredFields(additionalFields, requiredFields);
	}
}
