import { LexwareApiClient } from '../utils/api';
import { LexwareDataTransformer } from '../utils/transformers';
import { ILexwareQuotation, ILexwareCredentials } from '../types';
import { LEXWARE_API_ENDPOINTS } from '../constants';

export class QuotationResource {
	private apiClient: LexwareApiClient;

	constructor(credentials: ILexwareCredentials) {
		this.apiClient = new LexwareApiClient(credentials);
	}

	async get(quotationId: string): Promise<ILexwareQuotation> {
		return this.apiClient.get<ILexwareQuotation>(`${LEXWARE_API_ENDPOINTS.QUOTATIONS}/${quotationId}`);
	}

	async getAll(params?: Record<string, any>): Promise<ILexwareQuotation[]> {
		// Use voucherlist endpoint with quotation filter
		const queryParams = {
			...params,
			voucherType: 'quotation',
		};
		return this.apiClient.get<ILexwareQuotation[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, queryParams);
	}

	async create(additionalFields: Record<string, any>): Promise<ILexwareQuotation> {
		const quotationData = LexwareDataTransformer.transformQuotationData(additionalFields);
		return this.apiClient.post<ILexwareQuotation>(LEXWARE_API_ENDPOINTS.QUOTATIONS, quotationData);
	}

	async update(quotationId: string, additionalFields: Record<string, any>): Promise<ILexwareQuotation> {
		const sanitizedData = LexwareDataTransformer.sanitizeUpdateData(additionalFields);
		return this.apiClient.put<ILexwareQuotation>(`${LEXWARE_API_ENDPOINTS.QUOTATIONS}/${quotationId}`, sanitizedData);
	}

	async delete(quotationId: string): Promise<void> {
		return this.apiClient.delete<void>(`${LEXWARE_API_ENDPOINTS.QUOTATIONS}/${quotationId}`);
	}

	async accept(quotationId: string): Promise<ILexwareQuotation> {
		return this.apiClient.put<ILexwareQuotation>(`${LEXWARE_API_ENDPOINTS.QUOTATIONS}/${quotationId}/accept`, {});
	}

	async reject(quotationId: string): Promise<ILexwareQuotation> {
		return this.apiClient.put<ILexwareQuotation>(`${LEXWARE_API_ENDPOINTS.QUOTATIONS}/${quotationId}/reject`, {});
	}

	async document(quotationId: string): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.QUOTATIONS}/${quotationId}/document`);
	}

	validateCreateData(additionalFields: Record<string, any>): string[] {
		const requiredFields = ['voucherDate', 'contactId'];
		return LexwareDataTransformer.validateRequiredFields(additionalFields, requiredFields);
	}
}
