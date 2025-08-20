import { LexwareApiClient } from '../utils/api';
import { LexwareDataTransformer } from '../utils/transformers';
import { ILexwareContact, ILexwareCredentials } from '../types';
import { LEXWARE_API_ENDPOINTS } from '../constants';

export interface IContactFilterParams {
	// Basic filtering
	name?: string;
	email?: string;
	number?: string;
	
	// Role-based filtering
	customer?: boolean;
	vendor?: boolean;
	employee?: boolean;
	
	// Address filtering
	countryCode?: string;
	city?: string;
	zipCode?: string;
	
	// Status filtering
	archived?: boolean;
	
	// Pagination
	size?: number;
	page?: number;
	
	// Sorting
	sort?: string;
}

export interface IContactSearchParams extends IContactFilterParams {
	// Pattern matching search (as per API docs)
	searchString?: string;
}

export class ContactResource {
	private apiClient: LexwareApiClient;

	constructor(credentials: ILexwareCredentials) {
		this.apiClient = new LexwareApiClient(credentials);
	}

	/**
	 * Retrieve a specific contact by ID
	 * @param contactId - The unique identifier of the contact
	 * @returns Promise<ILexwareContact>
	 */
	async get(contactId: string): Promise<ILexwareContact> {
		return this.apiClient.get<ILexwareContact>(`${LEXWARE_API_ENDPOINTS.CONTACTS}/${contactId}`);
	}

	/**
	 * Retrieve all contacts with optional filtering and pagination
	 * @param params - Filter and pagination parameters
	 * @returns Promise<ILexwareContact[]>
	 */
	async getAll(params?: IContactFilterParams): Promise<ILexwareContact[]> {
		return this.apiClient.get<ILexwareContact[]>(LEXWARE_API_ENDPOINTS.CONTACTS, params);
	}

	/**
	 * Search contacts using pattern matching (as per API documentation)
	 * @param params - Search parameters including searchString for pattern matching
	 * @returns Promise<ILexwareContact[]>
	 */
	async search(params: IContactSearchParams): Promise<ILexwareContact[]> {
		return this.apiClient.get<ILexwareContact[]>(LEXWARE_API_ENDPOINTS.CONTACTS, params);
	}

	/**
	 * Create a new contact
	 * @param contactType - Type of contact: 'company' or 'person'
	 * @param additionalFields - Additional contact data
	 * @returns Promise<ILexwareContact>
	 */
	async create(contactType: 'company' | 'person', additionalFields: Record<string, any>): Promise<ILexwareContact> {
		const contactData = LexwareDataTransformer.transformContactData(contactType, additionalFields);
		return this.apiClient.post<ILexwareContact>(LEXWARE_API_ENDPOINTS.CONTACTS, contactData);
	}

	/**
	 * Update an existing contact
	 * @param contactId - The unique identifier of the contact to update
	 * @param additionalFields - Updated contact data
	 * @returns Promise<ILexwareContact>
	 */
	async update(contactId: string, additionalFields: Record<string, any>): Promise<ILexwareContact> {
		const sanitizedData = LexwareDataTransformer.sanitizeUpdateData(additionalFields);
		return this.apiClient.put<ILexwareContact>(`${LEXWARE_API_ENDPOINTS.CONTACTS}/${contactId}`, sanitizedData);
	}

	/**
	 * Delete a contact
	 * @param contactId - The unique identifier of the contact to delete
	 * @returns Promise<void>
	 */
	async delete(contactId: string): Promise<void> {
		return this.apiClient.delete<void>(`${LEXWARE_API_ENDPOINTS.CONTACTS}/${contactId}`);
	}

	/**
	 * Get deeplink URL for a contact (as per API documentation)
	 * @param contactId - The unique identifier of the contact
	 * @returns Promise<string> - The deeplink URL
	 */
	async getDeeplink(contactId: string): Promise<string> {
		// The API documentation mentions deeplinks to contacts
		// This would typically return a URL that opens the contact in the Lexware application
		const contact = await this.get(contactId);
		// For now, we'll construct a basic deeplink format
		// In a real implementation, this might come from the API response
		return `https://app.lexware.de/contacts/${contactId}`;
	}

