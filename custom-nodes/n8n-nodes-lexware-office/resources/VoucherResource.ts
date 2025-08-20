import { LexwareApiClient } from '../utils/api';
import { LexwareDataTransformer } from '../utils/transformers';
import { ILexwareVoucher, ILexwareCredentials } from '../types';
import { LEXWARE_API_ENDPOINTS } from '../constants';

export class VoucherResource {
	private apiClient: LexwareApiClient;

	constructor(credentials: ILexwareCredentials) {
		this.apiClient = new LexwareApiClient(credentials);
	}

	async get(voucherId: string): Promise<ILexwareVoucher> {
		return this.apiClient.get<ILexwareVoucher>(`${LEXWARE_API_ENDPOINTS.VOUCHERS}/${voucherId}`);
	}

	async getAll(params?: Record<string, any>): Promise<ILexwareVoucher[]> {
		return this.apiClient.get<ILexwareVoucher[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, params);
	}

	async create(voucherType: string, additionalFields: Record<string, any>): Promise<ILexwareVoucher> {
		const voucherData = LexwareDataTransformer.transformVoucherData(voucherType, additionalFields);
		return this.apiClient.post<ILexwareVoucher>(LEXWARE_API_ENDPOINTS.VOUCHERS, voucherData);
	}

	async update(voucherId: string, additionalFields: Record<string, any>): Promise<ILexwareVoucher> {
		const sanitizedData = LexwareDataTransformer.sanitizeUpdateData(additionalFields);
		return this.apiClient.put<ILexwareVoucher>(`${LEXWARE_API_ENDPOINTS.VOUCHERS}/${voucherId}`, sanitizedData);
	}

	async delete(voucherId: string): Promise<void> {
		return this.apiClient.delete<void>(`${LEXWARE_API_ENDPOINTS.VOUCHERS}/${voucherId}`);
	}

	validateCreateData(voucherType: string, additionalFields: Record<string, any>): string[] {
		const requiredFields = ['voucherType', 'voucherDate'];
		return LexwareDataTransformer.validateRequiredFields(additionalFields, requiredFields);
	}
}
