import { LexwareApiClient } from '../utils/api';
import { LexwareDataTransformer } from '../utils/transformers';
import { ILexwareContact, ILexwareCredentials } from '../types';
import { LEXWARE_API_ENDPOINTS } from '../constants';

export class ContactResource {
	private apiClient: LexwareApiClient;

	constructor(credentials: ILexwareCredentials) {
		this.apiClient = new LexwareApiClient(credentials);
	}

	async get(contactId: string): Promise<ILexwareContact> {
		return this.apiClient.get<ILexwareContact>(`${LEXWARE_API_ENDPOINTS.CONTACTS}/${contactId}`);
	}

	async getAll(params?: Record<string, any>): Promise<ILexwareContact[]> {
		return this.apiClient.get<ILexwareContact[]>(LEXWARE_API_ENDPOINTS.CONTACTS, params);
	}

	async create(contactType: 'company' | 'person', additionalFields: Record<string, any>): Promise<ILexwareContact> {
		const contactData = LexwareDataTransformer.transformContactData(contactType, additionalFields);
		return this.apiClient.post<ILexwareContact>(LEXWARE_API_ENDPOINTS.CONTACTS, contactData);
	}

	async update(contactId: string, additionalFields: Record<string, any>): Promise<ILexwareContact> {
		const sanitizedData = LexwareDataTransformer.sanitizeUpdateData(additionalFields);
		return this.apiClient.put<ILexwareContact>(`${LEXWARE_API_ENDPOINTS.CONTACTS}/${contactId}`, sanitizedData);
	}

	async delete(contactId: string): Promise<void> {
		return this.apiClient.delete<void>(`${LEXWARE_API_ENDPOINTS.CONTACTS}/${contactId}`);
	}

	validateCreateData(contactType: 'company' | 'person', additionalFields: Record<string, any>): string[] {
		const requiredFields = ['name'];
		
		if (contactType === 'company') {
			requiredFields.push('company');
		} else {
			requiredFields.push('person');
		}
		
		return LexwareDataTransformer.validateRequiredFields(additionalFields, requiredFields);
	}
}
