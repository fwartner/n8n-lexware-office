import { LexwareApiClient } from '../utils/api';
import { ILexwarePaymentCondition, ILexwareCredentials } from '../types';
import { LEXWARE_API_ENDPOINTS } from '../constants';

export class PaymentConditionResource {
	private apiClient: LexwareApiClient;

	constructor(credentials: ILexwareCredentials) {
		this.apiClient = new LexwareApiClient(credentials);
	}

	async getAll(params?: Record<string, any>): Promise<ILexwarePaymentCondition[]> {
		return this.apiClient.get<ILexwarePaymentCondition[]>(LEXWARE_API_ENDPOINTS.PAYMENT_CONDITIONS, params);
	}

	async get(paymentConditionId: string): Promise<ILexwarePaymentCondition> {
		return this.apiClient.get<ILexwarePaymentCondition>(`${LEXWARE_API_ENDPOINTS.PAYMENT_CONDITIONS}/${paymentConditionId}`);
	}

	async create(paymentConditionData: Partial<ILexwarePaymentCondition>): Promise<ILexwarePaymentCondition> {
		return this.apiClient.post<ILexwarePaymentCondition>(LEXWARE_API_ENDPOINTS.PAYMENT_CONDITIONS, paymentConditionData);
	}

	async update(paymentConditionId: string, paymentConditionData: Partial<ILexwarePaymentCondition>): Promise<ILexwarePaymentCondition> {
		return this.apiClient.put<ILexwarePaymentCondition>(`${LEXWARE_API_ENDPOINTS.PAYMENT_CONDITIONS}/${paymentConditionId}`, paymentConditionData);
	}

	async delete(paymentConditionId: string): Promise<void> {
		return this.apiClient.delete<void>(`${LEXWARE_API_ENDPOINTS.PAYMENT_CONDITIONS}/${paymentConditionId}`);
	}

	async getDefault(): Promise<ILexwarePaymentCondition> {
		return this.apiClient.get<ILexwarePaymentCondition>(`${LEXWARE_API_ENDPOINTS.PAYMENT_CONDITIONS}/default`);
	}

	async setDefault(paymentConditionId: string): Promise<ILexwarePaymentCondition> {
		return this.apiClient.put<ILexwarePaymentCondition>(`${LEXWARE_API_ENDPOINTS.PAYMENT_CONDITIONS}/${paymentConditionId}/default`, {});
	}

	validateCreateData(paymentConditionData: Record<string, any>): string[] {
		const requiredFields = ['name'];
		const missingFields: string[] = [];
		
		for (const field of requiredFields) {
			if (!paymentConditionData[field] || (typeof paymentConditionData[field] === 'string' && paymentConditionData[field].trim() === '')) {
				missingFields.push(field);
			}
		}
		
		// Validate payment terms if provided
		if (paymentConditionData.paymentTerms !== undefined && (isNaN(paymentConditionData.paymentTerms) || paymentConditionData.paymentTerms < 0)) {
			missingFields.push('valid paymentTerms (positive number)');
		}
		
		return missingFields;
	}
}
