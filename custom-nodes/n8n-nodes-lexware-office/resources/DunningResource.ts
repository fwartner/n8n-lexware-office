import { LexwareApiClient } from '../utils/api';
import { LexwareDataTransformer } from '../utils/transformers';
import { ILexwareDunning, ILexwareCredentials } from '../types';
import { LEXWARE_API_ENDPOINTS } from '../constants';

export class DunningResource {
	private apiClient: LexwareApiClient;

	constructor(credentials: ILexwareCredentials) {
		this.apiClient = new LexwareApiClient(credentials);
	}

	async get(dunningId: string): Promise<ILexwareDunning> {
		return this.apiClient.get<ILexwareDunning>(`${LEXWARE_API_ENDPOINTS.DUNNINGS}/${dunningId}`);
	}

	async getAll(params?: Record<string, any>): Promise<ILexwareDunning[]> {
		// Use voucherlist endpoint with dunning filter
		const queryParams = {
			...params,
			voucherType: 'dunning',
		};
		return this.apiClient.get<ILexwareDunning[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, queryParams);
	}

	async create(additionalFields: Record<string, any>): Promise<ILexwareDunning> {
		const dunningData = LexwareDataTransformer.transformDunningData(additionalFields);
		return this.apiClient.post<ILexwareDunning>(LEXWARE_API_ENDPOINTS.DUNNINGS, dunningData);
	}

	async update(dunningId: string, additionalFields: Record<string, any>): Promise<ILexwareDunning> {
		const sanitizedData = LexwareDataTransformer.sanitizeUpdateData(additionalFields);
		return this.apiClient.put<ILexwareDunning>(`${LEXWARE_API_ENDPOINTS.DUNNINGS}/${dunningId}`, sanitizedData);
	}

	async delete(dunningId: string): Promise<void> {
		return this.apiClient.delete<void>(`${LEXWARE_API_ENDPOINTS.DUNNINGS}/${dunningId}`);
	}

	async finalize(dunningId: string): Promise<ILexwareDunning> {
		return this.apiClient.put<ILexwareDunning>(`${LEXWARE_API_ENDPOINTS.DUNNINGS}/${dunningId}/finalize`, {});
	}

	async document(dunningId: string): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.DUNNINGS}/${dunningId}/document`);
	}

	validateCreateData(additionalFields: Record<string, any>): string[] {
		const requiredFields = ['voucherDate', 'contactId', 'precedingSalesVoucherId', 'dunningLevel'];
		return LexwareDataTransformer.validateRequiredFields(additionalFields, requiredFields);
	}
}
