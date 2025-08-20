import { LexwareApiClient } from '../utils/api';
import { LexwareDataTransformer } from '../utils/transformers';
import { ILexwareCreditNote, ILexwareCredentials } from '../types';
import { LEXWARE_API_ENDPOINTS } from '../constants';

export class CreditNoteResource {
	private apiClient: LexwareApiClient;

	constructor(credentials: ILexwareCredentials) {
		this.apiClient = new LexwareApiClient(credentials);
	}

	async get(creditNoteId: string): Promise<ILexwareCreditNote> {
		return this.apiClient.get<ILexwareCreditNote>(`${LEXWARE_API_ENDPOINTS.CREDIT_NOTES}/${creditNoteId}`);
	}

	async getAll(params?: Record<string, any>): Promise<ILexwareCreditNote[]> {
		// Use voucherlist endpoint with credit note filter
		const queryParams = {
			...params,
			voucherType: 'creditnote',
		};
		return this.apiClient.get<ILexwareCreditNote[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, queryParams);
	}

	async create(additionalFields: Record<string, any>): Promise<ILexwareCreditNote> {
		const creditNoteData = LexwareDataTransformer.transformCreditNoteData(additionalFields);
		return this.apiClient.post<ILexwareCreditNote>(LEXWARE_API_ENDPOINTS.CREDIT_NOTES, creditNoteData);
	}

	async update(creditNoteId: string, additionalFields: Record<string, any>): Promise<ILexwareCreditNote> {
		const sanitizedData = LexwareDataTransformer.sanitizeUpdateData(additionalFields);
		return this.apiClient.put<ILexwareCreditNote>(`${LEXWARE_API_ENDPOINTS.CREDIT_NOTES}/${creditNoteId}`, sanitizedData);
	}

	async delete(creditNoteId: string): Promise<void> {
		return this.apiClient.delete<void>(`${LEXWARE_API_ENDPOINTS.CREDIT_NOTES}/${creditNoteId}`);
	}

	async finalize(creditNoteId: string): Promise<ILexwareCreditNote> {
		return this.apiClient.put<ILexwareCreditNote>(`${LEXWARE_API_ENDPOINTS.CREDIT_NOTES}/${creditNoteId}/finalize`, {});
	}

	async document(creditNoteId: string): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.CREDIT_NOTES}/${creditNoteId}/document`);
	}

	validateCreateData(additionalFields: Record<string, any>): string[] {
		const requiredFields = ['voucherDate', 'contactId', 'precedingSalesVoucherId'];
		return LexwareDataTransformer.validateRequiredFields(additionalFields, requiredFields);
	}
}
