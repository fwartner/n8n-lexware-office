import { LexwareApiClient } from '../utils/api';
import { LexwareDataTransformer } from '../utils/transformers';
import { ILexwareInvoice, ILexwareCredentials } from '../types';
import { LEXWARE_API_ENDPOINTS } from '../constants';

export class InvoiceResource {
	private apiClient: LexwareApiClient;

	constructor(credentials: ILexwareCredentials) {
		this.apiClient = new LexwareApiClient(credentials);
	}

	async get(invoiceId: string): Promise<ILexwareInvoice> {
		return this.apiClient.get<ILexwareInvoice>(`${LEXWARE_API_ENDPOINTS.INVOICES}/${invoiceId}`);
	}

	async getAll(params?: Record<string, any>): Promise<ILexwareInvoice[]> {
		// Use voucherlist endpoint with invoice filter
		const queryParams = {
			...params,
			voucherType: 'invoice',
		};
		return this.apiClient.get<ILexwareInvoice[]>(LEXWARE_API_ENDPOINTS.VOUCHER_LIST, queryParams);
	}

	async create(additionalFields: Record<string, any>): Promise<ILexwareInvoice> {
		const invoiceData = LexwareDataTransformer.transformInvoiceData(additionalFields);
		return this.apiClient.post<ILexwareInvoice>(LEXWARE_API_ENDPOINTS.INVOICES, invoiceData);
	}

	async update(invoiceId: string, additionalFields: Record<string, any>): Promise<ILexwareInvoice> {
		const sanitizedData = LexwareDataTransformer.sanitizeUpdateData(additionalFields);
		return this.apiClient.put<ILexwareInvoice>(`${LEXWARE_API_ENDPOINTS.INVOICES}/${invoiceId}`, sanitizedData);
	}

	async delete(invoiceId: string): Promise<void> {
		return this.apiClient.delete<void>(`${LEXWARE_API_ENDPOINTS.INVOICES}/${invoiceId}`);
	}

	async finalize(invoiceId: string): Promise<ILexwareInvoice> {
		return this.apiClient.put<ILexwareInvoice>(`${LEXWARE_API_ENDPOINTS.INVOICES}/${invoiceId}/finalize`, {});
	}

	async document(invoiceId: string): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.INVOICES}/${invoiceId}/document`);
	}

	validateCreateData(additionalFields: Record<string, any>): string[] {
		const requiredFields = ['voucherDate', 'contactId'];
		return LexwareDataTransformer.validateRequiredFields(additionalFields, requiredFields);
	}
}