	/**
	 * Validate contact creation data
	 * @param contactType - Type of contact: 'company' or 'person'
	 * @param additionalFields - Contact data to validate
	 * @returns string[] - Array of missing required field names
	 */
	validateCreateData(contactType: 'company' | 'person', additionalFields: Record<string, any>): string[] {
		const requiredFields = ['name'];
		
		if (contactType === 'company') {
			requiredFields.push('company');
		} else {
			requiredFields.push('person');
		}
		
		return LexwareDataTransformer.validateRequiredFields(additionalFields, requiredFields);
	}

	/**
	 * Validate contact update data
	 * @param additionalFields - Contact data to validate for updates
	 * @returns string[] - Array of validation error messages
	 */
	validateUpdateData(additionalFields: Record<string, any>): string[] {
		const errors: string[] = [];
		
		// Check if at least one field is provided for update
		if (Object.keys(additionalFields).length === 0) {
			errors.push('At least one field must be provided for update');
		}
		
		// Validate email format if provided
		if (additionalFields.emailAddresses) {
			const emails = additionalFields.emailAddresses;
			if (emails.business) {
				emails.business.forEach((email: string, index: number) => {
					if (!this.isValidEmail(email)) {
						errors.push(`Invalid business email format at index ${index}: ${email}`);
					}
				});
			}
			if (emails.private) {
				emails.private.forEach((email: string, index: number) => {
					if (!this.isValidEmail(email)) {
						errors.push(`Invalid private email format at index ${index}: ${email}`);
					}
				});
			}
		}
		
		// Validate phone number format if provided
		if (additionalFields.phoneNumbers) {
			const phones = additionalFields.phoneNumbers;
			if (phones.private) {
				phones.private.forEach((phone: string, index: number) => {
					if (!this.isValidPhoneNumber(phone)) {
						errors.push(`Invalid private phone format at index ${index}: ${phone}`);
					}
				});
			}
		}
		
		return errors;
	}

	/**
	 * Get contacts by role (customer, vendor, employee)
	 * @param role - The role to filter by
	 * @param params - Additional filter parameters
	 * @returns Promise<ILexwareContact[]>
	 */
	async getByRole(role: 'customer' | 'vendor' | 'employee', params?: Omit<IContactFilterParams, 'customer' | 'vendor' | 'employee'>): Promise<ILexwareContact[]> {
		const filterParams: IContactFilterParams = {
			...params,
			[role]: true
		};
		return this.getAll(filterParams);
	}

	/**
	 * Get contacts by country
	 * @param countryCode - ISO country code (e.g., 'DE', 'US')
	 * @param params - Additional filter parameters
	 * @returns Promise<ILexwareContact[]>
	 */
	async getByCountry(countryCode: string, params?: Omit<IContactFilterParams, 'countryCode'>): Promise<ILexwareContact[]> {
		const filterParams: IContactFilterParams = {
			...params,
			countryCode: countryCode.toUpperCase()
		};
		return this.getAll(filterParams);
	}

	/**
	 * Get archived contacts
	 * @param params - Additional filter parameters
	 * @returns Promise<ILexwareContact[]>
	 */
	async getArchived(params?: Omit<IContactFilterParams, 'archived'>): Promise<ILexwareContact[]> {
		const filterParams: IContactFilterParams = {
			...params,
			archived: true
		};
		return this.getAll(filterParams);
	}

	/**
	 * Get active (non-archived) contacts
	 * @param params - Additional filter parameters
	 * @returns Promise<ILexwareContact[]>
	 */
	async getActive(params?: Omit<IContactFilterParams, 'archived'>): Promise<ILexwareContact[]> {
		const filterParams: IContactFilterParams = {
			...params,
			archived: false
		};
		return this.getAll(filterParams);
	}

	/**
	 * Validate email format
	 * @param email - Email address to validate
	 * @returns boolean - True if valid email format
	 */
	private isValidEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	/**
	 * Validate phone number format
	 * @param phone - Phone number to validate
	 * @returns boolean - True if valid phone format
	 */
	private isValidPhoneNumber(phone: string): boolean {
		// Basic phone validation - allows international format
		const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;
		return phoneRegex.test(phone) && phone.length >= 7;
	}
}
