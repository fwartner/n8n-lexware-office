import { LexwareApiClient } from '../utils/api';
import { ILexwareCountry, ILexwareCredentials } from '../types';
import { LEXWARE_API_ENDPOINTS } from '../constants';

export class CountryResource {
	private apiClient: LexwareApiClient;

	constructor(credentials: ILexwareCredentials) {
		this.apiClient = new LexwareApiClient(credentials);
	}

	/**
	 * Retrieve all countries
	 * @param params Optional query parameters for filtering and pagination
	 * @returns Promise<ILexwareCountry[]> Array of countries
	 */
	async getAll(params?: Record<string, any>): Promise<ILexwareCountry[]> {
		return this.apiClient.get<ILexwareCountry[]>(LEXWARE_API_ENDPOINTS.COUNTRIES, params);
	}

	/**
	 * Retrieve a specific country by ISO 2-letter country code
	 * @param countryCode ISO 2-letter country code (e.g., DE, US, FR)
	 * @returns Promise<ILexwareCountry> Country information
	 */
	async get(countryCode: string): Promise<ILexwareCountry> {
		return this.apiClient.get<ILexwareCountry>(`${LEXWARE_API_ENDPOINTS.COUNTRIES}/${countryCode}`);
	}

	/**
	 * Search countries by name or code
	 * @param query Search query string
	 * @returns Promise<ILexwareCountry[]> Array of matching countries
	 */
	async search(query: string): Promise<ILexwareCountry[]> {
		const params = { q: query };
		return this.apiClient.get<ILexwareCountry[]>(`${LEXWARE_API_ENDPOINTS.COUNTRIES}/search`, params);
	}

	/**
	 * Get EU member countries
	 * @returns Promise<ILexwareCountry[]> Array of EU countries
	 */
	async getEUCountries(): Promise<ILexwareCountry[]> {
		const params = { eu: true };
		return this.apiClient.get<ILexwareCountry[]>(LEXWARE_API_ENDPOINTS.COUNTRIES, params);
	}

	/**
	 * Get non-EU countries
	 * @returns Promise<ILexwareCountry[]> Array of non-EU countries
	 */
	async getNonEUCountries(): Promise<ILexwareCountry[]> {
		const params = { eu: false };
		return this.apiClient.get<ILexwareCountry[]>(LEXWARE_API_ENDPOINTS.COUNTRIES, params);
	}

	/**
	 * Get countries with specific tax classification
	 * @param taxType Tax classification type
	 * @returns Promise<ILexwareCountry[]> Array of countries with specified tax classification
	 */
	async getCountriesByTaxClassification(taxType: string): Promise<ILexwareCountry[]> {
		const params = { taxType };
		return this.apiClient.get<ILexwareCountry[]>(LEXWARE_API_ENDPOINTS.COUNTRIES, params);
	}

	/**
	 * Get countries with valid tax rates for a specific date
	 * @param date Date to check tax rates (ISO format)
	 * @returns Promise<ILexwareCountry[]> Array of countries with valid tax rates
	 */
	async getCountriesWithValidTaxRates(date?: string): Promise<ILexwareCountry[]> {
		const params: Record<string, any> = { validTaxRates: true };
		if (date) {
			params.date = date;
		}
		return this.apiClient.get<ILexwareCountry[]>(LEXWARE_API_ENDPOINTS.COUNTRIES, params);
	}

	/**
	 * Get countries supporting XRechnung (German e-invoice standard)
	 * @returns Promise<ILexwareCountry[]> Array of XRechnung supporting countries
	 */
	async getXRechnungCountries(): Promise<ILexwareCountry[]> {
		const params = { xrechnung: true };
		return this.apiClient.get<ILexwareCountry[]>(LEXWARE_API_ENDPOINTS.COUNTRIES, params);
	}

	/**
	 * Get countries with distance sales support
	 * @returns Promise<ILexwareCountry[]> Array of countries supporting distance sales
	 */
	async getDistanceSalesCountries(): Promise<ILexwareCountry[]> {
		const params = { distanceSales: true };
		return this.apiClient.get<ILexwareCountry[]>(LEXWARE_API_ENDPOINTS.COUNTRIES, params);
	}

	/**
	 * Validate country code format
	 * @param countryCode Country code to validate
	 * @returns string[] Array of validation errors (empty if valid)
	 */
	validateCountryCode(countryCode: string): string[] {
		const missingFields: string[] = [];
		
		if (!countryCode || countryCode.trim() === '') {
			missingFields.push('countryCode');
		} else if (countryCode.length !== 2) {
			missingFields.push('valid countryCode (2 characters)');
		} else if (!/^[A-Z]{2}$/.test(countryCode)) {
			missingFields.push('valid countryCode (2 uppercase letters)');
		}
		
		return missingFields;
	}

	/**
	 * Get common country codes for quick access
	 * @returns Record<string, string> Object mapping common country codes to names
	 */
	getCommonCountryCodes(): Record<string, string> {
		return {
			'DE': 'Germany',
			'AT': 'Austria',
			'CH': 'Switzerland',
			'FR': 'France',
			'IT': 'Italy',
			'ES': 'Spain',
			'NL': 'Netherlands',
			'BE': 'Belgium',
			'LU': 'Luxembourg',
			'US': 'United States',
			'GB': 'United Kingdom',
			'CA': 'Canada',
			'AU': 'Australia',
			'JP': 'Japan',
			'CN': 'China',
			'IN': 'India',
			'BR': 'Brazil',
			'MX': 'Mexico',
			'RU': 'Russia',
			'ZA': 'South Africa'
		};
	}

	/**
	 * Check if a country code is valid
	 * @param countryCode Country code to check
	 * @returns boolean True if valid, false otherwise
	 */
	isValidCountryCode(countryCode: string): boolean {
		return this.validateCountryCode(countryCode).length === 0;
	}

	/**
	 * Get country information with additional metadata
	 * @param countryCode Country code to get detailed information for
	 * @returns Promise<ILexwareCountry> Enhanced country information
	 */
	async getDetailedCountryInfo(countryCode: string): Promise<ILexwareCountry> {
		// First validate the country code
		const validationErrors = this.validateCountryCode(countryCode);
		if (validationErrors.length > 0) {
			throw new Error(`Invalid country code: ${validationErrors.join(', ')}`);
		}

		// Get the country information
		const country = await this.get(countryCode);
		
		// Add additional metadata
		const commonCodes = this.getCommonCountryCodes();
		if (commonCodes[countryCode]) {
			// Add common country indicator
			(country as any).isCommonCountry = true;
		}

		return country;
	}
}
