import { LexwareApiClient } from '../utils/api';
import { ILexwareProfile, ILexwareCredentials } from '../types';
import { LEXWARE_API_ENDPOINTS } from '../constants';

export class ProfileResource {
	private apiClient: LexwareApiClient;

	constructor(credentials: ILexwareCredentials) {
		this.apiClient = new LexwareApiClient(credentials);
	}

	async get(): Promise<ILexwareProfile> {
		return this.apiClient.get<ILexwareProfile>(LEXWARE_API_ENDPOINTS.PROFILE);
	}

	async update(profileData: Partial<ILexwareProfile>): Promise<ILexwareProfile> {
		return this.apiClient.put<ILexwareProfile>(LEXWARE_API_ENDPOINTS.PROFILE, profileData);
	}

	async getSettings(): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/settings`);
	}

	async updateSettings(settings: Record<string, any>): Promise<any> {
		return this.apiClient.put<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/settings`, settings);
	}

	async getFeatures(): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/features`);
	}

	async getSubscription(): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/subscription`);
	}

	async getLimits(): Promise<any> {
		return this.apiClient.get<any>(`${LEXWARE_API_ENDPOINTS.PROFILE}/limits`);
	}

	validateUpdateData(profileData: Record<string, any>): string[] {
		// Profile updates are generally optional, but email should be valid if provided
		const missingFields: string[] = [];
		
		if (profileData.userEmail && !this.isValidEmail(profileData.userEmail)) {
			missingFields.push('valid userEmail format');
		}
		
		return missingFields;
	}

	private isValidEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}
}
