import { LexwareApiClient } from '../utils/api';
import { ILexwareCountry, ILexwareCredentials } from '../types';
import { LEXWARE_API_ENDPOINTS } from '../constants';

export class CountryResource {
	private apiClient: LexwareApiClient;

	constructor(credentials: ILexwareCredentials) {
		this.apiClient = new LexwareApiClient(credentials);
	}

	async getAll(params?: Record<string, any>): Promise<ILexwareCountry[]> {
		return this.apiClient.get<ILexwareCountry[]>(LEXWARE_API_ENDPOINTS.COUNTRIES, params);
	}

	async get(countryCode: string): Promise<ILexwareCountry> {
		return this.apiClient.get<ILexwareCountry>(`${LEXWARE_API_ENDPOINTS.COUNTRIES}/${countryCode}`);
	}

	async search(query: string): Promise<ILexwareCountry[]> {
		const params = { q: query };
		return this.apiClient.get<ILexwareCountry[]>(`${LEXWARE_API_ENDPOINTS.COUNTRIES}/search`, params);
	}

	async getEUCountries(): Promise<ILexwareCountry[]> {
		const params = { eu: true };
		return this.apiClient.get<ILexwareCountry[]>(LEXWARE_API_ENDPOINTS.COUNTRIES, params);
	}

	async getNonEUCountries(): Promise<ILexwareCountry[]> {
		const params = { eu: false };
		return this.apiClient.get<ILexwareCountry[]>(LEXWARE_API_ENDPOINTS.COUNTRIES, params);
	}

	validateCountryCode(countryCode: string): string[] {
		const missingFields: string[] = [];
		
		if (!countryCode || countryCode.trim() === '') {
			missingFields.push('countryCode');
		} else if (countryCode.length !== 2) {
			missingFields.push('valid countryCode (2 characters)');
		}
		
		return missingFields;
	}
}
